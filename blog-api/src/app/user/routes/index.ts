import UserPrivateRoute from "./private.route";
import UserPublicRoute from "./public.route";

const UserRoute = {
  Private: UserPrivateRoute,
  Public: UserPublicRoute
};

export default UserRoute;
