import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Table } from 'semantic-ui-react';
import FilterBar from '../FilterBar';
import HistoryTableRow from './HistoryTableRow';
import './styles.css';
import { LABELS } from '../../constants/labels_en';

class HistoryTable extends React.Component {
  setNewFilterParameters = (fromDate, toDate, source, type, text) => {
    this.props.getFilteredConversations({
      fromDate,
      toDate,
      source,
      type,
      text
    });
  };

  drawMoreButton = () => {
    const { currentPage, messages, onMoreClick } = this.props;
    if (currentPage < messages.pages) {
      return (
        <tfoot>
          <tr>
            <th colSpan='6'>
              <div className='block-pagination'>
                <button
                  className='ui right labeled icon button'
                  onClick={onMoreClick}
                >
                  <i className='right arrow icon' />
                  {LABELS.LOAD_MORE}
                </button>
              </div>
            </th>
          </tr>
        </tfoot>
      );
    }
  };

  render() {
    const { availableIntents, correctIntents } = this.props;
    const { intents } = this.props.messages;
    return (
      <div className='table-container-history'>
        <div className='table-container-flex-history'>
          <div className='chat-irrelevant-history-title'>
            {LABELS.UNRECOGNIZED_INTENTS}
          </div>
          <FilterBar setNewFilterParameters={this.setNewFilterParameters} />        
        </div>
        <Table celled>
          <Table.Header>
            <Table.Row className='history-table-row'>
              <Table.HeaderCell textAlign='center'>
                {LABELS.MESSAGE_DATE}
              </Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>{LABELS.SESSION}</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>{LABELS.MESSAGE}</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>
                {LABELS.RECOGNIZED_INTENT}
              </Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>
                {LABELS.CORRECTED_INTENT}
              </Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>{LABELS.TYPE}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {intents.map(message => (
              <HistoryTableRow  key={message.id} message={message} availableIntents={availableIntents} correctIntents={correctIntents} />
            ))}
          </Table.Body>
          {this.drawMoreButton()}
        </Table>
      </div>
    );
  }
}
HistoryTable.propTypes = {
  messages: PropTypes.object.isRequired,
  availableIntents: PropTypes.object.isRequired,
  onMoreClick: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  getFilteredConversations: PropTypes.func.isRequired,
  correctIntents: PropTypes.func.isRequired
};

export default withRouter(HistoryTable);
