import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Table } from 'semantic-ui-react';
import FilterBar from '../FilterBar';
import ConversationsTableRow from './ConversationsTableRow';
import { LABELS } from '../../constants/labels_en';
import './styles.css';

class ConversationsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      column: null,
      direction: null,
      conversations: [],
      intervalString: ''
    };
  }

  static getDerivedStateFromProps(props) {
    if (props.conversations) {
      return {
        conversations: props.conversations.conversations
      };
    }
  }

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
    const { currentPage, conversations, onMoreClick } = this.props;
    if (currentPage < conversations.pages) {
      return (
        <tfoot>
          <tr>
            <th colSpan='5'>
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

  propComparator = value => {
    return function(a, b) {
      return Date.parse(a[value]) - Date.parse(b[value]);
    };
  };

  handleSort = clickedColumn => () => {
    const { column, conversations, direction } = this.state;
    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        conversations: conversations.sort(this.propComparator(clickedColumn)),
        direction: 'ascending'
      });
      return;
    }
    this.setState({
      conversations: conversations.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending'
    });
  };

  render() {
    const { column, direction, conversations } = this.state;
    const { correctIntents, availableIntents } = this.props;
    return (
      <div className='table-container'>
        <div className='table-container-flex'>
          <div className='chat-history-title'>
            {LABELS.CONVERSATION_HISTORY}
          </div>
          <FilterBar setNewFilterParameters={this.setNewFilterParameters} />
        </div>
        <Table sortable celled>
          <Table.Header>
            <Table.Row className='table-row'>
              <Table.HeaderCell
                textAlign='center'
                sorted={column === 'timestamp_start' ? direction : null}
                onClick={this.handleSort('timestamp_start')}
              >
                {LABELS.START_DATE}
              </Table.HeaderCell>
              <Table.HeaderCell
                textAlign='center'
                sorted={column === 'timestamp_end' ? direction : null}
                onClick={this.handleSort('timestamp_end')}
              >
                {LABELS.END_DATE}
              </Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>{LABELS.SESSION}</Table.HeaderCell>
              <Table.HeaderCell
                textAlign='center'
                sorted={column === 'iterations' ? direction : null}
                onClick={this.handleSort('iterations')}
              >
                {LABELS.STEPS}
              </Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>{LABELS.TYPE}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {conversations.map(conversation => (
              <ConversationsTableRow
                key={conversation.session}
                conversation={conversation}
                messages={this.props.conversations}
                getConversationsMessages={this.props.getConversationsMessages}
                correctIntents={correctIntents}
                availableIntents={availableIntents}
              />
            ))}
          </Table.Body>
          {this.drawMoreButton()}
        </Table>
      </div>
    );
  }
}

ConversationsTable.propTypes = {
  conversations: PropTypes.object.isRequired,
  currentPage: PropTypes.number.isRequired,
  getConversationsMessages: PropTypes.func.isRequired,
  onMoreClick: PropTypes.func.isRequired,
  getFilteredConversations: PropTypes.func.isRequired,
  correctIntents: PropTypes.func.isRequired,
  availableIntents: PropTypes.object.isRequired
};

export default withRouter(ConversationsTable);
