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

var timeoutId=''
export const setNotification=(message,time)=>{
    return dispatch=>{
        if(timeoutId!==''){
            clearTimeout(timeoutId)
        }
        dispatch({
            type:'SHOW',
            data: message
        })
        timeoutId=setTimeout(()=>{
            dispatch({
                type:'HIDE'
            })
        },time*1000)
    }

}



/*export const show=(message)=>{
    return{
        type: 'SHOW',
        data: message
    }
}

export const hide=()=>{
    return{
        type:'HIDE'
    }
}*/

export default notificationReducer