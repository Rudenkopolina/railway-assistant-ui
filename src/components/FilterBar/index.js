import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {Checkbox, Button, Input} from 'semantic-ui-react';
import './styles.css';
import moment from 'moment';
import { DateTimeInput } from 'semantic-ui-calendar-react';
import { LABELS } from '../../constants/labels_en';

class ConversationFilterBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messenger: {
        TELEGRAM: false,
        VIBER: false,
        PSTN: false,
        ALL: true
      },
      fromDate: '',
      toDate: '',
      source: 'ALL',
      text: ''
    };
  }

  onFilterChange = (name, value) => {
    this.setState({ [name]: value });
  };

    onCheckBoxChange = (event, element) => {
        event.preventDefault();
        const { messenger } = this.state;
        const messengers = Object.keys(messenger).reduce((acc, key) => { acc[key] = false; return acc; }, {})
        messengers[element.label] = true;
        this.setState({ messenger: messengers, source: element.label })
        // this.setState((state, props) => ({
        //   messenger: {
        //     ...state.messenger,
        //     [element.label]: !state.messenger[element.label]
        //   }
        // }));
    };

  makeSearch = () => {
    const { fromDate, toDate, source, type, text } = this.state;
    this.props.setNewFilterParameters(
      fromDate
        ? moment(fromDate, 'DD-MM-YYYY HH:mm')
            .utc()
            .format('YYYY-MM-DD HH:mm:ss')
        : null,
      toDate
        ? moment(toDate, 'DD-MM-YYYY HH:mm')
            .utc()
            .format('YYYY-MM-DD HH:mm:ss')
        : null,
      !!source.localeCompare('ALL') ? source : null,
      type ? type : null,
      text ? text : ""
    );
  };

  render() {
    const { messenger } = this.state;
    return (
      <div className='flex-filter'>
        <div className='side-margin'>
          <DateTimeInput
            // localization='ru'
            id='1'
            name='fromDate'
            placeholder={LABELS.START_DATE}
            iconPosition='left'
            onChange={(event, { name, value }) =>
              this.onFilterChange(name, value)
            }
            value={this.state.fromDate}
          />
        </div>
        <div className='side-margin'>
          <DateTimeInput
            // localization='ru'
            id='2'
            name='toDate'
            placeholder={LABELS.END_DATE}
            iconPosition='left'
            onChange={(event, { name, value }) =>
              this.onFilterChange(name, value)
            }
            value={this.state.toDate}
          />
        </div>
        <div className='side-margin'>
          <Input
            icon='comment'
            iconPosition='left'
            placeholder={LABELS.REQUEST}
            value={this.state.text}
            onChange={({ target }) => this.onFilterChange("text", target.value)}
          />
        </div>
        <div className='flex-filter center-filter-items'>
          {Object.keys(messenger).map((m, i) => (
            <Checkbox
              key={i}
              className='side-margin'
              label={m}
              checked={messenger[m]}
              onChange={this.onCheckBoxChange}
            />
          ))}
          <Button
            className='button-margin'
            circular
            icon='search'
            onClick={this.makeSearch}
          />
        </div>
      </div>
    );
  }
}

ConversationFilterBar.propTypes = {
  setNewFilterParameters: PropTypes.func.isRequired
};

export default withRouter(ConversationFilterBar);
