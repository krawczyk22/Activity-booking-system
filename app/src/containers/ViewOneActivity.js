import React, { Component } from 'react';
import "./Signup.css";
import "antd/dist/antd.css";

export class ViewOneActivity extends Component {
    //constricting the activity table
    constructor(props) {
        super(props);
        this.state = {
            activity: {
            title: '',
            description: '',
            url: '',
            location: ''
            },
        loaded: false
        };
    }
    //getting the values of the activity
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
            <div className="Signup">
                <table>
                    <tr>
                        <td><h3>Title: </h3></td>
                        <td><h4>{this.state.activity.title}</h4></td>
                    </tr>
                    <tr>
                        <td><h3>Description: </h3></td>
                        <td><h4>{this.state.activity.description}</h4></td>
                    </tr>
                    <tr>
                        <td><h3>URL: </h3></td>
                        <td><h4>{this.state.activity.url}</h4></td>
                    </tr>
                   <tr>
                        <td><h3>Location: </h3></td>
                        <td><h4>{this.state.activity.location}</h4></td>
                    </tr>
                </table>
            </div >
        )
    }
}

export default ViewOneActivity;