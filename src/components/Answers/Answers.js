import React from 'react';
import cx from 'classnames';
import './Answer.css';
import AnswerTable from './AnswerTable';
import HistoryTable from './HistoryTable';
import NewIntentModal from '../NewIntentModal/NewIntentModal'

class Answer extends React.Component {
  state = {
    activeTab: 'common'
  }

  changeTab = tab => {
    this.setState({ activeTab: tab});
  }

  getContent = () => {
    const { activeTab } =this.state;
    switch (activeTab) {
      case 'history':
        return <HistoryTable />
      case 'common':
        return <AnswerTable title='common'/>
      case 'reference':
        return <AnswerTable title='reference'/>
      default:
        return <AnswerTable title/>
    }
  }

  render() {
    const { activeTab } =this.state;
    const titles = [
      {name: 'Типовые фразы', key: 'common'},
      {name: 'Справка', key: 'reference'}
    ]
    return (
      <div className="answers-container">
        <div className="answer-header">
          <div className="answer-menu">
            {titles.map(title =>
              <div
              className={cx('answer-menu-item', { 'answer-menu-item-active': activeTab === title.key })}
              onClick={() => this.changeTab(title.key)}
              >
              {title.name}
              </div>
            )}
          </div>
          <div className='answer-menu-item'>
            <NewIntentModal />
          </div>
        </div>
        {this.getContent()}
      </div>
    );
  }
}

export default Answer;
