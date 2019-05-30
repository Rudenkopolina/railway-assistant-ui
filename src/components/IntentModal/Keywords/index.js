import React from 'react';
import { path } from './path';
import request from '../../../services/request';
import { urls } from '../../../config';
import { NotificationManager } from 'react-notifications';
import './styles.css';

class Keywords extends React.Component {
  state = {
    keys: [],
    unUniqueExamples: [],
    inputVisible: false,
    inputValue: ''
  };

  componentWillMount() {
    if (this.props.data) {
      const { data } = this.props;
      this.setState({
        keys: data
      });
    }
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  saveInputRef = input => (this.input = input);

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  onAddKey = () => {
    const { inputValue } = this.state;
    let { keys } = this.state;
    if (inputValue && keys.indexOf(inputValue) === -1) {
      keys = [...keys, inputValue];
      this.setState({
        keys,
        inputVisible: false,
        inputValue: ''
      });
    } else {
      /// no error when focus
      NotificationManager.error('Вы не можете вводить два одинаковых ключа');
    }
  };


  onChangeKey = (e, index) => {
    const {keys} = this.state;
    keys[index] = e.target.value
    this.setState({ keys });
  }


  removeKey = removedKey => {
    const keys = this.state.keys.filter(tag => tag !== removedKey);
    this.setState({ keys });
  };

  checkExample = (keyword) => {
    this.onAddKey();
    // const { keys } = this.state;
    request(urls.responses.compareKeyword, { method: 'POST', body: { keyword } })
    .then(response => response.isUsed)
    .catch(err => console.log(err))    
  };

  render() {
    const { keys } = this.state;
    const { inputVisible, inputValue } = this.state;

    return (
      <div>
        {keys.map((key, index) => (
          <span
            key={key}
            style={{ display: 'inline-block', marginBottom: '10px' }}
          >
            <input
              className='tag'
              value={key}
              onChange={(e) => this.onChangeKey(e, index)}
              // onBlur={this.checkExample()}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  this.onAddKey();
                }
              }}
            />
            <i
              className='anticon icon-close'
              onClick={e => {
                e.preventDefault();
                this.removeKey(key);
              }}
            >
              <svg
                viewBox='64 64 896 896'
                fill='rgba(0, 0, 0, 0.45)'
                width='1em'
                height='1em'
              >
                <path d={path} />
              </svg>
            </i>
          </span>
        ))}

        {inputVisible && (
          <input
            className='tag'
            ref={this.saveInputRef}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={()=> this.checkExample(inputValue)}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                this.onAddKey();
              }
            }}
          />
        )}
        <span
          key='add'
          style={{ display: 'inline-block', marginBottom: '10px' }}
        >
          <button
            className='tag'
            style={{ background: '#fff', borderStyle: 'dashed' }}
            onClick={this.showInput}
          >
            {' '}
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
            Добавить
          </button>{' '}
        </span>
      </div>
    );
  }
}

export default Keywords;
