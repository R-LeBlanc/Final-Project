import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";

const Announcements = () => {
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
        console.log(data.data);
        setAnnouncements(data.data);
      });
  };

  const announceArray = () => {
    return announcements.map((announcement) => {
      return (
        <Wrapper key={announcement.title}>
          <Title>{announcement.title}</Title>
          <Message>{announcement.message}</Message>
        </Wrapper>
      );
    });
  };

  // if (!loading) {
  //   console.log(announceArray());
  //   console.log(announcements);
  //   console.log(classList);
  // }
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
          <AnnounceWrapper>{announceArray()}</AnnounceWrapper>
        </MainWrapper>
      ) : (
        <h2>loading...</h2>
      )}
    </>
  );
};

export default Announcements;

const Wrapper = styled.div``;

const Title = styled.h2``;

const Message = styled.div`
  font-family: var(--font-body);
`;

const MainWrapper = styled.div`
  display: flex;
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
