import { TextField, Button, Container, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { login } from "./redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LoginValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (
    values: LoginValues,
    { setErrors }: FormikHelpers<LoginValues>
  ) => {
    const data = {
      email: values.email,
      password: values.password,
    };

    axios
      .post("https://api.test.01cloud.dev/user/login", data)
      .then((res) => {
        if (res.status === 200) {
          const token = res.data.data.token;
          console.log(token, "token");
          dispatch(login({ email: values.email, token }));
          navigate("/home");
        } else {
          toast.error("Login failed: Unauthorized");
          setErrors({ email: "Email is not authorized" });
        }
      })
      .catch((error) => {
        if (error.response) {
          toast.error("Login failed: " + error.response.data);
          if (error.response.status === 401) {
            setErrors({ email: "Email is not authorized" });
          }
        } else if (error.request) {
          toast.error("No response from server. Please try again later.");
        } else {
          toast.error("Error: " + error.message);
        }
      });
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "40rem",
      }}
    >
      <Typography variant="h4">Login</Typography>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form style={{ width: "100%" }}>
            <Field
              as={TextField}
              name="email"
              label="Email"
              placeholder="Enter your Email"
              fullWidth
              margin="normal"
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
            <Field
              as={TextField}
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your Password"
              fullWidth
              margin="normal"
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </Container>
  );
};

export default Login;
