import React from 'react';
import cx from 'classnames';
import './Answer.css';
import AnswerTable from './AnswerTable';


class Answer extends React.Component {
  state = {
    activeTab: 'Text'
  }

  changeTab = tab => {
    this.setState({ activeTab: tab});
  }

  render() {
    const { activeTab } =this.state;
    return (
      <div className="answers-container">
        <div className="answer-menu">
          <div
            className={cx('answer-menu-item', { 'answer-menu-item-active': activeTab === 'Text' })}
            onClick={() => this.changeTab('Text')}
          >
            Text Answers
          </div>
          <div
          className={cx('answer-menu-item', { 'answer-menu-item-active': activeTab === 'Audio' })}
          onClick={() => this.changeTab('Audio')}
          >
            Audio Answers
          </div>
        </div>
        {activeTab === 'Audio' ? (
          <AnswerTable title='audio'/>
        ) : (
          <AnswerTable title='text'/>
        )}
      </div>
    );
  }
}

export default Answer;
