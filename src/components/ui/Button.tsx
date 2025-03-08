import React from "react";
import { Button, CircularProgress, ButtonProps } from "@mui/material";
import { useFormikContext } from "formik";

interface FormikSubmitButtonProps {
  label: string;
  props?: ButtonProps;
}

export const FormikSubmitButton: React.FC<FormikSubmitButtonProps> = ({
  label,
  props
}) => {
  const { isSubmitting, isValid } = useFormikContext();

  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      disabled={isSubmitting || !isValid}
      startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
      {...props}
    >
      {label}
    </Button>
  );
};