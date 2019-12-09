import React from 'react';
import { Calendar } from 'antd'
import { Badge } from 'antd'

class CalendarComponent extends React.Component {

  constructor(props) {
    super(props);
    this.getDataFromServer = this.getDataFromServer.bind(this);
    this.filterData = this.filterData.bind(this);
    this.getListData = this.getListData.bind(this);
    this.dateCellRender = this.dateCellRender.bind(this);
    this.getMonthData = this.getMonthData.bind(this);
    this.monthCellRender = this.monthCellRender.bind(this);
  }
  state = {
    loaded: false,
    calendarItems: []
  }
  componentDidMount() {
    this.getDataFromServer()
  }

  getDataFromServer() {
    fetch('http://localhost:3000/api/v1.0/activities/calendar')
      .then(data => data.json())
      .then(json => {       
        this.setState({
          calendarItems: json, //array of calendar objects (json)
          loaded: true
        });
      });
  }

  filterData(date) {
    if (this.state.loaded) {
      let filteredData = []
      for (var i = 0; i < this.state.calendarItems.length; i++) {
        var item = this.state.calendarItems[i]
        var fromdate = new Date(item.from)
        if (fromdate.getFullYear() === date.year() && fromdate.getMonth() === date.month() && fromdate.getDate() === date.date()) {
          filteredData.push(item)
        }
      }
      return filteredData
    }
  }

  getListData(value) {
    let listData = []
    let filtered = this.filterData(value)
    for (var i = 0; i < filtered.length; i++) {
      listData.push({
        type: 'success',
        content: `Activity id : ${filtered[i].activityid}`
      })
    }
    return listData || [];
  }

  dateCellRender(value) {
    if (this.state.loaded) {
      const listData = this.getListData(value);
      return (
        <ul className="events">
          {listData.map(item => (
            <li key={item.content}>
              {/* Change the href link to display the activity detail */}
              <a href={"/activity/" + item.activityid}><Badge status={item.type} text={item.content} /></a>
            </li>
          ))}
        </ul>
      );
    }
  }

  getMonthData(value) {
    if (value.month() === 8) {
      return 1394;
    }
  }

  monthCellRender(value) {
    const num = this.getMonthData(value);
    console.log("test")
    console.log(num)
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  }

  render() {
    return (
      <div className="calendarPage">
        <div className="calendarContainer">
          <Calendar dateCellRender={this.dateCellRender} monthCellRender={this.monthCellRender} />
        </div>
      </div>
    )
  }
}
export default CalendarComponent;