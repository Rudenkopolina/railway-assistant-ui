import React from 'react';
import { withRouter } from 'react-router-dom';
import AnswerCard from '../AnswerCard/AnswerCard';
import './styles.css';

const hint =
  'Для передачи слов-омографов используйте + перед ударной гласной. Например, гот+ов.Чтобы отметить паузу между словами, используйте -.';

class AnswerTable extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      playedId: null
    };
  }


  onUpdateAnswer = (answer, id, index) => {
    const { title, changeResponse } = this.props;
    if (this.props.data[index].textTranscription === answer.textTranscription) {
      delete answer.textTranscription;
    }
    if (
      this.props.data[index].audioTranscription === answer.audioTranscription
    ) {
      delete answer.audioTranscription;
    }
    changeResponse(answer, id, title).then(() => {
      const audio = document.getElementById(`audio-${id}`);
      audio.load();
    });
  };

  onPlayAudio = id => {
    const { playedId } = this.state;
    if (playedId) {
      this.onStopAudio(playedId);
    }
    const audio = document.getElementById(`audio-${id}`);
    audio.currentTime = 0;
    audio.play();
    this.setState({ playedId: id });
    audio.onended = () => this.setState({ playedId: null });
  };

  onStopAudio = id => {
    document.getElementById(`audio-${id}`).pause();
    this.setState({ playedId: null });
  };

  getFilteredAnswers = displayCategory => {
    const { filterString } = this.props;
    let filterStringLowerCase = '';
    if (filterString) {
        filterStringLowerCase = filterString.toLowerCase();    }

  return filterStringLowerCase
    ? displayCategory.filter(
        answer =>
          answer.responseDescription
            .toLowerCase()
            .indexOf(filterStringLowerCase) > -1 ||
          answer.textTranscription
            .toLowerCase()
            .indexOf(filterStringLowerCase) > -1 ||
          answer.audioTranscription
            .toLowerCase()
            .indexOf(filterStringLowerCase) > -1 ||
          answer.examples.some(
            example =>
              example.toLowerCase().indexOf(filterStringLowerCase) > -1
          )
      )
    : displayCategory;
};

  render() {
    const { data, title, onDeleteAnswer, filterString } = this.props;
    if(filterString) {         
    }
    const displayAnswers = filterString ? this.getFilteredAnswers(data) : data;
    return (
      <div className='answer-table-container'>
        {displayAnswers.map((answer, index) => (
          <AnswerCard
            key={answer.id}
            answer={answer}
            index={index}
            isShowExamples={title === 'reference'}
            title={title}
            onDeleteAnswer={onDeleteAnswer}
            onPlayAudio={this.onPlayAudio}
            onStopAudio={this.onStopAudio}
            playedId={this.state.playedId}
            onUpdateAnswer={this.onUpdateAnswer}
          />
        ))}
      </div>
    );
  }
}
export default withRouter(AnswerTable);
