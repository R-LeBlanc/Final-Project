import styled from "styled-components";
import React, { useContext, useEffect, useState } from "react";

const MathTable = ({ selectedReport }) => {
  return (
    <>
      <Table>
        <thead>
          <Row>
            <TableTitles>Class</TableTitles>
            <TableTitles>Numbers</TableTitles>
            <TableTitles>Algebra</TableTitles>
            <TableTitles>Data</TableTitles>
            <TableTitles>Spacial Sense</TableTitles>
            <TableTitles>Financial Literacy</TableTitles>
            <TableTitles>Comment</TableTitles>
          </Row>
        </thead>
        <tbody>
          {selectedReport.map((report) => {
            if (report.classID === "MA_GR5") {
              return (
                <Row key={report._id}>
                  <Grade>{report.classID}</Grade>
                  <Grade>{report.Numbers}</Grade>
                  <Grade>{report.Algebra}</Grade>
                  <Grade>{report.Data}</Grade>
                  <Grade>{report.SpacialSense}</Grade>
                  <Grade>{report.FinancialLiteracy}</Grade>
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

export default MathTable;

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
