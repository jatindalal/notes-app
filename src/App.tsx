import {
  createBrowserRouter,
  matchPath,
  RouterProvider,
  useNavigate,
  useParams,
} from "react-router-dom";

import Header from "./components/Header";
import Notes from "./pages/Notes";
import NotePage from "./pages/NotePage";

function NotePages() {
  let id = useParams().id;
  let navigate = useNavigate();

  return <NotePage id={id ? id : ""} navigate={navigate}/>;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Notes />,
  },
  {
    path: "note/:id",
    element: <NotePages />,
  },
]);

const App = () => {
  return (
    <div className="container dark">
      <div className="app">
        <Header />
        <RouterProvider router={router} />
      </div>
    </div>
  );
};

export default App;
