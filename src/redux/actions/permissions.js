export const GET_PERMISSIONS = 'GET_PERMISSIONS';
export const GET_PERMISSIONS_SUCCESS = 'GET_PERMISSIONS';
export const GET_PERMISSIONS_FAIL = 'GET_PERMISSIONS';

export function getPermissions() {
  return async dispatch => {
    dispatch({
      type: GET_PERMISSIONS
    });

    try {
      const response = await request(urls.responses.getPermissions);
      dispatch({
        type: GET_PERMISSIONS_SUCCESS,
        permissions: response.privileges
      });
    } catch (err) {
      dispatch({
        type: GET_PERMISSIONS_FAIL
      });
    }
  };
}
