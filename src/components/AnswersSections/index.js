import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import cx from 'classnames';
import Answers from './Answers';
import IntentModal from './Answers/IntentModal';
import NewCategoryModal from './NewCategoryModal';
import Protected from '../common/protected/container';
import {Icon} from 'semantic-ui-react';
import './styles.css';
import ChooseCategoryModal from "./ChooseCategoryModal";

class AnswersSections extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: null,
      chosenResponses: []
    };
  }

  componentWillMount() {
    const { categories } = this.props;
    if (!!categories.length) {
      const category = categories[0].id;
      this.setCategory(category);
    }
  }

  setCategory = categoryId => {
    if (categoryId !== this.state.activeTab) {
      this.setState({"chosenResponses": []});
      this.setState({
        activeTab: categoryId
      });
    }
  };

  deleteCategory = (event, id) => {
    const { categories } = this.props;
    const { activeTab } = this.state;
    event.preventDefault();
    this.props.onDeleteCategory(id);
    if (id === activeTab) {
      this.setState({
        activeTab: categories[0].id
      });
    }
  };

  onResponseSelected = async (id, state) => {
    state ? await this.state.chosenResponses.push(id) : await this.state.chosenResponses.splice(this.state.chosenResponses.indexOf(id), 1);
    this.setState({"chosenResponses": this.state.chosenResponses});
  };

  drawMoveButton = () => {
    if (this.state.chosenResponses.length > 0) {
      return (<ChooseCategoryModal onChooseCategory={this.onMove} categories={this.props.categories} chosenResponsesCount={this.state.chosenResponses.length} />);
    }
  };

  onMove = (categoryId) => {
    this.props.onMoveResponse(categoryId, this.state.chosenResponses);
    this.setCategory(categoryId);
  };

  getTotalNumberOfAnswers = category => {
    const { answers } = this.props;
    const totalAnswers = answers.filter(item => {
      return item.categoryId === category;
    });
    return totalAnswers.length;
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
    const smallestIndex = categories.reduce((index, category) => {
      if (category.id < index) index = category.id;
      return index;
    }, 10);

    const tabs = categories.map((category, index) => (
      
      <span key={index} className='category-button-container'>
        <div
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
        {!this.getTotalNumberOfAnswers(category.id) && category.id !== smallestIndex && (
          <span className='remove-icon ml-icon'>
            <Icon
              name='delete'
              size='small'
              onClick={event => this.deleteCategory(event, category.id)}
            />
          </span>
        )}
      </span>
    ));

    return (
      <div>
        {isReferanseTab && (
          <div className='categories-container'>
            {tabs}
            <NewCategoryModal onCreateCategory={this.props.onCreateCategory} />
            {this.drawMoveButton()}
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
        )}
        <Answers
          title={this.props.title}
          key={this.props.key}
          filterString={this.props.filterString}
          answers={filteredAnswers}
          onDeleteAnswer={this.props.onDeleteAnswer}
          changeResponse={this.props.changeResponse}
          isReferanseTab={isReferanseTab}
          onResponseSelected={this.onResponseSelected}
        />
      </div>
    );
  }
}

AnswersSections.propTypes = {
  categories: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  answers: PropTypes.array.isRequired,
  onDeleteAnswer: PropTypes.func.isRequired,
  changeResponse: PropTypes.func.isRequired,
  createResponse: PropTypes.func.isRequired,
  filterString: PropTypes.string.isRequired,
  isReferanseTab: PropTypes.bool.isRequired,
  onDeleteCategory: PropTypes.func.isRequired,
  onCreateCategory: PropTypes.func.isRequired,
  onMoveResponse: PropTypes.func.isRequired
};

export default withRouter(AnswersSections);
