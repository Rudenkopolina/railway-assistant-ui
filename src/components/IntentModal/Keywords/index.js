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
      loading: false,
      inputValue: '',
      emptyError: false,
      sameKeysError: { show: false, keyword: '' },
      keyAlreadyUsed: {
        show: false,
        keyword: '',
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

  closeInput = () => {
    this.setState({ inputVisible: false, inputValue: ''});
  };

  removeKey = removedKey => {
    const keys = this.state.keys.filter(tag => tag !== removedKey);
    this.setState({ keys });
    this.onAddKeys(keys);
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
            keyword: newKeyword,
            description: response.responses[0].responseDescription
          }
        });
      } else
        this.setState({
          keyAlreadyUsed: {
            show: response.isUsed,
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
    let loading = false;
    if (newKeyword) {
      loading = true;
      this.isKeyUsed(newKeyword);
    }
    this.setState({
      loading,
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
      inputValue
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

        {inputVisible &&  (
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
                this.closeInput();
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
      </div>
    );
  }
}

export default Keywords;
