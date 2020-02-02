import React, { Component } from "react";
import PropTypes from 'prop-types';
import Loading from "../../../utilities/Loading/loading";
import { hostUrl } from "../../../utilities/request";
import InstancesView from "../instancesView";
import ErrorManager from "utilities/ErrorManager/errorManager";
import checkboxAdnRadioStyle from "assets/jss/material-dashboard-react/checkboxAdnRadioStyle.jsx";
import withStyles from "@material-ui/core/styles/withStyles";

class Instances extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            error: null,
            instances: [],
            selectedInstance: props.instance,
            instanceUrl: '',
            instanceName: '',
        };
        this.updateField = this.updateField.bind(this)
        this.postInstance = this.postInstance.bind(this)
        this.updateInstance = this.updateInstance.bind(this)
    }

    componentDidMount() {
        this.getInstances();
    }

    render() {
        console.log(this.state)
        const { error, isLoading, instances } = this.state
        const { classes } = this.props;
        if (isLoading) {
            return <Loading />
        }
        if (error) {
            return <ErrorManager error={error} place={'tc'} />
        }
        return (
            <InstancesView instances={instances} postInstance={this.postInstance} updateField={this.updateField} classes={classes} selectedInstance={this.state.selectedInstance} updateInstance={this.updateInstance} />
        );
    }

    async getInstances() {
        try {
            const res = await fetch(`${hostUrl}instances`);
            if (!res.ok) { throw res }
            const data = await res.json();
            this.setState({
                isLoading: false,
                instances: data
            });
        } catch (error) {
            this.setState({ error, isLoading: false })
            console.error(error);
        }
    }

    updateField(event) {
        const target = event.target
        const data = { [target.name]: target.value }
        this.setState(data)
    }

    updateInstance(instance) {
        this.props.setInstance(instance)
        this.setState({ selectedInstance: instance })
    }

    async postInstance() {
        const { instanceName, instanceUrl } = this.state
        this.setState({
            isLoading: true
        });
        try {
            let body = { instance: { name: instanceName, url: instanceUrl } }
            const res = await fetch(`${hostUrl}instances`, {
                method: "POST",
                body: JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' },
            });
            if (!res.ok) { throw res }
            const data = await res.json();
            this.setState({
                isLoading: false,
                instances: data
            });
        } catch (error) {
            this.setState({ error, isLoading: false })
            console.error(error);
        }
    }
}
Instances.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(checkboxAdnRadioStyle)(Instances);
