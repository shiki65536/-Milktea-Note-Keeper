import React from "react";
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';


function Note(props) {

  function clickDelete(){
    props.deleteNote(props.id);
  }
  function clickForm() {
    props.handleOpen();
    props.editNoteScript(props.id);    
  }
  return (
    <div className="note">
      <h2 
       onClick={clickForm}
      >{props.title}</h2>
      <p 
      onClick={clickForm}
      >{props.content}</p>
      <button onClick={clickDelete}><DeleteSweepIcon /></button>
    </div>
  );
}
export default Note;
