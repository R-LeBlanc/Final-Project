import styled from "styled-components";
import React from "react";

const Homepage = () => {
  return (
    <>
      <Body>
        <Description>
          <Welcome>Welcome To Atlas</Welcome>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Elementum nibh tellus molestie nunc non blandit massa enim. Nec dui
            nunc mattis enim ut tellus elementum sagittis.
          </p>
        </Description>
      </Body>
    </>
  );
};

export default Homepage;

const Body = styled.div`
  background-image: url("/images/library.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  height: 90vh;
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  align-items: center;
  /* transform: rotate(90deg); */
`;

const Description = styled.div`
  border: 2px solid var(--accent-color);
  border-radius: 15px;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  backdrop-filter: blur(8px);
  width: 50%;
  height: 20%;
`;

const Welcome = styled.h1`
  font-size: 2.5rem;
`;
