import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import './styles.css';
import moment from "moment";

class ConversationsTable extends React.Component {

  drawMoreButton = () => {
    if (this.props.currentPage < this.props.pages) {
      return (
        <tfoot>
        <tr>
          <th colSpan="4">
            <div className='block-pagination'>
              <button className="ui right labeled icon button" onClick={this.props.onMoreClick}>
                <i className="right arrow icon"></i>Загрузить ещё
              </button>
            </div>
          </th>
        </tr>
        </tfoot>)
    }
  };

  render() {
    return (
        <table className="ui celled padded table">
          <thead>
          <tr>
            <th><div className="cell-header">Дата начала</div></th>
            <th><div className="cell-header">Дата конца</div></th>
            <th><div className="cell-header">Сессия</div></th>
            <th><div className="cell-header">Количество шагов</div></th>
          </tr>
          </thead>
          <tbody>
          {this.props.conversations.map((conversation, index) => {
            return (<tr key={index} className='table-row' onClick={() => this.props.onConversationClick(conversation)}>
              <td><div className="cell-body">{(moment(conversation.timestamp_start)).format('DD.MM.YYYY HH:mm:ss')}</div></td>
              <td><div className="cell-body">{(moment(conversation.timestamp_end)).format('DD.MM.YYYY HH:mm:ss')}</div></td>
              <td><div className="cell-body">{conversation.session}</div></td>
              <td><div className="cell-body">{conversation.iterations}</div></td>
            </tr>)
          })}
          </tbody>
          {this.drawMoreButton()}
        </table>
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
