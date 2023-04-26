import Home from "./views/Home";
import Search from "./views/Search";
import Blog from "./views/Blog";
import Login from "./views/Login";
import Register from "./views/Register";
import Profile from "./views/Auth/Profile";
import CreateBlog from "./views/Auth/CreateBlog";
import UpdateBlog from "./views/Auth/UpdateBlog";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/:id",
    element: <Blog />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/create-blog",
    element: <CreateBlog />,
  },
  {
    path: "/update-blog/:id",
    element: <UpdateBlog />,
  },
];

export default routes;
