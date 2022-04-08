import React, { useState } from "react";
import Fab from '@material-ui/core/Fab';
import CreateIcon from '@material-ui/icons/Create';
import Zoom from '@material-ui/core/Zoom';

function CreateNote(props) {
    const [isExpended, setIsExpended] = useState(false);

    const [note, setNote] = useState({
        title: "",
        content: ""
    });

    function expendNote(){
        setIsExpended(true);
    }

    function updateNote(event) {
        const { name, value } = event.target;
        setNote((prevNote) => {
            return {
                ...prevNote,
                [name]: value
            };
        });
    };

    function submitNote(event) {
        props.addNote(note);
        event.preventDefault();
        setNote({
            title: "",
            content: ""
        });
        setIsExpended(false);
    };

    return (
        <form 
        className="create-note col-6 col-s-8"
        action="/"
         method="post">
         { isExpended &&
            <input
                onChange={updateNote}
                type="text"
                name="title"
                placeholder="Note Title"
                value={note.title}>
            </input>
         }
            <textarea
                onChange={updateNote}
                name="content"
                rows={isExpended?3:1}
                placeholder="Take Note..." 
                value={note.content}
                onClick={expendNote}>
            </textarea>
            <Zoom in={isExpended}>
            <Fab onClick={submitNote}><CreateIcon /></Fab>
            </Zoom>
        </form>
    );
};

export default CreateNote;