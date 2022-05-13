import styled from "styled-components";
import React, { useContext } from "react";

import { ReportContext } from "./ReportContext";

const MathReport = ({ classes }) => {
  const { grades } = useContext(ReportContext);
  console.log("", classes);

  const calculateFinal = (e) => {
    console.log(e.target.value);
    console.log(e.target.key);
  };

  return (
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
              <Row key={c.id}>
                <Classes>{c.firstName + " " + c.lastName}</Classes>
                <Classes>
                  <Input
                    defaultValue={c.Numbers}
                    size="4"
                    onChange={(e) => {
                      calculateFinal(e);
                    }}
                  ></Input>
                </Classes>
                <Classes>
                  <Input defaultValue={c.Algebra} size="4"></Input>
                </Classes>
                <Classes>
                  <Input defaultValue={c.Data} size="4"></Input>
                </Classes>
                <Classes>
                  <Input defaultValue={c.SpacialSense} size="4"></Input>
                </Classes>
                <Classes>
                  <Input defaultValue={c.FinancialLiteracy} size="4"></Input>
                </Classes>
                {classes && (
                  <Classes>
                    {(c.Numbers +
                      c.Algebra +
                      c.Data +
                      c.SpacialSense +
                      c.FinancialLiteracy) /
                      classes.units.length}
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
  );
};

export default MathReport;

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