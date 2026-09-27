import { createBrowserRouter } from "react-router-dom";

import { RouteErrorPage } from "../components/layout/RouteErrorPage";
import { ProtectedRoute } from "../features/auth/ProtectedRoute";

import { HomePage } from "../features/home/pages/HomePage";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { RegisterPage } from "../features/auth/pages/RegisterPage";
import { ProfilePage } from "../features/profile/pages/ProfilePage";
import { DashboardPage } from "../features/dashboard/pages/DashboardPage";
import { CredentialPage } from "../features/credentials/pages/CredentialPage";
import { CreateCredentialPage } from "../features/credentials/pages/CreateCredentialPage";

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
            element: <DashboardPage />,
          },

          {
            path: "/credentials/:id",
            element: <CredentialPage />,
          },

          {
            path: "/credentials/new",
            element: <CreateCredentialPage />,
          },
        ],
      },
    ],
  },
]);
