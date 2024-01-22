// about react basic components
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";

// about styled-components
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

// about Firebase
import { auth } from "./firebase";

// about components
import Layout from "./components/layout";
import LoadingScreen from "./components/loading-screen";

// about routes
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/login";
import CreateAccount from "./routes/create-account";

// code start
// router setting
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create-account",
    element: <CreateAccount />,
  },
]);

// default global style setting
const GlobalStyles = createGlobalStyle`
  ${reset};

  *{
    box-sizing: border-box;
  }

  body{
    background-color: black;
    color: white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

// App fucntion start (page render)
function App() {
  const [isLoading, setIsLoading] = useState(true);
  // Firebase authentication process
  const init = async () => {
    // wait for firebase
    await auth.authStateReady(); // 최초 인증상태가 완료될 때 실행되는 promise를 return -> 로그인 여부를 확인하는 과정
    setIsLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Wrapper>
      <GlobalStyles />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
    </Wrapper>
  );
}

export default App;
