import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CreatePost from "./CreatePost";
import Post from "./Post";
import Modal from '@mui/material/Modal';

function App() {
    const [posts, setPosts] = useState([]);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // fetch  data
    useEffect(()=>{
        fetch('/posts')
        .then(response => response.json()) 
        .then(data => setPosts(data)) 
    },[posts])

    function addPost(newPost) {
        setPosts((prevPosts) => {
            return [...prevPosts, newPost];
        });
    }

    function deletePost(id) {
        setPosts((prevPosts) => {
            return (prevPosts.filter((prevPost, index) => {
                return index !== id
            }));
        })
    }

    return (
        <div>
            <Header />
            <div className="main">
                <CreatePost addPost={addPost} />
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                </Modal>

                {posts.map((post, index) => {
                    return (
                        <Post
                            key={index}
                            id={post._id}
                            title={post.title}
                            text={post.text}
                            deletePost={deletePost}
                            handleOpen={handleOpen}
                        />
                    );
                })}
            </div>
            <Footer />
        </div>
    );

}

export default App;