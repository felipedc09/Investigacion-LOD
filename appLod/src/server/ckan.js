const requester = new require('./request');
const fs = require('fs');

var ckan = function (url) {
    this.url = url;
}


ckan.prototype.main = async function (url) {
    let date = new Date();
    console.log(`starting to load data from ckan -- ${date.now}`);
    try {
        let packages = await loadData(url);
        let data = generateVisualizationData(packages);
        await createDataFiles(data);

    } catch (error) {
        console.log(`exiting after unexpected error: ${error}`);
    }
    console.log(`finished ckan load -- ${date.now}`);
    return `finished ckan load -- ${date.now}`;
}

async function loadData (url) {
    let uri = `${url}package_list`;
    let packagesInfo = [];
    await requester.get(uri, (packages) => {
      return packages.forEach(async (package, index) => {
            let uriInfoPackage = `${url}/package_show?id=${package}`;
            await requester.get(uriInfoPackage, (packageInfo) => {
                packageInfo = packageInfo.result;
                packageInfo['internal_id'] = index;
                packagesInfo.push(packageInfo);
            });
        });
    });
    return packagesInfo;
}

function generateVisualizationData(packages, url) {
    return {
        "nodes": getNodes(packages, url),
        "links": getLinks(packages)
    };
}

function getNodes(packages, url) {
    let rating;
    let triples;
    let cluster;
    let short_title;
    return packages.map((package) => {
        rating = package.ratings_average;
        triples = package.extras.triples ? package.extras.triples : 0;
        if (triples >= 0 && triples <= 10000000) {
            cluster = 1;
        } else if (triples > 10000000 && triples <= 100000000) {
            cluster = 2;
        } else {
            cluster = 3;
        }
        short_title = package.extras.short_title ?
            package.extras.short_title :
            package.title;
        return {
            'cluster': cluster,
            'triples': triples,
            'ratings_average': rating,
            'ratings_count': package.ratings_count,
            'text': short_title,
            'id': package.nternal_id,
            'nodeTitle': package.title,
            'ckanUrl': `${url}/package_show?id=${package.name}`,
            'license_title': package.license_title,
            'size': package.num_resources,
            'state': package.state
        }
    });
}

function getLinks(packages) {
    let toPackageName;
    let count;
    let packageMap = packages.map((package) => {
        let newPackage = {};
        return newPackage[package.name] = this.package;
    });
    return packages.map((package) => {
        package.extras.map((extra)=>{
            if(extra.key.startsWith('links:')){
                toPackageName = extra.key.split(':')[1];
            }
            count = extra.value;
            return ([package.internal_id],packageMap[toPackageName]['internal_id'],count );
        });
    });
}

async function createDataFiles(data){
    let date = new Date();
    await fs.writeFile(`lod-${date.now}.js`, data);

}

function generateLog() {

}

module.exports = ckan;