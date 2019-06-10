import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import AnswerCard from './AnswerCard';
import NoFilteredData from './NoFilteredData';
import './styles.css';

class Answers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playedId: null
    };
  }

  onUpdateAnswer = (answer, id, index) => {
    const { title, changeResponse } = this.props;
    if (this.props.answers[index].textTranscription === answer.textTranscription) {
      delete answer.textTranscription;
    }
    if (
      this.props.answers[index].audioTranscription === answer.audioTranscription
    ) {
      delete answer.audioTranscription;
    }
    changeResponse(answer, id, title);
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
      filterStringLowerCase = filterString.toLowerCase();
    }

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
    const { answers, title, onDeleteAnswer, filterString, isReferanseTab } = this.props;
    const displayAnswers = filterString ? this.getFilteredAnswers(answers) : answers;
    if (displayAnswers.length === 0) {
      return <NoFilteredData filterString={filterString} />;
    }
    return (
      <div className='answer-table-container'>
        {displayAnswers.map((answer, index) => (
          <AnswerCard
            key={answer.id}
            answer={answer}
            index={index}
            isShowExamples={isReferanseTab}
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

Answers.propTypes = {
  title: PropTypes.string.isRequired,
  filterString: PropTypes.string.isRequired,
  answers: PropTypes.array.isRequired,
  changeResponse: PropTypes.func.isRequired,
  onDeleteAnswer: PropTypes.func.isRequired,
  isReferanseTab: PropTypes.bool.isRequired
};



export default withRouter(Answers);
