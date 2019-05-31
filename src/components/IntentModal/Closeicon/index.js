import React from 'react';
import { path } from './path';
import './styles.css';

class Closeicon extends React.Component {
    render() {
        return (
            <i className='anticon icon-close' onClick={this.props.buttonClick}>
                <svg
                    viewBox='64 64 896 896'
                    fill='rgba(0, 0, 0, 0.45)'
                    width='1em'
                    height='1em'
                >
                    <path d={path} />
                </svg>
            </i>
        )
    }
}

export default Closeicon;