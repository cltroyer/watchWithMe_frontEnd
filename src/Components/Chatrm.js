import React, { useState, useEffect } from "react";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageInput,
  MessageInputSmall,
  VirtualizedMessageList,
  Window,
} from "stream-chat-react";
import "stream-chat-react/dist/css/index.css";

const chatClient = StreamChat.getInstance("w32wyynbv2x4");

const Chatrm = (props) => {
  const [key, setKey] = useState("");
  const [start, setStart] = useState(null);
  const [channel, setChannel] = useState("");

  const userName = props.name;

  const login = (e) => {
    fetch("http://localhost:4000/token/" + userName)
      .then((res) => res.json())
      .then((keypass) => {
        setKey(keypass);
      });
    setStart(true);
  };
  if (start && key !== "") {
    chatClient.connectUser(
      {
        id: userName,
        name: userName,
      },
      key
    );
    setChannel(
      chatClient.channel("Formula1", "livestream", {
        image: "https://www.svgrepo.com/show/147337/f1-helmet.svg",
        name: "F1 discussion",
      })
    );
    setStart(false);
  }

  useEffect(() => {
    login();
    // eslint-disable-next-line
  }, []);

  return (
    
      <Chat client={chatClient} theme="livestream dark">
        <Channel channel={channel}>
          <Window>
            <ChannelHeader live />
            <VirtualizedMessageList />
            <MessageInput Input={MessageInputSmall} focus />
          </Window>
        </Channel>
      </Chat>
  );
};
export default Chatrm;
