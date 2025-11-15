import { createBrowserRouter } from "react-router";
import LoginPage from "./pages/login";
import HomePage from "./pages/Home";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
