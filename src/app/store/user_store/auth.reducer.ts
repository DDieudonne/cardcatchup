// import { Action, createReducer, on } from "@ngrx/store";
// import * as authActions from './auth.actions';

// export const authFeatureName = 'auth';

// export interface AuthState {
//     profile: string | null;
//     isLoggedIn: boolean;
// }

// const initialState: AuthState = {
//     profile: null,
//     isLoggedIn: false,
// };

// const authReducerInternal = createReducer(
//     initialState,

//     on(authActions.loginComplete, (state, { profile, isLoggedIn }) => {
//         return {
//             ...state,
//             profile,
//             isLoggedIn,
//         };
//     }),
//     on(authActions.logout, (state, { }) => {
//         return {
//             ...state,
//             profile: null,
//             isLoggedIn: false,
//         };
//     })
// );

// export function authReducer(state: AuthState | undefined, action: Action) {
//     return authReducerInternal(state, action);
// }