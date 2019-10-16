import React from "react";
import { Table } from 'antd';

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    sorter: true,
    width: '12.5%',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    sorter: true,
    width: '12.5%',
  },
  {
    title: 'URL',
    dataIndex: 'url',
    sorter: true,
    width: '12.5%',
  },
  {
    title: 'Location',
    dataIndex: 'location',
    sorter: true,
    width: '12.5%',
  },
  {
    title: 'From',
    dataIndex: 'fromdate',
    sorter: true,
    width: '12.5%',
  },
  {
    title: 'To',
    dataIndex: 'todate',
    sorter: true,
    width: '12.5%',
  },
  {
    title: 'Tagged by',
    dataIndex: 'username',
    sorter: true,
    width: '12.5%',
  },
  {
    title: 'Accepted',
    dataIndex: 'accepted',
    sorter: true,
    width: '12.5%',
  },
];

class TagsTable extends React.Component {
  state = {
    data: [],
    pagination: {},
    loading: false,
  };

  componentDidMount(){
      fetch("http://localhost:3000/api/v1.0/activities/getactivities/1")
      .then(res => res.json())
      .then(
          (result) => {
              console.log(result)
              this.setState({
                  isLoaded: true,
                  items: result
                });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
            )
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

  render() {
    return (
      <Table
        columns={columns}
        //rowKey={record => record.login.uuid}
        dataSource={this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.componentDidMount}
        
      />
    );
  }
}

export default TagsTable;