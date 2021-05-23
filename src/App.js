import "./App.css";
import Chatrm from "./Components/Chatrm";
import Histdata from "./Components/Histdata";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./Components/LoginButtion";
import LogoutButton from "./Components/Logout";

function App() {
  const { user, isAuthenticated } = useAuth0();

  if (isAuthenticated === false) {
    return (
      <>
        <div className="bodylanding">
          <div className="containlanging">
            <img src="f1_logo.png" alt="" srcset="" className="loginImg" />
            <h1 className="h1landing">Welcome</h1>
            <h3 className="h3landing">Please login to join the stream!</h3>
            <LoginButton />
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="App">
        <div className="hcontain">
          <iframe title="race" width="60%" src="//ok.ru/videoembed/2148962667076" frameborder="0" allow="autoplay" allowfullscreen/>
          <div className="containinfo mainInfo">
          <Histdata />
          </div>
        </div>
        <div className="chat">
          <Chatrm name={user.nickname} />
        </div>
        <LogoutButton />
      </div>
    );
  }
}

export default App;
