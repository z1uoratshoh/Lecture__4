import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUser,editUser , delUser, getData } from '../../reducers/todoClice/todoClise'
import { Button, TextField  } from '@mui/material'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Assistant } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

const Home = () => {

    const [open, setOpen] = useState(false);
   
    const [name , setName] = useState('')
    const [desc , setDesc] = useState('')
    const [img , setImg] = useState('')


    // const [open , setOpen] = useState(false)

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const dispatch = useDispatch()

    const data = useSelector((state) => state.todo.data)


    const [openEdit, setOpenEdit] = React.useState(false);

    const [editName , setEditName] = useState('')
    const [editDesc , setEditDesc] = useState('')
    const [idx , setIdx] = useState(null)


    const [sarche , setSarche] = useState('')

  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

    useEffect(() =>{
        dispatch(getData())
    },[])


  return (
    <div>


<TextField variant='outlined' label={"Search"} value={sarche} onChange={(event) => setSarche(event.target.value)}/>
<Button onClick={() => dispatch(getData(sarche))}><SearchIcon/></Button>

      <Button variant="outlined" onClick={handleClickOpen}>
        Add
      </Button>
      
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Add card"}
        </DialogTitle>
        <DialogContent>

            <input type="file" onChange={(e) => setImg(e.target.files[0])} />


            <TextField value={name} variant='outlined' onChange={(e) => setName(e.target.value)}/>

            <TextField value={desc} variant='outlined' onChange={(e) => setDesc(e.target.value)}/>
          

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>close</Button>
          <Button onClick={() => {dispatch(addUser({Name : name , Description : desc , Images : [img]})),setOpen(false),setName(''),setDesc(''),setImg('')}}>Save</Button>
        </DialogActions>
      </Dialog>



      <Dialog
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Edit user"}
        </DialogTitle>
        <DialogContent>

            <TextField variant='outlined' label={"Edit Name"}  value={editName} onChange={(event) =>setEditName(event.target.value)}/>
            <TextField variant='outlined' label={"Edit Name"} value={editDesc}  onChange={(event) =>setEditDesc(event.target.value)}/>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancle</Button>
          <Button onClick={() => {handleCloseEdit() , dispatch(editUser({Name : editName ,Description : editDesc , id : idx}))}} >
            Edit
          </Button>
        </DialogActions>
      </Dialog>


     
      

      <section className='w-[80%] m-auto flex flex-wrap gap-[5%] mt-[5%]'>
        {data?.map((elem) =>{
            return (
                <div className='w-[370px] shadow-2xl' key={elem.id}>
                    {elem.images.map((img,id) =>{
                        return <img src={`http://65.108.148.136:8080/images/${img.imageName}`} key={id} alt="" />
                    })}

                    <Link to={`cardByid/${elem.id}`}><h1>{elem.name}</h1></Link>
                    
                    <h1>{elem.description}</h1>

                    <Button variant='outlined' onClick={() => dispatch(delUser(elem.id))}>Delete</Button>
                    <Button onClick={() => { handleClickOpenEdit(),setEditName(elem.name),setEditDesc(elem.description),setIdx(elem.id)}}>Edit</Button>
                    {/* <input type="checkbox"   /> */}
                </div>
            )
        })}
      </section>

      
    </div>
  )
}

export default Home
