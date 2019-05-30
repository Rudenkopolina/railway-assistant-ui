import React from 'react';
import { Tag, Input, Icon } from 'antd';
import { NotificationContainer, NotificationManager } from 'react-notifications';

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
    }
    this.setState({
      keys,
      inputVisible: false,
      inputValue: ''
    });
  };

  removeKey = removedKey => {
    const keys = this.state.keys.filter(tag => tag !== removedKey);
    this.setState({ keys });
  };

  checkExample = () => {
    this.onAddKey();
    const { keys } = this.state;
  };

  render() {
    const { keys } = this.state;
    const { inputVisible, inputValue } = this.state;

    return (
      <div>
        {keys.map(key => (
          <span
            key={key}
            style={{ display: 'inline-block', marginBottom: '10px' }}
          >
            <Tag
              closable
              color='blue'
              onClose={e => {
                e.preventDefault();
                this.removeKey(key);
              }}
            >
              {key}
            </Tag>
          </span>
        ))}

        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type='text'
            size='small'
            style={{ width: 'auto' }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.checkExample}
            onPressEnter={this.onAddKey}
          />
        )}

        {!inputVisible && (
          <Tag
            color='blue'
            onClick={this.showInput}
            style={{ background: '#fff', borderStyle: 'dashed' }}
          >
            <Icon type='plus' /> Добавить
          </Tag>
        )}
      </div>
    );
  }
}


export default Keywords;