import React from "react";
import { Button, CircularProgress } from "@mui/material";
import { useFormikContext } from "formik";

interface FormikSubmitButtonProps {
  label: string;
}

export const FormikSubmitButton: React.FC<FormikSubmitButtonProps> = ({
  label,
}) => {
  const { isSubmitting, isValid } = useFormikContext();

  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      disabled={isSubmitting || !isValid}
      startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
    >
      {label}
    </Button>
  );
};

interface NormalButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export const AppButton: React.FC<NormalButtonProps> = ({
  label,
  onClick,
  disabled = false,
}) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </Button>
  );
};
