import { createBrowserRouter } from "react-router-dom";

import { RouteErrorPage } from "../components/layout/RouteErrorPage";
import { ProtectedRoute } from "../features/auth/ProtectedRoute";

import { HomePage } from "../features/home/pages/HomePage";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { RegisterPage } from "../features/auth/pages/RegisterPage";

export const router = createBrowserRouter([
  {
    errorElement: <RouteErrorPage />,

    children: [
      {
        path: "/",
        element: <HomePage />,
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
        element: <ProtectedRoute />,
        children: [
          {
            path: "/dashboard",
            element: <div>Dashboard</div>,
          },
        ],
      },
    ],
  },
]);
