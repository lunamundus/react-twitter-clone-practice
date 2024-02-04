// about React
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// about Firebase
import { sendPasswordResetEmail } from "firebase/auth";
import { FirebaseError } from "firebase/app";
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

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (email === "") {
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        if (err instanceof FirebaseError) {
          setError(err.message);
        }
      });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;

    setEmail(value);
  };

  return (
    <Wrapper>
      <Title>Reset Password</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="email"
          value={email}
          placeholder="이메일을 입력하세요"
          type="email"
        />
        <Input type="submit" value="Reset" />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        로그인 페이지로 돌아가기 <Link to="/login">로그인</Link>
      </Switcher>
      <Switcher>
        계정을 생성하시겠습니까? <Link to="/create-account">계정 생성</Link>
      </Switcher>
    </Wrapper>
  );
}

export default ResetPassword;
