import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Input } from 'semantic-ui-react';
import './styles.css';

class Filter extends Component {
    render() {
        const { filterString, onFilterChange } = this.props;
        return (
            <div className='filter-wrapper'>
              <Input
                icon='search'
                placeholder='Поиск...'
                value={filterString}
                onChange={({target}) => onFilterChange(target.value)}
              />
            </div>
        );
    }
}

export default Filter;

Filter.propTypes = {
    onFilterChange: PropTypes.func,
    filterString: PropTypes.string
};
