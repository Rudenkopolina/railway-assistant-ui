import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Icon, Table } from 'semantic-ui-react';
import moment from 'moment';
import ConversationModal from '../ConversationModal';
import './styles.css';
import { LABELS } from '../../../constants/labels_en';

class ConversationsTableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    };
  }

  drawConversationType = type => {
    switch (type) {
      case 'VOICE':
        return (
          <div>
            <Icon name='microphone' size='small' />
            {LABELS.VOICE}
          </div>
        );
      case 'TEXT':
        return (
          <div>
            <Icon name='align justify' size='small' />
            {LABELS.TEXT}
          </div>
        );
      case 'MIXED':
        return (
          <div>
            <Icon name='sync' size='small' />
            {LABELS.MIXED}
          </div>
        );
      case 'UNKN':
        return (
          <div>
            <Icon name='question circle' size='small' />
            {LABELS.UNKN}
          </div>
        );
      default:
        return (
          <div>
            <Icon name='question circle' size='small' />
            {LABELS.UNKN}
          </div>
        );
    }
  };

  onTrigerModal = () => {
    this.setState(state => ({ isModalOpen: !state.isModalOpen }));
  };

  render() {
    const { isModalOpen } = this.state;
    const {
      conversation,
      messages,
      getConversationsMessages,
      correctIntents,
      availableIntents
    } = this.props;
    return (
      <>
        <Table.Row className='table-row' onClick={this.onTrigerModal}>
          <Table.Cell textAlign='center'>
            {moment(conversation.timestamp_start).format('DD.MM.YYYY HH:mm:ss')}
          </Table.Cell>
          <Table.Cell textAlign='center'>
            {moment(conversation.timestamp_end).format('DD.MM.YYYY HH:mm:ss')}
          </Table.Cell>
          <Table.Cell textAlign='center'>{conversation.session}</Table.Cell>
          <Table.Cell textAlign='center'>{conversation.iterations}</Table.Cell>
          <Table.Cell textAlign='center'>
            {this.drawConversationType(conversation.type)}
          </Table.Cell>
        </Table.Row>
        {isModalOpen && (
          <ConversationModal
            conversation={conversation}
            messages={messages}
            getConversationsMessages={getConversationsMessages}
            visible={isModalOpen}
            onModalClose={this.onTrigerModal}
            correctIntents={correctIntents}
            availableIntents={availableIntents}
          />
        )}
      </>
    );
  }
}

ConversationsTableRow.propTypes = {
  conversation: PropTypes.object.isRequired,
  messsages: PropTypes.object,
  getConversationsMessages: PropTypes.func.isRequired,
  correctIntents: PropTypes.func.isRequired,
  availableIntents: PropTypes.object.isRequired
};

export default withRouter(ConversationsTableRow);
