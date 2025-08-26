import { useState ,useEffect, use } from 'react'
import Nav from './comp/nav.jsx'
import { FaTasks } from "react-icons/fa";
import { GrTasks } from "react-icons/gr";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [save, setSave] = useState('')
  const [save1, setSave1] = useState([])
  const [editId, setEditId] = useState(null)
  const [com, setCom] = useState(true)
    const [size, setSize] = useState(24);

  // const handlesave = () => {
  //   // The element from which you want the value is kept second .
  //   setSave1([...save1, {save , isDone:false, id : uuidv4()}])
  //   setSave('') 
   
  // }
  

  useEffect(() => {
    let data = localStorage.getItem("save1")
    if(data){
      let parseData = JSON.parse(localStorage.getItem("save1"))
      setSave1(parseData)
      setSave1(JSON.parse(data))
    }
  },[])

//   useEffect(() => {
//   localStorage.setItem("save1", JSON.stringify(save1))
// }, [save1])

 
  const localstorage = () => {
    localStorage.setItem("save1",JSON.stringify(save1))
  }

  

  const handlesave = () => {
    localstorage()
   
  if (editId) {

    // update existing task
    let updated = save1.map(item =>
      item.id === editId ? { ...item, save } : item
    )
    setEditId([...editId ,{isEdit: true}])
    setSave1(updated)
    setEditId(null )   // reset edit mode
    localstorage()

  } else {
    // add new task
    setSave1([...save1, { save, isDone: false, id: uuidv4() }])
        localstorage()

  }
  setSave('')
      localstorage()


}

  const handlechange = (e) => {
    setSave(e.target.value)
    

  }

  const handlecheck = (e) => {
    localstorage()
    let id = e.target.name
    let index = save1.findIndex(value=>{
      return value.id === id
    })
    let d = [...save1]
    save1[index].isDone = !  save1[index].isDone
    setSave1(d)
   
  }
  
  const handledit = (e,id) => { 
     localstorage()
    let edit = save1.filter(i=> i.id === id )
    // setSave(edit[0].save)
     setSave(edit[0].save)
     setEditId(id) 
    
    
    
  }

   const handledel = (e,id) => {
        localstorage()

      let newList = save1.filter(i=>{ 
      return i.id !== id 
    })
    setSave1(newList)
   }
  const completed = () => {
    setCom(!com)
//     const newCom = !com;
//     setCom(newCom);
//     if (!newCom) {
//          setSave1(save1.filter(i => !i.isDone));

//     } else{ 
//  // Restore all tasks from localStorage when showing completed
//       const data = localStorage.getItem("save1");
//       if (data) {
//         setSave1(JSON.parse(data));
//       }
//     }


useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setSize(24);      // mobile
      else if (window.innerWidth < 1024) setSize(48); // tablet
      else setSize(72);                              // desktop
    };

    handleResize(); // call once
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  }
   
  
  return (
    <>
    <Nav />
    <div className="bg-white h-fit min-h-[400px] text-slate-800 my-12 mx-auto pb-7 rounded-3xl lg:w-1/2 ">
    <h1 className=" text-2xl sm:text-3xl bg-white text-slate-800 text-center font-bold font-serif pt-4 rounded-3xl  ">Manage your tasks here </h1>

    <div className="flex bg-white text-slate-800 mt-10 mx-4 gap-3 "> 
      <FaTasks color='slate-800' className='bg-white mt-[8px]' size={20} />
      <h2 className="text-3xl bg-white text-slate-800 font-bold font-mono ">To-dos</h2>
    </div>

    <div className="flex bg-white text-slate-800 gap-5 mt-4  ">
      <input type="text" name='data' className='sm:w-3/4 w-[96%] bg-white text-slate-800 border-slate-800 border-[5px] rounded-lg sm:mx-4 ml-[0.5rem] mr-[0rem] p-2 font-mono font-bold pr-12'  onChange={handlechange} value={save}  />
       { editId ? <div className=" text-[rgb(240,30,30)]  ml-[-80px] h-0 mt-4 mr-[33px]" >Edit</div> : null }
      <button className="font-bold text-xl border-[4px] rounded-full border-slate-800 p-3 mr-2  " disabled={save.length <3} onClick={handlesave}>Save</button>
    </div>      
    { save1.length != 0 &&
     <div className="flex bg-white text-slate-800 gap-4 font-bold mt-8 text-lg ">
      <input type="checkbox" id='show' className=' ml-5 w-4 h-4 mt-[7px] accent-slate-800 border-slate-800 border-4    '  onChange={completed} checked={com} />
      <div className="bg-white  text-slate-800 ">Show Completed</div>
    </div>
    }

    <div className="flex bg-white ml-4  ">
    <GrTasks  className='bg-white text-slate-800 mt-8' size={20}/>
    <h2 className="bg-white text-slate-800 font-bold font-mono mt-6 text-3xl ml-3">Tasks</h2>
    </div>

   

{save1.length === 0 && <div className="bg-white text-slate-800 font-semibold font-mono text-center text-xl mt-11">Add tasks here.  </div> }

       {save1.map(value=>{
      return (com || !value.isDone ) && <div className="bg-white text-slate-800 flex mt-5  mb-[20px]    "  key={value.id}>
            <input type="checkbox" className=' ml-5 w-4 h-4 mt-[5px] accent-slate-800 border-slate-800 border-4     ' checked = {value.isDone} onChange={handlecheck} name={value.id}/>
           
           <div className={`bg-white font-mono font-bold text-lg ml-5 w-[400px] ${value.isDone ?"line-through" : ""}`}>{value.save}</div>
            <div className='bg-white text-slate-800 flex'>
            <FaEdit className='bg-white text-slate-800  cursor-pointer ml-0 lg:ml-20   ' onClick={(e)=>handledit(e,value.id)} size={size} />
            <MdDelete className='bg-white text-slate-800 ml-4 cursor-pointer  mr-2 ' onClick={(e)=>handledel(e,value.id)} size={size} />
            </div>
            </div>
           })} 










    </div>
    
  
     
        
    </>
  )
}

export default App













