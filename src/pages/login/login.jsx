import React, { useEffect, useState } from 'react'
import { axiosRequest } from '../../utils/axiosRecuest'
import { saveToken } from '../../utils/token'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  let navigate = useNavigate()
  conat [nmae , setname] = useState("")
  conat [pas , setPas] = useState("")
  async function login(){
    try{
      let { data } = await axiosRequest.post('Account/login', {userName: '', password: ''})
      if(data.statusCode == '200'){
      saveToken(data.data)
        navigate("/")
      }

      console.log(data)
    }catch(error){
      console.log(error)
    }
  }

  
  return (
		<div>
           <input type="text" value={name} onChange={(ev) => setname(ev.target.value)} />
           <input type="text" value={pas} onChange={(ev) => setPas(ev.target.value)}/>
           <button onClick={() => login()} >Ok</button>
		</div>
	)
}

export default Login