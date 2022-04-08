import React,{useState} from "react";
import CreateIcon from '@material-ui/icons/Create';

function EditNote(props) {
    const [note, setNote] = useState({
        id: props.id,
        title: props.title,
        content: props.content
    });

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
        props.editNote(note);
        event.preventDefault();
        setNote({
            id: "",
            title: "",
            content: ""
        });
        props.handleClose();
    };

    return (
        <div>
            <form
                className="create-note col-6 col-s-8"
                action="/"
                method="post">

                <input
                    onChange={updateNote}
                    type="text"
                    name="title"
                    value={note.title}
                />

                <textarea
                    onChange={updateNote}
                    name="content"
                    value={note.content}
                />
                <button onClick={submitNote}><CreateIcon /></button>

            </form>
        </div>

    );
}

export default EditNote;