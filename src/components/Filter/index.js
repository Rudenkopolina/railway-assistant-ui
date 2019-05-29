import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

class Filter extends Component {

    render() {
        const { filterString, onFilterChange } = this.props;
        return (
            <Input
                placeholder="Введите слово..."
                value={filterString}
                onChange={({target}) => onFilterChange(target.value)}
                style={{ width: 200 }}
            />
        );
    }
}

export default Filter;

Filter.propTypes = {
    onFilterChange: PropTypes.func,
    filterString: PropTypes.string
};
