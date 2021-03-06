import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

class NoFilteredData extends React.Component {
  render() {
    const { filterString } = this.props;
    if (filterString) {
      return (
        <div className='no-filer-container'>
          <span>{'По запросу'}</span>
          <span className='filter-sring'>{filterString}</span>
          <span>{'ничего не найдено.'}</span>
        </div>
      );
    } else {
      return (
        <div className='no-filer-container'>
          <span>{`В данной категории пока нет ответов`}</span>
        </div>
      );
    }
  }
}

NoFilteredData.propTypes = {
  filterString: PropTypes.string
};

export default NoFilteredData;
