import styled from "styled-components";
import React from "react";

const Homepage = () => {
  return (
    <>
      <Body>
        <Description>
          <h2>Lorem Dolor Sed</h2>
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
  background-image: url("/images/love_to_learn.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
`;

const Description = styled.div`
  background-color: rgba(0, 173, 181, 0.7);
  border-radius: 20px;
  color: white;
  max-width: 500px;
  padding: 20px;
  position: absolute;
  bottom: 5%;
  left: 2.5%;
`;
