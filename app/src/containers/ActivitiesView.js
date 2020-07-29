import React from "react";
import { Table } from 'antd';
import reqwest from "reqwest";

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    sorter: true,
    width: '25%',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    sorter: true,
    width: '25%',
  },
  {
    title: 'URL',
    dataIndex: 'url',
    sorter: true,
    width: '25%',
  },
  {
    title: 'Location',
    dataIndex: 'location',
    sorter: true,
    width: '25%',
  },
];

class ActivitiesTable extends React.Component {
    state = {
        data: [],
        pagination: {},
        loading: false,
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
          url: 'http://localhost:3000/api/v1.0/activities/getall/',
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
    return (
      <Table
        columns={columns}
        rowKey={record => record.ID}
        dataSource={this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
      />
    );
  }
}

export default ActivitiesTable;