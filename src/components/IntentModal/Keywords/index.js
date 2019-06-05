import React from 'react';
import request from '../../../services/request';
import Closeicon from '../Closeicon';
import AddButton from '../AddButton';
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
      keyAlreadyUsed: {
        show: false,
        keyword: '',
        canAdd: false,
        description: ''
      }
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
    const isValid = emptyError || sameKeysError.show || keyAlreadyUsed.show;
    this.props.handleUpdateKeys(keys, isValid);
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  saveInputRef = input => (this.input = input);

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  closeInput = inputValue => {
    // const { sameKeysError, keyAlreadyUsed } = this.state;
    // if (
    //   keyAlreadyUsed.keyword === inputValue ||
    //   sameKeysError.keyword === inputValue
    // ) {
    //   this.setState({
    //     inputVisible: false,
    //     inputValue: '',
    //     keyAlreadyUsed: { show: false, keyword: '', description: '' },
    //     sameKeysError: { show: false, keyword: '' },
    //     emptyError: false
    //   });
    // } else {
    this.setState({ inputVisible: false, inputValue: '', emptyError: false });
    // }
  };

  removeKey = removedKey => {
    // const { sameKeysError, keyAlreadyUsed } = this.state;
    const keys = this.state.keys.filter(tag => tag !== removedKey);
    // if (
    //   keyAlreadyUsed.keyword.trim() === removedKey.toLowerCase().trim() ||
    //   sameKeysError.keyword.trim() === removedKey.toLowerCase().trim()
    // ) {
    //   this.setState({
    //     keys,
    //     keyAlreadyUsed: { show: false, keyword: '', description: '' },
    //     sameKeysError: { show: false, keyword: '' }
    //   });
    // } else {
    this.setState({ keys });
    // }
    this.updateModal(keys);
  };

  isKeyUsed = newKeyword => {
    return request(urls.responses.compareKeyword, {
      method: 'POST',
      body: { keyword: newKeyword }
    }).then(response => {
      if (response.isUsed) {
        this.setState({
          keyAlreadyUsed: {
            show: response.isUsed,
            canAdd: false,
            keyword: newKeyword,
            description: response.responses[0].responseDescription
          }
        });
      } else
        this.setState({
          keyAlreadyUsed: {
            show: response.isUsed,
            canAdd: true,
            keyword: '',
            description: ''
          }
        });
    });
  };

  checkExample = keyword => {
    const { keys } = this.state;
    const newKeyword = keyword.trim().toLowerCase();
    const emptyError = !newKeyword.length;
    const sameKeysError = !(keys.indexOf(newKeyword) === -1);
    if (newKeyword) {
      this.isKeyUsed(newKeyword);
      this.onAddKeys(newKeyword);
    }
    this.setState({
      emptyError,
      sameKeysError: { show: sameKeysError, keyword: newKeyword }
    });
  };
  

  onAddKeys = (newKeyword) => {
    const { emptyError, sameKeysError, keyAlreadyUsed } = this.state;
  };

  render() {
    const {
      keys,
      inputVisible,
      inputValue,
      sameKeysError,
      emptyError,
      keyAlreadyUsed
    } = this.state;
    return (
      <div>
        {keys.map((key, index) => (
          <span className='span-tag' key={index}>
            <span className='tag'>{key}</span>
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
        <AddButton
          buttonClick={e => {
            e.preventDefault();
            this.showInput(inputValue);
          }}
        />
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
