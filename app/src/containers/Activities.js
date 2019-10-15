import React from "react";
import "./Activities.css";
import { Form, Input, Alert, Button } from "antd";

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    addedSucessfully: false, //if the user is added successfully
    showSuccess: false, //if should we show a successful feedback message after adding a user
    showError: false, //if should we show an error feedback message after adding a
    errorCode: 400, //to save the errorCode we recieved from the api server
    responseStatus: "nothing", //the validation status of the email
    errorMessage: "" //the error message to display to the user after server rejects action
    };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        //echo the values to the browser console to make sure they are correct
        console.log('Received values of form: ', values);
        //here we should send a request to our server to post the user
        //use fetch API to post the user data
        fetch('http://localhost:3000/api/v1.0/activities/insert/', { 
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify({values}) 
        }).then(res => {
          if(res.ok) 
            this.setState({addedSucessfully:true})
          else 
            this.setState({
              addedSucessfully:false,
              errorCode: res.status
            });
          return res.json()
        }).then(data => this.checkResponse(data))
      } 
    });
  };

  handleThing = ()=> {
    this.setState({responseStatus:"nothing"}) 
  }

  checkResponse = (data) => {
    if(this.state.addedSucessfully){ 
      this.props.form.resetFields(); 
      this.setState({
        showSuccess:true,
        showError : false 
      });
    } else {
      //handle errors
      this.setState({ 
        errorMessage: data.message, 
        showSuccess:false, 
        showError : true, 
        responseStatus: "error"
      }); 
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    //this code will handle form responsivness on small devices
    const formItemLayout = {
      labelCol: { 
        xs: { span: 24 },
        sm: { span: 8 },
      }, 
      wrapperCol: { 
        xs: { span: 24 },
        sm: { span: 16 },
        }, 
      };
      const tailFormItemLayout = { 
        wrapperCol: {
          xs: { 
            span: 24,
            offset: 0, 
          },
          sm: { 
            span: 16,
            offset: 8, 
          },
        }, 
      };

    //prefix the email input with some decoration
    return ( 
      <div className="NewActivity">
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="Title" hasFeedback>
          {getFieldDecorator('title', { 
            rules: [
              {
              required: true,
              message: 'Please input the title!', },
            ],
          })(<Input onChange={this.handleThing} />)}
          </Form.Item>
          <Form.Item label="Description" hasFeedback>
          {getFieldDecorator('description', { 
            rules: [
              {
              required: true,
              message: 'Please input the description!', },
            ],
          })(<Input onChange={this.handleThing} />)}
          </Form.Item>
          <Form.Item label="URL" hasFeedback>
          {getFieldDecorator('url', { 
            rules: [
              {
              required: true,
              message: 'Please input the URL!', },
            ],
          })(<Input onChange={this.handleThing} />)}
          </Form.Item>
          <Form.Item label="Location" hasFeedback>
          {getFieldDecorator('location', { 
            rules: [
              {
              required: true,
              message: 'Please input the location!', },
            ],
          })(<Input onChange={this.handleThing} />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
          {this.state.showSuccess ? <Alert message="activity created successfully" type="success" /> :null}
          {this.state.showError ? <Alert message={this.state.errorMessage} type="error" /> :null}
        </Form>
      </div>
    );
  }
}
const Signup = Form.create({ name: 'register' })(RegistrationForm);
export default Signup;