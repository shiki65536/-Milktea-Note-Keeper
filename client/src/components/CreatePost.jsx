import React, { useState } from "react";
import Fab from '@material-ui/core/Fab';
import CreateIcon from '@material-ui/icons/Create';
import Zoom from '@material-ui/core/Zoom';

function CreatePost(props) {
    const [isExpended, setIsExpended] = useState(false);

    const [post, setPost] = useState({
        title: "",
        text: ""
    });

    function expendPost() {
        setIsExpended(true);
    }

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

        fetch('/posts', {
            method: 'POST',
            body: JSON.stringify(post),
            headers: {
                'content-type': 'application/json'
              },
        })
            .then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));

        setPost({
            title: "",
            text: ""
        });
        setIsExpended(false);
    };

    return (
        <form
            className="create-post col-6 col-s-8"
            action="/"
            method="post">
            {isExpended &&
                <input
                    onChange={updatePost}
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={post.title}>
                </input>
            }
            <textarea
                onChange={updatePost}
                name="text"
                rows={isExpended ? 3 : 1}
                placeholder="Write down your note..."
                value={post.text}
                onClick={expendPost}>
            </textarea>
            <Zoom in={isExpended}>
                <Fab onClick={submitPost}><CreateIcon /></Fab>
            </Zoom>
        </form>
    );
};

export default CreatePost;