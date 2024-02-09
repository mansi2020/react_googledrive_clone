
import "./App.css";
import Drivepage from "./Components/Drivepage/Drivepage";
import Home from "./Components/Home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ContextProvider from "./Context/ContextProvider"; //context

function App() {
  // router
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/drivepage",
      element: <Drivepage />,
    },
  ]);
  return (
    <div className="app">
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
    </div>
  );
}

export default App;
