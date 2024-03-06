import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTest from "./app/home/pages/CreateTest";
import ListTests from "./app/home/pages/ListTests";
import Feed from "./app/home/pages/Feed";
import DisciplinesPage from "./app/home/pages/Disciplines/DisciplinePage"
import EditDisciplinePage from "./app/home/pages/Disciplines/EditDisciplinePage"
import AddDisciplinePage from "./app/home/pages/Disciplines/AddDisciplinePage"
import SearchBar from "./app/home/pages/SearchBar";

const router = createBrowserRouter([
  {
    path: "*",
    Component: CreateTest,
  },
  {
    path: "/create-test",
    Component: CreateTest,
  },
  {
    path: "/tests",
    Component: ListTests,
  },
  {
    path: "/search/:searchQuery",
    Component: SearchBar,
  },
  {
    path: "/feed",
    Component: Feed,
  },
  {
    path: "/disciplines",
    Component: DisciplinesPage,
  },
  {
    path: "/edit-discipline/:id",
    Component: EditDisciplinePage,
  },
  {
    path: "/add-discipline",
    Component: AddDisciplinePage,
  }
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
