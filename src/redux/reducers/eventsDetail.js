import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    data: '',
};

const eventsDetail = createSlice({
    name: 'eventsDetail',
    initialState,
    reducers: {
        setEvent: (state, action) => {
            state.data = action.payload;
        },
    },
});

export const {setEvent} = eventsDetail.actions;
export default eventsDetail.reducer;
