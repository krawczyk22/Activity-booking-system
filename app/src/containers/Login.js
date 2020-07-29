import React from "react";
import "./Login.css";
import { Form, Input, Alert, Button } from "antd";

class LoginForm extends React.Component {
  state = {
    confirmDirty: false,
    addedSucessfully: false, //if the user is logged in successfully
    showSuccess: false, //if should we show a successful feedback message after logging a user in
    showError: false, //if should we show an error feedback message after logging a user in
    errorCode: 400, //to save the errorCode we recieved from the api server
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
        fetch('http://localhost:3000/api/v1.0/users/login/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + window.btoa(values.username + ':' + values.password)
          },
          body: JSON.stringify({ values })
        }).then(res => {
          if (res.ok) {
            localStorage.setItem('username', values.username)
            localStorage.setItem('password', values.password)
            this.setState({ addedSucessfully: true })
            this.props.history.push('/welcomePage')
          }
          else
            this.setState({
              addedSucessfully: false,
              errorCode: res.status
            });
          return res.json()
        }).then(data => this.checkResponse(data))
      }
    });
  };

  handleThing = () => {
    this.setState({ responseStatus: "nothing" })
  }

  checkResponse = (data) => {
    if (this.state.addedSucessfully) {
      this.props.form.resetFields();
      this.setState({
        showSuccess: true,
        showError: false
      });
      window.location.reload();
    } else {
      //handle errors
      this.setState({
        errorMessage: data.message,
        showSuccess: false,
        showError: true,
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
      <div className="Login">
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="Login" hasFeedback>
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: 'Please input the username!',
                },
              ],
            })(<Input onChange={this.handleThing} />)}
          </Form.Item>
          <Form.Item label="Password" hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ],
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
          {this.state.showSuccess ? <Alert message="logged in  successfully" type="success" /> : null}
          {this.state.showError ? <Alert message={this.state.errorMessage} type="error" /> : null}
        </Form>
      </div>
    );
  }
}
const Login = Form.create({ name: 'register' })(LoginForm);
export default Login;