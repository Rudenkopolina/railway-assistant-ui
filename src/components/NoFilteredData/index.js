import React from 'react';
import './styles.css'

class NoFilteredData extends React.Component {
	render() {
		const { filterString } = this.props;
		return (
			<div className='no-filer-container'>
				<span>{`По запросу ${filterString} ничего не найдено.`}</span>
			</div>
		);
	}
}

export default NoFilteredData;
