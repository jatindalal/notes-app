import notes from "../assets/data";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

interface Props {
  id: string;
}

const NotePage = ({ id }: Props) => {
  let note = notes.find((note) => note.id === Number(id));

  if (note)
    return (
      <div className="note">
        <div className="note-header">
          <h3>
            <Link to="/">
              <ArrowLeft />
            </Link>
          </h3>
        </div>

        <textarea value={note?.body} />
        {/* <p>{note.body}</p> */}
      </div>
    );

  return <div>Can't find that note!</div>;
};

export default NotePage;
