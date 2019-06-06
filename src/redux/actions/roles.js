export const GET_ROLES = 'GET_ROLES';
export const GET_ROLES_SUCCESS = 'GET_ROLES_SUCCESS';
export const GET_ROLES_FAIL = 'GET_ROLES_FAIL';

export const CREATE_ROLE = 'CREATE_ROLE';
export const CREATE_ROLE_SUCCESS = 'CREATE_ROLE_SUCCESS';
export const CREATE_ROLE_FAIL = 'CREATE_ROLE_FAIL';

export const CHANGE_ROLE = 'CHANGE_ROLE';
export const CHANGE_ROLE_SUCCESS = 'CHANGE_ROLE_SUCCESS';
export const CHANGE_ROLE_FAIL = 'CHANGE_ROLE_FAIL';

export function getAllRoles() {
  return async dispatch => {
    dispatch({
      type: GET_ROLES
    });

    try {
      // const res = await request(urls.responses.commonResponses);
      const demoRoles = [
        {
          id: 1,
          name: 'Главный администратор',
          permissions: [
            'ALLOWED_USERS_CREATION',
            'ALLOWED_KNOWLEDGEBASE_VIEWING',
            'ALLOWED_KNOWLEDGEBASE_EDITING',
            'ALLOWED_ANSWERS_VIEWING',
            'ALLOWED_ANSWERS_EDITING',
            'ALLOWED_HISTORY_VIEWING',
          ],
        },
        {
          id: 2,
          name: 'Редактор ответов',
          permissions: [
            'ALLOWED_ANSWERS_VIEWING',
            'ALLOWED_ANSWERS_EDITING',
          ],
        },
        {
          id: 3,
          name: 'Редактор базы знаний',
          permissions: [
            'ALLOWED_KNOWLEDGEBASE_VIEWING',
            'ALLOWED_KNOWLEDGEBASE_EDITING',
          ],
        },
        {
          id: 4,
          name: 'Главный редактор',
          permissions: [
            'ALLOWED_KNOWLEDGEBASE_VIEWING',
            'ALLOWED_KNOWLEDGEBASE_EDITING',
            'ALLOWED_ANSWERS_VIEWING',
            'ALLOWED_ANSWERS_EDITING',
            'ALLOWED_HISTORY_VIEWING',
          ],
        },
      ]
      dispatch({
        type: GET_ROLES_SUCCESS,
        roles: demoRoles
      });

    } catch (err) {
      dispatch({
        type: GET_ROLES_FAIL
      });
    }
  };
}

export function createRole(data) {
  return async dispatch => {
    dispatch({
      type: CREATE_ROLE
    });
    try {
      // const response = await request(urls.responses.createReferenceResponse, { method: 'POST',  body: { ...data } });
      dispatch({
        type: CREATE_ROLE_SUCCESS,
        role: {...data, id: Math.floor(Math.random()*100) }
      });

    } catch (err) {
      dispatch({
        type: CREATE_ROLE_FAIL
      });
    }
  };
}

export function updateRole(data) {
  return async dispatch => {
    dispatch({
      type: CHANGE_ROLE
    });

    try {
      // await request(urls.responses.deleteReferenceResponse(id), { method: 'DELETE' });
      dispatch({
        type: CHANGE_ROLE_SUCCESS,
        data,
      });

    } catch (err) {
      console.log(err);
      dispatch({
        type: CHANGE_ROLE_FAIL
      });
    }
  };
}
