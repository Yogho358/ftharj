const initialState=''

const filterReducer=(state=initialState,action)=>{
    console.log(action)
    console.log(state)
    switch(action.type){
        case 'FILTER':
            return action.string
        default:
            return state
    }
}

export const filter=(string)=>{
    return{
        type: 'FILTER',
        string: string
    }
}

export default filterReducer