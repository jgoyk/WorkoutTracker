import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/home";
import "./index.css";
import HeaderLayout from "./components/header";
import ErrorPage from "./routes/errorPage";

import Charts from "./routes/charts";
import Exercises from "./routes/exercises";
import Login from "./routes/login";
import Register from "./routes/register";
import { AuthContextProvider } from "./context/authContext.jsx";
import Single from "./routes/single.jsx";
import { Toaster } from "@/components/ui/sonner"


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
      {
        path: "/workout/:id",
        element: <Single />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
      <Toaster richColors />
    </AuthContextProvider>
  </React.StrictMode>
);
