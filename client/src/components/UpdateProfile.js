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
        <h1>Update Profile</h1>
        {/* {currentUser && currentUser.email} */}
        {error && <h1>{error}</h1>}
        {/* <form onSubmit={handleSubmit}> */}
        <label>Full Name</label>
        <input
          type="text"
          ref={nameRef}
          required
          defaultValue={currentUser.displayName}
        />
        <label>Email</label>
        <input
          type="email"
          ref={emailRef}
          required
          defaultValue={currentUser.email}
        />
        <label>Password</label>
        <input
          type="password"
          ref={passwordRef}
          placeholder="Leave blank to keep current password"
        />
        <label>Confirm Password</label>
        <input
          type="password"
          ref={passwordConfirmRef}
          placeholder="Leave blank to keep current password"
        />
        <button type="submit" disabled={loading} onClick={handleSubmit}>
          Update
        </button>
        <Link to="/dashboard">Cancle</Link>
        {/* </form> */}
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
  height: 100vh;
`;
