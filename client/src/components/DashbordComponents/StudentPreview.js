import styled from "styled-components";
import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { DashboardContext } from "./DashboardContext";

const StudentPreview = () => {
  const { usersStudents } = useContext(DashboardContext);

  const studentArr = () => {
    return usersStudents.map((student) => {
      return (
        <StudentWrap key={student.id}>
          <Image src="/images/superhero3.png" />
          <Name>{student.name}</Name>
          <StudentId>ID {student.id}</StudentId>
        </StudentWrap>
      );
    });
  };

  return (
    <Wrapper>
      <SecondaryWrap>
        <Title>Students</Title>
        <Container>{usersStudents && studentArr()}</Container>
      </SecondaryWrap>
    </Wrapper>
  );
};

export default StudentPreview;

const Wrapper = styled.div`
  background-color: var(--primary-color);

  border-radius: 15px;
  color: white;
  display: flex;
  width: 40vw;
  height: 70%;
`;

const SecondaryWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 20px;
  height: 85%;
  width: 100%;
`;

const Container = styled.div``;

const Title = styled.h2`
  padding-bottom: 50px;
`;

const StudentWrap = styled.div`
  background-color: var(--secondary-color);
  /* background-image: linear-gradient(
    to bottom right,
    var(--secondary-color),
    rgb(255, 195, 130)
  ); */
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  margin: 10px 0;
  align-items: center;
`;

const Image = styled.img`
  height: 50px;
`;

const Name = styled.p``;

const StudentId = styled.h3``;
