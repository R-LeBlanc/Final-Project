import styled from "styled-components";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const { currentUser, updateEmail, updatePassword, updateProfile } = useAuth();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");
    // Will see about combining all 3 into one function
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }
    if (nameRef.current.value) {
      promises.push(updateProfile({ displayName: nameRef.current.value }));
    }

    Promise.all(promises)
      .then(() => {
        navigate("/dashboard");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Wrapper>
        <Main>
          <Blur>
            <h1>Update Profile</h1>
            {/* {currentUser && currentUser.email} */}
            {error && <h1>{error}</h1>}
            {/* <form onSubmit={handleSubmit}> */}
            <Wrap>
              <label>Full Name</label>
              <Input
                type="text"
                ref={nameRef}
                required
                defaultValue={currentUser.displayName}
              />
            </Wrap>
            <Wrap>
              <label>Email</label>
              <Input
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Wrap>
            <Wrap>
              <label>Password</label>
              <Input
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep current password"
              />
            </Wrap>
            <Wrap>
              <label>Confirm Password</label>
              <Input
                type="password"
                ref={passwordConfirmRef}
                placeholder="Leave blank to keep current password"
              />
            </Wrap>
            <Button type="submit" disabled={loading} onClick={handleSubmit}>
              Update
            </Button>
            <Link to="/dashboard">Cancel</Link>
            {/* </form> */}
          </Blur>
        </Main>
      </Wrapper>
    </>
  );
};

export default UpdateProfile;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
`;

const Main = styled.div`
  background-image: url("/images/erik-skof-2.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50vh;
  width: 30vw;
`;

const Blur = styled.div`
  border: 3px solid var(--accent-color);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  backdrop-filter: blur(8px);
  height: 80%;
  width: 70%;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Input = styled.input`
  border: 2px solid var(--secondary-color);
  border-radius: 10px;
  height: 30px;
  width: 80%;
`;

const Button = styled.button`
  background-color: var(--accent-color);
  border: none;
  border-radius: 10px;
  color: white;
  /* margin-top: 40px; */
  padding: 10px 0;
  width: 70%;

  &:hover {
    cursor: pointer;
    color: var(--accent-color);
    background-color: white;
    box-shadow: 0px 0px 0px 1px var(--accent-color) inset;
  }
`;
