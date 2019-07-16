import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {Icon, Table} from 'semantic-ui-react';

import './styles.css';
import moment from 'moment';
import ConversationFilterBar from './ConversationFilterBar';


class ConversationsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      column: null,
      direction: null,
      conversatios: [],
      intervalString: ''
    };
  }

  static getDerivedStateFromProps(props) {
    if (props.conversations) {
      return {
        conversatios: props.conversations
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

  propComparator = value => {
    return function(a, b) {
      return Date.parse(a[value]) - Date.parse(b[value]);
    };
  };

  handleSort = clickedColumn => () => {
    const { column, conversatios, direction } = this.state;
    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        conversatios: conversatios.sort(this.propComparator(clickedColumn)),
        direction: 'ascending'
      });
      return;
    }
    this.setState({
      conversatios: conversatios.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending'
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
    }
  };

  render() {
    const { column, direction, conversatios } = this.state;
    return (
      <div className='table-container'>
        <div className='table-container-flex'>
          <div className='chat-history-title'>История разговоров</div>
          <div className='element-mb'>
            <ConversationFilterBar
              setNewFilterParameters={this.setNewFilterParameters}
            />
          </div>
        </div>
        <Table sortable celled compact>
          <Table.Header>
            <Table.Row className='table-row'>
              <Table.HeaderCell
                textAlign='center'
                sorted={column === 'timestamp_start' ? direction : null}
                onClick={this.handleSort('timestamp_start')}
              >
                Дата начала
              </Table.HeaderCell>
              <Table.HeaderCell
                textAlign='center'
                sorted={column === 'timestamp_end' ? direction : null}
                onClick={this.handleSort('timestamp_end')}
              >
                Дата конца
              </Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Сессия</Table.HeaderCell>
              <Table.HeaderCell
                textAlign='center'
                sorted={column === 'iterations' ? direction : null}
                onClick={this.handleSort('iterations')}
              >
                Количество шагов
              </Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Тип</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {conversatios.map((conversation, index) => (
              <Table.Row
                className='table-row'
                key={index}
                onClick={() => this.props.onConversationClick(conversation)}
              >
                <Table.Cell textAlign='center'>
                  {moment(conversation.timestamp_start).format(
                    'DD.MM.YYYY HH:mm:ss'
                  )}
                </Table.Cell>
                <Table.Cell textAlign='center'>
                  {moment(conversation.timestamp_end).format(
                    'DD.MM.YYYY HH:mm:ss'
                  )}
                </Table.Cell>
                <Table.Cell textAlign='center'>
                  {conversation.session}
                </Table.Cell>
                <Table.Cell textAlign='center'>
                  {conversation.iterations}
                </Table.Cell>
                <Table.Cell textAlign='center'>
                  {this.drawConversationType(conversation.type)}
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
ConversationsTable.propTypes = {
  conversations: PropTypes.array.isRequired,
  pages: PropTypes.number.isRequired,
  onMoreClick: PropTypes.func.isRequired,
  onConversationClick: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  getFilteredConversations: PropTypes.func.isRequired
};

export default withRouter(ConversationsTable);
