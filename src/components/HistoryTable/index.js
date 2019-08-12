import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Table } from 'semantic-ui-react';
import FilterBar from '../FilterBar';
import HistoryTableRow from './HistoryTableRow';
import './styles.css';

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
                  Загрузить ещё
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
            История нераспознанных сообщений
          </div>
          <FilterBar setNewFilterParameters={this.setNewFilterParameters} />        
        </div>
        <Table celled compact>
          <Table.Header>
            <Table.Row className='history-table-row'>
              <Table.HeaderCell textAlign='center'>
                Дата сообщения
              </Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Сессия</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Сообщение</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>
                Распознаное системой намерение
              </Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>
                Скорректированное намерение
              </Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Тип</Table.HeaderCell>
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
