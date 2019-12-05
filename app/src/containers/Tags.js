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

  startAccept = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  };

  startReject = () => {
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