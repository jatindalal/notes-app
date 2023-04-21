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

let getTitle = (note: Note) => {
  const title = note.body.split("\n")[0];

  if (title.length > 45) return title.slice(0, 45);

  return title;
};

let getContent = (note: Note) => {
  let title = getTitle(note);
  let content = note.body.replaceAll("\n", "");
  content = content.replaceAll(title, "");

  if (content.length > 45) return content.slice(0, 45) + "...";

  return content;
};

const ListItem = ({ note }: Props) => {
  return (
    <Link to={`/note/${note.id}`}>
      <div className="notes-list-item">
        <h3>{getTitle(note)}</h3>
        <p>
          <span> {getTime(note)}</span>
          {getContent(note)}
        </p>
      </div>
    </Link>
  );
};

export default ListItem;
