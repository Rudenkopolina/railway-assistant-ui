import React from 'react';
import { withRouter } from 'react-router-dom';
import AnswerTable from './../AnswerTable/AnswerTable';
import './styles.css';

class BaseSections extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayCategory:[props.data[0]],
      data: props.data
    };
  }

  setCategory = category => {
    const { data } = this.state;
    const displayCategory = data.filter(item => {
      return item.responseDescription === category;
    });
    this.setState({
      displayCategory
    });
  };

  render() {
    const { data, displayCategory } = this.state;
    return (
      <div>
        <div className='categories-container'>
          {data.map((item, index) => (            
            <button
              key={index}
              className='category-button'
              onClick={() => this.setCategory(item.responseDescription)}
            >
              {item.responseDescription}
            </button>
          ))}
        </div>
        <AnswerTable
          title='reference'
          key='reference'
          data={displayCategory}
          onDeleteAnswer={this.props.onDeleteAnswer}
          changeResponse={this.props.changeResponse}
          filterString={this.props.filterString}
        />
      </div>
    );
  }
}
export default withRouter(BaseSections);
