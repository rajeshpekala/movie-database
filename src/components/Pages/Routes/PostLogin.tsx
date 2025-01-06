import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../../Header";

const PostLogin = () => {
  const token = useSelector((state: RootState) => state.auth.token);

 

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default PostLogin;
