import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CreatePost from "./CreatePost";
import Post from "./Post";
import Modal from '@mui/material/Modal';
import EditPost from './EditPost';

function App() {
    const [posts, setPosts] = useState([]);
    const [board, setBoard] = useState({
        // id: "",
        // title: "",
        // text: ""
    })

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // fetch  data
    useEffect(() => {
        fetch('/posts')
            .then(response => response.json())
            .then(data => setPosts(data))
    }, [posts])


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
    //get a post
    function editPostScript(index, id) {
        setBoard({
            id: id,
            title: posts[index].title,
            text: posts[index].text
        });
    }

    //edit
    // function editPost({ id, title, text }) {
    //     setPosts((prevPosts) => {
    //         return [
    //             ...prevPosts.slice(0, id),
    //             {
    //                 title: title,
    //                 text: text
    //             },
    //             ...prevPosts.slice(id + 1)
    //         ]
    //     });

    // }
    function editPost(post) {

        fetch(`/posts/${post.id}`, {
            method: 'PUT',
            body: JSON.stringify(post),
            headers: {
                'content-type': 'application/json'
              },
        })
            .then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
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
                    <div><EditPost
                        id={board.id}
                        title={board.title}
                        text={board.text}
                        editPost={editPost}
                        handleClose={handleClose}
                    /></div>
                </Modal>

                {posts.map((post, index) => {
                    return (
                        <Post
                            key={index}
                            id={post._id}
                            index={index}
                            title={post.title}
                            text={post.text}
                            deletePost={deletePost}
                            editPostScript={editPostScript}
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