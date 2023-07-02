import {createSlice} from '@reduxjs/toolkit';
import {asyncLoginAction, asyncRegisterAction} from '../actions/auth';

const initialState = {
    token: null,
    errorMessage: '',
    warningMessage: '',
    formError: [],
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setErrorMessage: (state, action) => {
            state.errorMessage = action.payload;
        },
        setWarningMessage: (state, action) => {
            state.warningMessage = action.payload;
        },
        clearMessage: state => {
            state.errorMessage = '';
            state.warningMessage = '';
        },
        clearFormError: state => {
            state.formError = [];
        },
        logout: () => {
            return initialState;
        },
    },
    extraReducers: builder => {
        builder.addCase(asyncLoginAction.rejected, (state, action) => {
            if (typeof action.payload === 'string') {
                state.errorMessage = action.payload;
            } else {
                state.formError = action.payload;
            }
        });

        builder.addCase(asyncLoginAction.fulfilled, (state, action) => {
            if (typeof action.payload === 'string') {
                state.token = action.payload;
            } else {
                state.formError = action.payload;
            }
        });
        builder.addCase(asyncRegisterAction.rejected, (state, action) => {
            if (typeof action.payload === 'string') {
                state.errorMessage = action.payload;
            } else {
                state.formError = action.payload;
            }
        });

        builder.addCase(asyncRegisterAction.fulfilled, (state, action) => {
            if (typeof action.payload === 'string') {
                state.token = action.payload;
            } else {
                state.formError = action.payload;
            }
        });
    },
});

export const {
    logout,
    setErrorMessage,
    setWarningMessage,
    clearMessage,
    clearFormError,
} = authSlice.actions;
export default authSlice.reducer;
