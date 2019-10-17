import React from "react";
import { Table, Button } from 'antd';
import reqwest from "reqwest";

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
    selectedRowKeys: [],
    pagination: {},
    loading: false,
  };

  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  };

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
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
      method: 'get',
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
          <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={loading}>
            Accept
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          //rowKey={record => record.login.uuid}
          dataSource={this.state.data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.componentDidMount}
        />
      </div>
    );
  }
}

export default TagsTable;