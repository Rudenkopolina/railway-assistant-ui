import React from 'react';
import { withRouter } from 'react-router-dom';
import cx from 'classnames';
import request from '../../services/request';
import { urls } from '../../config';
import AnswerTable from './../AnswerTable/AnswerTable';
import './styles.css';

class BaseSections extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoriesList: [],
      activeTab: '',
      displayCategory: [],
      filterString: this.props
    };
  }

  componentWillMount() {
    request(urls.responses.getCategories, {
      method: 'GET'
    }).then(response => {
      const categoriesList = response.categories.map(
        category => category.category
      );
      const category = categoriesList[0];
      this.setCategory(category);
      this.setState({ categoriesList, activeTab: category });
    });
  }

  setCategory = category => {
    const { data } = this.props;
    const displayCategory = data.filter(item => {
      return item.categoryName === category;
    });
    this.setState({
      activeTab: category,
      displayCategory
    });
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
    const { displayCategory, activeTab, categoriesList } = this.state;
    const filteredAnswers = this.getFilteredAnswers(displayCategory);
    return (
      <div>
        <div className='categories-container'>
          {categoriesList.map((category, index) => (
            <div
              key={index}
              className={cx('category-button', {
                'category-button-active': activeTab === category
              })}
              onClick={() => this.setCategory(category)}
            >
              {category}
              <span className='filter-results'>{filteredAnswers.length}</span>
            </div>
          ))}
        </div>
        <AnswerTable
          title='reference'
          key='reference'
          data={filteredAnswers}
          onDeleteAnswer={this.props.onDeleteAnswer}
          changeResponse={this.props.changeResponse}
        />
      </div>
    );
  }
}
export default withRouter(BaseSections);
