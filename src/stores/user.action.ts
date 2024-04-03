import type { LoginParams } from '../interface/user/login';
import type { Dispatch } from '@reduxjs/toolkit';

import { apiLogin, apiLogout } from '../api/user.api';
import { setUserItem } from './user.store';
import { createAsyncAction } from './utils';
// typed wrapper async thunk function demo, no extra feature, just for powerful typings
export const loginAsync = createAsyncAction<LoginParams, boolean>(payload => {
  return async dispatch => {
    const { data, code } = await apiLogin(payload);

    if (code==200) {
      localStorage.setItem('t', data.token);
      localStorage.setItem('username', data.username);
      dispatch(
        setUserItem({
          logged: true,
          username: data.username,
        }),
      );

      return true;
    }

    return false;
  };
});

export const logoutAsync = () => {
  return async (dispatch: Dispatch) => {
    const { code } = await apiLogout({ token: localStorage.getItem('t')! });

    if (code==200) {
      localStorage.clear();
      dispatch(
        setUserItem({
          logged: false,
        }),
      );

      return true;
    }

    return false;
  };
};
