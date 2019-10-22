import React from 'react';
import './styles.css';
import { LABELS } from '../../../../../constants/labels_en';

class AddButton extends React.Component {
  render() {
    return (
      <span key='add' style={{ display: 'inline-block', marginBottom: '10px' }}>
        <button
          className='tag'
          style={{
            background: '#fff',
            borderStyle: 'dashed',
            width: '80px'
          }}
          onClick={this.props.buttonClick}
        >
          <i className='anticon'>
            <svg
              viewBox='64 64 896 896'
              fill='#1890ff'
              width='1em'
              height='1em'
            >
              <path d='M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z' />
              <path d='M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z' />
            </svg>
          </i>
          {LABELS.ADD_BUTTON_LABEL}
        </button>
      </span>
    );
  }
}

export default AddButton;
