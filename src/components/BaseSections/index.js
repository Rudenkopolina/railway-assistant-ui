import React from 'react';
import { withRouter } from 'react-router-dom';
import cx from 'classnames';
import AnswerTable from './../AnswerTable/AnswerTable';
import './styles.css';

class BaseSections extends React.Component {
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
    const { data } = this.props;
    const displayCategory = data.filter(item => {
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
          answer.responseName
          .toLowerCase()
          .indexOf(filterStringLowerCase) > -1 ||
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
    const displayCategory = data.filter(item => {
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
        </div>
        <AnswerTable
          title='reference'
          key='reference'
          filterString={this.props.filterString}
          data={filteredAnswers}
          onDeleteAnswer={this.props.onDeleteAnswer}
          changeResponse={this.props.changeResponse}
        />
      </div>
    );
  }
}
export default withRouter(BaseSections);
