import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {Icon, Table} from 'semantic-ui-react';

import './styles.css';
import moment from 'moment';
import FilterBar from '../FilterBar';


class HistoryTable extends React.Component {

  setNewFilterParameters = (fromDate, toDate, source, type) => {
    this.props.getFilteredConversations({ fromDate, toDate, source, type });
  };

  drawMoreButton = () => {
    const {currentPage, pages, onMoreClick} = this.props;
    if (currentPage < pages) {
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

  drawConversationType = (type) => {
    switch(type) {
      case "VOICE": return (<div><Icon name='microphone' size='small'/>Голос</div>);
      case "TEXT": return (<div><Icon name='align justify' size='small'/>Текст</div>);
      case "MIXED": return (<div><Icon name='sync' size='small'/>Смешанный</div>);
      case "UNKN": return (<div><Icon name='question circle' size='small'/>Неизвестен</div>);
      default: return (<div><Icon name='question circle' size='small'/>Неизвестен</div>);
    }
  };

  render() {
    const {messages} = this.props;
    return (
      <div className='table-container-history'>
        <div className='table-container-flex-history'>
          <div className='chat-irrelevant-history-title'>
            История нераспознанных сообщений
          </div>
          <div className='element-mb'>
            <FilterBar
              setNewFilterParameters={this.setNewFilterParameters}
            />
          </div>
        </div>
        <Table celled compact>
          <Table.Header>
            <Table.Row className='history-table-row'>
              <Table.HeaderCell textAlign='center'>
                Дата сообщения
              </Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Сессия</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Сообщение</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Распознаное системой намерение</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Скорректированное намерение</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Тип</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {messages.map((message, index) => (
              <Table.Row
                className='history-table-row'
                key={index}
                onClick={() => this.props.onConversationClick(message)}
              >
                <Table.Cell textAlign='center'>
                  {moment(message.timestamp).format('DD.MM.YYYY HH:mm:ss')}
                </Table.Cell>
                <Table.Cell textAlign='center'>
                  {message.session}
                </Table.Cell>
                <Table.Cell textAlign='center'>
                  {message.requestText}
                </Table.Cell>
                <Table.Cell textAlign='center'>
                  {message.detectedIntentDescription}
                </Table.Cell>
                <Table.Cell textAlign='center'>
                  {message.correctedIntentDescription }
                </Table.Cell>
                <Table.Cell textAlign='center'>
                  {this.drawConversationType(message.type)}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          {this.drawMoreButton()}
        </Table>
      </div>
    );
  }
}
HistoryTable.propTypes = {
  messages: PropTypes.array.isRequired,
  pages: PropTypes.number.isRequired,
  onMoreClick: PropTypes.func.isRequired,
  onConversationClick: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  getFilteredConversations: PropTypes.func.isRequired
};

export default withRouter(HistoryTable);
