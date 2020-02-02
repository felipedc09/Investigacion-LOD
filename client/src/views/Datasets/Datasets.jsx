import React, { Component } from "react";
import ReactTable from "react-table";
import { hostUrl } from "../../utilities/request";
import ErrorManager from "../../utilities/ErrorManager/errorManager";
import Loading from "../../utilities/Loading/loading";
import "react-table/react-table.css";

export default class Datasets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      error: null,
      columns: [],
      data: props.data,
      instanceSelected: props.instance
    };
  }

  componentDidMount() {
    const { instanceSelected } = this.state;
    if (instanceSelected) {
      this.getDatasets(instanceSelected.name);
    }
    this.loadDatasets();
  }

  render() {
    console.log(this.state.instanceSelected);
    const { error, isLoading, data, columns } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    if (error) {
      return <ErrorManager error={error} place={"tc"} />;
    }
    return <ReactTable data={data.nodes} columns={columns} />;
  }

  async getDatasets(instanceName) {
    try {
      const res = await fetch(`${hostUrl}instance/${instanceName}/graphic`);
      if (!res.ok) {
        throw res;
      }
      const data = await res.json();
      this.setState({
        isLoading: false,
        data: data.datasets
      });
    } catch (error) {
      this.setState({ error, isLoading: false });
      console.error(error);
    }
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
    var columns = [
      {
        Header: "#",
        accessor: "id"
      },
      {
        Header: "Nombre",
        accessor: "nodeTitle"
      },
      {
        Header: "# Tripletas",
        accessor: "triples"
      },
      {
        Header: "Grado",
        accessor: "cluster"
      },
      {
        Header: "Licencia",
        accessor: "license_title"
      },
      {
        Header: "Estado",
        accessor: "state"
      },
      {
        Header: "# Racursos",
        accessor: "size"
      }
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
    this.setState({ columns });
  }
}
