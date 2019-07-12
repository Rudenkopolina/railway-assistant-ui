import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Table } from 'semantic-ui-react';
import Filter from '../Filter';
import './styles.css';
import moment from 'moment';

class ConversationsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      column: null,
      direction: null,
      data: [],
      filterString:''
    };
  }

  static getDerivedStateFromProps(props) {
    if (props.conversations) {
      return {
        data: props.conversations
      };
    }
  }

  propComparator = value => {
    return function(a, b) {
      return Date.parse(a[value]) - Date.parse(b[value])
    };
  };

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state;
    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: data.sort(this.propComparator(clickedColumn)),
        direction: 'ascending'
      });
      return;
    }
    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending'
    });
  };

  drawMoreButton = () => {
    if (this.props.currentPage < this.props.pages) {
      return (
        <tfoot>
          <tr>
            <th colSpan='4'>
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

  onFilterChange = filterString => {
    this.setState({ filterString });
  };

  getFilteredRows = conversatiosData => {
    const { filterString } = this.state;
    return filterString
      ? conversatiosData.filter(
        conversation => moment(conversation.timestamp_start).format('DD.MM.YYYY HH:mm:ss').indexOf(filterString) > -1 ||
          moment(conversation.timestamp_end).format('DD.MM.YYYY HH:mm:ss').indexOf(filterString) > -1
      ) : conversatiosData;
  };

  render() {
    const { column, direction, data, filterString } = this.state;
    const filteredRows = this.getFilteredRows(data);
    
    return (
      <div className='table-container'>
        <div className='table-container-flex'>
          <div className='chat-history-title'>История разговоров</div>
          <div className='element-mb'>
          <Filter
            filterString={filterString}
            onFilterChange={this.onFilterChange}
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
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {filteredRows.map((conversation, index) => (
            <Table.Row className='table-row'
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
              <Table.Cell textAlign='center'>{conversation.session}</Table.Cell>
              <Table.Cell textAlign='center'>
                {conversation.iterations}
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
  currentPage: PropTypes.number.isRequired
};

export default withRouter(ConversationsTable);
