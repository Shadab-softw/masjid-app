
const registerType={
    REGISTER:'REGISTER',

    REGISTER_SUCCESS:'REGISTER_SUCCESS'

}
const initialState={
    data:{}
}
 const registerReducer=(state=initialState,action)=>{
    console.log("registerReducer",action)
    switch(action.type){
            case 'REGISTER_SUCCESS':
                return{
                    data:action.payload
                    }
                    break;
    
             default:
                 return state;
    }



}

export default registerReducer;