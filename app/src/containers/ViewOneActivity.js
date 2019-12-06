import React, { Component } from 'react';
import "antd/dist/antd.css";

export class ViewOneActivity extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            activity: {
            title: '',
            description: '',
            url: '',
            location: ''
            },
        loaded: false
        };
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.setState({
            id: params.id
        });
        fetch('http://localhost:3000/api/v1.0/activities/get/' + params.id)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    activity: json[0],
                    loaded: true
                })
            });
    }

    render() {
        return (
            <div>
                <div>
                    <div>
                        <div>
                            <table>
                                <tr>
                                    <td><h3>Title: </h3></td>
                                    <td>   {this.state.activity.title}</td>
                                </tr>
                                <tr>
                                    <td><h3>Description: </h3></td>
                                    <td>   {this.state.activity.description}</td>
                                </tr>
                                <tr>
                                    <td><h3>URL: </h3></td>
                                    <td>   {this.state.activity.url}</td>
                                </tr>
                                <tr>
                                    <td><h3>Location: </h3></td>
                                    <td>   {this.state.activity.location}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default ViewOneActivity;