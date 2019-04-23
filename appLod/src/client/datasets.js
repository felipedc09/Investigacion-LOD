import React, { Component } from 'react';
import DataTable from 'react-data-table-component';

export default class Datasets extends Component {
    constructor(props){
        super(props);
        this.state = {
            columns : null,
            data : props.data
        }
    }

    componentDidMount(){
        console.log("entro");
        this.loadDatasets();
        console.log("salio");
    }

    render() {
        const {data, columns} = this.state;
        return (
            columns ? <DataTable
                title="Datasets"
                columns={columns}
                data={data.nodes}
            /> : <div> Loading ... </div>
        )
    }

    // preparaLink() {
    //     const {data} = this.state; 
    //     urlRdf = "";
    //     name = "";
    //     for (x in data.nodes) {
    //         urlRdf = lod.nodes[x].urlResourceRdf.replace(".bz2", "");
    //         name = lod.nodes[x].nodeName;
    //     }
    //     $('#desgarga-dataset').attr("href", urlRdf);
    //     $('#desgarga-dataset').attr("download", name);
    // }

    loadDatasets() {
        const {data} = this.state;
        console.log(data)
        if (data.nodes == []) {
            // alert("No cargaron los datasets");
        } else {
            var columns = [
                {
                    selector: 'id',
                    name: '#',
                    sortable: true,
                },
                {
                    selector: 'nodeTitle',
                    name: 'Nombre',
                    sortable: true,
                },
                // {
                //     data: 'triples',
                //     title: '# Tripletas'
                // },
                {
                    selector: 'cluster',
                    name: 'Grado',
                    sortable: true,
                },
                {
                    selector: 'license_title',
                    name: 'Licencia',
                    sortable: true,
                },
                {
                    selector: 'state',
                    name: 'Estado',
                    sortable: true,
                },
                {
                    selector: 'size',
                    name: '# Racursos',
                    sortable: true,
                },
                // {
                //     data: 'ckanUrl',
                //     title: 'Repositorio',
                //     render: function (data, type, full, meta) {
                //         var link = "<div class='ver'>";
                //         link += "<a class='btn btn-default btn-xs' href='" + data + "' target='_blank'><i class='glyphicon glyphicon-search'></i></a>";
                //         link += "</div>";
                //         return link;
                //     }
                // }
            ];
            this.setState({columns});
        }
    }
}