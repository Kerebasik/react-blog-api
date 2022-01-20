import { createStore } from "redux";

const initialState = {
    token:null,
    name:null
    /*id:null,
    email:null,
    name:null,
    avatar:null,
    extraDetails:null,
    skills:null,
    profession:null,
    details:null,
    dataCreated:null,*/
};

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case 'ADD_USER_TOKEN':
            return {...state, token:action.payload}
        case 'ADD_USER_NAME':
            return {...state, name:action.payload}
        case 'DELETE_USER':
            return {...state, token:null, name:null}
        default:
            return state;
    }
}


const store = createStore(reducer);

export default store