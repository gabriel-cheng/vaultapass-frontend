import { createBrowserRouter } from "react-router-dom";

import { RouteErrorPage } from "../components/layout/RouteErrorPage";
import { ProtectedRoute } from "../features/auth/ProtectedRoute";

import { HomePage } from "../features/home/pages/HomePage";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { RegisterPage } from "../features/auth/pages/RegisterPage";
import { ProfilePage } from "../features/profile/pages/ProfilePage";

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
            path: "/profile",
            element: <ProfilePage />,
          },

          {
            path: "/dashboard",
            element: (
              <div className="p-8 text-white">Dashboard (em construção)</div>
            ),
          },
        ],
      },
    ],
  },
]);
