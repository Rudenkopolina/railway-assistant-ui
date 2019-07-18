import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {Icon, Table} from 'semantic-ui-react';

import './styles.css';
import moment from 'moment';
import HistoryFilterBar from './HistoryFilterBar';


class HistoryTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  static getDerivedStateFromProps(props) {
    if (props.messages) {
      return {
        messages: props.messages
      };
    }
  }

  setNewFilterParameters = (fromDate, toDate, source, type) => {
    this.props.getFilteredConversations({
      "fromDate": fromDate ? fromDate : undefined,
      "toDate": toDate ? toDate : undefined,
      "source": source ? source : undefined,
      "type": type ? type : undefined
    });
  };

  drawMoreButton = () => {
    if (this.props.currentPage < this.props.pages) {
      return (
        <tfoot>
          <tr>
            <th colSpan='5'>
              <div className='block-pagination'>
                <button
                  className='ui right labeled icon button'
                  onClick={this.props.onMoreClick}
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
    const messages = this.props.messages;
    return (
      <div className='table-container'>
        <div className='table-container-flex'>
          <div className='chat-history-title'>История намерений</div>
          <div className='element-mb'>
            <HistoryFilterBar
              setNewFilterParameters={this.setNewFilterParameters}
            />
          </div>
        </div>
        <Table celled compact>
          <Table.Header>
            <Table.Row className='history-table-row'>
              <Table.HeaderCell textAlign='center'>Дата сообщения</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Сессия</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Сообщение</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Намерение</Table.HeaderCell>
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
                  {moment(message.timestamp).format(
                    'DD.MM.YYYY HH:mm:ss'
                  )}
                </Table.Cell>
                <Table.Cell textAlign='center'>
                  {message.session}
                </Table.Cell>
                <Table.Cell textAlign='center'>
                  {message.requestText}
                </Table.Cell>
                <Table.Cell textAlign='center'>
                  {message.detectedIntent}
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
