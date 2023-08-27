import React, { useState } from "react";
import { NavigateFunction, useNavigate, Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { login } from "../services/auth.service";

type Props = {}

const Login: React.FC<Props> = () => {
  let navigate: NavigateFunction = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const initialValues: {
    username: string;
    password: string;
  } = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  const handleLogin = (formValue: { username: string; password: string }) => {
    const { username, password } = formValue;

    setMessage("");
    setLoading(true);

    login(username, password).then(
      () => {
        navigate("/home/request");
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      }
    );
  };

  return (
    <div className="row" style={{ height: '100vh' }}>
      <div className="col-lg-3">
        <div className="card card-container" style={{ marginLeft: 0, marginTop: 0 }}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            <Form>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Field name="username" type="text" className="form-control" />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field name="password" type="password" className="form-control" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Login</span>
                </button>
              </div>

              <div className="form-group">
                <Link to={"/register"} style={{ display: 'block' }}>
                  Sign Up
                </Link>
                <Link to={"/forgot-password"} style={{ display: 'block' }}>
                  Forgot Password
                </Link>
                <Link to={"/register-status"} style={{ display: 'block' }}>
                  Register Status
                </Link>
              </div>

              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}
            </Form>
          </Formik>
        </div>
      </div>
      <div className="col-lg-9">
        <div>
          <span style={{ fontSize: 28 }}>Welcome to the Mizuho Identitiy Manager</span>
        </div>
        <div style={{ 
          backgroundImage: 'url("https://passport.ucdenver.edu/oim/images/oim_graphic_v1.2.png")',
          backgroundRepeat: 'no-repeat',
          backgroundSize: "cover",
          height: '95.5vh' }}></div>
      </div>
    </div>
    
  );
};

export default Login;
