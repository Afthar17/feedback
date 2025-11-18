import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import HomePage from "../pages/HomePage";
import AuthRedirect, {
  ProtectedRoute,
  ProtectedRoutedRole,
} from "../lib/AuthRedirect";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import Dashboard from "../pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/signup",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <AuthRedirect>
            <SignUpPage />
          </AuthRedirect>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <AuthRedirect>
            <LoginPage />
          </AuthRedirect>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoutedRole role="admin">
            <Dashboard />
          </ProtectedRoutedRole>
        ),
      },
    ],
  },
]);

export default function Approuter() {
  return <RouterProvider router={router} />;
}
