import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    status: false,
    userData: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authLogin: (state, action) => {
            state.status = true;
            state.userData = action.payload;
        },

        authLogout: (state) => {
            state.status = false;
            state.userData = null;
        }
    }
})


export const {authLogin, authLogout } = authSlice.actions;

export default authSlice.reducer;