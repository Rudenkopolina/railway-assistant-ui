import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import Protected from '../../components/common/protected/container';
import { LABELS } from '../../constants/labels_en';
import './styles.css';

const pageList = [
  { key: '/account', value: LABELS.PROFILE, icon: 'user', requiredRoles: '' },
  {
    key: '/answers',
    value: LABELS.ANSWERS,
    icon: 'comments',
    requiredAnyRoles: [
      'ALLOWED_ANSWERS_VIEWING',
      'ALLOWED_KNOWLEDGEBASE_VIEWING'
    ]
  },
  {
    key: '/users',
    value: LABELS.EMPLOYEES,
    icon: 'group',
    requiredRoles: 'ALLOWED_USERS_CREATION'
  },
  {
    key: '/statistics',
    value: LABELS.USAGE_STATISTICS,
    icon: 'dashboard',
    requiredAnyRoles: [
      'ALLOWED_USAGE_STATISTICS_VIEWING',
      'ALLOWED_CONVERSATION_STATISTICS_VIEWING'
    ]
  },
  {
    key: '/group/environment',
    value: LABELS.CONNECTED_ENVIRONMENT,
    icon: 'plug',
    requiredRoles: ''
  },
  {
    key: '/logs/conversations',
    value: LABELS.CONVERSATION_HISTORY,
    icon: 'history',
    requiredRoles: 'ALLOWED_LOGS_VIEWING'
  },
  {
    key: '/history/irrelevant',
    value: LABELS.UNRECOGNIZED_INTENTS,
    icon: 'question circle',
    requiredRoles: 'ALLOWED_HISTORY_VIEWING'
  },
  {
    key: '/monitoring',
    value: LABELS.MONITORING,
    icon: 'info circle',
    requiredRoles: 'ALLOWED_MONITORING_VIEWING'
  }
];

class HomePage extends React.Component {
  render() {
    return (
      <div className='home container'>
        <div className='cards-wrapper'>
          {pageList.map(item => (
            <Protected
              requiredRoles={item.requiredRoles}
              requiredAnyRoles={item.requiredAnyRoles}
              key={item.key}
            >
              <Link to={item.key}>
                <div className='card'>
                  <Icon name={item.icon} className='home-icon' size='big' />
                  {item.value}
                </div>
              </Link>
            </Protected>
          ))}
        </div>
      </div>
    );
  }
}

export default HomePage;
