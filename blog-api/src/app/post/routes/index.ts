import PostPrivateRoute from "./private.route";
import PostPublicRoute from "./public.route";

const PostRoute = {
  private: PostPrivateRoute,
  public: PostPublicRoute
};

export default PostRoute;
