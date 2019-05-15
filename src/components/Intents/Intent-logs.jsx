import React from 'react';
import './Intent-log.css';
import { Tag, Table, notification } from 'antd';
import axios from 'axios';
const moment = require('moment');

const smt = {
  status: true,
  logs: [
    {
      id: 6,
      session: 'session',
      timestamp: '2019-05-15T00:00:05.000Z',
      requestText: '6',
      responseText: '6',
      intent: 'Test1'
    },
    {
      id: 5,
      session: 'session',
      timestamp: '2019-05-15T00:00:04.000Z',
      requestText: '5',
      responseText: '5',
      intent: 'Test2'
    },
    {
      id: 4,
      session: 'session',
      timestamp: '2019-05-15T00:00:03.000Z',
      requestText: '4',
      responseText: '4',
      intent: 'Test3'
    },
    {
      id: 3,
      session: 'session',
      timestamp: '2019-05-15T00:00:02.000Z',
      requestText: '3',
      responseText: '3',
      intent: 'Test4'
    },
    {
      id: 2,
      session: 'session',
      timestamp: '2019-05-15T00:00:01.000Z',
      requestText: '2',
      responseText: '2',
      intent: 'Test5'
    },
    {
      id: 1,
      session: 'session',
      timestamp: '2019-05-15T00:00:00.000Z',
      requestText: '1',
      responseText: '1',
      intent: 'Test6'
    }
  ]
};

const columns = [
  {
    title: 'Дата',
    dataIndex: 'timestamp',
    key: 'timestamp',
    render: timestamp => moment(timestamp).format('L')
    // defaultSortOrder: 'descend',
    // sorter: (a, b) => a.timestamp - b.timestamp,
  },
  {
    title: 'Сессия',
    dataIndex: 'session',
    key: 'session'
  },
  {
    title: 'Запрос',
    dataIndex: 'requestText',
    key: 'requestText',
    render: text => (
      <Tag color='blue' key>
        {text}
      </Tag>
    )
  },
  {
    title: 'Ответ',
    dataIndex: 'responseText',
    key: 'responseText',
    render: text => (
      <Tag color='blue' key>
        {text}
      </Tag>
    )
  },
  {
    title: 'Распознанное намерение',
    dataIndex: 'intent',
    key: 'intent'
  }
];

class Intents extends React.Component {
  state = {
    dataSource: [],
    prevData: [],
    isLoading: false
  };

  componentWillMount() {
    this.getIntentLogs();
  }

  getIntentLogs = () => {
    axios
      .get(`/api/`)
      .then(res =>
        this.setState({
          dataSource: res.logs,
          prevData: [...res.data],
          isLoading: false
        })
      )
      .catch(err =>
        notification.error({
          message: 'Something went wrong',
          description:
            'This is the content of the notification. This is the content of the notification. This is the content of the notification.'
        })
      );
  };

  render() {
    const dataSource = smt.logs;
    return (
      <div>
        <div className='container'>
          <span className='header-text'>Намерения</span>
          <div className='table-container'>
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={false}
              loading={this.state.isLoading}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default Intents;
