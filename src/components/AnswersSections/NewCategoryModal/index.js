import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Input } from 'semantic-ui-react';
import { LABELS } from '../../../constants/labels_en';

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
            <Button content={LABELS.ADD_BUTTON_LABEL} icon='add' size='tiny' primary basic />
          }
          closeOnEscape={true}
          size={'mini'}
          content={
            <div className='modal-wrapper'>
              <div className='modal-header'>{LABELS.ADD_NEW_CATEGORY}</div>
              <Input
                placeholder={LABELS.NEW_CATEGORY_NAME_PLACEHOLDER}
                value={inputValue}
                onChange={this.onInputChange}
              />
            </div>
          }
          actions={[
            {
              key: 'cancel',
              basic: true,
              content: LABELS.CANCEL
            },
            {
              key: 'add',
              primary: true,
              basic: true,
              content: LABELS.ADD_BUTTON_LABEL,
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
