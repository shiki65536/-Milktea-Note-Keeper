import React from "react";
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';

function Post(props) {
  function clickDelete(event) {
    event.preventDefault();

    fetch(`/posts/${props.id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));

  }
  function clickStar(event) {
    event.preventDefault();

    fetch(`/posts/${props.id}`, {
      method: 'PATCH'
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
    <div className='post'>
      <div onClick={clickForm}>
        <h2>{props.title}</h2>
      </div>

      <div onClick={clickForm}>
        <p>{props.text}</p>
        <p></p>
      </div>
      <div>
      <button onClick={clickDelete}><DeleteSweepIcon /></button>
        <button onClick={clickStar}>{props.star ? <StarIcon /> : <StarBorderIcon />}</button>
      </div>

    </div>
  );
}
export default Post;
