import React from 'react';
import { withRouter } from 'react-router-dom';
import cx from 'classnames';
import AnswerTable from './../AnswerTable/AnswerTable';
import './styles.css';

class BaseSections extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoriesList: '',
      activeTab: '',
      displayCategory: [],
      filterString: this.props
    };
  }

  componentWillMount() {
    const { data } = this.props;
    const tempCategories = data.map(i => i.categoryName);
    const category = tempCategories[0];
    const categoriesList = tempCategories.filter(
      (item, index, self) => self.indexOf(item) === index
    );
    this.setCategory(category);
    this.setState({ categoriesList, activeTab: category });
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

  getNumberOfAnswers = category => {
    const { data } = this.props;
    const displayCategory = data.filter(item => {
      return item.categoryName === category;
    });
    const filteredAnswers = this.getFilteredAnswers(displayCategory);
    return filteredAnswers.length;
  }

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
              <span className='filter-results'>
                {this.getNumberOfAnswers(category)}
              </span>
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
