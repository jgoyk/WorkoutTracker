import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./routes/home";
import "./index.css";
import NavBar from "./components/navBar";
import ErrorPage from "./routes/errorPage";
import Footer from "./components/footer";
import Charts from "./routes/charts";
import Exercises from "./routes/exercises";
import { WorkoutContextProvider } from "./context/WorkoutsContext";

const HeaderLayout = () => (
  <div className="flex flex-col min-h-screen ">
    <header className="bg-stone-200 sticky top-0">
      <NavBar />
    </header>
    <div className="bg-stone-300 min-h-full grow">
      <Outlet />
    </div>
    <footer className="bg-stone-300">
      <Footer />
    </footer>
  </div>
);

const router = createBrowserRouter([
  {
    element: <HeaderLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/charts",
        element: <Charts />,
      },
      {
        path: "/exercises",
        element: <Exercises />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WorkoutContextProvider>
      <RouterProvider router={router} />
    </WorkoutContextProvider>
  </React.StrictMode>
);
