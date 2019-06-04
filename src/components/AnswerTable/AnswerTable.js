import React from 'react';
import { withRouter } from 'react-router-dom';
import AnswerCard from '../AnswerCard/AnswerCard';
import './styles.css';

const hint = "Для передачи слов-омографов используйте + перед ударной гласной. Например, гот+ов.Чтобы отметить паузу между словами, используйте -.";

class AnswerTable extends React.Component {
  state = {
    playedId: null,
  }

  onUpdateAnswer = (answer, id, index) => {
    const { title, changeResponse } = this.props;
    if (this.props.data[index].textTranscription === answer.textTranscription) {
      delete answer.textTranscription;
    }
    if (this.props.data[index].audioTranscription === answer.audioTranscription) {
      delete answer.audioTranscription;
    }
    changeResponse(answer, id, title)
    .then(() => {
      const audio = document.getElementById(`audio-${id}`);
      audio.load();
    })
  }

  onPlayAudio = id => {
    const { playedId } = this.state;
    if (playedId) {
      this.onStopAudio(playedId);
    }
    const audio = document.getElementById(`audio-${id}`)
    audio.currentTime = 0;
    audio.play();
    this.setState({ playedId: id });
    audio.onended = () => this.setState({ playedId: null });
  }

  onStopAudio = id => {
    document.getElementById(`audio-${id}`).pause();
    this.setState({ playedId: null });
  }

  render() {
    const { data, title, onDeleteAnswer, filterString } = this.props;
    const filterStringLowerCase = filterString.toLowerCase();

    const filteredAnswers = filterStringLowerCase ?
          data.filter(title => title.responseDescription.toLowerCase().indexOf(filterStringLowerCase) > -1
          || title.textTranscription.toLowerCase().indexOf(filterStringLowerCase) > -1
          || title.audioTranscription.toLowerCase().indexOf(filterStringLowerCase) > -1
          || title.examples.some(example => example.toLowerCase().indexOf(filterStringLowerCase) > -1))
          :
          data;
    return (
      <div className='answer-table-container'>
        {filteredAnswers.map((answer, index) => (
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
