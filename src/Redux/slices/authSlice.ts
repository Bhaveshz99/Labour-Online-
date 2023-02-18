import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../rootReducer';

let initialState: any = [];

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            // return action.payload
            state.push(action.payload)
            return state
        },
        editUser: (state, action) => {
            const { id } = action.payload;
            const existingUsers = state.findIndex((user: any) => user.id === id);
            state[existingUsers] = action.payload;
            return state
        },
        deleteUser: (state, action) => {
            const { id } = action.payload;
            const existingUsers = state.find((user: any) => user._id === id);
            if (existingUsers) {
                return state.filter((user: any) => user._id !== id);
            }
        }
    }
});

export const { addUser, editUser, deleteUser } = userSlice.actions;
export const user = (state: RootState) => state.user
export default userSlice.reducer;