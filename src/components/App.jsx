import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CreateNote from "./CreateNote";
import Note from "./Note";

function App() {
    const [notes, setNotes] = useState([]);

    function addNote(newNote) {
        setNotes((prevNotes) => {
            return [...prevNotes, newNote];
        });
    }

    function deleteNote(id){
        setNotes((prevNotes)=>{
            return (prevNotes.filter((prevNote, index)=>{
                return index !== id
            }));
        })
    }

    return (
        <div>
            <Header />
            <div className="main">
            <CreateNote addNote={addNote} />
           
            {notes.map((note, index) => {
                return (
                    <Note
                        key={index}
                        id={index}
                        title={note.title}
                        content={note.content}
                        deleteNote={deleteNote}
                    />
                );
            })}
            </div>
            <Footer />
        </div>
    );

}

export default App;