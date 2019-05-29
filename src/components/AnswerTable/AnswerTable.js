import React from 'react';
import { withRouter } from 'react-router-dom';
import { Icon, Popup } from 'semantic-ui-react'
import 'react-notifications/lib/notifications.css';
import AnswerCard from '../AnswerCard';
import './Answer.css';

const hint = "Для передачи слов-омографов используйте + перед ударной гласной. Например, гот+ов.Чтобы отметить паузу между словами, используйте -.";

class AnswerTable extends React.Component {
  state = {
    data: [],
    prevData: [],
    playedId: null,
    editDataId: null,
    shownKeyWodrsId: []
  }

  // componentWillMount() {
  //   const { title, data } = this.props;
  //   if (data[title].length !== 0) {
  //     this.setData();
  //   }
  //   switch (title) {
  //     case 'common':
  //       this.props.getCommonResponses();
  //       break;
  //     case 'reference':
  //       this.props.getReferenceResponses();
  //       break;
  //     default:
  //   }
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   const { editDataId } = this.state;
  //   if (prevProps.isLoading !== isLoading && isLoading === false) {
  //     this.setData();
  //   }
  //   if (prevState.editDataId !== editDataId && editDataId !== null) {
  //     document.getElementById(`text-${editDataId}`).focus();
  //   }
  // }

  // setData = () => {
  // const { title } = this.props;
  //   const prevData = JSON.parse(JSON.stringify(this.props.data[title]));
  //   this.setState({
  //     data: this.props.data[title],
  //     prevData,
  //   })
  // }

  // onCommonUpdateAnswer = (id, index) => {
  //   const { prevData, data } = this.state;
  //   const { title, changeResponse } = this.props;
  //   const newData = {}
  //   if (prevData[index].textTranscription !== data[index].textTranscription) {
  //     newData.textTranscription = this.state.data[index].textTranscription;
  //   }
  //   if (prevData[index].audioTranscription !== data[index].audioTranscription) {
  //     newData.audioTranscription = this.state.data[index].audioTranscription;
  //   }
  //   changeResponse(newData, id, title)
  //   .then(() => {
  //     const prevData = JSON.parse(JSON.stringify(this.state.data));
  //     this.setState({ prevData, editDataId: null })
  //     const audio = document.getElementById(`audio-${id}`)
  //     audio.load();
  //     NotificationManager.success('Answer has been updated!');
  //   })
  //   .catch(err => {
  //     NotificationManager.error('Something go wrong, try again.', 'Sorry :(');
  //   });
  // }

  // onReferencesUpdateAnswer = (data, id, index) => {
  //   const { prevData } = this.state;
  //   const { title, changeResponse } = this.props;
  //   const newData = this.state.data;
  //   newData[index] = JSON.parse(JSON.stringify(data));
  //   newData[index].id = id;
  //   if (prevData[index].textTranscription === data.textTranscription) {
  //     delete data.textTranscription;
  //   }
  //   if (prevData[index].audioTranscription === data.audioTranscription) {
  //     delete data.audioTranscription;
  //   }
  //   changeResponse(data, id, title)
  //   .then(() => {
  //     const prevData = JSON.parse(JSON.stringify(this.state.data));
  //     const audio = document.getElementById(`audio-${id}`)
  //     audio.load();
  //     this.setState({ prevData, data: newData })
  //     NotificationManager.success('Answer has been updated!');
  //   })
  //   .catch(err => {
  //     console.log(err);
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
  //   newData[index] = {...newData[index], [title]: event.target.value}
  //   this.setState({ data: newData })
  // }

  // onPlayAudio = id => {
  //   const { playedId } = this.state;
  //   if (playedId) {
  //     this.onStopAudio(playedId);
  //   }
  //   const audio = document.getElementById(`audio-${id}`)
  //   audio.currentTime = 0;
  //   audio.play();
  //   this.setState({ playedId: id });
  //   audio.onended = () => this.setState({ playedId: null });
  // }
  //
  // onStopAudio = id => {
  //   document.getElementById(`audio-${id}`).pause();
  //   this.setState({ playedId: null });
  // }

  // isAnswerChange = index => {
  //   const { prevData, data } = this.state;
  //   const isTextChenge = prevData[index].textTranscription !== data[index].textTranscription;
  //   const isAudioChange = prevData[index].audioTranscription !== data[index].audioTranscription;
  //   return isTextChenge || isAudioChange;
  // }

  // getAudioSrc = id => {
  //   const { title } = this.props;
  //   return urls.responses.audioUrl(title, id);
  // }

  // renderButton = (answer, index) => {
  //   if (this.props.title === 'common') {
  //     return this.isAnswerChange(index) ? (
  //       <div
  //         className="table-button save-button"
  //         onClick={()=> this.onCommonUpdateAnswer(answer.id, index)}
  //       >
  //         Сохранить
  //       </div>
  //     ) : (
  //       <div className="no-button" />
  //     )
  //   }
  //   return (
  //     <div
  //       className="table-button"
  //       onClick={()=> this.props.onDeleteAnswer(answer.id)}
  //     >
  //       Удалить
  //     </div>
  //   )
  // }

  // showKeyWords = id => {
  //   this.setState({ shownKeyWodrsId: [...this.state.shownKeyWodrsId, id] });
  // }
  //
  // hideKeyWords = id => {
  //   this.setState({
  //     shownKeyWodrsId: this.state.shownKeyWodrsId.filter(item => item !==id)
  //   });
  // }

  render() {
    const { data, title } = this.props;
    return (
      <div className='answer-table-container'>
      <div className="table-title-row answer-title-row">
        <div className="table-title-content">
          Текстовый ответ
        </div>
        <div className="table-title-content">
          Голосовой ответ
          <Popup
            content={hint}
            position="right center"
            trigger={<Icon name='question circle outline' className="hint-icon"/>}
          />
        </div>
      </div>
        {data.map((answer, index) => (
          <AnswerCard
            answer={answer}
            index={index}
            isShowExamples={title === 'reference'}
            title={title}
          />
        ))}
      </div>
    );
  }
}

export default withRouter(AnswerTable);
