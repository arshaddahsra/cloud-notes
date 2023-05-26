import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/NoteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
const Notes = () => {
  const context = useContext(noteContext);
  const { notes, fetchNotes, editNote } = context;

  useEffect(() => {
    (async () => {
      await fetchNotes();
    })();
    // eslint-disable-next-line
  }, []);

  const [currnote, setcurrnote] = useState({
    id: "",
    title: "",
    description: "",
    tag: "",
  });

  const ref = useRef(null);
  const refclose = useRef(null);
  const updatenote = (note) => {
    ref.current.click();
    setcurrnote({
      id: note._id,
      title: note.title,
      description: note.description,
      tag: note.tag,
    });
  };

  const onChange = (e) => {
    setcurrnote({ ...currnote, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    refclose.current.click();
    editNote(currnote.id, currnote.title, currnote.description, currnote.tag);
  };

  return (
    <>
      <AddNote />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-toggle="modal"
        data-target="#exampleModalCenter"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Edit modal
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    name="title"
                    onChange={onChange}
                    className="form-control"
                    id="title"
                    aria-describedby="emailHelp"
                    placeholder="Enter title"
                    value={currnote.title}
                    minLength={3}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Discription</label>
                  <input
                    type="text"
                    name="description"
                    onChange={onChange}
                    className="form-control"
                    id="description"
                    placeholder="Discription"
                    value={currnote.description}
                    minLength={3}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="tag">Tag</label>
                  <input
                    type="text"
                    name="tag"
                    onChange={onChange}
                    className="form-control"
                    id="tag"
                    placeholder="Tag"
                    value={currnote.tag}
                    minLength={3}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refclose}
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={
                  currnote.title.length < 3 || currnote.description.length < 3
                }
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Update note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h1>Your Notes</h1>
        <div className="container mx-2">
          {notes.length === 0 && "No notes to display"}
        </div>
        {notes.map((note) => {
          return <Noteitem key={note.id} updatenote={updatenote} note={note} />;
        })}
      </div>
    </>
  );
};

export default Notes;
