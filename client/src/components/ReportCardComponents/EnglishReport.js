import styled from "styled-components";
import React, { useContext, useRef } from "react";

import { ReportContext } from "./ReportContext";

const EnglishReport = ({ classes }) => {
  const { grades, setGrades } = useContext(ReportContext);
  // const form = useRef(null);
  console.log("", grades);
  // console.log("", classes);
  // const getComment = async () => {
  //   grades.map((student) => {
  //     const response =  await fetch(`/comment/${classes.classID}/`)

  //   })
  // }

  // Uses a map to set the state for the
  // specific unit based on the student ID. Now it won't override
  // the entire array. Takes the event and the class that is being edited
  const handleOnChange = (e, c) => {
    const gradeValue = parseInt(e.target.value);
    const unit = e.target.id;
    return setGrades(
      grades.map((grade) =>
        grade.studentID === c.studentID
          ? { ...grade, [unit]: gradeValue }
          : grade
      )
    );
  };

  const getComments = async () => {
    // const promise = await Promise.all(
    grades.map(async (student) => {
      const response = await fetch(
        `/comment/${classes.classID}/${student.FinalGrade}`
      );
      const data = await response.json();
      // console.log(data.data[0].comment);
      return setGrades(
        grades.map((grade) => {
          // grade.studentID === student.studentID
          //   ? { ...grade, Comment: data.data[0].comment }
          //   : grade
          if (grade.studentID === student.studentID) {
            let editComment = data.data[0].comment;
            let finalComment = editComment.replace(
              /{name}/g,
              student.firstName
            );
            return { ...grade, Comment: finalComment };
          } else {
            return grade;
          }
        })
      );
    });
    // );
    console.log(grades);
    // return promise;
  };

  const submit = (e) => {
    e.preventDefault();
    fetch(`/report/${classes.classID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(grades),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <>
      {/* <Form onSubmit={submit}> */}
      <Save type="submit" name="Save All" onClick={submit} />
      <GetComments onClick={getComments}> Populate Comments </GetComments>
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
            <TableTitles>Comments</TableTitles>
          </Row>
        </thead>
        <tbody>
          {grades &&
            grades.map((c) => {
              return (
                <Row key={c.studentID}>
                  <Classes>{c.firstName + " " + c.lastName}</Classes>
                  <Classes>
                    <Input
                      id="OralPresentation"
                      type="text"
                      defaultValue={c.OralPresentation}
                      size="4"
                      onChange={(e) => {
                        handleOnChange(e, c);
                      }}
                    ></Input>
                  </Classes>
                  <Classes>
                    <Input
                      id="Reading"
                      type="text"
                      // name="grades[][Reading]"
                      defaultValue={c.Reading}
                      size="4"
                      onChange={(e) => {
                        handleOnChange(e, c);
                      }}
                    ></Input>
                  </Classes>
                  <Classes>
                    <Input
                      id="Writing"
                      type="text"
                      // name="grades[][Writing]"
                      defaultValue={c.Writing}
                      size="4"
                      onChange={(e) => {
                        handleOnChange(e, c);
                      }}
                    ></Input>
                  </Classes>
                  <Classes>
                    <Input
                      id="MediaLiteracy"
                      type="text"
                      // name="grades[][MediaLiteracy]"
                      defaultValue={c.MediaLiteracy}
                      size="4"
                      onChange={(e) => {
                        handleOnChange(e, c);
                      }}
                    ></Input>
                  </Classes>
                  {classes && (
                    <Classes>
                      <Input
                        id="FinalGrade"
                        type="text"
                        // name="grades[][FinalGrade]"
                        defaultValue={c.FinalGrade}
                        size="4"
                        onChange={(e) => {
                          handleOnChange(e, c);
                        }}
                      >
                        {/* {(c.OralPresentation +
                        c.Reading +
                        c.Writing +
                        c.MediaLiteracy) /
                        classes.units.length} */}
                      </Input>
                    </Classes>
                  )}
                  <Classes>
                    <Comment
                      rows={10}
                      cols={50}
                      defaultValue={c.Comment ? c.Comment : ""}
                    ></Comment>
                  </Classes>
                </Row>
              );
            })}
        </tbody>
      </Table>
      {/* </Form> */}
    </>
  );
};

export default EnglishReport;

const Save = styled.input`
  background-color: var(--secondary-color);
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  padding: 10px 20px;
  margin-bottom: 20px;
  margin-right: 20px;
  &:hover {
    background-color: var(--accent-color);
  }
`;

const GetComments = styled.button`
  background-color: var(--secondary-color);
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  padding: 10px 20px;
  margin-bottom: 20px;

  &:hover {
    background-color: var(--accent-color);
  }
`;

const Form = styled.form``;

const Table = styled.table`
  font-family: var(--font-body);
  text-align: left;
  width: 90%;

  th,
  td {
    border: 2px solid var(--accent-color);
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: var(--secondary-color);
    color: white;
  }
`;

const Row = styled.tr``;

const TableTitles = styled.th`
  font-family: var(--font-header);
`;

const Classes = styled.td`
  vertical-align: middle;
`;

const Input = styled.input`
  border: none;
  text-align: center;
`;

const Comment = styled.textarea``;
