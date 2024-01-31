// about React
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// about Firebase
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

// about auth styled-components
import {
  Error,
  Form,
  Input,
  Switcher,
  Title,
  Wrapper,
} from "../components/auth-components";

// about Components
import GithubButton from "../components/github-btn";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 새로고침 방지
    setError(""); // 사용자가 버튼을 다시 클릭했을 때, 오류메세지 초기화

    if (loading || email === "" || password === "") {
      return;
    }

    try {
      // create an account
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      // set the name of the user profile
      // redirect to the homepage
    } catch (error) {
      // setError
      if (error instanceof FirebaseError) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>Log Into 🕊️</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="email"
          value={email}
          placeholder="E-mail"
          type="email"
          required
        />
        <Input
          onChange={onChange}
          name="password"
          value={password}
          placeholder="Password"
          type="password"
          required
        />
        <Input type="submit" value={loading ? "Loading..." : "Log In"} />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        계정이 없으신가요? <Link to="/create-account">회원가입</Link>
      </Switcher>
      <GithubButton />
    </Wrapper>
  );
}

export default Login;
