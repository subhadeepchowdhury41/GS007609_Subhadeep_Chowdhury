import { Box, Card, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../hooks/useAuth";
import AppTextField from "../components/ui/TextField";
import { FormikSubmitButton } from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

export const Login = () => {
  const { login, error } = useAuth();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async (values: any) => {
    await login(values.email, values.password);
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      return;
    }
    enqueueSnackbar("Successfully logged in", { variant: "success" });
    navigate("/dashboard/store");
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card
        sx={{
          p: 2,
          width: "400px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
          Login
        </Typography>
        <Formik
          onSubmit={handleSubmit}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email")
              .required("Email is required"),
            password: Yup.string().required("Password is required"),
          })}
          initialValues={{
            email: "",
            password: "",
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <AppTextField
                name="email"
                label="Email"
                value={values.email}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <AppTextField
                name="password"
                label="Password"
                type="password"
                value={values.password}
                onChange={handleChange}
                sx={{ mb: 1 }}
              />
              <FormikSubmitButton
                props={{
                  fullWidth: true,
                  sx: { alignSelf: "center", my: 2 },
                }}
                label="Login"
              />
            </Form>
          )}
        </Formik>
      </Card>
    </Box>
  );
};
