import React, {useContext, useEffect, useRef, useState} from "react";
import Avatar from "../components/Avatar";
import BotResponse from "../components/BotResponse";
import Error from "../components/Error";
import IntroSection from "../components/IntroSection";
import Loading from "../components/Loading";
import NavContent from "../components/NavContent";
import SvgComponent from "../components/SvgComponent";
import axios from "axios";
import { Base64 } from "js-base64";
import { BackendBaseURL } from "../components/remote/Api";
import { ChatModels } from "../data/GlobalData";
import "./home.css";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Modal,Tabs } from 'antd';
import LoginForm from "../components/login/LoginForm";
import SignupForm from "../components/signup/SignUpForm";
import login from "../components/login/Login";
import Login from "../components/login/Login";
import SignUp from "../components/signup/SignUp";


const Home = () => {

  const [open, setOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [inputPrompt, setInputPrompt] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [err, setErr] = useState(false);
  const [responseFromAPI, setResponseFromAPI] = useState(false);
  const [chatModel, setChatModel] = useState(ChatModels[0].value);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const chatLogRef = useRef(null);

  useEffect(()=>{
    const makeChatLogCall = async () => {
      if(currentUser){
        try {
          await axios.post(BackendBaseURL+"debug/",{});
          const response =await axios.post(BackendBaseURL+"getChatLogs/",{});
          console.log(response.data);
          let tempChatLog = [];
          response.data !== null && response.data.chatLogs.forEach(chatLog=>{
            tempChatLog.push({
              chatPrompt: Base64.decode(chatLog.question),
              botMessage: Base64.decode(chatLog.answer),  // base64 decode
              questionId:chatLog.id,
              createTime:chatLog.create_time
            });
          });
          console.log({tempChatLog});
          setChatLog(tempChatLog);
        } catch (e) {
          console.log(e);
        }
      }
    }
    makeChatLogCall();
    console.log({chatLog});
  }, []);

  const handleSubmit = (e) => {
    if(!currentUser){
      // navigate("/login");
      setOpen(true);
      return;
    }

    e.preventDefault();

    if (!responseFromAPI) {
      if (inputPrompt.trim() !== "") {
        // Set responseFromAPI to true before making the fetch request
        setResponseFromAPI(true);
        setChatLog([...chatLog, { chatPrompt: inputPrompt }]);
        callAPI();

        // hide the keyboard in mobile devices
        e.target.querySelector("input").blur();
      }

      async function callAPI() {
        try {
          const prompt = inputPrompt;
          const body ={
            message:Base64.encode(prompt),
            chatModel: chatModel,
            chatLog: chatLog.slice(-3),
          }

          const data = await axios
            .post(BackendBaseURL+"chat/", body) // base64 encode
            .then((response) => {
              return response.data;
            })
            .catch((err) => {
              console.log("err.response=" + JSON.stringify(err.response));
              console.log(err);
              return null;
            });
          setChatLog([
            ...chatLog,
            {
              chatPrompt: Base64.encode(inputPrompt),
              botMessage: data.botResponse, // base64 encoded
            },
          ]);
          setErr(false);
        } catch (err) {
          setErr(err);
          console.log(err);
        }
        //  Set responseFromAPI back to false after the fetch request is complete
        setResponseFromAPI(false);
      }
    }

    setInputPrompt("");
  };

  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }

    return () => {};
  }, []);

  return (
    <>
      <header className="header">
        <div style={{paddingTop:"12px"}}>
          <button onClick={() => setShowMenu(true)} className={"navButton"}>
            <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="#d9d9e3"
                strokeLinecap="round"
            >
              <path d="M21 18H3M21 12H3M21 6H3" />
            </svg>
          </button>
          <img src="https://abibb.com/logo.svg" width={28} height={28} className={"navImg"}/>
        </div>
        {
          currentUser ? null : <button
              className="login-button"
              onClick={()=>{
                // navigate("/login");
                setOpen(true);
              }}>
            登录/注册
          </button>
        }
      </header>

      {showMenu && (
        <nav className="nav">
          <div className="navItems">
            <NavContent
              chatLog={chatLog}
              setChatLog={setChatLog}
              setShowMenu={setShowMenu}
              chatModel={chatModel}
              setChatModel={setChatModel}
            />
          </div>
          <div className="navCloseIcon">
            <svg
              fill="#000"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              xmlSpace="preserve"
              stroke="#fff"
              width={28}
              height={28}
              onClick={() => setShowMenu(false)}
            >
              <path d="m53.691 50.609 13.467-13.467a2 2 0 1 0-2.828-2.828L50.863 47.781 37.398 34.314a2 2 0 1 0-2.828 2.828l13.465 13.467-14.293 14.293a2 2 0 1 0 2.828 2.828l14.293-14.293L65.156 67.73c.391.391.902.586 1.414.586s1.023-.195 1.414-.586a2 2 0 0 0 0-2.828L53.691 50.609z" />
            </svg>
          </div>
          <div className="navRight"></div>
        </nav>
      )}

      <div style={{display:"flex"}}>
        <aside className="sideMenu">
          <NavContent
              chatLog={chatLog}
              setChatLog={setChatLog}
              setShowMenu={setShowMenu}
              chatModel={chatModel}
              setChatModel={setChatModel}
          />
        </aside>

        <section className="chatBox">
          {chatLog.length > 0 ? (
              <div className="chatLogWrapper">
                {chatLog.length > 0 &&
                    chatLog.map((chat, idx) => (
                        <div
                            className="chatLog"
                            key={idx}
                            ref={chatLogRef}
                            id={`navPrompt-${Base64.decode(chat.chatPrompt).replace(
                                /[^a-zA-Z0-9]/g,
                                "-"
                            )}`}
                        >
                          <div className="chatPromptMainContainer">
                            <div className="chatPromptWrapper">
                              <Avatar bg="#5437DB" className="userSVG">
                                <svg
                                    stroke="currentColor"
                                    fill="none"
                                    strokeWidth={1.9}
                                    viewBox="0 0 24 24"
                                    // strokeLinecap="round"
                                    // strokeLinejoin="round"
                                    className="h-6 w-6"
                                    height={40}
                                    width={40}
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                  <circle cx={12} cy={7} r={4} />
                                </svg>
                              </Avatar>
                              <div id="chatPrompt">
                                {chat.chatPrompt}
                              </div>
                            </div>
                          </div>

                          <div className="botMessageMainContainer">
                            <div className="botMessageWrapper">
                              <Avatar bg="#11a27f" className="openaiSVG">
                                <SvgComponent w={41} h={41} />
                              </Avatar>
                              {chat.botMessage ? (
                                  <div id="botMessage">
                                    <BotResponse
                                        response={chat.botMessage}
                                        chatLogRef={chatLogRef}
                                    />
                                  </div>
                              ) : err ? (
                                  <Error err={err} />
                              ) : (
                                  <Loading />
                              )}
                            </div>
                          </div>
                        </div>
                    ))}
              </div>
          ) : (
              <IntroSection />
          )}

          <form onSubmit={handleSubmit}>
            <div className={"inputContainer"}>
              <input
                  name="inputPrompt"
                  placeholder={"问点什么吧..."}
                  id=""
                  className="inputQuestion"
                  type="text"
                  rows="1"
                  value={inputPrompt}
                  onChange={(e) => setInputPrompt(e.target.value)}
              ></input>

              <button aria-label="form submit" type="submit" className={"submitButton"}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path></svg>
              </button>
            </div>
          </form>
        </section>

        <Modal
            open={open}
            title={null}
            onCancel={()=>setOpen(false)}
            footer={null}
        >
          <div className={"login-header"}>
            <img src="https://abibb.com/logo.svg" width={'44px'} height={'44px'}></img>
            <p>与智能AI进行对话交流</p>
          </div>
          <Tabs
              defaultActiveKey="login"
              items={[
                {
                  key: 'login',
                  label: '登录',
                  children: <Login/>,
                },
                {
                  key: 'register',
                  label: '注册',
                  children: <SignUp/>,
                },
              ]}
              onChange={(key)=>{
                  console.log(key);
              }} />
        </Modal>
      </div>
    </>
  );
};

export default Home;
