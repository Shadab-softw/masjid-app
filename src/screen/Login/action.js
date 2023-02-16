
// const loginType={
//     LOGIN:'LOGIN',
//     LOGIN_SUCCESS:'LOGIN_SUCCESS',
//     LOGIN_FAILED:'LOGIN_FAILED'
// }

const registerType={
    REGISTER:'REGISTER',

    REGISTER_SUCCESS:'REGISTER_SUCCESS'

}

// export const loginAction=(data)=>{
// const registerType={
//     REGISTER:'REGISTER',

//     REGISTER_SUCCESS:'REGISTER_SUCCESS'

// }
//     console.log("daaaata",data)
//     return{
//         type:loginType.LOGIN,
//         data
//     }

// }


export const registerAction=(post)=>{
    console.log("daaaata",post)
    return{
        type:'REGISTER_SUCCESS',
        payload:post
    }

}

// export function createAction(type, payload) {
//     return {
//       type,
//       payload,
//     };
//   }
