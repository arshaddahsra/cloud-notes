import React, { useContext, useState } from "react";
import noteContext from "../context/notes/NoteContext";
const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [newnote, setnewnote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const handleClick = (e) => {
    e.preventDefault();
    addNote(newnote.title, newnote.description, newnote.tag);
    setnewnote({
      title: "",
      description: "",
      tag: "",
    });
  };
  const onChange = (e) => {
    setnewnote({ ...newnote, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-3">
      <h1>Add a Note</h1>
      <form className="my-3">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            vlaue={newnote.title}
            onChange={onChange}
            className="form-control"
            id="title"
            aria-describedby="emailHelp"
            placeholder="Enter title"
            minLength={3}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Discription</label>
          <input
            type="text"
            name="description"
            vlaue={newnote}
            onChange={onChange}
            className="form-control"
            id="description"
            placeholder="Discription"
            minLength={3}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="tag">Tag</label>
          <input
            type="text"
            name="tag"
            vlaue={newnote.tag}
            onChange={onChange}
            className="form-control"
            id="tag"
            placeholder="Tag"
          />
        </div>
        <button
          disabled={newnote.title.length < 3 || newnote.description.length < 3}
          type="submit"
          className="btn btn-primary"
          onClick={handleClick}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNote;
