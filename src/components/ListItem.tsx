import { Link } from "react-router-dom";

interface Note {
  id: number;
  body: string;
  updated: string;
  created: string;
}

interface Props {
  note: Note;
}

let getTime = (note: Note) => {
  return new Date(note.updated).toLocaleDateString();
};

let getContent = (note: Note) => {};

const ListItem = ({ note }: Props) => {
  return (
    <Link to={`/note/${note.id}`}>
      <div className="notes-list-item">
        <h3>{note.body}</h3>
      </div>
    </Link>
  );
};

export default ListItem;
