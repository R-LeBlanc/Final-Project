import styled from "styled-components";
import React, { useContext, useEffect, useState } from "react";

import { DashboardContext } from "./DashbordComponents/DashboardContext";
import SideMenu from "./DashbordComponents/SideMenu";

const MyClasses = () => {
  const { userDashboard } = useContext(DashboardContext);
  const [classes, setClasses] = useState();
  console.log(userDashboard);

  const getClasses = async () => {
    const response = await fetch(`/classlist/${userDashboard.id}`);
    const data = await response.json();
    console.log(data.data);
    setClasses(data.data);
  };

  useEffect(() => {
    getClasses();
  }, []);

  return (
    <Wrapper>
      <SideMenu />
      <SecondaryWrap>
        <Title>My Classes</Title>
        <ClassesWrap>
          {!classes ? (
            <h1>Loading</h1>
          ) : (
            classes.map((c) => {
              return <p>{c.name}</p>;
            })
          )}
        </ClassesWrap>
      </SecondaryWrap>
    </Wrapper>
  );
};

export default MyClasses;

const Wrapper = styled.div`
  display: flex;
`;

const SecondaryWrap = styled.div`
  /* background-color: lightblue; */
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 2rem;
  font-family: var(--font-header);
  padding: 20px 0;
`;

const ClassesWrap = styled.div`
  background-color: var(--primary-color);
  border-radius: 15px;
  color: white;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
`;
