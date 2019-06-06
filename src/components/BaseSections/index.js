import React from 'react';
import { withRouter } from 'react-router-dom';
import cx from 'classnames';
import AnswerTable from './../AnswerTable/AnswerTable';
import './styles.css';

class BaseSections extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '',
      filterString: this.props
    };
  }

  componentWillMount() {
    const { categories } = this.props;
    const category = categories[0].category;
    this.setCategory(category);
  }

  setCategory = category => {
    this.setState({
      activeTab: category
    });
  };

  getNumberOfAnswers = category => {
    const { data } = this.props;
    const displayCategory = data.filter(item => {
      return item.categoryName === category;
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
    const { categories, data } = this.props;
    const { activeTab } = this.state;
    const categoriesList = categories.map(
      categoryObject => categoryObject.category
    );
    const displayCategory = data.filter(item => {
      return item.categoryName === activeTab;
    });
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
