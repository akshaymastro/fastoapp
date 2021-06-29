
const initialstate = {
    vikas: 0,
    UserData:{},
    Mobile:'',
    Otp:'',
    LoggedInUser:{}
}



export const reducers = (state=initialstate,action) => {
    if(action.type == 'INCREASE_COUNTER'){
        return{vikas:state.vikas+1} 
    }
    if(action.type == 'PASS_SIGN'){
        return{...state.UserData,
            UserData:action.payload}
    }
    if(action.type == 'Mob_Ile'){
        return{Mobile:action.payload}
    }
    if(action.type == 'Logged_In_User'){
        return{LoggedInUser:action.payload}
    }
 
    return state
} 