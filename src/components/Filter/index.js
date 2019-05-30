import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Typography } from 'antd';

class Filter extends Component {

    render() {
        const { filterString, onFilterChange } = this.props;
        return (
            <div>
            <Typography.Text style={{margin: '20px'}} >Поиск:</Typography.Text>
            <Input.Search
                placeholder="Введите слово..."
                value={filterString}
                onChange={({target}) => onFilterChange(target.value)}
                style={{ width: 200 }}
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
