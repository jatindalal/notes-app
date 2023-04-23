import { FunctionComponent, useEffect, useState } from "react";
import { Link, NavigateFunction } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

interface Props {
  id: string;
  navigate: NavigateFunction;
}

const NotePage: FunctionComponent<Props> = ({ id, navigate }: Props) => {
  let [note, setNote] = useState<any>(null);

  useEffect(() => {
    getNote();
  }, [id]);

  let getNote = async () => {
    if (id === "new") return;
    let response = await fetch(`http://localhost:5000/notes/${id}`);
    let data = await response.json();

    setNote(data);
  };

  let createNote = async () => {
    let response = await fetch(`http://localhost:5000/notes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...note,
        updated: new Date(),
        created: new Date(),
      }),
    });
  };

  let updateNote = async () => {
    let response = await fetch(`http://localhost:5000/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...note, updated: new Date() }),
    });
  };

  let deleteNote = async () => {
    let response = await fetch(`http://localhost:5000/notes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });

    navigate("/");
  };

  let handleSubmit = () => {
    if (id != "new" && !note.body) {
      deleteNote();
    } else if (id != "new") {
      updateNote();
    } else if (id === "new" && note !== null) {
      createNote();
    }
    navigate("/");
  };

  if (note || id === "new") {
    return (
      <div className="note">
        <div className="note-header">
          <h3>
            <Link to="/">
              <ArrowLeft onClick={handleSubmit} />
            </Link>
          </h3>
          {id !== "new" ? (
            <button onClick={deleteNote}>Delete</button>
          ) : (
            <button onClick={handleSubmit}>Done</button>
          )}
        </div>

        <textarea
          value={note?.body}
          onChange={(event) => {
            setNote({ ...note, body: event.target.value });
          }}
        />
      </div>
    );
  }

  return <div>Can't find that note!</div>;
};

export default NotePage;
