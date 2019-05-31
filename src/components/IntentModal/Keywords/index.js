import React from 'react';
import request from '../../../services/request';
import Closeicon from '../Closeicon';
import { urls } from '../../../config';
import './styles.css';

class Keywords extends React.Component {
  state = {
    keys: [],
    inputVisible: false,
    inputValue: '',
    emptyError: false,
    sameKeysError: false,
    keyAlreadyUsedError: {show: false, keyword: '', description: ''}
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

  closeInput = () => {
    this.setState({ inputVisible: false })
  }

  saveInputRef = input => (this.input = input);

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  onAddKey = () => {
    const { inputValue, keyAlreadyUsedError } = this.state;
    let { keys } = this.state;
    const emptyError = !inputValue.length;
    let sameKeysError;

    if (inputValue && keys.indexOf(inputValue) === -1) {
      keys = [...keys, inputValue];
    }
    this.setState({
      keys,
      inputVisible: emptyError || sameKeysError || keyAlreadyUsedError.show,
      inputValue: '',
      emptyError,
      sameKeysError
    });
  };

  onChangeKey = (e, index) => {
    const { keys } = this.state;
    const newKeys = [ ...keys ]
    newKeys[index] = e.target.value;
    this.setState({ keys: newKeys });
  };

  removeKey = removedKey => {
    const keys = this.state.keys.filter(tag => tag !== removedKey);
    this.setState({ keys });
  };

  checkExample = keyword => {
    this.onAddKey(keyword);
    request(urls.responses.compareKeyword, {
      method: 'POST',
      body: { keyword }
    })
      .then(response => this.setState({keyAlreadyUsedError: {show: response.isUsed, keyword, description: response.responses[0].responseDescription}   }))
      .catch(err => console.log(err));      
  };

  render() {
    const { keys } = this.state;
    const {
      inputVisible,
      inputValue,
      sameKeysError,
      keyAlreadyUsedError,
      emptyError
    } = this.state;
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
              onChange={e => this.onChangeKey(e, index)}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  this.onAddKey();
                }
              }}
            />
            <Closeicon buttonClick={e => {
              e.preventDefault();
              this.removeKey(key);
            }} />

          </span>
        ))}

        {inputVisible && (
          <span style={{ display: 'inline-block', marginBottom: '10px' }}>
          <input
            className='tag'
            ref={this.saveInputRef}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={() => this.checkExample(inputValue)}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                this.onAddKey();
              }
            }}
          />
           <Closeicon buttonClick={e => {
            e.preventDefault();
            this.closeInput();
            }} />
          </span>
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
          </button>
        </span>
        {keyAlreadyUsedError.show && <div className='error'>Ключ <b>{keyAlreadyUsedError.keyword}</b> уже используется в намерении <b>{keyAlreadyUsedError.description}</b></div>}
        {sameKeysError &&  <div className='error'>Нельзя добавлять одинаковые ключи</div>}
        {emptyError && <div className='error'>Поле не должно быть пустым</div>}
      </div>
    );
  }
}

export default Keywords;
