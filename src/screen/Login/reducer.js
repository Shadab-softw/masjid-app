/* eslint-disable prettier/prettier */
/* eslint-disable no-unreachable */

const initialState={
    token:null,
    userData:null,
    registerData:null

}

const loginType={
    LOGIN:'LOGIN',
    LOGIN_SUCCESS:'LOGIN_SUCCESS',
    LOGIN_FAILED:'LOGIN_FAILED'
}


export const loginReducer =  (state = initialState,action)=>{
    console.log("action",action)


    switch(action.type){
        case loginType.LOGIN:
            return{
...state

            };
            break;
            case loginType.LOGIN_SUCCESS:
                return{
                    ...state,
                    userData:action.payload
                }
                break;
             default:
                 return state;
    }



}


