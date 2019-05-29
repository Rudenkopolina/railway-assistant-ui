import React from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './Answer.css';
import AnswerTable from '../../components/AnswerTable/AnswerTable';
import NewIntentModal from '../../components/NewIntentModal/NewIntentModal';
import Protected from '../../components/common/protected/container'
import Filter from './../../components/Filter';

import { createResponse } from '../../redux/actions/responses';

const titles = [
  {name: 'Типовые фразы', key: 'common', requiredRoles: 'ALLOWED_ANSWERS_VIEWING'},
  {name: 'Справка', key: 'reference', requiredRoles: 'ALLOWED_KNOWLEDGEBASE_VIEWING'}
]

class Answer extends React.Component {
  state = {
    activeTab: this.props.user.permissions.ALLOWED_ANSWERS_VIEWING ? 'common' : 'reference',
    filterString: '',
  }

  onFilterChange = (filterString) => {
    this.setState({ filterString });
}

  changeTab = tab => {
    this.setState({ activeTab: tab});
  }

  getContent = () => {
    const { activeTab, filterString } =this.state;
    switch (activeTab) {
      case 'common':
        return (
          <Protected requiredRoles='ALLOWED_ANSWERS_VIEWING'>
            <AnswerTable title='common' key='common' filterString={filterString} />
          </Protected>
        )
      case 'reference':
        return (
          <Protected requiredRoles='ALLOWED_KNOWLEDGEBASE_VIEWING'>
            <AnswerTable title='reference' key='reference' filterString={filterString} />
          </Protected>
        )
      default: return;
    }
  }

  render() {
    const { activeTab, filterString } =this.state;
    return (
      <div className="container">
        <Filter filterString={filterString} onFilterChange={this.onFilterChange} />
        <div className="answer-header">
          <div className="answer-menu">
            {titles.map(title =>
              <Protected requiredRoles={title.requiredRoles} key={title.key}>
                <div
                  className={cx('answer-menu-item', { 'answer-menu-item-active': activeTab === title.key })}
                  onClick={() => this.changeTab(title.key)}
                >
                {title.name}
                </div>
              </Protected>
            )}
          </div>
          <div className='answer-menu-item'>
            <Protected requiredRoles='ALLOWED_KNOWLEDGEBASE_CREATION'>
              <NewIntentModal
                buttonText='Добавить справочный ответ'
                className='action-button'
                modalTitle='Добавить справочный ответ'
                onSave={(data) => this.props.createResponse(data)}
              />
            </Protected>
          </div>
        </div>
        {this.getContent()}
      </div>
    );
  }
}


const mapStateToProps = ({ auth }) => (auth);

const mapDispatchToProps = dispatch => ({
	createResponse: (data) => dispatch(createResponse(data))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Answer));
