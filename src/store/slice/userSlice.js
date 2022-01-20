/*import { createSlice } from '@reduxjs/toolkit';



const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser(state, action){
            state.token = action.payload.token;
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.name = action.payload.name;
            state.avatar = action.payload.avatar;
            state.extraDetails = action.payload.extraDetails;
            state.skills = action.payload.skills;
            state.profession = action.payload.profession;
            state.details = action.payload.details;
            state.dataCreated = action.payload.dataCreated;
        },
        removeUser(state){
            state.token = null;
            state.id = null;
            state.email = null;
            state.name = null;
            state.avatar = null;
            state.extraDetails = null;
            state.skills = null;
            state.profession = null;
            state.details = null;
            state.dataCreated = null;
        }
    },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;

*/