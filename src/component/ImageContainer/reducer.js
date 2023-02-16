import CONSTANT from "../../constants";

const initialState={
    data:CONSTANT.App.tabMenu.homeTAb

}

const changeScreeen=(state=initialState,action)=>{
    console.log("swtichhhhh",action.payload)
    switch(action.type){
        case 'INCREAMENT':
            return {
                data:action.payload
            }

            default :return state
    }
}

export default changeScreeen