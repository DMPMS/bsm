import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router-dom";
import { signInRoutes } from "./routes/signIn.routes";
import { signUpRoutes } from "./routes/signUp.routes";
import { authRedirectRoutes } from "./routes/authRedirect.routes";
import { userRoutes } from "./routes/user.routes";
import { UserTypeEnum } from "./enums/UserType.enum";
import { verifyLoggedIn } from "./utils/auth";
import Notification from "./components/notification/notification";
import NotFoundScreen from "./screens/notFound.screen";
import { saveRoutes } from "./routes/save.routes";

const routesNotLoggedIn: RouteObject[] = [...signInRoutes, ...signUpRoutes];

const routesLoggedIn: RouteObject[] = [...authRedirectRoutes].map((route) => ({
  ...route,
  loader: verifyLoggedIn(),
}));

const routesAdminLoggedIn: RouteObject[] = [...userRoutes].map((route) => ({
  ...route,
  loader: verifyLoggedIn(UserTypeEnum.Admin),
}));

const routesUserLoggedIn: RouteObject[] = [...saveRoutes].map((route) => ({
  ...route,
  loader: verifyLoggedIn(UserTypeEnum.User),
}));

const router = createBrowserRouter([
  ...routesNotLoggedIn,
  ...routesLoggedIn,
  ...routesAdminLoggedIn,
  ...routesUserLoggedIn,
  {
    path: "*",
    element: <NotFoundScreen />,
  },
]);

function App() {
  const { showNotification } = Notification();

  return (
    <>
      {showNotification}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
