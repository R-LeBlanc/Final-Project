import styled from "styled-components";
import React, { useContext, useEffect, useState } from "react";

import { DashboardContext } from "./DashbordComponents/DashboardContext";
import SideMenu from "./DashbordComponents/SideMenu";

const MyReportCards = () => {
  const { userDashboard, usersStudents } = useContext(DashboardContext);
  const [classes, setClasses] = useState();
  const [selectedClass, setSelectedClass] = useState();
  // console.log(userDashboard);

  // const getClasses = async () => {
  //   const response = await fetch(`/classlist/${userDashboard.id}`);
  //   const data = await response.json();
  //   // console.log(data.data);
  //   setClasses(data.data);
  // };

  const handleOnClick = async (event) => {
    // console.log(event.target.value);
    const res = await fetch(
      `/classlist/${userDashboard.id}/${event.target.value}`
    );
    const data1 = await res.json();
    console.log(data1.data[0]);
    setClasses(data1.data[0]);
    const response = await fetch(`/report/${event.target.value}`);
    const data = await response.json();
    console.log(data.data);
    setSelectedClass(data.data);
  };

  // useEffect(() => {
  //   getClasses();
  // }, []);

  return (
    <Wrapper>
      <SideMenu />
      <SecondaryWrap>
        <Title>My Report Cards</Title>
        <ClassesWrap>
          <ClassesWrap2>
            <Buttons>
              <View>Select a class:</View>
              <Select
                id="classSelect"
                name="classSelect"
                onChange={(event) => {
                  handleOnClick(event);
                }}
              >
                {userDashboard &&
                  userDashboard.classes.map((c) => {
                    return <Option key={c}>{c}</Option>;
                  })}
              </Select>
            </Buttons>
            <Table>
              <thead>
                <Row>
                  <TableTitles>Name</TableTitles>
                  {/* Maps through the units array in the class a creates a table title for each unit */}
                  {classes &&
                    classes.units.map((unit) => {
                      return <TableTitles key={unit}>{unit}</TableTitles>;
                    })}
                  <TableTitles>Final Grade</TableTitles>
                </Row>
              </thead>
              <tbody>
                {selectedClass &&
                  selectedClass.map((c) => {
                    return (
                      <>
                        <Row key={c.id}></Row>
                        <Classes>{c.firstName + " " + c.lastName}</Classes>
                        <Classes>
                          <Input
                            defaultValue={c.EarthAndSpace}
                            size="4"
                          ></Input>
                        </Classes>
                        <Classes>
                          <Input defaultValue={c.LifeSystems} size="4"></Input>
                        </Classes>
                        <Classes>
                          <Input
                            defaultValue={c.MatterAndEnergy}
                            size="4"
                          ></Input>
                        </Classes>
                        <Classes>
                          <Input
                            defaultValue={c.StructuresAndMechanisms}
                            size="4"
                          ></Input>
                        </Classes>
                        <Classes>
                          {(c.EarthAndSpace +
                            c.LifeSystems +
                            c.MatterAndEnergy +
                            c.StructuresAndMechanisms) /
                            classes.units.length}
                        </Classes>
                      </>
                    );
                  })}
              </tbody>
            </Table>
            {/* <Table>
              <thead>
                <Row>
                  
                  <TableTitles>Name</TableTitles>
                  <TableTitles>Grade</TableTitles>
                  <TableTitles>Teacher(s)</TableTitles>
                  <TableTitles>Average</TableTitles>
                  <TableTitles>Median</TableTitles>
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
                        <Classes>5</Classes>
                        <Classes>{userDashboard.name}</Classes>
                        {/* TEMP DATA */}
            {/* <Classes>78</Classes>
                        <Classes>70</Classes>
                      </Row>
                    );
                  })
                )}
              </tbody>
            </Table> */}
          </ClassesWrap2>
        </ClassesWrap>
      </SecondaryWrap>
    </Wrapper>
  );
};

export default MyReportCards;

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
  /* justify-content: space-evenly; */
  height: 60%;
  width: 80%;
`;

const Buttons = styled.div`
  /* background-color: pink; */
  display: flex;
  justify-content: flex-end;
  padding: 10px 0 30px;
  width: 90%;
`;

const View = styled.label`
  border: none;
  font-size: 1.5rem;
  padding: 5px 10px;
  margin-left: 7px;

  &:hover {
    color: white;
    background-color: var(--accent-color);
    cursor: pointer;
  }
`;

const Select = styled.select`
  border-radius: 5px;
`;

const Option = styled.option``;

const ReportWrap = styled.div`
  /* background-color: pink; */
  display: flex;
  justify-content: space-evenly;
  height: 50%;
  width: 70%;
`;

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
  /* background-color: pink; */
  /* display: flex;
  justify-content: space-evenly;
  width: 100%; */
`;

const Input = styled.input``;
