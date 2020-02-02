import React, { Component } from 'react';
export default class About extends Component {
    render() {
        return (
            <div >
                <h3>
                    References
				</h3>
                <ul>
                    <li><a href="http://semantic-mediawiki.org/wiki/Help:Using_SPARQL_and_RDF_stores">Using SPARQL and RDF stores</a></li>
                    <li><a href="http://wifo5-03.informatik.uni-mannheim.de/benchmarks-200801/">RDF Store Benchmarks with DBpedia</a></li>
                    <li><a href="http://www.opendata.cz/cs/node/20">Metodika práce se software CKAN</a></li>
                    <li><a href="https://ns.inria.fr/l4lod/v2/l4lod_v2.html">L4LOD Vocabulary Specification 0.2</a></li>
                    <li><a href="http://linguistic-lod.org/llod-cloud.php#">Linguistic Linked Open Data Cloud.</a></li>
                </ul>
            </div>
        );
    }
}