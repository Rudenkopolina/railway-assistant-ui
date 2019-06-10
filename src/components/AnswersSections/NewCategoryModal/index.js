import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Input } from 'semantic-ui-react';

class AddCategoryModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    };
  }
  onInputChange = event => {
    this.setState({
      inputValue: event.target.value
    });
  };

  onCategoryCreate = event => {
    const { inputValue } = this.state;
    event.preventDefault();
    this.props.onCreateCategory(inputValue);
    this.setState({
      inputValue: ''
    });
  };

  render() {
    const { inputValue } = this.state;
    return (
      <div className='add-category-button'>
        <Modal
          closeIcon
          trigger={
            <Button content='Добавить' icon='add' size='tiny' primary basic />
          }
          closeOnEscape={true}
          size={'mini'}
          content={
            <div className='modal-wrapper'>
              <div className='modal-header'>Создать новую категорию</div>
              <Input
                placeholder='Введите название...'
                value={inputValue}
                onChange={this.onInputChange}
              />
            </div>
          }
          actions={[
            {
              key: 'cancel',
              basic: true,
              content: 'Отменить'
            },
            {
              key: 'add',
              primary: true,
              basic: true,
              content: 'Добавить',
              onClick: event => this.onCategoryCreate(event)
            }
          ]}
        />
      </div>
    );
  }
}

AddCategoryModal.propTypes = {
  onCreateCategory: PropTypes.func.isRequired
};

export default AddCategoryModal;
