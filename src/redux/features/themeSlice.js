import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    isDark: true
}


export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {

        darkMode: (state) => {
            state.isDark = !state.isDark;
        }

    }
})


export const { darkMode } = themeSlice.actions;
export default themeSlice.reducer;  