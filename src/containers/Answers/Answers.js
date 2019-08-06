import React from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AnswersSections from '../../components/AnswersSections';
import Protected from '../../components/common/protected/container';
import Filter from './../../components/Filter';
import { NotificationManager } from 'react-notifications';
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

  createResponse = async data => {
    this.props.createResponse(data).then(() => {
      let lastResponse = this.props.data.reference[this.props.data.reference.length - 1];
      NotificationManager.info(`Начинается обработка ответа #${lastResponse.id}!`, "Информация");
      this.props.responsePing(lastResponse.id).then(finished => {
        NotificationManager.success(`Ответ #${lastResponse.id} успешно обработан!`, "Успешно");
      });
    });
  };

  getContent = () => {
    const { activeTab, filterString } = this.state;
    const { user } = this.props.auth;
    const isReferanseTab = activeTab === 'reference';
    const answers = isReferanseTab
      ? this.props.data.reference
      : this.props.data.common;
    return (
      <Protected requiredAnyRoles={['ALLOWED_KNOWLEDGEBASE_VIEWING', 'ALLOWED_ANSWERS_VIEWING']}>
        <AnswersSections
          categories={this.props.categories.categories}
          title={activeTab}
          key={activeTab}
          answers={answers}
          onDeleteAnswer={this.props.onDeleteAnswer}
          changeResponse={this.props.changeResponse}
          createResponse={this.createResponse}
          onCreateCategory={this.props.createCategory}
          onDeleteCategory={this.props.deleteCategory}
          filterString={filterString}
          isReferanseTab={isReferanseTab}
          onMoveResponse={this.props.moveToCategory}
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
