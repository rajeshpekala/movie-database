import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../../redux/store";

const Prelogin = () => {
  const { token } = useSelector((state: RootState) => state.auth);

  if (token) {
    return <Navigate to="/home" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Prelogin;
