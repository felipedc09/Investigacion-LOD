import React, { Component } from "react";
import Chart from "react-google-charts";
import ReactTable from "react-table";
import "react-table/react-table.css";

export default class Piechart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      graph_data: [],
      specific_data: [],
      option: props.option,
      data: props.data
    };
  }

  componentDidMount() {
    this.actionProcess();
  }

  render() {
    return (
      <React.Fragment>
        <Chart
          width={"100%"}
          height={"300px"}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={this.state.graph_data}
          options={{
            title: ""
          }}
          rootProps={{ "data-testid": "1" }}
        />
        <ReactTable
          data={this.state.specific_data}
          columns={[
            {
              Header: "Package title",
              accessor: "title"
            },
            {
              Header: "Author",
              accessor: "option"
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </React.Fragment>
    );
  }

  actionProcess() {
    const { data, specific_data, option } = this.state;
    var up = 0;
    var up_per = 0;
    var down = 0;
    var down_per = 0;

    for (var i = 0; i < data.length; i++) {
      if (data[i][option] === null || data[i][option] === "") {
        down++;
      } else {
        var temp = {
          title: data[i]["title"],
          option: data[i][option]
        };
        specific_data.push(temp);
        up++;
      }
    }

    up_per = (up * 100) / (up + down);
    down_per = (down * 100) / (up + down);

    var output_arr = [
      ["State", "Value"],
      ["Registrado", up_per],
      ["No registrado", down_per]
    ];
    this.setState({
      graph_data: output_arr
    });
  }
}
