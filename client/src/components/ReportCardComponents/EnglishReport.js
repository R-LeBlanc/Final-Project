import styled from "styled-components";
import React, { useContext, useRef } from "react";

import { ReportContext } from "./ReportContext";

const EnglishReport = ({ classes }) => {
  const { grades, setGrades } = useContext(ReportContext);
  const form = useRef(null);
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

  const submit = (e) => {
    e.preventDefault();
    // console.log(form.current);
    // const data = new FormData(form.current);
    // checks the form data
    // for (var pair of data.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }
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

  // const calculateFinal = (e) => {
  //   // console.log(e.target.value);
  //   // console.log(e.target.key);
  //   setGrades();
  // };

  return (
    <>
      <Form ref={form} onSubmit={submit}>
        <Save type="submit" name="Save All"></Save>
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
                      <Comment rows={10} cols={50}></Comment>
                    </Classes>
                  </Row>
                );
              })}
          </tbody>
        </Table>
      </Form>
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

  &:hover {
    background-color: var(--accent-color);
  }
`;

const Form = styled.form``;

const Table = styled.table`
  /* background-color: pink; */
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

const Comment = styled.textarea``;
