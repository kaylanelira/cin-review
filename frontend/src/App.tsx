import { createBrowserRouter, RouterProvider } from "react-router-dom";

import CreateAccount from "./app/home/pages/CreateAccount";
import DisciplinesPage from "./app/home/pages/Disciplines/DisciplinePage"
import EditDisciplinePage from "./app/home/pages/Disciplines/EditDisciplinePage"
import AddDisciplinePage from "./app/home/pages/Disciplines/AddDisciplinePage"
import EditAccount from "./app/home/pages/EditAccount";
import Login from "./app/home/pages/Login";
import AccountProfile from "./app/home/pages/AccountProfile";
import { AuthProvider } from "./app/home/context/AuthContext/AuthContext";
import Feed from "./app/home/pages/Feed";
import SearchBar from "./app/home/pages/SearchBar";
import DeleteAccount from "./app/home/pages/DeleteAccount";
import Course from "./app/home/pages/Course";

const router = createBrowserRouter([
  {
    path: "*",
    Component: Login,
  },
  {
    path: "/create-account",
    Component: CreateAccount,
  },
  {
    path: "/edit-account",
    Component: EditAccount,
  },
  {
    path: "/delete-account",
    Component: DeleteAccount,
  },
  {
    path: "/profile",
    Component: AccountProfile,
  },
  {
    path: "/login",
    Component: Login,
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
  },
  {
    path: "/course/:code",
    Component: Course,
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
    </AuthProvider>
  )
}
