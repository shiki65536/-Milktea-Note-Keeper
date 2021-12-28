import React from "react";
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';


function Note(props) {

  function clickDelete(){
    props.deleteNote(props.id);
  }
  return (
    <div className="note">
      <h2>{props.title}</h2>
      <p>{props.content}</p>
      <button onClick={clickDelete}><DeleteSweepIcon /></button>
    </div>
  );
}
export default Note;
