import "./normal.css";
import "./App.css";
import Home from "./pages/Home";
import SignupForm from "./components/signup/SignUpForm";
import LoginForm from "./components/login/LoginForm";
import { Navigate, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import {PayView} from "./pages/Pay"
import { ConfigProvider } from 'antd';
function App() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
      return children;
    // return currentUser ? children : <Navigate to="login" />;
  };

  return (
      <ConfigProvider theme={{ token: { colorPrimary: '#8359e3' } }}>
          <div className="App">
              <Routes>
                  <Route
                      index
                      exact
                      path="/"
                      element={
                          <RequireAuth>
                              <Home />
                          </RequireAuth>
                      }
                  />
                  <Route exact path="register" element={<SignupForm />} />
                  <Route exact path="login" element={<LoginForm />} />
                  <Route exact path="pay" element={<PayView />}/>

              </Routes>
          </div>
      </ConfigProvider>
  );
}

export default App;
