import React, { Component } from 'react';
import { Table } from 'antd';
import { Button } from 'antd';
import { Input } from 'antd';
import { Modal } from 'antd';


export class Comments extends Component {

    constructor(props) {
        super(props);
        this.onRowClick = this.onRowClick.bind(this);
        this.handleText = this.handleText.bind(this);
        this.addComment = this.addNewComment.bind(this);
        this.state = {
            comments: [],
            activityId: "",
            newCommentText: "",
            currentEditingRow: {},
            editModalVisible: false
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.setState({
            activityId: params.foractivityid
        });
        fetch('http://localhost:3000/api/v1.0/comments/getcomments/' + params.foractivityid)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    comments: json,

                })

            });
    }

    onRowClick = (e) => {
        console.log("row clicked")
    }

    handleText = event => {
        this.setState({
            newCommentText: event.target.value
        });
    }

    handleModalCancel = () => {
        this.setState({
            visible: false
        })
    }

    addNewComment = e => {
        fetch('http://localhost:3000/api/v1.0/comments/insertComment/',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "currentUser": localStorage.getItem("currentUser"),
                    "activityid": this.state.activityId,
                    "alltext": this.state.newCommentText,
                    "datecreated": new Date(),
                    "datemodified": new Date()
                })
            })
            .then(data => data.status)
            .then(statusCode => {
                console.log(statusCode);
                if (statusCode === 201) {
                    console.log("Comment successfully added")
                    window.location.reload();
                }
                else {
                    console.log("Something went wrong")
                    //Handle all the case   
                }
            });
    }

    handleEditButton = (text) => {
        this.setState({
            visible: true,
        });
        let currentRowInformation = {
            commentId: text.target.parentNode.parentNode.children[0].innerText,
            userId: text.target.parentNode.parentNode.children[1].innerText,
            activityId: text.target.parentNode.parentNode.children[2].innerText,
            allText: this.state.newCommentText,
            dateCreated: new Date(text.target.parentNode.parentNode.children[4].innerText),
            dateModified: new Date()
        }
        this.setState(
            {
                currentEditingRow: currentRowInformation
            });
    }

    editComment = e => {
        fetch('http://localhost:3000/api/v1.0/comments/' + this.state.currentEditingRow.commentId,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "userid": this.state.currentEditingRow.userId,
                    "activityid": this.state.currentEditingRow.activityId,
                    "alltext": this.state.newCommentText,
                    "datecreated": this.state.currentEditingRow.dateCreated,
                    "datemodified": this.state.currentEditingRow.dateModified
                })
            })
            .then(data => data.status)
            .then(statusCode => {
                console.log(statusCode);
                if (statusCode === 200) {
                    console.log("Comment successfully updated")
                    window.location.reload();
                }
                else {
                    console.log("Something is wrong") 
                }
            });
    }

    render() {

        var { comments } = this.state;
        const { TextArea } = Input;
        const { Column } = Table;

        return (
            <div className="viewCommentsPage">
                <div>
                    <h1>All Comments Activity {this.state.activityId}</h1>
                    <a href={"/getcomments/" + this.state.activityId} id="backLink">Back to activity detail</a>

                    <Table
                        dataSource={comments}
                        rowKey="Id"
                    >
                        <Column title="Comment Id" dataIndex="Id" key="Id" />
                        <Column title="User Id" dataIndex="userId" key="userId" />
                        <Column title="Activity Id" dataIndex="activityId" key="activityId" />
                        <Column title="Text" dataIndex="allText" key="allText" />
                        <Column title="Creation Date" dataIndex="dateCreated" key="dateCreated" />
                        <Column title="Modification Date" dataIndex="dateModified" key="dateModified" />
                        <Column
                            render={(text, record) => (<Button type="link" onClick={this.handleEditButton}>Edit</Button>)}
                        />
                    </Table>

                    <TextArea rows={8} id="newCommentTextArea" placeholder="Write here the content of your comment" onChange={this.handleText} />
                    <br /><br /><br />
                    <Button id="addCommentButton" type="primary" onClick={this.addNewComment}>Add New Comment</Button>

                    <Modal
                        visible={this.state.visible}
                        title={"Edit content for comment " + this.state.currentEditingRow.commentId}
                        onOk={this.handleOk}
                        onCancel={this.handleModalCancel}
                        footer={[
                            <Button key="back" onClick={this.handleCancel}>
                                Cancel
            </Button>,
                            <Button key="submit" type="primary" onClick={this.editComment}>
                                Save
            </Button>,
                        ]}
                    >
                        <TextArea rows={8} id="editCommentTextArea" placeholder="Write here the new content of your comment" onChange={this.handleText} />
                    </Modal>

                </div>
            </div>
        );
    }
}

export default Comments;