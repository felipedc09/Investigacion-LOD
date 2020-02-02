import React, { Component } from "react";
import AnalitycsView from "../analitycsView";
import { hostUrl } from "../../../utilities/request";
import ErrorManager from "../../../utilities/ErrorManager/errorManager";
import Loading from "../../../utilities/Loading/loading";

export default class Analytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      error: null,
      instanceMetadata: [],
      instanceSelected: props.instance
    };
  }

  componentDidMount() {
    this.loadMetadata()
  }

  render() {
    const {
      error,
      isLoading,
      instanceMetadata
    } = this.state;

    if (isLoading) {
      return <Loading />;
    }
    if (error) {
      return <ErrorManager error={error} place={"tc"} />;
    }
    return (
      <AnalitycsView
        instanceMetadata={instanceMetadata}
      />
    );
  }

  loadMetadata() {
    const { instanceSelected } = this.state;
    this.setState({ isLoading: true });
    if (instanceSelected) {
      this.getInstanceMetadata(instanceSelected.name);
    }
  }

  async getInstanceMetadata(instanceName) {
    try {
      const res = await fetch(`${hostUrl}instances/${instanceName}`);
      if (!res.ok) {
        throw res;
      }
      const data = await res.json();
      this.setState({
        instanceMetadata: data.packages,
        isLoading: false
      });
    } catch (error) {
      this.setState({ error, isLoading: false });
      console.error(error);
    }
  }
}
