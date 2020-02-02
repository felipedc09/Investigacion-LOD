import React, { Component } from "react";
import ErrorManagerView from './errorManagerView';

export default class ErrorManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: props.error.type,
            title: props.error.statusText,
            message: '',
            url: props.error.url,
            color: 'danger',
            open: false,
            place: this.props.place
        };
        this.closeNotification = this.closeNotification.bind(this)
    }

    componentDidMount() {
        this.formatErrorMesagge(this.props.error)
        this.showNotification(this.props.error.status)
    }

    showNotification(code) {
        var type;
        switch (code) {
            case '':
                type = 'warning';
                break;
            case 500:
                type = 'danger';
                break;
            default:
                type = 'danger';
                break;
        };

        this.setState({ open: true, color: type });
        setTimeout(function () {
            this.setState({ open: false });
        }.bind(this), 6000);
    }

    render() {
        return <ErrorManagerView
            error={this.state}
            closeNotification={this.closeNotification}
        />
    }

    async formatErrorMesagge(error) {
        const message = await error.json()
        this.setState(message)
    }

    closeNotification() {
        this.setState({ open: false })
    }
}