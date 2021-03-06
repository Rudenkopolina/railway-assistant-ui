import React from 'react';
import PropTypes from 'prop-types';
import {Button, Modal, Dropdown} from 'semantic-ui-react';

class ChooseCategoryModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenCategoryId: this.props.categories[0].id
    };
  }

  render() {
    const quantity = this.props.chosenResponsesCount;
    return (
      <div className='add-category-button'>
        <Modal
          closeIcon
          trigger={
            <Button content='Переместить' icon='move' size='tiny' primary basic />
          }
          closeOnEscape={true}
          size={'mini'}
          content={
            <div className='modal-wrapper'>
              <div className='modal-header'>Выбрано ответов: {quantity}<br/>Выберите категорию для перемещения:</div>
              <Dropdown fluid search selection value={this.state.chosenCategoryId} onChange={(event, data) => this.setState({"chosenCategoryId": data.value})} options={this.props.categories.map(category => ({text: category.category, value: category.id}))} />
            </div>
          }
          actions={[
            {
              key: 'cancel',
              basic: true,
              content: 'Отменить'
            },
            {
              key: 'move',
              primary: true,
              basic: true,
              content: 'Переместить',
              onClick: event => this.props.onChooseCategory(this.state.chosenCategoryId)
            }
          ]}
        />
      </div>
    );
  }
}

ChooseCategoryModal.propTypes = {
  onChooseCategory: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  chosenResponsesCount: PropTypes.number
};

export default ChooseCategoryModal;
