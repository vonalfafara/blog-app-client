import { Route, Routes } from "react-router-dom";
import Navbar from "./layouts/Navbar";
import routes from "./router"
import { Container } from "react-bootstrap";


function App() {
  return (
    <>
      <Navbar />
      <Container>
        <Routes>
          {routes.map((route, index) => {
            return (
              <Route key={index} path={route.path} element={route.element} exact />
            )
          })}
        </Routes>
      </Container>
    </>
  );
}

export default App