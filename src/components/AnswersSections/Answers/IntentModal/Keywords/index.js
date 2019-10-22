import React from 'react';
import PropTypes from 'prop-types';
import request from '../../../../../services/request';
import Closeicon from '../Closeicon';
import AddButton from '../AddButton';
import { urls } from '../../../../../config';
import { LABELS } from '../../../../../constants/labels_en';
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
    this.setState({ inputVisible: false, inputValue: '', error: null });
  };

  removeKey = removedIndex => {
    const { keys } = this.props;
    const checkedKeys = keys.filter((tag, index) => index !== removedIndex);
    this.updateModal(checkedKeys);
  };

  isKeyUsed = () => {
    const { inputValue } = this.state;
    const { answerId, keys } = this.props;
    const keyToCheck = inputValue.trim().toLowerCase();
    const isDuplicate = keys &&
      keys.findIndex(key => keyToCheck === key.toLowerCase()) !== -1;

    if (isDuplicate) {
      this.setState({
        error: LABELS.EXISTING_KEY_ERROR
      });
      return;
    }

    if (keyToCheck && !isDuplicate) {
      return request(urls.responses.compareKeyword, {
        method: 'POST',
        body: { keyword: keyToCheck }
      }).then(response => {
        if (
          response.isUsed &&
          response.responses &&
          response.responses[0] &&
          !(response.responses[0].id === answerId)
        ) {
          this.setState({
            error: `${LABELS.KEY_IS_ALREADY_USED_IN_ERROR} ${
              response.responses[0].responseDescription
            }`
          });
          return;
        }
        if (response.isUsed && !response.responses) {
          this.setState({
            error: LABELS.KEY_IS_ALREADY_USED_ERROR
          });
          return;
        }

        const isDuplicate = keys &&
          keys.findIndex(key => response.keyword === key.toLowerCase()) !== -1;

        if (isDuplicate) {
          this.setState({
            error: LABELS.EXISTING_KEY_ERROR
          });
          return;
        }

        this.updateModal([...keys || '', response.keyword]);

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
        {keys &&
          keys.map((key, index) => (
            <span className='span-tag' key={index}>
              <span className='tag'>{key}</span>
              <Closeicon
                buttonClick={e => {
                  e.preventDefault();
                  this.removeKey(index);
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
        <span className='error-label'> {error}</span>
      </div>
    );
  }
}

Keywords.propTypes = {
  keys: PropTypes.array,
  handleUpdateKeys: PropTypes.func.isRequired,
  answerId: PropTypes.number
};

export default Keywords;
