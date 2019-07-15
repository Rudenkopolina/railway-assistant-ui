import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Input, Checkbox, Button } from 'semantic-ui-react';
import './styles.css';
import moment from 'moment';
const mass = ['Telegram', 'Viber', 'Phone'];
class ConversationFilterBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterStringEnd: '',
      filterStringStart: ''
    };
  }

  onFilterChange = (filterString, tabIndex) => {
    if (tabIndex == 2) {
      this.setState({ filterStringEnd: filterString });
      return;
    }
    this.setState({ filterStringStart: filterString });
  };

  makeSearch = () => {
    const { filterStringStart, filterStringEnd } = this.state;
    let intervalString = '';
    if (filterStringStart.length > 0 || filterStringEnd.length > 0) {
      intervalString = `?to=${moment(filterStringEnd).format('YYYY-MM-DD HH:mm:ss')}&from=${moment(filterStringStart).format('YYYY-MM-DD HH:mm:ss')}`;
    }
    this.props.getIntervalConversations(intervalString);
  };

  render() {
    const { filterStringStart, filterStringEnd } = this.state;

    return (
      <div className='flex-filter'>
        <div className='side-margin'>
          <label className='side-margin'>Начало</label>
          <Input
            id='1'
            placeholder='YYYY-MM-DD HH:mm:ss'
            value={filterStringStart}
            onChange={({ target }) =>
              this.onFilterChange(target.value, target.id)
            }
          />
        </div>
        <div className='side-margin'>
          <label className='side-margin'>Окончание</label>
          <Input
            id='2'
            placeholder='YYYY-MM-DD HH:mm:ss'
            value={filterStringEnd}
            onChange={({ target }) =>
              this.onFilterChange(target.value, target.id)
            }
          />
        </div>
        <Button
          className='side-margin'
          circular
          icon='search'
          onClick={this.makeSearch}
        />
        <div className='flex-filter center-filter-items'>
          {mass.map((m, i) => (
            <Checkbox key={i} className='side-margin' label={m} />
          ))}
        </div>
      </div>
    );
  }
}

ConversationFilterBar.propTypes = {
  getIntervalConversations: PropTypes.func.isRequired
};

export default withRouter(ConversationFilterBar);
