import React from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AnswersSections from '../../components/AnswersSections';
import Protected from '../../components/common/protected/container';
import Filter from './../../components/Filter';
import {
  getCommonResponses,
  getReferenceResponses,
  changeResponse,
  deleteResponse,
  createResponse,
  moveResponsesToCategory,
  responsePing
} from '../../redux/actions/responses';
import { getCategories, createCategory, deleteCategory } from '../../redux/actions/categories';

import './styles.css';

class Answer extends React.Component {
  state = {
    activeTab: '',
    titles: [],
    filterString: ''
  };

  componentDidMount() {
    const { user } = this.props.auth;
    const titles = [];
    if (user.permissions.ALLOWED_ANSWERS_VIEWING) {
      titles.push({
        name: 'Базовые сообщения',
        key: 'common'
      });
      this.props.getCommonResponses();
    }
    if (user.permissions.ALLOWED_KNOWLEDGEBASE_VIEWING) {
      titles.push({
        name: 'База знаний',
        key: 'reference',
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

  createResponse = async data => {
    this.props.createResponse(data).then(() => {
      let lastResponse = this.props.data.reference[this.props.data.reference.length - 1];
      this.props.responsePing(lastResponse.id);
    });
  };

  getContent = () => {
    const { activeTab, filterString } = this.state;
    const { user } = this.props.auth;
    const {data, categories, onDeleteAnswer, changeResponse, createCategory, deleteCategory, moveToCategory} = this.props;
    const isReferanseTab = activeTab === 'reference';
    const answers = isReferanseTab ? data.reference : data.common;
    return (
      <Protected requiredAnyRoles={['ALLOWED_KNOWLEDGEBASE_VIEWING', 'ALLOWED_ANSWERS_VIEWING']}>
        <AnswersSections
          categories={categories.categories}
          title={activeTab}
          key={activeTab}
          answers={answers}
          onDeleteAnswer={onDeleteAnswer}
          changeResponse={changeResponse}
          createResponse={this.createResponse}
          onCreateCategory={createCategory}
          onDeleteCategory={deleteCategory}
          filterString={filterString}
          isReferanseTab={isReferanseTab}
          onMoveResponse={moveToCategory}
          supportedTTS={user.supportedTTS}
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
            <div className='element-mb-filter'>
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
  createCategory: categoryName => dispatch(createCategory(categoryName)),
  deleteCategory: id => dispatch(deleteCategory(id)),
  changeResponse: (data, id, title) => dispatch(changeResponse(data, id, title)),
  onDeleteAnswer: id => dispatch(deleteResponse(id)),
  moveToCategory: (categoryId, responseIds) => dispatch(moveResponsesToCategory(categoryId, responseIds)),
  responsePing: (id) => dispatch(responsePing(id))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Answer)
);
