const INITAL_STATE = {
    username : '',
    role : ''
}

const authReducer = (state = INITAL_STATE, action) => {
    switch(action.type){
        case 'LOGIN':
            return {
                ...state,
                username: action.payload.username,
                role: action.payload.role
            }
        case 'LOGOUT':
            return INITAL_STATE
        default:
            return state
    } 
}

export default authReducer;