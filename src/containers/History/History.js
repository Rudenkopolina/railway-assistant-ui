import React from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { Dropdown } from 'semantic-ui-react'
import 'react-notifications/lib/notifications.css';
import Spinner from '../../components/Spinner';
import cx from 'classnames';
import './Answer.css';
import moment from 'moment';


class History extends React.Component {
  state = {
    data: [],
    prevData: [],
    isLoading: false,
    intents: []
  }

  componentWillMount() {
    // axiosInstance.get(`/api/text/intents`)
    // .then(res => this.setState({ intents: res.data.intents }))
    // .catch(err => NotificationManager.error('Something go wrong. Reload page, please.', 'Sorry :('));
    //
    // axiosInstance.get(`/api/logs/intents`)
    // .then(res => {
    //   const prevData = JSON.parse(JSON.stringify(res.data.logs));
    //   this.setState({ data: res.data.logs, prevData, isLoading: false })
    // })
    // .catch(err => NotificationManager.error('Something go wrong. Reload page, please.', 'Sorry :('))
  }

  onUpdateLog = (id) => {}

  isLogChange = index => {
    const { prevData, data } = this.state;
    return prevData[index].intent !== data[index].intent;
  }

  getList = () => {
    return this.state.intents.map(item => ({
      key: item,
      text: item,
      value:item
    }))
  }

  changeIntent = (data, index) => {
    const newData = this.state.data;
    newData[index] = {...newData[index], intent: data.value}
    this.setState({ data: newData });
  }

  render() {
    const { data, isLoading } = this.state;
    const titles = ['Дата', 'Сессия', 'Запрос', 'Ответ', 'Распознанное намерение']
    return (
      <div className={cx('answer-table-container container', { 'loading': isLoading })}>
      {isLoading && (
        <div className="table-spinner">
          <Spinner />
        </div>
      )}
      <NotificationContainer />
      {
        <div className="table-title-row history-title-row">
          {titles.map(item =>
            <div className="table-title-content">
              {item}
            </div>
          )}
        </div>
      }
        {data.map((log, index) => (
          <div className="table-row"  key={index}>
            <div className="table-content">
              {moment(log.timestamp).format('DD-MM-YYYY HH:mm:ss')}
            </div>
            <div className="table-content">
              {log.session}
            </div>
            <div className="table-content">
              {log.requestText}
            </div>
            <div className="table-content">
              {log.responseText}
            </div>
            <div className="table-content">
              <Dropdown
                className='table-dropdown'
                search
                selection
                options={this.getList()}
                defaultValue={log.intent}
                onChange={(e, data) => this.changeIntent(data, index)}
              />
            </div>
            <div className="table-action">
              {this.isLogChange(index) ? (
                <div
                  className="table-button save-button"
                  onClick={()=> this.onUpdateLog(log.id)}
                >
                  Сохранить
                </div>
              ) : (
                <div className="no-button" />
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default History;
