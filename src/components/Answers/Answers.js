import React from 'react';
import cx from 'classnames';
import './Answer.css';
import AnswerTable from './AnswerTable';
import HistoryTable from './HistoryTable';

class Answer extends React.Component {
  state = {
    activeTab: 'responses'
  }

  changeTab = tab => {
    this.setState({ activeTab: tab});
  }

  getContent = () => {
    const { activeTab } =this.state;
    switch (activeTab) {
      case 'history':
        return <HistoryTable />
      default:
        return <AnswerTable />
    }
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
          <div
            className={cx('answer-menu-item', { 'answer-menu-item-active': activeTab === 'history' })}
            onClick={() => this.changeTab('history')}
          >
            История
          </div>
        </div>
        {this.getContent()}
      </div>
    );
  }
}

export default Answer;
