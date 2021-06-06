
const initialstate = {
    vikas: 0,
    UserData:'Shubham U'
}

export const SignInReducer = (state=initialstate,action) => {
    if(action.type == 'PASS_SIGN'){
        return{UserData:action.payload}
    }
 
    return state
} 