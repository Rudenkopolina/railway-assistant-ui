export const GET_USERS = 'GET_USERS';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAIL = 'GET_USERS_FAIL';

export const CREATE_USER = 'CREATE_USER';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAIL = 'CREATE_USER_FAIL';

export const DELETE_USER = 'DELETE_USER';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAIL = 'DELETE_USER_FAIL';


export function getAllUsers() {
  return async dispatch => {
    dispatch({
      type: GET_USERS
    });

    try {
      // const res = await request(urls.responses.commonResponses);
      const demoData = [
        { username: 'rudenkopolina@gmail.com', name: 'ФИО', privilege: "Super Admin", id: 1 },
        { username: 'rudenkopolina@icloud.com', name: 'Фамилия', privilege: 'Главный администратор', id: 2 },
        { username: 'polina1997@mail.ru', name: 'Фамилия Имя Отчество', privilege: 'Редактор ответов', id: 3 },
        { username: 'mmf.rudenkope@bsu.by', name: 'ДлиннаяФамилия Имя Отчество', privilege: 'Редактор базы знаний', id: 4 },
        { username: 'rudenkopolina@yandex.com', name: 'ОченьДлиннаяФамилия Имя Отчество', privilege: 'Главный редактор', id: 5 },
      ]
      dispatch({
        type: GET_USERS_SUCCESS,
        users: demoData
      });

    } catch (err) {
      dispatch({
        type: GET_USERS_FAIL
      });
    }
  };
}

export function createUser(data) {
  return async dispatch => {
    dispatch({
      type: CREATE_USER
    });
    try {
      // const response = await request(urls.responses.createReferenceResponse, { method: 'POST',  body: { ...data } });
      dispatch({
        type: CREATE_USER_SUCCESS,
        user: {...data, id: Math.floor(Math.random()*100) }
      });

    } catch (err) {
      dispatch({
        type: CREATE_USER_FAIL
      });
    }
  };
}

export function deleteUser(id) {
  return async dispatch => {
    dispatch({
      type: DELETE_USER
    });

    try {
      // await request(urls.responses.deleteReferenceResponse(id), { method: 'DELETE' });
      dispatch({
        type: DELETE_USER_SUCCESS,
        deleteId: id
      });

    } catch (err) {
      dispatch({
        type: DELETE_USER_FAIL
      });
    }
  };
}
