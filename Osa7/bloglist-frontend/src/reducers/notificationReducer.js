

const initialState=null

const notificationReducer=(state=initialState,action)=>{

    switch(action.type){
        case 'SHOW':
            return action.data

        case 'HIDE':
            return null

        default:
            return state
    }
}


export const setNotification=(message,time)=>{
    console.log(message)
    return dispatch=>{
        dispatch({
            type:'SHOW',
            data:message
        })
        setTimeout(()=>{
            dispatch({
                type:'HIDE'
            })
        },time*1000)
    }
}

export default notificationReducer