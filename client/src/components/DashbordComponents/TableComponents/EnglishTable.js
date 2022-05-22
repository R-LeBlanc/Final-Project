import styled from "styled-components";
import React, { useContext, useEffect, useState } from "react";

const EnglishTable = ({ selectedReport }) => {
  return (
    <>
      <Table>
        <thead>
          <Row>
            <TableTitles>Class</TableTitles>
            <TableTitles>Media Literacy</TableTitles>
            <TableTitles>Oral Presentation</TableTitles>
            <TableTitles>Reading</TableTitles>
            <TableTitles>Writing</TableTitles>
            <TableTitles>Comment</TableTitles>
          </Row>
        </thead>
        <tbody>
          {selectedReport.map((report) => {
            if (report.classID === "ENG_GR5") {
              return (
                <Row key={report._id}>
                  <Grade>{report.classID}</Grade>
                  <Grade>{report.MediaLiteracy}</Grade>
                  <Grade>{report.OralPresentation}</Grade>
                  <Grade>{report.Reading}</Grade>
                  <Grade>{report.Writing}</Grade>
                  <Comment>{report.Comment}</Comment>
                </Row>
              );
            }
          })}
        </tbody>
      </Table>
    </>
  );
};

export default EnglishTable;

const Table = styled.table`
  font-family: var(--font-body);
  text-align: left;
  table-layout: fixed;
  width: 100%;

  th,
  td {
    /* border: 1px solid var(--accent-color); */
    padding: 20px 0;
  }
  th {
    &:last-child {
      /* background-color: pink; */
      width: 200px;
    }
  }
`;

const Row = styled.tr`
  /* background-color: pink; */
  padding: 20px 0;
`;

const TableTitles = styled.th`
  background-color: var(--secondary-color);
  text-align: center;
  vertical-align: middle;
`;

const Grade = styled.td`
  text-align: center;
  vertical-align: middle;
`;

const Comment = styled.td`
  /* background-color: pink; */
  /* column-width: 200px; */
  /* text-align: left; */
`;
