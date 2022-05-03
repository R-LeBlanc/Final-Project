import styled from "styled-components";
import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { DashboardContext } from "./DashboardContext";

const StudentPreview = () => {
  const { usersStudents } = useContext(DashboardContext);
  console.log(usersStudents);
  return (
    <Wrapper>
      <Title>Students</Title>
      {usersStudents.map((student) => {
        // console.log("here");
        return (
          <StudentWrap key={student.id}>
            <Image>S</Image>
            <Name>{student.name}</Name>
            <StudentId>ID {student.id}</StudentId>
          </StudentWrap>
        );
      })}
    </Wrapper>
  );
};

export default StudentPreview;

const Wrapper = styled.div`
  background-color: var(--primary-color);

  border-radius: 15px;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 30px 20px;
  width: 40vw;
  max-height: 350px;

  /* overflow: scroll; */
`;

const Title = styled.h2``;

const StudentWrap = styled.div`
  /* background-color: var(--secondary-color); */
  background-image: linear-gradient(
    to bottom right,
    var(--secondary-color),
    var(--primary-color)
  );
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  margin: 10px 0;
`;

const Image = styled.div`
  background-color: white;
  border-radius: 100%;
  color: var(--accent-color);
  width: 20px;
  height: 20px;
  text-align: center;
`;

const Name = styled.h3`
  /* padding-right: 20px; */
`;

const StudentId = styled.h3``;
