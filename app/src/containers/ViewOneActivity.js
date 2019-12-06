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
                        <h1>Calendar Booking System</h1>
                        <h1>View activity {this.state.id}</h1>
                        <div className="activityView">
                            <br/><br/>
                            <h3 className ="title"> Title: {this.state.activity.title}</h3>
                            <h3 className ="title">Description: {this.state.activity.description}</h3> 
                            <h3 className ="title">URL: {this.state.activity.url} </h3>
                            <h3 className ="title">Location: {this.state.activity.location}</h3>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default ViewOneActivity;