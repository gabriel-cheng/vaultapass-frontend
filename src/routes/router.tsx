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
import { RootLayout } from "../components/layout/RootLayout";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <RouteErrorPage />,

    children: [
      {
        path: "/",
        element: <HomePage />,
        handle: { title: "Home | VaultaPass" },
      },

      {
        path: "/login",
        element: <LoginPage />,
        handle: { title: "Login | VaultaPass" },
      },

      {
        path: "/register",
        element: <RegisterPage />,
        handle: { title: "Cadastro | VaultaPass" },
      },

      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/profile",
            element: <ProfilePage />,
            handle: { title: "Perfil | VaultaPass" },
          },

          {
            path: "/dashboard",
            element: <DashboardPage />,
            handle: { title: "Dashboard | VaultaPass" },
          },

          {
            path: "/credentials/:id",
            element: <CredentialPage />,
            handle: { title: "Credenciais | VaultaPass" },
          },

          {
            path: "/credentials/new",
            element: <CreateCredentialPage />,
            handle: { title: "Criar credencial | VaultaPass" },
          },
        ],
      },
    ],
  },
]);
