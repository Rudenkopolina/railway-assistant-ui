import React from 'react';
import cx from 'classnames';
import './Answer.css';
import AnswerTable from './AnswerTable';


class Answer extends React.Component {
  state = {
    activeTab: 'responses'
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
            className={cx('answer-menu-item', { 'answer-menu-item-active': activeTab === 'responses' })}
            onClick={() => this.changeTab('responses')}
          >
            Ответы Ассистента
          </div>
        </div>
        {activeTab === 'responses' &&
          <AnswerTable />
        }
      </div>
    );
  }
}

export default Answer;
