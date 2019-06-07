import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import cx from 'classnames';
import Answers from '../index';
import IntentModal from '../IntentModal';
import Protected from '../../common/protected/container';
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
    const category = categories[0].id;
    this.setCategory(category);
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
    const { categories, answers } = this.props;
    const { activeTab } = this.state;
    const displayCategory = answers.filter(item => {
      return item.categoryId === activeTab;
    });
    const filteredAnswers = this.getFilteredAnswers(displayCategory);

    return (
      <div>
        <div className='categories-container'>
          {categories.map((category, index) => (
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
          ))}
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
        </div>
        <Answers
          title='reference'
          key='reference'
          filterString={this.props.filterString}
          answers={filteredAnswers}
          onDeleteAnswer={this.props.onDeleteAnswer}
          changeResponse={this.props.changeResponse}
        />
      </div>
    );
  }
}

AnswersSections.propTypes = {
  categories: PropTypes.array,
  title: PropTypes.string,
  key: PropTypes.string,
  answers: PropTypes.array,
  onDeleteAnswer: PropTypes.func,
  changeResponse: PropTypes.func,
  createResponse: PropTypes.func,
  filterString: PropTypes.string
};
export default withRouter(AnswersSections);
