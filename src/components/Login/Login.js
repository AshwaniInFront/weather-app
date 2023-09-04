import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

import InputControl from "../InputControl/InputControl";
import "./Login.css";
import { auth } from "../../firebase-config";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = (e) => {

    e.preventDefault();

    if (!values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }

    setErrorMsg("");

    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);

        navigate("/");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };


  return (
    <div className="login-container">
      <div className="innerBox">
        <h1 className="heading">Login</h1>
        <form onSubmit={handleSubmission}
        >
          <InputControl
            label="Email"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, email: event.target.value }))
            }
            placeholder="Enter email address"
          />
          <InputControl
            label="Password"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, pass: event.target.value }))
            }
            placeholder="Enter Password"
          />
          <button disabled={submitButtonDisabled}
            type="submit"
          >
            Login
          </button>

        </form>
        <div className="footer">
          <b className="error">{errorMsg}</b>
          <p>
            Are you new Here?{" "}
            <span>
              <Link to="/signup">Sign up</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
