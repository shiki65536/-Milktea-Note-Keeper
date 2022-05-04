import React from "react";
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';


function Post(props) {

  function clickDelete(event){
    event.preventDefault();

    fetch(`/posts/${props.id}`, {
      method: 'DELETE'
  })
      .then(response => response.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));

  }
  function clickForm() {
    props.handleOpen();
    //get a post
    props.editPostScript(props.index, props.id);    
 
  }

  return (
    <div className="post">
      <h2 onClick={clickForm}>{props.title}</h2>
      <p  onClick={clickForm}>{props.text}</p>
      <button onClick={clickDelete}><DeleteSweepIcon /></button>
    </div>
  );
}
export default Post;
