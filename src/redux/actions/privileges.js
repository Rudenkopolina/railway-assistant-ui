export const GET_PRIVILEGES = 'GET_PRIVILEGES';
export const GET_PRIVILEGES_SUCCESS = 'GET_PRIVILEGES_SUCCESS';
export const GET_PRIVILEGES_FAIL = 'GET_PRIVILEGES_FAIL';

export const CREATE_PRIVILEGES = 'CREATE_PRIVILEGES';
export const CREATE_PRIVILEGES_SUCCESS = 'CREATE_PRIVILEGES_SUCCESS';
export const CREATE_PRIVILEGES_FAIL = 'CREATE_PRIVILEGES_FAIL';

export const CHANGE_PRIVILEGES = 'CHANGE_PRIVILEGES';
export const CHANGE_PRIVILEGES_SUCCESS = 'CHANGE_PRIVILEGES_SUCCESS';
export const CHANGE_PRIVILEGES_FAIL = 'CHANGE_PRIVILEGES_FAIL';

export function getPrivileges() {
  return async dispatch => {
    dispatch({
      type: GET_PRIVILEGES
    });

    try {
      const response = await request(urls.responses.getPrivileges);

      dispatch({
        type: GET_PRIVELEGES_SUCCESS,
        privileges: response.privileges
      });
    } catch (err) {
      dispatch({
        type: GET_PRIVILEGES_FAIL
      });
    }
  };
}

// export function createPrivilege(data) {
//   return async dispatch => {
//     dispatch({
//       type: CREATE_PRIVILEGES
//     });
//     try {
//       const response = await request(urls.responses.createPrivilege, {
//         method: 'POST',
//         body: { ...data }
//       });
//       dispatch({
//         type: CREATE_PRIVILEGES_SUCCESS,
//         privilege: response.privileges
//       });
//     } catch (err) {
//       dispatch({
//         type: CREATE_PRIVILEGES_FAIL
//       });
//     }
//   };
// }

// export function deletePrivilege(data) {
//   return async dispatch => {
//     dispatch({
//       type: CHANGE_PRIVILEGES
//     });

//     try {
//       await request(urls.responses.deletePrivilege(id), { method: 'DELETE' });
//       dispatch({
//         type: CHANGE_PRIVILEGES_SUCCESS,
//         deleteId: id
//       });
//     } catch (err) {
//       console.log(err);
//       dispatch({
//         type: CHANGE_PRIVILEGES_FAIL
//       });
//     }
//   };
// }
