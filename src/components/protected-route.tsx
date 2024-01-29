import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = auth.currentUser; // firebase에 유저 정보 요청 -> 로그인이 되어 있으면 user 정보를, 되어 있지 않으면 null릉 넘겨줌

  if (user === null) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
