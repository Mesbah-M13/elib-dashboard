import { createBrowserRouter } from "react-router";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import CreateBook from "./pages/CreateBook";
import DashboardLayout from "./layouts/DashboardLayout";

export const router = createBrowserRouter([
  {
    path: 'dashboard',
    element: <DashboardLayout />,
    children: [
      {
        path: 'home',
        element: <HomePage />,
      }
    ]
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/create",
    element: <CreateBook />,
  },
]);
