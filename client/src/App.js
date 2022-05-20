import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CreatePost from "./components/CreatePost";
import Post from "./components/Post";
import EditPost from './components/EditPost';

import Modal from '@mui/material/Modal';

import { useTheme } from './hooks/useTheme'


function App() {
    const { mode } = useTheme()

    const [posts, setPosts] = useState([]);
    const [board, setBoard] = useState({})

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
            text: posts[index].text,
            star: posts[index].star
        });
    }

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
        <div className={`App ${mode}`}>
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
                        star={board.star}
                        editPost={editPost}
                        handleClose={handleClose}
                    /></div>
                </Modal>
                <div>
                    <section className='star-zone'>
                        {posts.filter(post => post.star).map((post, index) => {
                            return (
                                <Post
                                    key={index}
                                    id={post._id}
                                    index={index}
                                    title={post.title}
                                    text={post.text}
                                    star={post.star}
                                    deletePost={deletePost}
                                    editPostScript={editPostScript}
                                    handleOpen={handleOpen}
                                />
                            );
                        })}
                    </section>
                    <section>
                    {posts.filter(post => !post.star).map((post, index) => {
                            return (
                                <Post
                                    key={index}
                                    id={post._id}
                                    index={index}
                                    title={post.title}
                                    text={post.text}
                                    star={post.star}
                                    deletePost={deletePost}
                                    editPostScript={editPostScript}
                                    handleOpen={handleOpen}
                                />
                            );
                        })}
                    </section>
                </div>
            </div>


            <Footer />
        </div >
    );

}

export default App;