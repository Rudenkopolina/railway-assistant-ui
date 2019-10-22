import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import { LABELS } from '../../../../constants/labels_en';

class NoFilteredData extends React.Component {
  render() {
    const { filterString } = this.props;
    if (filterString) {
      return (
        <div className='no-filer-container'>
          <span>{LABELS.NOTHING_FOUND_START}</span>
          <span className='filter-sring'>{filterString}</span>
          <span>{LABELS.NOTHING_FOUND_END}</span>
        </div>
      );
    } else {
      return (
        <div className='no-filer-container'>
          <span>{LABELS.NO_ANSWERS}</span>
        </div>
      );
    }
  }
}

NoFilteredData.propTypes = {
  filterString: PropTypes.string
};

export default NoFilteredData;
