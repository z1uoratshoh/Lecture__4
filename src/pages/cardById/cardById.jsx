import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { userId } from '../../reducers/todoClice/todoClise'

const CardById = () => {
    const {id} = useParams() 
    const dispatch = useDispatch()
    useEffect(() =>{
        dispatch(userId(id))
    },[])

    const dataId = useSelector((state) => state.todo.dataId)
  return (
    <div>
    <h1>{dataId?.name}</h1>
    <h1>{dataId?.description}</h1>
    {dataId?.images?.map((elem,id) =>{
        return <img src={`http://65.108.148.136:8080/images/${elem.imageName}`} key={id} alt="" />
    })}
    </div>
  )
}

export default CardById
