import styled from "styled-components";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { DashboardContext } from "./DashbordComponents/DashboardContext";
import { ReportContext } from "./ReportCardComponents/ReportContext";
import SideMenu from "./DashbordComponents/SideMenu";
import Modal from "./DashbordComponents/Modal";

const MyStudents = () => {
  const navigate = useNavigate();
  const { allClasses, selectedReport, setSelectedReport, grades } =
    useContext(ReportContext);
  const { userDashboard, usersStudents } = useContext(DashboardContext);
  // const [selectedReport, setSelectedReport] = useState();
  const [isOpen, setIsOpen] = useState(false);
  // console.log({ allClasses });

  const getStudentGradesOnClick = async (e) => {
    const test = async () => {
      const gradesArr = [];
      allClasses.forEach(async (c) => {
        const response = await fetch(`/report/${c.classID}/${e.target.id}`);
        const data = await response.json();
        setSelectedReport((prev) => [...prev, data.data[0]]);
      });
      return gradesArr;
    };

    const testRes = await test();

    setIsOpen(true);
  };

  // console.log(selectedReport);

  return (
    <>
      {isOpen && <Modal setIsOpen={setIsOpen} />}
      <Wrapper>
        <SideMenu />
        <SecondaryWrap>
          <Title>My Students</Title>
          <ClassesWrap>
            <ClassesWrap2>
              {/* <Buttons>
              <View>Class View</View>
              <View>Student View</View>
            </Buttons> */}
              <Table>
                <thead>
                  <Row>
                    <TableTitles>Sheet Name</TableTitles>
                    <TableTitles>Student ID</TableTitles>
                    <TableTitles>Grade</TableTitles>
                    <TableTitles>Teacher(s)</TableTitles>
                    <TableTitles>Report</TableTitles>
                  </Row>
                </thead>
                <tbody>
                  {!usersStudents ? (
                    <h1>Loading</h1>
                  ) : (
                    usersStudents.map((student) => {
                      return (
                        <Row key={student.id}>
                          <Classes>{student.name}</Classes>
                          <Classes>{student.id}</Classes>
                          <Classes>5</Classes>
                          <Classes>{userDashboard.name}</Classes>
                          <Classes>
                            {/* Report Icon */}
                            <Img
                              src="/images/exam.png"
                              id={student.id}
                              onClick={(e) => {
                                getStudentGradesOnClick(e);
                              }}
                            />
                          </Classes>
                        </Row>
                      );
                    })
                  )}
                </tbody>
              </Table>
            </ClassesWrap2>
          </ClassesWrap>
        </SecondaryWrap>
      </Wrapper>
    </>
  );
};

export default MyStudents;

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
  /* background-color: pink; */
  /* border-radius: 15px; */
  /* color: white; */
  display: flex;
  align-items: center;
  /* flex-direction: column; */
  justify-content: center;
  height: 100%;
`;

const ClassesWrap2 = styled.div`
  background-color: var(--primary-color);
  border-radius: 15px;
  color: white;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 60%;
  width: 80%;
`;

// const Buttons = styled.div`
//   /* background-color: pink; */
//   display: flex;
//   justify-content: flex-end;
//   padding: 10px 0 30px;
//   width: 90%;
// `;

// const View = styled.button`
//   border: none;
//   padding: 5px 10px;
//   margin-left: 7px;

//   &:hover {
//     color: white;
//     background-color: var(--accent-color);
//     cursor: pointer;
//   }
// `;

const Table = styled.table`
  /* background-color: pink; */
  font-family: var(--font-body);
  text-align: left;
  width: 90%;

  th,
  td {
    border: 1px solid var(--accent-color);
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: var(--secondary-color);
  }
`;

const Row = styled.tr``;

const TableTitles = styled.th`
  /* background-color: var(--accent-color); */
  font-family: var(--font-header);
`;

const Classes = styled.td`
  vertical-align: middle;
  /* background-color: pink; */
  /* display: flex;
  justify-content: space-evenly;
  width: 100%; */
`;

const Img = styled.img`
  height: 50px;

  &:hover {
    cursor: pointer;
  }
`;
