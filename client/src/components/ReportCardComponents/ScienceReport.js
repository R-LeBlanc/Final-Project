import styled from "styled-components";
import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { ReportContext } from "./ReportContext";

const ScienceReport = ({ classes }) => {
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

  const getComments = async () => {
    try {
      grades.forEach(async (student) => {
        const response = await fetch(
          `/comment/${classes.classID}/${student.FinalGrade}`
        );
        const data = await response.json();
        // console.log(data);
        const comment = commentGenerator(student, data.data[0].comment);
        const index = grades.findIndex(
          (x) => x.studentID === student.studentID
        );

        document.getElementById(`comment-${index}`).innerHTML = comment;
        setGrades((prev) => {
          // console.log(prev);
          prev[index].Comment = comment;
          return prev;
        });
      });
    } catch (e) {
      console.log(e);
    }
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
                        id="EarthAndSpace
"
                        type="text"
                        defaultValue={c.EarthAndSpace}
                        size="4"
                        onChange={(e) => {
                          handleOnChange(e, c);
                        }}
                      ></Input>
                    </Classes>
                    <Classes>
                      <Input
                        id="LifeSystems"
                        type="text"
                        defaultValue={c.LifeSystems}
                        size="4"
                        onChange={(e) => {
                          handleOnChange(e, c);
                        }}
                      ></Input>
                    </Classes>
                    <Classes>
                      <Input
                        id="MatterAndEnergy"
                        type="text"
                        defaultValue={c.MatterAndEnergy}
                        size="4"
                        onChange={(e) => {
                          handleOnChange(e, c);
                        }}
                      ></Input>
                    </Classes>
                    <Classes>
                      <Input
                        id="StructuresAndMechanisms"
                        type="text"
                        defaultValue={c.StructuresAndMechanisms}
                        size="4"
                        onChange={(e) => {
                          handleOnChange(e, c);
                        }}
                      ></Input>
                    </Classes>
                    {classes && (
                      <Classes>
                        {c.FinalGrade ? (
                          <Input
                            id="FinalGrade"
                            type="text"
                            defaultValue={c.FinalGrade}
                            size="4"
                            onChange={(e) => {
                              handleOnChange(e, c);
                            }}
                          ></Input>
                        ) : (
                          (c.EarthAndSpace +
                            c.LifeSystems +
                            c.MatterAndEnergy +
                            c.StructuresAndMechanisms) /
                          classes.units.length
                        )}
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

export default ScienceReport;

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
