import styled from "styled-components";
import React, { useContext, useEffect, useState } from "react";

const ScienceTable = ({ selectedReport }) => {
  return (
    <>
      <Table>
        <thead>
          <Row>
            <TableTitles>Class</TableTitles>
            <TableTitles>Earth And Space</TableTitles>
            <TableTitles>Life Systems</TableTitles>
            <TableTitles>Matter And Energy</TableTitles>
            <TableTitles>Structures And Mechanisms</TableTitles>
            <TableTitles>Comment</TableTitles>
          </Row>
        </thead>
        <tbody>
          {selectedReport.map((report) => {
            if (report.classID === "SCI_GR5") {
              return (
                <Row key={report._id}>
                  <Grade>{report.classID}</Grade>
                  <Grade>{report.EarthAndSpace}</Grade>
                  <Grade>{report.LifeSystems}</Grade>
                  <Grade>{report.MatterAndEnergy}</Grade>
                  <Grade>{report.StructuresAndMechanisms}</Grade>
                  <Grade>{report.Comment}</Grade>
                </Row>
              );
            }
          })}
        </tbody>
      </Table>
    </>
  );
};

export default ScienceTable;

const Table = styled.table`
  font-family: var(--font-body);
  text-align: left;
  width: 90%;

  th,
  td {
    /* border: 1px solid var(--accent-color); */
    padding: 20px;
  }
`;

const Row = styled.tr`
  /* background-color: pink; */
  padding: 20px 0;
`;

const TableTitles = styled.th`
  background-color: var(--secondary-color);
  vertical-align: middle;
`;

const Grade = styled.td`
  text-align: center;
  vertical-align: middle;
`;
