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

  return (
    <div className="post">
      <h2>{props.title}</h2>
      <p>{props.text}</p>
      <button onClick={clickDelete}><DeleteSweepIcon /></button>
    </div>
  );
}
export default Post;
