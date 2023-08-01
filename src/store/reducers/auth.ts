import {GoogleProvider} from '@app/utils/oidc-providers';
import {createSlice} from '@reduxjs/toolkit';
import { User } from 'oidc-client-ts';

export interface AuthState {
  authentication?: User,
  roles?: string[],
  email?: string,  // Agrega esta línea para almacenar el email en el estado
  name?: string,  // Agrega esta línea para almacenar el nombre en el estado
  lastname?: string  // Agrega esta línea para almacenar el apellido en el estado
}

const initialState: AuthState = {
  authentication: undefined,
  roles: undefined,
  email: undefined,  // Agrega esta línea para inicializar el email en el estado
  name: undefined,  // Agrega esta línea para inicializar el nombre en el estado
  lastname: undefined  // Agrega esta línea para inicializar el apellido en el estado
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthentication: (state: any, {payload}: any) => {
      state.authentication = payload;
      state.roles = payload.roles;
      state.email = payload.email;  // Agrega esta línea para actualizar el email en el estado
      state.name = payload.name;  // Agrega esta línea para actualizar el nombre en el estado
      state.lastname = payload.lastname;  // Agrega esta línea para actualizar el apellido en el estado
    }
  }
});

export const {setAuthentication} = authSlice.actions;

export default authSlice.reducer;
