import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


const api = "http://65.108.148.136:8080/ToDo/"

export const getData = createAsyncThunk(("todoSlice/getData") , async (sarche) =>{
    try {
        let {data} = await axios.get( sarche ? api + "get-to-dos/ToDoName/" + sarche : api + "get-to-dos" )
        return data
    } catch (error) {
        console.log(error);
    }
})

export const addUser = createAsyncThunk("todoSlice/addUser" , async (obj , {dispatch}) =>{
    let form = new FormData()
    form.append("Name" , obj.Name)
    form.append("Description" , obj.Description)
    for(let i = 0 ; i <obj.Images.length ; i++ ){
        form.append("Images" , obj.Images[i])
    }
    try {
        const {data} = await axios.post(`${api}add-to-do` , form , 
        {
            'Content-Type ' : 'multipart/form-data'
        }
    )
        dispatch(getData())
    } catch (error) {
        console.error(error);
    }
})


export const delUser = createAsyncThunk(("todoSlice/delUser") , async (id , {dispatch}) =>{
    try {
        const {data} = await axios.delete(api + "delete-to-do?id=" + id)
        dispatch(getData())
    } catch (error) {
        console.error(error);
    }
})

export const editUser = createAsyncThunk(("todoSlice/editUser") , async (obj , {dispatch}) =>{
    try {
        const {data} = await axios.put(api + "update-to-do" , obj , { "Content-Type" : "application/json"})
        dispatch(getData())
    } catch (error) {
        console.error(error);
    }
})
 

export const userId = createAsyncThunk(("todoSlice/userId") , async (id) =>{
    try {
        const {data} = await axios.get(api + "get-to-do-by-id?id=" + id)
        return data
    } catch (error) {
        console.error(error);
    }
})

export const todoSlice = createSlice({
    name: 'todo',
    initialState : {
        data : [],
        dataId : []
    },
    reducers: {},
    extraReducers : (builder) =>{
        builder.addCase(getData.fulfilled , (state , action) =>{
            state.data = action.payload?.data
        })
        builder.addCase(getData.rejected ,(state , action) =>{
            alert("Khato shid interneta bi yabor")
        })
        builder.addCase(userId.fulfilled , (state ,  action) =>{
            state.dataId = action.payload?.data
        })
    } 
  })
  
  
//   export const {  } = todoSlice.actions
  
  export default todoSlice.reducer