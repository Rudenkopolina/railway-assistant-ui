import React from 'react';
import './Users.css';
import UserCard from '../../components/UserCard/UserCard';
import Filter from './../../components/Filter';
import IntentModal from '../../components/IntentModal';

const demoData = [
  { username: 'rudenkopolina@gmail.com', name: 'ФИО', privilege: "Super Admin", id: 1 },
  { username: 'rudenkopolina@icloud.com', name: 'Фамилия', privilege: 'Главный администратор', id: 2 },
  { username: 'polina1997@mail.ru', name: 'Фамилия Имя Отчество', privilege: 'Редактор ответов', id: 3 },
  { username: 'mmf.rudenkope@bsu.by', name: 'ДлиннаяФамилия Имя Отчество', privilege: 'Редактор базы знаний', id: 4 },
  { username: 'rudenkopolina@yandex.com', name: 'ОченьДлиннаяФамилия Имя Отчество', privilege: 'Главный редактор', id: 5 },
]

const options = [
  { text: 'Super Admin', value: 'Super Admin' },
  { text: 'Главный администратор', value: 'Главный администратор' },
  { text: 'Редактор ответов', value: 'Редактор ответов' },
  { text: 'Редактор базы знаний', value: 'Редактор базы знаний' },
  { text: 'Главный редактор', value: 'Главный редактор' }
]


class Users extends React.Component {
  state = {
    data: demoData,
    filterString: ''
  }

  onFilterChange = (filterString) => {
    this.setState({ filterString });
}

  render() {
    const { data, filterString } = this.state;
    const filterStringLowerCase = filterString.toLowerCase();

    const filteredAnswers = filterStringLowerCase ?
          data.filter(user => user.name.toLowerCase().indexOf(filterStringLowerCase) > -1
          || user.username.toLowerCase().indexOf(filterStringLowerCase) > -1
          || user.privilege.toLowerCase().indexOf(filterStringLowerCase) > -1)
          :
          data;
    const titles = ['ФИО', 'Логин', 'Роль']
    return (
      <div className='answer-table-container container'>
      <div className='user-page-title-wrapper'>
        <div className='user-page-title'>
          <div className='user-group-title'>Belarusian Railways</div>
          <Filter filterString={filterString} onFilterChange={this.onFilterChange} />
        </div>
        <IntentModal
          buttonText='Добавить сотрудника'
          className='action-button'
          modalTitle='Добавить справочный ответ'
          onSave={(data) => this.props.createResponse(data)}
        />
      </div>
      {
        <div className="users-title-row">
          {titles.map(item =>
            <div className="users-title-content">
              {item}
            </div>
          )}
        </div>
      }
        {filteredAnswers.map((user, index) => (
          <UserCard
            key={index}
            user={user}
            index={index}
            options={options}
          />
        ))}
      </div>
    );
  }
}

export default Users;
