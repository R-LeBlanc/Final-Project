import styled from "styled-components";
import React, { useContext, useEffect, useState } from "react";

import { ReportContext } from "../ReportCardComponents/ReportContext";
import EnglishTable from "./TableComponents/EnglishTable";
import MathTable from "./TableComponents/MathTable";
import ScienceTable from "./TableComponents/ScienceTable";

const Modal = ({ setIsOpen }) => {
  const { allClasses, selectedReport, setSelectedReport } =
    useContext(ReportContext);

  return (
    <>
      <Background
        onClick={() => {
          setIsOpen(false);
          setSelectedReport([]);
        }}
      >
        <Center>
          <Main>
            <Button
              onClick={() => {
                setIsOpen(false);
                setSelectedReport([]);
              }}
            >
              <Img src="/images/close.png" />
            </Button>
            <HeaderWrap>
              <Header>Report</Header>
            </HeaderWrap>
            <Content>
              <TableWrap>
                {/* <Table> */}
                <EnglishTable selectedReport={selectedReport} />
              </TableWrap>
              <TableWrap>
                <MathTable selectedReport={selectedReport} />
              </TableWrap>
              <TableWrap>
                <ScienceTable selectedReport={selectedReport} />
                {/* </Table> */}
              </TableWrap>
            </Content>
          </Main>
        </Center>
      </Background>
    </>
  );
};

export default Modal;

const Background = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  width: 100vw;
  height: 100vh;
  z-index: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
`;

const Center = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Main = styled.div`
  display: flex;
  /* width: auto; */
  /* height: 170px; */
  background: white;
  /* color: white; */
  flex-direction: column;
  z-index: 10;
  border-radius: 16px;
  /* box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.04); */
`;

const HeaderWrap = styled.div`
  display: flex;
  height: 50px;
  /* background: white; */
  overflow: hidden;
  /* border-top-left-radius: 16px;
  border-top-right-radius: 16px; */
`;

const Header = styled.h2`
  margin: 0;
  padding: 10px;
  /* font-weight: 500;
  font-size: 18px; */
  text-align: center;
`;

const Button = styled.button`
  background-color: white;
  border: none;
  border-radius: 16px;
  display: flex;
  height: 20px;
  justify-content: flex-end;
  /* align-items: flex-end; */
  /* width: 20px; */
  /* box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.04);
  transform: translate(-4px, 4px); */
`;

const Img = styled.img`
  height: 20px;
  padding: 5px;
  &:hover {
    cursor: pointer;
  }
`;

const Content = styled.div`
  padding: 20px;
`;

const TableWrap = styled.div`
  padding-bottom: 50px;
`;

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
