import React, { Component } from "react";
import Chart from "react-google-charts";

export default class Barchart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      graph_data: [],
      graph_options: {},
      specific_data: [],
      data_length: 0,
      option: props.option,
      data: props.data
    };
  }

  componentDidMount() {
    if (this.state.option === "license") {
      this.processLicense();
    } else if (this.state.option === "resources") {
      this.processResources();
    } else if (this.state.option === "relationships") {
      this.processRelationships();
    }
  }

  render() {
    return (
      <Chart
        width={"100%"}
        height={"800px"}
        chartType="Bar"
        loader={<div>Loading Chart</div>}
        data={this.state.graph_data}
        options={{
          // Material chart options
          chart: {
            title: "",
          },
          hAxis: {
            title: "Licenses",
            minValue: 0
          },
          vAxis: {
            title: "Quantity",
            minValue: 0
          },
          bars: "horizontal",
          axes: {
            y: {
              0: { side: "left" }
            }
            
          }
        }}
      />
    );
  }

  processRelationships() {
    let output_arr = [];
    let obj_rel = 0;
    let sub_rel = 0;
    let tempArray = [];

    for (let obj of this.state.data) {
      if (
        obj.relationships_as_object.length > 0 ||
        obj.relationships_as_subject.length > 0
      ) {
        let temp = {
          title: obj.title,
          obj_rel: obj.relationships_as_object.length,
          sub_rel: obj.relationships_as_subject.length
        };
        tempArray.push(temp);
      }
      obj_rel += obj.relationships_as_object.length;
      sub_rel += obj.relationships_as_subject.length;
    }
    this.setState({ specific_data: tempArray });

    let obj = {
      label: "Relationships as object",
      value: obj_rel
    };

    let sub = {
      label: "Relationships as subject",
      value: sub_rel
    };

    output_arr.push(obj);
    output_arr.push(sub);

    this.displayGraph();
    let tempValue = [["Relationships", "value"],
    ...this.parseListJsonToListArrays(output_arr)];
    this.setState({ graph_data: tempValue });
  }

  processResources() {
    let raw_arr = [];
    let output_arr = [];

    for (let obj of this.state.data) {
      for (let resource of obj.resources) {
        raw_arr.push(resource.format);
      }
    }

    output_arr = this.filterArrays(raw_arr.sort());
    if (output_arr.length < 10) {
      this.setState({data_length : 450})
    } else {
      this.setState({data_length : output_arr.length * 27})
    }
    this.displayGraph();
    let tempValue = [["Resource", "value"],
    ...this.parseListJsonToListArrays(output_arr)];
    this.setState({ graph_data: tempValue });
  }

  processLicense() {
    let raw_arr = [];
    let output_arr = [];

    for (let i = 0; i < this.state.data.length; i++) {
      raw_arr.push(this.state.data[i]["license_title"]);
    }

    output_arr = this.filterArrays(raw_arr.sort());
    if (output_arr.length < 10) {
      this.setState({ data_length: 450 });
    } else {
      this.setState({ data_length: output_arr.length * 27 });
    }
    this.displayGraph();
    let tempValue = [
      ["License", "value"],
      ...this.parseListJsonToListArrays(output_arr)
    ];
    this.setState({ graph_data: tempValue });
  }

  parseListJsonToListArrays(jsonList) {
      console.log(jsonList)
    return jsonList.map((json) => {
        return [json.label, json.value];
    });
  }

  displayGraph() {
    this.setState({
      graph_data: [
        {
          key: "Cumulative Return",
          values: []
        }
      ]
    });
  }

  filterArrays(array_ordered) {
    let output_arr = [];
    let licence_temp = "";
    let filtered_arr = [];

    for (let licence of array_ordered) {
      if (licence !== licence_temp) {
        filtered_arr.push(licence);
        licence_temp = licence;
      }
    }

    for (let filtered_elm of filtered_arr) {
      let counter = 0;
      let temp_obj = {
        label: filtered_elm,
        value: 0
      };
      for (let raw_eml of array_ordered) {
        if (filtered_elm === raw_eml) {
          counter++;
        }
      }
      temp_obj.value = counter;
      output_arr.push(temp_obj);
    }

    return output_arr;
  }
}
