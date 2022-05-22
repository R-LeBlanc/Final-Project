import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { useAuth } from "./AuthContext";
import { DashboardContext } from "./DashbordComponents/DashboardContext";
import Post from "./AnnounceComponemts/Post";

const Announcements = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { userDashboard } = useContext(DashboardContext);
  const [announcements, setAnnouncements] = useState();
  const [loading, setLoading] = useState(true);
  const [classList, setClassList] = useState();

  // Pulls a list of class names and the main school announcements from the
  // database
  useEffect(() => {
    fetch("/announcements")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.data);
        setClassList(data.data);
      });
    fetch("/announcements/Main")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.data);
        setAnnouncements(data.data);
        setLoading(false);
      });
  }, []);

  const handleClick = (event) => {
    fetch(`/announcements/${event.target.id}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.data);
        setAnnouncements(data.data);
      });
  };

  const deleteAnnouncement = async (id) => {
    const response = await fetch(`/announcements/${id}`, { method: "DELETE" });
    const data = await response.json();
    // console.log(data);
    // Filter through the announcement array and returns the objects that
    // do not match the id of the selected item
    setAnnouncements((announcements) =>
      announcements.filter((i) => i._id !== id)
    );
  };

  const announceArray = () => {
    return announcements.map((announcement) => {
      return (
        <Wrapper key={announcement.title}>
          <TitleWrap>
            <Title>{announcement.title}</Title>
            {currentUser &&
            userDashboard.className === announcements[0].class ? (
              <>
                <Delete
                  onClick={() => {
                    deleteAnnouncement(announcement._id);
                  }}
                >
                  <Img src="/images/close.png" />
                </Delete>
              </>
            ) : (
              ""
            )}
          </TitleWrap>
          <Message>{announcement.message}</Message>
        </Wrapper>
      );
    });
  };

  return (
    <>
      {!loading ? (
        <MainWrapper>
          <SideBar>
            {classList &&
              classList.map((item) => {
                return (
                  <ClassName
                    key={item}
                    id={item}
                    onClick={(event) => handleClick(event)}
                  >
                    {item}
                  </ClassName>
                );
              })}
          </SideBar>

          <AnnounceWrapper>
            {/* Checks to see if the current use is signed in, then checks their className against the 
            announcement class. If they match the user will be able to create and delete announcements  */}
            {currentUser &&
            userDashboard.className === announcements[0].class ? (
              <>
                <UserName>{currentUser.displayName}</UserName>
                {/* <Post /> */}
              </>
            ) : (
              ""
            )}
            {announceArray()}
          </AnnounceWrapper>
        </MainWrapper>
      ) : (
        <h2>loading...</h2>
      )}
    </>
  );
};

export default Announcements;

const Wrapper = styled.div`
  background-color: var(--secondary-color);
  /* border: 2px solid var(--accent-color); */
  border-radius: 15px;
  box-shadow: -1px 1px 5px 3px rgba(0, 0, 0, 0.3);
  /* backdrop-filter: blur(10px); */
  color: white;
  padding: 20px;
  margin: 20px;
`;

const TitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h2`
  border-bottom: 2px solid var(--accent-color);
`;

const Delete = styled.button`
  border: none;
`;

const Img = styled.img`
  height: 20px;
`;

const Message = styled.div`
  font-family: var(--font-body);
  padding-top: 20px;
`;

const MainWrapper = styled.div`
  /* background-color: var(--primary-color); */
  display: flex;
  /* background-image: url("/images/erik-skof-2.jpg");
  background-repeat: no-repeat;
  background-size: cover; */
`;

const SideBar = styled.div`
  background-color: var(--primary-color);
  border-radius: 0 0 15px 15px;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20px 15px;
  height: 100%;
`;

const ClassName = styled.button`
  background-color: var(--primary-color);
  border: none;
  border-radius: 10px;
  color: white;
  margin: 10px 0;
  padding: 10px;

  &:hover {
    background-color: white;
    color: var(--primary-color);
    cursor: pointer;
  }
`;

const AnnounceWrapper = styled.div`
  height: 90vh;
`;

const UserName = styled.h1`
  padding: 20px 0 0 20px;
`;
