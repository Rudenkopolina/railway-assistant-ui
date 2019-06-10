import React from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AnswersSections from '../../components/AnswersSections';
import Protected from '../../components/common/protected/container';
import './styles.css';
import Filter from './../../components/Filter';
import {
  getCommonResponses,
  getReferenceResponses,
  changeResponse,
  deleteResponse,
  createResponse
} from '../../redux/actions/responses';

import { getCategories } from '../../redux/actions/categories';

class Answer extends React.Component {
  state = {
    activeTab: '',
    titles: [],
    filterString: ''
  };

  componentWillMount() {
    const { user } = this.props.auth;
    const titles = [];
    if (user.permissions.ALLOWED_ANSWERS_VIEWING) {
      titles.push({
        name: 'Базовые сообщения',
        key: 'common',
        requiredRoles: 'ALLOWED_ANSWERS_VIEWING'
      });
      this.props.getCommonResponses();
    }
    if (user.permissions.ALLOWED_KNOWLEDGEBASE_VIEWING) {
      titles.push({
        name: 'База знаний',
        key: 'reference',
        requiredRoles: 'ALLOWED_KNOWLEDGEBASE_VIEWING'
      });
      this.props.getReferenceResponses();
      this.props.getCategories();
    }

    this.setState({ titles, activeTab: titles[0].key });
  }

  onFilterChange = filterString => {
    this.setState({ filterString });
  };

  changeTab = tab => {
    this.setState({ activeTab: tab });
  };

  getContent = () => {
    const { activeTab, filterString } = this.state;
    const isReferanseTab = activeTab === 'reference';
    const answers = isReferanseTab
      ? this.props.data.reference
      : this.props.data.common;    
    return (
      <Protected requiredRoles='ALLOWED_KNOWLEDGEBASE_VIEWING'>
        <AnswersSections
          categories={this.props.categories.categories}
          title={activeTab}
          key={activeTab}
          answers={answers}
          onDeleteAnswer={this.props.onDeleteAnswer}
          changeResponse={this.props.changeResponse}
          createResponse={this.props.createResponse}
          filterString={filterString}
          isReferanseTab={isReferanseTab}
        />
      </Protected>
    );
  };

  render() {
    const { activeTab, titles, filterString } = this.state;
    return (
      <div className='container'>
        <div className='answer-header'>
          <div className='answer-menu'>
            {titles.map(title => (
              <div
                key={title.key}
                className={cx('answer-menu-item', {
                  'answer-menu-item-active': activeTab === title.key
                })}
                onClick={() => this.changeTab(title.key)}
              >
                {title.name}
              </div>
            ))}
            <div className='element-mb'>
              <Filter
                filterString={filterString}
                onFilterChange={this.onFilterChange}
              />
            </div>
          </div>
        </div>
        {this.getContent()}
      </div>
    );
  }
}

const mapStateToProps = ({ responses, auth, categories }) => ({
  categories,
  auth,
  data: {
    common: responses.commonResponses,
    reference: responses.referenceResponses
  }
});

const mapDispatchToProps = dispatch => ({
  createResponse: data => dispatch(createResponse(data)),
  getCommonResponses: () => dispatch(getCommonResponses()),
  getReferenceResponses: () => dispatch(getReferenceResponses()),
  getCategories: () => dispatch(getCategories()),
  changeResponse: (data, id, title) =>
    dispatch(changeResponse(data, id, title)),
  onDeleteAnswer: id => dispatch(deleteResponse(id))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Answer)
);
