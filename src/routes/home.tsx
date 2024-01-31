import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

function Home() {
  const navigate = useNavigate();

  const logOut = () => {
    auth.signOut();
    navigate("/login");
  };

  return (
    <div>
      <button onClick={logOut}>로그아웃</button>
    </div>
  );
}

export default Home;
