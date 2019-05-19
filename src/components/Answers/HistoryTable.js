import React from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { Dropdown } from 'semantic-ui-react'
import 'react-notifications/lib/notifications.css';
import Spinner from './spinner.js';
import cx from 'classnames';
import './Answer.css';
import { axiosInstance, URL } from '../../helpers/axios'
import Cookies from 'js-cookie';


class HistoryTable extends React.Component {
  state = {
    data: [
            {
                "id": 1,
                "session": "session",
                "timestamp": "2019-05-17T00:00:00.000Z",
                "requestText": "Request",
                "responseText": "Response",
                "intent": "General_Ending"
            },
            {
                "id": 2,
                "session": "session",
                "timestamp": "2019-05-17T00:00:00.000Z",
                "requestText": "Request",
                "responseText": "Response",
                "intent": "General_Ending"
            },
            {
                "id": 3,
                "session": "session",
                "timestamp": "2019-05-17T00:00:00.000Z",
                "requestText": "Request",
                "responseText": "Response",
                "intent": "General_Ending"
            }
        ],
    prevData: [],
    isLoading: false,
    playedId: null,
    editDataId: null
  }

  // componentWillMount() {
  //   axiosInstance.get(`/api/answers/responses/`)
  //   .then(res => {
  //     const prevData = JSON.parse(JSON.stringify(res.data.responses));
  //     this.setState({ data: res.data.responses, prevData, isLoading: false })
  //   })
  //   .catch(err => NotificationManager.error('Something go wrong. Reload page, please.', 'Sorry :('))
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   const { editDataId } = this.state;
  //   if (prevState.editDataId !== editDataId && editDataId !== null) {
  //     document.getElementById(`text-${editDataId}`).focus();
  //   }
  // }

  // onUpdateAnswer = (id, index) => {
  //   const { prevData, data } = this.state;
  //   const newData = {}
  //   console.log(data, prevData);
  //   if (prevData[index].text.transcription !== data[index].text.transcription) {
  //     newData.textTranscription = this.state.data[index].text.transcription;
  //   }
  //   if (prevData[index].audio.transcription !== data[index].audio.transcription) {
  //     newData.audioTranscription = this.state.data[index].audio.transcription;
  //   }
  //   console.log(data);
  //   axiosInstance.post(`/api/answers/responses/${id}`, { ...newData })
  //   .then(res => {
  //     const prevData = JSON.parse(JSON.stringify(this.state.data));
  //     this.setState({ prevData, editDataId: null })
  //     NotificationManager.success('Answer has been updated!');
  //   })
  //   .catch(err => {
  //     NotificationManager.error('Something go wrong, try again.', 'Sorry :(');
  //   });
  // }

  // editDataAnswer = (id, index) => {
  //   const { editDataId, data, prevData } = this.state;
  //   if (editDataId === id) {
  //     const newData = data;
  //     newData[index] = {...prevData[index]};
  //     this.setState({ editDataId: null, data: newData });
  //   } else {
  //     this.setState({ editDataId: id });
  //   }
  // }

  // handleChangeAnswer = (event, index, title) => {
  //   const newData = this.state.data;
  //   newData[index][title] = {...newData[index][title], transcription: event.target.value}
  //   this.setState({ data: newData })
  // }

  // isAnswerChange = index => {
  //   const { prevData, data } = this.state;
  //   const isTextChenge = prevData[index].text.transcription !== data[index].text.transcription;
  //   const isAudioChange = prevData[index].audio.transcription !== data[index].audio.transcription;
  //   return isTextChenge || isAudioChange;
  // }

  getList = () => {
    const intents = [
        "Book",
        "General_Ending",
        "General_Greetings"
    ];
    return intents.map(item => ({
      key: item,
      text: item,
      value:item
    }))
  }

  changeIntent = (data, index) => {
    console.log(data.value);
  }

  render() {
    const { prevData, data, isLoading, editDataId } = this.state;
    return (
      <div className={cx('answer-table-container', { 'loading': isLoading })}>
      {isLoading && (
        <div className="table-spinner">
          <Spinner />
        </div>
      )}
      <NotificationContainer />
      {
        // <div className="table-title-row">
        //   <div className="table-title-content">
        //     Текстовый ответ
        //   </div>
        //   <div className="table-title-content">
        //     Голосовой ответ
        //   </div>
        // </div>
      }
        {this.state.data.map((log, index) => (
          <div className="table-row"  key={index}>
            <div className="table-content">
              {log.timestamp}
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
              {false ? (
                <div
                  className="table-button save-button"
                  onClick={()=> this.onUpdateAnswer(log.id, index)}
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

export default HistoryTable;
