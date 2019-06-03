import React from 'react';
import request from '../../../services/request';
import Closeicon from '../Closeicon';
import { urls } from '../../../config';
import './styles.css';

class Keywords extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keys: [],
      inputVisible: false,
      inputValue: '',
      emptyError: false,
      sameKeysError: { show: false, keyword: '' },
      keyAlreadyUsed: { show: false, keyword: '', description: '' }
    };
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    this.setState({
      keys: data
    });
  }

  updateModal = keys => {
    const { emptyError, sameKeysError, keyAlreadyUsed } = this.state;
    const isError = emptyError || sameKeysError.show || keyAlreadyUsed.show;
    this.props.handleUpdateKeys(keys, isError);
  };

  saveInputRef = input => (this.input = input);

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  closeInput = inputValue => {
    const { sameKeysError, keyAlreadyUsed } = this.state;
    if (
      keyAlreadyUsed.keyword === inputValue ||
      sameKeysError.keyword === inputValue
    ) {
      this.setState({
        inputVisible: false,
        inputValue: '',
        keyAlreadyUsed: { show: false, keyword: '', description: '' },
        sameKeysError: { show: false, keyword: '' },
        emptyError: false
      });
    } else {
      this.setState({ inputVisible: false, inputValue: '', emptyError: false });
    }
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  onAddKey = (responseObject, keyword) => {
      let { keys } = this.state;
      const emptyError = !keyword.length;
      const sameKeysError = !(keys.indexOf(keyword) === -1);
      const sameKey = sameKeysError ? keyword : '';
      const isValid = emptyError || sameKeysError || responseObject.show;
      const value = isValid ? keyword : '';

      if (keyword && !sameKeysError && !responseObject.show) {
        keys = [...keys, keyword];
      }
      this.setState({
        keys,
        inputVisible: isValid, 
        inputValue: value,
        emptyError,
        sameKeysError: { show: sameKeysError, keyword: sameKey },
        keyAlreadyUsed: responseObject
      });
      this.updateModal(keys);
  };

  onChangeKey = (e, index) => {
    const { keys } = this.state;
    const newKeys = [...keys];
    newKeys[index] = e.target.value;
    this.setState({ keys: newKeys });
  };

  removeKey = removedKey => {
    const { sameKeysError, keyAlreadyUsed } = this.state;
    const keys = this.state.keys.filter(tag => tag !== removedKey);
    if (
      keyAlreadyUsed.keyword === removedKey ||
      sameKeysError.keyword === removedKey
    ) {
      this.setState({
        keys,
        keyAlreadyUsed: { show: false, keyword: '', description: '' },
        sameKeysError: { show: false, keyword: '' }
      });
    } else {
      this.setState({ keys });
    }
    this.updateModal(keys);
  };

  checkExample = keyword => {
    if (keyword) {
      //check if word is the same
      request(urls.responses.compareKeyword, {
        method: 'POST',
        body: { keyword }
      })
        .then(response => {
          if (response.isUsed) {
            this.onAddKey(
              {
                show: response.isUsed,
                keyword,
                description: response.responses[0].responseDescription
              },
              keyword
            );
          } else {
            this.onAddKey(
              { show: response.isUsed, keyword: '', description: '' },
              keyword
            );
          }
        })
        .catch(err => console.log(err));
    } else
      this.onAddKey({ show: false, keyword: '', description: '' }, keyword);
  };

  render() {
    const { keys } = this.state;
    const {
      inputVisible,
      inputValue,
      sameKeysError,
      emptyError,
      keyAlreadyUsed
    } = this.state;
    return (
      <div>
        {keys.map((key, index) => (
          <span
            key={index}
            style={{ display: 'inline-block', marginBottom: '10px' }}
          >
            <input
              className='tag'
              value={key}
              onChange={e => this.onChangeKey(e, index)}
              onBlur={() => this.checkExample(key)}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  this.checkExample(key);
                }
              }}
            />
            <Closeicon
              buttonClick={e => {
                e.preventDefault();
                this.removeKey(key);
              }}
            />
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
                  this.checkExample(inputValue);
                }
              }}
            />
            <Closeicon
              buttonClick={e => {
                e.preventDefault();
                this.closeInput(inputValue);
              }}
            />
          </span>
        )}
        {
          <span
            key='add'
            style={{ display: 'inline-block', marginBottom: '10px' }}
          >
            <button
              className='tag'
              style={{
                background: '#fff',
                borderStyle: 'dashed',
                width: '80px'
              }}
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
        }
        {keyAlreadyUsed.show && (
          <div className='error'>
            Ключ <b>{keyAlreadyUsed.keyword}</b> уже используется в намерении{' '}
            <b>{keyAlreadyUsed.description}</b>
          </div>
        )}
        {sameKeysError.show && (
          <div className='error'>
            Нельзя добавлять одинаковые ключи <b>{sameKeysError.keyword}</b>
          </div>
        )}
        {emptyError && <div className='error'>Поле не должно быть пустым</div>}
      </div>
    );
  }
}

export default Keywords;
