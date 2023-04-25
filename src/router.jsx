import Home from "./views/Home"
import Search from "./views/Search"
import Blog from "./views/Blog"
import Login from "./views/Login"
import Register from "./views/Register"
import Profile from "./views/Profile"

const routes = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/search',
    element: <Search />
  },
  {
    path: '/:id',
    element: <Blog />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/profile',
    element: <Profile />
  }
]

export default routes