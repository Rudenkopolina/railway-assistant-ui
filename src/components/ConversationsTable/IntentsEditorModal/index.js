import React from 'react';
import PropTypes from 'prop-types';
import { Button, Dropdown, Icon, Modal } from 'semantic-ui-react';
import './styles.css';
import 'moment/locale/ru';
import { LABELS } from '../../../constants/labels_en';

class IntentsEditorModal extends React.PureComponent {
  state = {
    selectedId: -1
  };

  onSave = () => {
    const {
      availableIntents,
      message,
      correctIntents,
      onTrigerModal
    } = this.props;
    const { selectedId } = this.state;
    correctIntents(message, availableIntents[selectedId]);
    onTrigerModal();
  };

  onIntentChange = (e, value) => {
    this.setState({ selectedId: value.value });
  };

  renderConfidence = message => {
    if (message.intents) {
      return (
        <>
          {message.intents[0].confidence >= 0.3 && (
            <div>
              {LABELS.SYSTEM_RECOGNITION_INFO_START}
              {message.intents[0].intent}
              {LABELS.SYSTEM_RECOGNITION_INFO_END}
              {parseFloat(
                Math.round(message.intents[0].confidence * 100) / 100
              ).toFixed(2)}
            </div>
          )}
        </>
      );
    } else return <div>{LABELS.INACCESSIBLE_INFO}</div>;
  };

  renderContent = () => {
    const { availableIntents, message, onTrigerModal } = this.props;
    const { selectedId } = this.state;
    const options = availableIntents.map((intent, index) => ({
      // text: intent.description,
      text: intent.name,
      value: index,
      key: index
    }));
    return (
      <div className='modal-wrapper-intents-editor'>
        <div className='intents-editor-container'>
          <div className='intents-editor-user-message'>
            {message.requestText}
          </div>
          <div className='intents-editor-label'>{LABELS.USER_MESSAGE}</div>
        </div>
        <div className='intents-editor-container'>
          <div className='intents-editor-intent'>
            {/* #{message.detectedIntentDescription} */}
            #{message.detectedIntent}
          </div>
          <div className='intents-editor-label'>
            {this.renderConfidence(message)}
          </div>
        </div>

        <div className='intents-editor-change'>
          <div className='intents-editor-label'>{LABELS.CHANGE_INTENT}</div>
          <Dropdown
            className='intents-editor-dropdown'
            fluid
            search
            selection
            options={options}
            value={selectedId}
            onChange={this.onIntentChange}
          />
        </div>

        {message.correctedIntent ? (
          <div className='intents-editor-history'>
            <Icon
              className='intents-calendar-icon'
              name='calendar alternate outline'
            />
            {/* {LABELS.INTENT_CHANGED} {message.correctedIntentDescription} */}
            {LABELS.INTENT_CHANGED} {message.correctedIntent}
          </div>
        ) : (
          <div />
        )}

        <div className='intents-editor-modal-actions'>
          <Button
            className='intents-editor-modal-button'
            basic
            onClick={onTrigerModal}
          >
            {LABELS.CANCEL}
          </Button>
          <Button
            className='intents-editor-modal-button'
            primary
            basic
            onClick={this.onSave}
          >
            {LABELS.SAVE}
          </Button>
        </div>
      </div>
    );
  };

  render() {
    const { isModalOpen, onTrigerModal } = this.props;
    return (
      <Modal
        size='mini'
        dimmer='blurring'
        closeOnDimmerClick={false}
        open={isModalOpen}
        content={this.renderContent}
        onClose={onTrigerModal}
        closeIcon
      />
    );
  }
}

IntentsEditorModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  onTrigerModal: PropTypes.func.isRequired,
  availableIntents: PropTypes.array.isRequired,
  message: PropTypes.object.isRequired,
  correctIntents: PropTypes.func.isRequired
};

export default IntentsEditorModal;
