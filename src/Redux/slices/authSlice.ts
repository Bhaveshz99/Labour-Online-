import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../rootReducer';

const initialState: any = {};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state = action.payload
        },
        editUser: (state, action) => {
            const { id, name, email } = action.payload;
            const existingUsers = state.find((user: any) => user.id === id);
            if (existingUsers) {
                existingUsers.name = name;
                existingUsers.email = email;
            }
        },
        deleteUser: (state, action) => {
            const { id } = action.payload;
            const existingUsers = state.find((user: any) => user.id === id);
            if (existingUsers) {
                return state.filter((user: any) => user.id !== id);
            }
        }
    }
});

export const { addUser, editUser, deleteUser } = userSlice.actions;
export const users = (state: RootState) => state.user
export default userSlice.reducer;