import { Link, useNavigate } from 'react-router-dom';
import InputControl from '../InputControl/InputControl';
import './Signup.css';
import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase-config';

const Signup = () => {

  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: '',
    pass: '',
    email: ''
  })
  const [errorMessage, setErrorMessage] = useState();
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false)

  const handleSubmission = () => {
    if (!values.name || !values.email || !values.pass) {
      setErrorMessage("Fill all fields");
      return;
    }

    setErrorMessage("");
    setSubmitButtonDisabled(true);

    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        await updateProfile(user, {
          displayName: values.name,
        });
        navigate("/");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMessage(err.message);
      });
  };

  return (
    <div className="signup-container">
      <div className="innerBox">
        <h1 className="heading">
          Signup
        </h1>

        <InputControl label="Name" placeholder="Enter Name"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))
          }
        />
        <InputControl label="Email" placeholder="Enter email address"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
        />
        <InputControl label="Password" placeholder="Enter Password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
        />

        <div className="footer">
          <b className='error'>error message</b>
          <button onClick={handleSubmission} disabled={submitButtonDisabled}>Sign up</button>
          <p>
            Already have an account ?
            <span><Link to="/login
            ">Login</Link></span>
          </p>
        </div>

      </div>
    </div>
  )
}

export default Signup