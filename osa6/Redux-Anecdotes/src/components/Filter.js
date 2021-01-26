import React from 'react'
import { connect } from 'react-redux'
//import {useDispatch} from 'react-redux'
import {filter} from '../reducers/filterReducer'

const Filter = (props) => {
  //const dispatch=useDispatch()
  const handleChange = (event) => {
    props.filter(event.target.value)
    //dispatch(filter(event.target.value))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps={
  filter
}

export default connect(null,mapDispatchToProps) (Filter)