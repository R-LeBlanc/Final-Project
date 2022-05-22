import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../AuthContext";
import { DashboardContext } from "../DashbordComponents/DashboardContext";
import SideMenu from "../DashbordComponents/SideMenu";

const Post = () => {
  const { currentUser } = useAuth();
  const { userDashboard } = useContext(DashboardContext);

  const [message, setMessage] = useState(null);
  const [title, setTitle] = useState(null);
  const [counter, setCounter] = useState(500);
  const seed = 500;
  const navigate = useNavigate();
  // creat a function that counts down from 500 for every
  // character in the text area
  // use regex with the \s quantifier to ignore all white
  // space(new lines, spaces, tabs) ex. /\s/g
  const characterCounter = (event) => {
    let textArray = event.target.value.replace(/\s/g, "").length;
    setCounter(seed - textArray);
    return counter;
  };

  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const onPostChange = (event) => {
    setMessage(event.target.value);
    // call characterCounter here
    characterCounter(event);
  };

  const handleClickPost = (e) => {
    e.preventDefault();
    const post = {
      class: userDashboard.className,
      title: title,
      message: message,
    };
    if (counter > 0) {
      const request = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      };
      fetch("/announcements", request).then((res) => res.json());
      // .then((data) => console.log(data));
    }
    navigate("/announcements");
  };

  return (
    <MainWrap>
      <SideMenu />
      <Wrapper>
        {/* <Title>Home</Title> */}
        <form>
          <PostWrapper>
            {/* <Avatar src={state.currentUser.avatarSrc} /> */}
            <WritingArea
              placeholder="Title"
              rows="1"
              onChange={onTitleChange}
            ></WritingArea>
            <WritingArea
              placeholder="What's happening?"
              rows="10"
              // cols="55"
              onChange={onPostChange}
            ></WritingArea>
          </PostWrapper>
          <SubmitWrapper>
            <Submit type="submit" onClick={(e) => handleClickPost(e)}>
              Post
            </Submit>
            <Counter
              style={{
                color: counter < 0 ? "red" : counter <= 55 ? "#ffbf33" : "",
              }}
            >
              {counter}
            </Counter>
          </SubmitWrapper>
        </form>
      </Wrapper>
    </MainWrap>
  );
};

export default Post;

const MainWrap = styled.div`
  display: flex;
`;

const Wrapper = styled.div`
  border-bottom: 7px solid lightgray;
  border-right: 1px solid lightgray;
  margin: 10px 0;
  padding: 15px 30px;
  width: 70%;
  height: 70%;
`;

const Title = styled.div`
  /* background-image: linear-gradient(
    45deg,
    
  ); */
  /* border-radius: 15px; */
  /* color: white; */
  font-size: 2rem;
  border-bottom: 1px solid lightgray;
  padding: 15px 10px;
`;

const PostWrapper = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  margin-top: 15px;
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 10px;
`;

const WritingArea = styled.textarea`
  border: none;
  font-size: 1rem;
  resize: none;
  width: 80%;
`;

const SubmitWrapper = styled.div`
  align-content: flex-end;
  align-items: center;
  display: flex;
`;

const Counter = styled.div`
  color: lightgray;
`;

const Submit = styled.button`
  background-color: var(--accent-color);
  border: none;
  border-radius: 30px;
  color: white;
  display: flex;
  font-weight: bold;
  justify-content: center;
  margin-right: 20px;
  padding: 15px 30px;
`;
