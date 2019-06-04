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
      inputChangeVisible: false,
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
    const isValid = emptyError || sameKeysError.show || keyAlreadyUsed.show;
    this.props.handleUpdateKeys(keys, isValid);
  };

  saveInputRef = input => (this.input = input);

  showInput = () => {
    const { inputChangeVisible } = this.state;
    if (!inputChangeVisible) {
      this.setState({ inputVisible: true }, () => this.input.focus());
    }
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

  getUnique = arr => {
    const final = [];
    arr.map((e, i) => !final.includes(e) && final.push(e));
    return final;
  };

  removeKey = removedKey => {
    let newKeys;
    newKeys = this.getUnique(this.state.keys);
    //////////////////////////
    const { sameKeysError, keyAlreadyUsed } = this.state;
    const keys = this.state.keys.filter(tag => tag !== removedKey);
    if (
      keyAlreadyUsed.keyword.trim() === removedKey.toLowerCase().trim() ||
      sameKeysError.keyword.trim() === removedKey.toLowerCase().trim()
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
    const newValue = e.target.value.trim().toLowerCase();
    newKeys[index] = newValue;
    this.setState({ keys: newKeys });
  };

  checkAfterChange = newValue => {
    const { keys } = this.state;
    const notSame = keys.indexOf(newValue) === keys.lastIndexOf(newValue);
    let responseObject = {};
    if (newValue && notSame) {
      request(urls.responses.compareKeyword, {
        method: 'POST',
        body: { keyword: newValue }
      }).then(response => {
        if (!response.isUsed) {
          responseObject = {
            show: response.isUsed,
            keyword: '',
            description: ''
          };
        } else {
          responseObject = {
            show: response.isUsed,
            keyword: newValue,
            description: response.responses[0].responseDescription
          };
        }
        this.setState({
          inputChangeVisible: response.isUsed,
          emptyError: false,
          sameKeysError: { show: false, keyword: '' },
          keyAlreadyUsed: responseObject
        });
      });
    } else {
      this.setState({
        inputChangeVisible: true,
        emptyError: !newValue.length,
        sameKeysError: { show: !notSame, keyword: newValue }
      });
    }
  };

  checkExample = keyword => {
    const newKeyword = keyword.trim().toLowerCase();
    if (newKeyword) {
      request(urls.responses.compareKeyword, {
        method: 'POST',
        body: { keyword: newKeyword }
      })
        .then(response => {
          if (response.isUsed) {
            this.onAddKey(
              {
                show: response.isUsed,
                keyword: newKeyword,
                description: response.responses[0].responseDescription
              },
              newKeyword
            );
          } else {
            this.onAddKey(
              { show: response.isUsed, keyword: '', description: '' },
              newKeyword
            );
          }
        })
        .catch(err => console.log(err));
    } else
      this.onAddKey({ show: false, keyword: '', description: '' }, newKeyword);
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
              onBlur={() => this.checkAfterChange(key)}
              // onKeyPress={event => {
              //   if (event.key === 'Enter') {
              //     this.checkAfterChange(key);
              //   }
              // }}
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
              // onKeyPress={event => {
              //   if (event.key === 'Enter') {
              //     this.checkExample(inputValue);
              //   }
              // }}
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
