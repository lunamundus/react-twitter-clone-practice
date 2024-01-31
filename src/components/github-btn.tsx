// about React
import { useNavigate } from "react-router-dom";

// about Firebase
import {
  GithubAuthProvider,
  signInWithPopup,
  //   signInWithRedirect,
} from "firebase/auth";
import { auth } from "../firebase";

// about Styled Components
import styled from "styled-components";

const Button = styled.span`
  margin-top: 50px;
  background-color: white;
  font-weight: 600;
  color: black;
  width: 100%;
  padding: 10px 20px;
  border: 0;
  border-radius: 50px;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Logo = styled.img`
  height: 25px;
`;

function GithubButton() {
  const navigate = useNavigate();

  const onClick = async () => {
    try {
      const provider = new GithubAuthProvider();
      // 팝업 방식
      await signInWithPopup(auth, provider);

      // 리다이렉트 방식
      //   await signInWithRedirect

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button onClick={onClick}>
      <Logo src="/public/github-logo.svg" />
      Continue With GitHub
    </Button>
  );
}

export default GithubButton;
