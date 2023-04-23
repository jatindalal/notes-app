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
    let response = await fetch(`http://localhost:5000/notes/${id}`);
    let data = await response.json();

    setNote(data);
  };

  let updateNote = async () => {
    let response = await fetch(`http://localhost:5000/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...note, update: new Date() }),
    });
  };

  let handleSubmit = () => {
    updateNote();
    navigate('/');
  };

  if (note)
    return (
      <div className="note">
        <div className="note-header">
          <h3>
            <Link to="/">
              <ArrowLeft onClick={handleSubmit} />
            </Link>
          </h3>
        </div>

        <textarea
          value={note?.body}
          onChange={(event) => {
            setNote({ ...note, body: event.target.value });
          }}
        />
      </div>
    );

  return <div>Can't find that note!</div>;
};

export default NotePage;
