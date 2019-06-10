import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import cx from 'classnames';
import Answers from './Answers';
import IntentModal from './Answers/IntentModal';
import Protected from '../common/protected/container';
import './styles.css';

class AnswersSections extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: null
    };
  }

  componentWillMount() {
    const { categories } = this.props;
    if (!!categories.length) {
      const category = categories[0].id;
      this.setCategory(category);
    }
  }

  setCategory = category => {
    this.setState({
      activeTab: category
    });
  };

  getNumberOfAnswers = category => {
    const { answers } = this.props;
    const displayCategory = answers.filter(item => {
      return item.categoryId === category;
    });
    const filteredAnswers = this.getFilteredAnswers(displayCategory);
    return filteredAnswers.length;
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
            answer.responseName.toLowerCase().indexOf(filterStringLowerCase) >
              -1 ||
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
    const { categories, answers, isReferanseTab } = this.props;
    const { activeTab } = this.state;
    const filterCategory = answers.filter(item => {
      return item.categoryId === activeTab;
    });
    const displayCategory = isReferanseTab ? filterCategory : answers;
    const filteredAnswers = this.getFilteredAnswers(displayCategory);
    
    const tabs = categories.map((category, index) => (
      <div
        key={index}
        className={cx('category-button', {
          'category-button-active': activeTab === category.id
        })}
        onClick={() => this.setCategory(category.id)}
      >
        {category.category}
        <span className='filter-results'>
          {this.getNumberOfAnswers(category.id)}
        </span>
      </div>
    ));

    return (
      <div>
        <div className='categories-container'>
          {isReferanseTab && tabs}
          {isReferanseTab && (
            <div className='header-button'>
              <Protected requiredRoles='ALLOWED_KNOWLEDGEBASE_CREATION'>
                <IntentModal
                  buttonText='Добавить ответ'
                  modalTitle='Добавить справочный ответ'
                  onSave={data => this.props.createResponse(data)}
                  categoryId={activeTab}
                />
              </Protected>
            </div>
          )}
        </div>
        <Answers
          title={this.props.title}
          key={this.props.key}
          filterString={this.props.filterString}
          answers={filteredAnswers}
          onDeleteAnswer={this.props.onDeleteAnswer}
          changeResponse={this.props.changeResponse}
          isReferanseTab={isReferanseTab}
        />
      </div>
    );
  }
}

AnswersSections.propTypes = {
  categories: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired,
  answers: PropTypes.array.isRequired,
  onDeleteAnswer: PropTypes.func.isRequired,
  changeResponse: PropTypes.func.isRequired,
  createResponse: PropTypes.func.isRequired,
  filterString: PropTypes.string.isRequired,
  isReferanseTab: PropTypes.bool.isRequired
};

export default withRouter(AnswersSections);
