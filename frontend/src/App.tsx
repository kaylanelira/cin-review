import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTest from "./app/home/pages/CreateTest";
import ListTests from "./app/home/pages/ListTests";
import CreateAccount from "./app/home/pages/CreateAccount";
import DisciplinesPage from "./app/home/pages/Disciplines/DisciplinePage"
import EditDisciplinePage from "./app/home/pages/Disciplines/EditDisciplinePage"
import AddDisciplinePage from "./app/home/pages/Disciplines/AddDisciplinePage"

const router = createBrowserRouter([
  {
    path: "*",
    Component: CreateTest,
  },
  {
    path: "/create-account",
    Component: CreateAccount,
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
