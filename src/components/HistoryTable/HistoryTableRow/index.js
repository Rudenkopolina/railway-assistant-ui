import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Icon, Table } from 'semantic-ui-react';
import moment from 'moment';
import IntentsEditorModal from '../../ConversationsTable/IntentsEditorModal';
import './styles.css';
import { LABELS } from '../../../constants/labels_en';

class HistoryTableRow extends React.Component {
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
    const { message, availableIntents, correctIntents } = this.props;
    return (
      <>
        <Table.Row className='history-table-row' onClick={this.onTrigerModal}>
          <Table.Cell textAlign='center'>
            {moment(message.timestamp).format('DD.MM.YYYY HH:mm:ss')}
          </Table.Cell>
          <Table.Cell textAlign='center'>{message.session}</Table.Cell>
          <Table.Cell textAlign='center'>{message.requestText}</Table.Cell>
          <Table.Cell textAlign='center'>
            {/* {message.detectedIntentDescription} */}
            {message.detectedIntent}
          </Table.Cell>
          <Table.Cell textAlign='center'>
            {/* {message.correctedIntentDescription} */}
            {message.correctedIntent}
          </Table.Cell>
          <Table.Cell textAlign='center'>
            {this.drawConversationType(message.type)}
          </Table.Cell>
        </Table.Row>
        {isModalOpen && (
          <IntentsEditorModal
            isModalOpen={isModalOpen}
            onTrigerModal={this.onTrigerModal}
            availableIntents={availableIntents.intents}
            message={message}
            correctIntents={correctIntents}
          />
        )}
      </>
    );
  }
}

HistoryTableRow.propTypes = {
  message: PropTypes.object.isRequired,
  correctIntents: PropTypes.func.isRequired
};

export default withRouter(HistoryTableRow);
