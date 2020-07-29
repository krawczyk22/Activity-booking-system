import React from "react";
import { Table, Button } from 'antd';
import reqwest from "reqwest";

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    sorter: true,
    width: '14%',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    sorter: true,
    width: '14%',
  },
  {
    title: 'URL',
    dataIndex: 'url',
    sorter: true,
    width: '14%',
  },
  {
    title: 'Location',
    dataIndex: 'location',
    sorter: true,
    width: '14%',
  },
  {
    title: 'From',
    dataIndex: 'fromdate',
    sorter: true,
    width: '15%',
  },
  {
    title: 'To',
    dataIndex: 'todate',
    sorter: true,
    width: '15%',
  },
  {
    title: 'Accepted',
    dataIndex: 'accepted',
    sorter: true,
    width: '14%',
  },
];

class TagsTable extends React.Component {
  state = {
    data: [],
    selectedRowKeys: [],
    pagination: {},
    loading: false,
  };

  startAccept = e => {
    e.preventDefault();
    //this.props.form.validateFieldsAndScroll((err, values) => {
      //if (!err) {
        //echo the values to the browser console to make sure they are correct
        //console.log('Received values of form: ', values);
        //here we should send a request to our server to post the user
        //use fetch API to post the user data
        fetch('http://localhost:3000/api/v1.0/tags/put/' + localStorage.getItem('key'), { 
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: {"accepted":true}
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
     // } 
   // });
  };

  startReject = e => {
    e.preventDefault();
    //this.props.form.validateFieldsAndScroll((err, values) => {
      //if (!err) {
        //echo the values to the browser console to make sure they are correct
        //console.log('Received values of form: ', values);
        //here we should send a request to our server to post the user
        //use fetch API to post the user data
        fetch('http://localhost:3000/api/v1.0/tags/put/' + localStorage.getItem('key'), { 
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: {"accepted":false}
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
      //} 
    //});
  };

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    localStorage.setItem('key', selectedRowKeys)
    this.setState({ selectedRowKeys });
  };

  checkResponse = (data) => {
    if (this.state.addedSucessfully) {
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

  componentDidMount() {
    this.fetch();
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  };

  fetch = (params = {}) => {
    console.log('params:', params);
    this.setState({ loading: true });
    reqwest({
      url: 'http://localhost:3000/api/v1.0/activities/getactivitiestagged/' + localStorage.getItem('username'),
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      data: {
        //RowDataPacket: 10,
        ...params,
      },
      type: 'json',
    }).then(data => {
      const pagination = { ...this.state.pagination };
      // Read total count from server
      pagination.total = data.totalCount;
      this.setState({
        loading: false,
        data: data,
        pagination,
      });
    
    });
    
  };

  render() {
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" onClick={this.startAccept} disabled={!hasSelected} loading={loading}>
            Accept
          </Button>
          <span style={{ marginLeft: 8 }}></span>
          <Button type="primary" onClick={this.startReject} disabled={!hasSelected} loading={loading}>
            Reject
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          rowKey={record => record.ID}
          dataSource={this.state.data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default TagsTable;