import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import parse from 'html-react-parser'
import CreateNotes from "./CreateNotes";
import ReactQuill from 'react-quill';
import {addNotes, deleteNotes} from '../Slices/userSlice'
import "react-quill/dist/quill.core.css";
import './Home.css';
import { AiOutlineDelete } from "react-icons/ai";

function Home(){

    const user = useSelector(state=>state.user);

    const dispatch = useDispatch();

    let [selectedNote, setSelectedNote] = useState(-1);

    const getNotes = async()=>{
        await axios.get(`https://notescraftserver-shivateja28-ofg3.onrender.com/notes-api/get-notes/${user.userObj.email}`)
        .then((result)=>{
          let actionobj = addNotes(result.data.payload.notes);
          dispatch(actionobj);  
        })
        .catch((err)=>console.log(err));
    };

    const deleteNote = async(title)=>{
      let res = await axios.delete(`https://notescraftserver-shivateja28-ofg3.onrender.com/notes-api/remove-notes/${user.userObj.email}/${title}`)
      dispatch(deleteNotes(title));

      console.log(res.data)
    };

    useEffect(()=>{
        getNotes();
    },[]);

    return(
        <>
          {user.login?
          <>
            <div className="createnotes"><CreateNotes/></div>
              <div className="notes-containe text-white ql-editor">
                {user.notes.map((note, index) => (
                <div key={index} className="note notediv" onClick={()=>{selectedNote===index?setSelectedNote(-1):setSelectedNote(index)}} style={{backgroundColor: `rgb(${note.bgColor.r},${note.bgColor.g},${note.bgColor.b})`}}>
                  <h3 >{note.title}</h3>
                  {selectedNote==index&&<>
                  <div className="text-primary">{parse(note.desc)}</div>
                  {note.imagelink && <img src={note.imagelink} alt="Note Image" />}
                  {note.videolink && <iframe width="300" height="200" src={note.videolink} title="Note Video" frameBorder="0" allowFullScreen></iframe>}
                  </>}
                  <p className="text-start">{note.createddatetime.split("T")[0]}</p>
                  <AiOutlineDelete className="dlticon" size={"25px"} onClick={()=>deleteNote(note.title)}/>
                </div>
              ))}
            </div>
</>:<App/>
          }

           
        </>
    );
}

export default Home;

function App(){
  return(
<div className="home-container">
 <div className="welcome-section">
        <h1>NotesCraft</h1>
      </div>

      <div className="features-section">
        <h2>Features:</h2>
        <ol>
          <li>
            <strong>Create and Organize Notes:</strong> Effortlessly create and organize your notes. From lecture summaries to project ideas, our intuitive interface ensures your thoughts are captured with ease.
          </li>
          <li>
            <strong>Search and Filter:</strong> Never lose track of your notes again! Our powerful search and filter functionalities allow you to locate specific notes in seconds, making your workflow more efficient.
          </li>
          <li>
            <strong>Sort and Prioritize:</strong> Stay organized by sorting your notes based on creation time or prioritizing them as per your preference. Customizing your workspace has never been simpler.
          </li>
          <li>
            <strong>Responsive Design:</strong> Access your notes anytime, anywhere. Our website is designed to be responsive, providing you with a seamless experience across devices – be it on your laptop, tablet, or smartphone.
          </li>
        </ol>
      </div>

      <div className="get-started-section">
        <h2>Get Started Today!</h2>
        <ol>
          <li>
            <strong>Create an Account:</strong> Sign up for a free account to unlock the full potential of Notes Maker. Your notes will be securely stored, and you can access them from any device.
          </li>
          <li>
            <strong>Personalize Your Workspace:</strong> Customize your profile and settings to make Notes Maker truly yours. Choose themes, adjust preferences, and make your note-taking experience unique.
          </li>
          <li>
            <strong>Start Note-Taking:</strong> Dive into the world of productive note-taking. Whether you're jotting down ideas, drafting to-do lists, or organizing meeting notes, Notes Maker is here to elevate your productivity.
          </li>
        </ol>
      </div>
    </div>
    );
}