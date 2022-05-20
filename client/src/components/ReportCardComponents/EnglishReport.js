import styled from "styled-components";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ReportContext } from "./ReportContext";

const EnglishReport = ({ classes }) => {
  const textInputRef = useRef(null);
  const navigate = useNavigate();
  const { grades, setGrades } = useContext(ReportContext);
  // console.log(grades);

  const handleCommentChange = (e, c) => {
    // setGrades(grades);
    return setGrades(
      grades.map((grade) => {
        console.log(grade.Comment);
        return grade.studentID === c.studentID
          ? { ...grade, Comment: e.target.value }
          : grade;
      })
    );
  };
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

  const commentGenerator = (student, comment) => {
    const foundStudent = grades.find((x) => x.studentID === student.studentID);
    if (!foundStudent) {
      return student;
    }
    const changeGender = (num) => {
      if (num === 1) {
        if (student.gender === "M") {
          return "he";
        } else {
          return "she";
        }
      } else {
        if (student.gender === "M") {
          return "his";
        } else {
          return "her";
        }
      }
    };
    let nameEdit = comment.replace(/{name}/g, student.firstName);
    let genderEdit1 = nameEdit.replace(/{heshe}/g, changeGender(1));
    let genderEdit2 = genderEdit1.replace(/{hisher}/g, changeGender(2));
    return genderEdit2;
  };

  // const [refetch, setRefetch] = useState(false);

  const getComments = async () => {
    // const promise = await Promise.all(
    try {
      grades.forEach(async (student) => {
        const response = await fetch(
          `/comment/${classes.classID}/${student.FinalGrade}`
        );
        const data = await response.json();
        // console.log(data);
        const comment = commentGenerator(student, data.data[0].comment);

        // testArr.push(modifiedStudent);
        const index = grades.findIndex(
          (x) => x.studentID === student.studentID
        );
        // setGrades((grades[index].Comment = comment));
        // grades[index].Comment = comment;
        document.getElementById(`comment-${index}`).innerHTML = comment;
        setGrades((prev) => {
          // console.log(prev);
          prev[index].Comment = comment;
          return prev;
        });
        // console.log(grades);
        // setGrades(grades);

        // return (grades[index].Comment = comment);
      });
    } catch (e) {
      console.log(e);
    }

    // setRefetch(!refetch);
  };
  // console.log(refetch);
  // useEffect(() => {
  //   console.log(grades);
  //   // setGrades(grades);
  // }, [grades]);

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
    navigate("/dashboard");
  };

  return (
    <>
      {/* <Form onSubmit={submit}> */}
      <ButtonsWrap>
        <Save type="submit" name="Save All" onClick={submit} />
        <GetComments onClick={getComments}> Populate Comments </GetComments>
      </ButtonsWrap>
      <TableWrap>
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
              grades.map((c, i) => {
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
                        ref={textInputRef}
                        id={`comment-${i}`}
                        defaultValue={c.Comment}
                        onChange={(e) => {
                          handleCommentChange(e, c);
                        }}
                      ></Comment>
                    </Classes>
                  </Row>
                );
              })}
          </tbody>
        </Table>
      </TableWrap>
      {/* </Form> */}
    </>
  );
};

export default EnglishReport;

const ButtonsWrap = styled.div`
  display: flex;
`;

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

// const Form = styled.form``;

const TableWrap = styled.div`
  max-height: 60%;
  overflow: scroll;
`;

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
