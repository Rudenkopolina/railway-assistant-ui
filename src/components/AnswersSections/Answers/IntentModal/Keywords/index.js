import React from 'react';
import PropTypes from 'prop-types';
import request from '../../../../../services/request';
import Closeicon from '../Closeicon';
import AddButton from '../AddButton';
import { urls } from '../../../../../config';
import './styles.css';

class Keywords extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVisible: false,
      inputValue: '',
      error: null
    };
  }

  updateModal = checkedKeys => {
    this.props.handleUpdateKeys(checkedKeys);
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  saveInputRef = input => (this.input = input);

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  closeInput = () => {
    this.setState({ inputVisible: false, inputValue: '' });
  };

  removeKey = removedKey => {
    const checkedKeys = this.state.checkedKeys.filter(
      tag => tag !== removedKey
    );
    this.setState({ checkedKeys });
  };

  isKeyUsed = () => {
    let { inputValue } = this.state;
    const { answerId, keys } = this.props;

    //let newInputValue = '';
    const keyToCheck = inputValue.trim().toLowerCase();
    const isDuplicate =
      keys.findIndex(key => keyToCheck === key.toLowerCase()) !== -1;

    if (isDuplicate) {
      this.setState({
        error: 'The key is already used'
      });
      return;
    }

    if (keyToCheck && !isDuplicate) {
      return request(urls.responses.compareKeyword, {
        method: 'POST',
        body: { keyword: keyToCheck }
      }).then(response => {
        if (response.isUsed && !(response.responses[0].id === answerId)) {
          this.setState({
            error: `The key is already used in ${
              response.responses[0].responseDescription
            }`
          });
          return;
          //newInputValue = inputValue;
        }

        this.updateModal([...keys, keyToCheck]);

        this.setState(
          {
            inputVisible: true,
            error: null,
            inputValue: ''
          },
          () => this.input.focus()
        );
      });
    }
  };

  render() {
    const { inputVisible, inputValue, error } = this.state;
    const { keys } = this.props;
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
              onBlur={this.isKeyUsed}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  this.isKeyUsed();
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
        {error}
      </div>
    );
  }
}

Keywords.propTypes = {
  keys: PropTypes.array.isRequired,
  answerId: PropTypes.string,                              //
  handleUpdateKeys: PropTypes.func.isRequired
};

export default Keywords;
