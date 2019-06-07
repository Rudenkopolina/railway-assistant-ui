import React from 'react';
import PropTypes from 'prop-types';
import request from '../../../../services/request';
import Closeicon from '../Closeicon';
import AddButton from '../AddButton';
import { urls } from '../../../../config';
import './styles.css';

class Keywords extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keys: [],
      checkedKeys: [],
      topic: '',
      inputVisible: false,
      inputValue: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    const { keys, topic } = nextProps;
    this.setState({
      keys,
      topic,
      checkedKeys: keys
    });
  }

  componentDidUpdate() {
    const { checkedKeys } = this.state;
    if (this.props.keys !== checkedKeys) {
      this.updateModal(checkedKeys);
    }
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
    const { inputValue, topic } = this.state;
    let { keys, checkedKeys } = this.state;
    if (inputValue) {
      keys = [...keys, inputValue];
    }
    let checking = inputValue.trim().toLowerCase();
    if (inputValue && checkedKeys.indexOf(inputValue) === -1) {
      return request(urls.responses.compareKeyword, {
        method: 'POST',
        body: { keyword: inputValue }
      }).then(response => {
        if (
          response.isUsed &&
          !(response.responses[0].responseDescription === topic)
        ) {
          checking = '';
        }
        if (checking) {
          checkedKeys = [...checkedKeys, checking];
        }
        this.setState({
          checkedKeys,
          keys,
          inputVisible: true,
          inputValue: ''
        }, () => this.input.focus());
      });
    }
  };

  render() {
    const { keys, inputVisible, inputValue } = this.state;
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
      </div>
    );
  }
}

Keywords.propTypes = {
  keys: PropTypes.array,
  topic: PropTypes.string,
  handleUpdateKeys: PropTypes.func,
};


export default Keywords;
