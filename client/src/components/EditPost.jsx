import React, { useState, useEffect } from "react";
import CreateIcon from '@material-ui/icons/Create';

function EditPost(props) {
    const [post, setPost] = useState({
        id: props.id,
        title: props.title,
        text: props.text
    });

    function updatePost(event) {
        const { name, value } = event.target;
        setPost((prevPost) => {
            return {
                ...prevPost,
                [name]: value
            };
        });
    };

    function submitPost(event) {
        event.preventDefault();
        props.editPost(post);
        props.handleClose();
    };

    useEffect(()=>{
        setPost({
            id: props.id,
            title: props.title,
            text: props.text
        })
    },[])

    return (
        <div>
            <form
                className="create-post col-6 col-s-8"
                action="/"
                method="post">

                <input
                    onChange={updatePost}
                    name="title"
                    value={post.title}
                />

                <textarea
                    onChange={updatePost}
                    name="text"
                    value={post.text}
                />
                <button onClick={submitPost}><CreateIcon /></button>

            </form>
        </div>

    );
}

export default EditPost;