import { useField } from "formik";
import { Box, TextField, TextFieldProps } from "@mui/material";

const AppTextField = ({ label, ...props }: TextFieldProps) => {
  const [field, meta] = useField(props.name || "");
  return (
    <Box>
      <TextField
        {...field}
        {...props}
        label={label}
        fullWidth
        error={Boolean(meta.touched && meta.error)}
        helperText={meta.touched && meta.error ? meta.error : ""}
      />
    </Box>
  );
};

export default AppTextField;
