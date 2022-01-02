import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CreateNote from "./CreateNote";
import EditNote from "./EditNote";
import Note from "./Note";
import Modal from '@mui/material/Modal';
//import EditNote from "./EditNote";

function App() {
    const [notes, setNotes] = useState([]);
    const [note, setNote] =useState({
        id:"",
        title:"",
        content:""
    })

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    function addNote(newNote) {
        setNotes((prevNotes) => {
            return [...prevNotes, newNote];
        });
    }

    function deleteNote(id) {
        setNotes((prevNotes) => {
            return (prevNotes.filter((prevNote, index) => {
                return index !== id
            }));
        })
    }
    function editNoteScript(id) {
       setNote({
           id: id,
           title: notes[id].title,
           content: notes[id].content
       });
    }

    function editNote({id, title, content}) {
        setNotes((prevNotes) => {
            return [
                ...prevNotes.slice(0, id),
                {
                    title: title,
                    content: content
                },
                ...prevNotes.slice(id + 1)
            ]
                

        });
    }

    return (
        <div>
            <Header />
            <div className="main">
                <CreateNote addNote={addNote} />
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div><EditNote 
                    id={note.id}
                    title={note.title}
                        content={note.content}
                        editNote={editNote}
                        handleClose={handleClose}
                    /></div>
                </Modal>

                {notes.map((note, index) => {
                    return (
                        <Note
                            key={index}
                            id={index}
                            title={note.title}
                            content={note.content}
                            deleteNote={deleteNote}
                            editNoteScript={editNoteScript}
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