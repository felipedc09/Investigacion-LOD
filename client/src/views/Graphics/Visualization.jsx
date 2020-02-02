import React, { Component } from 'react';
// import Insights from 'insights';

export default class Visualization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: null,
      data: props.data
    }
  }

  componentDidMount() {
    this.loadDatasets();
  }

  render() {
    return (
        <div id="graphic"> Loading ... </div>
    );
  }

  loadDatasets() {
    // const { data } = this.state;
    // var nodes = data.nodes
    //   , links = data.links
    //   , el = document.getElementById("graphic")
    //   , options = {
    //     width: 650,
    //     height: 500,
    //     // width: screen.width,
    //     // height: screen.height,
    //     colors: { "0": "blue" }
    //   };
    // var graph = new Insights(el, nodes, links, options)
    //   .zoom(.85)
    //   .center()
    //   .render();
    // // console.log(graph)

    // graph.on('rendered', function () {
    //   console.log('terminoooooo')
    // })

    // graph.on("node:click", function (d) {
    //   console.log("click", d);
    // });

    // graph.on("node:mouseover", function (d, offset) {
    //   console.log("mouseover", d, offset);
    // });

    // graph.on("node:mouseout", function (d, offset) {
    //   console.log("mouseout", d, offset);
    // });

    // graph.tooltip("<div>word: {{text}}</div><div>Resources: {{size}}</div>");
  }
}