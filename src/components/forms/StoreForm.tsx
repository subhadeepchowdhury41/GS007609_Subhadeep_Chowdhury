import { Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { addStore, Store, updateStore } from "../../redux/slices/storeSlice";
import AppTextField from "../ui/TextField";
import { Box } from "@mui/material";
import { FormikSubmitButton } from "../ui/Button";
import * as Yup from "yup";

const StoreForm = ({
  storeId,
  isEdit = false,
  onClose,
}: {
  storeId?: string;
  isEdit: boolean;
  onClose: () => void;
}) => {
  const isReadOnly = !isEdit && !!storeId;
  const dispatch = useAppDispatch();
  const stores = useAppSelector((state) => state.stores);
  const store = storeId
    ? stores.find((store) => store.ID === storeId)
    : undefined;
  const handleSubmit = (values: Store) => {
    if (storeId) {
      dispatch(updateStore({ ...store, ...values }));
      onClose();
    } else {
      dispatch(addStore(values));
      onClose();
    }
  };
  return (
    <Formik
      initialValues={{
        ID: store?.ID || "",
        Label: store?.Label || "",
        City: store?.City || "",
        State: store?.State || "",
      }}
      validationSchema={Yup.object({
        ID: Yup.string().required("ID is required"),
        Label: Yup.string().required("Label is required"),
        City: Yup.string().required("City is required"),
        State: Yup.string().required("State is required"),
      })}
      onSubmit={handleSubmit}
    >
      <Form>
        <AppTextField
          label="ID"
          name="ID"
          fullWidth
          margin="normal"
          disabled={isReadOnly}
        />
        <AppTextField
          label="Label"
          name="Label"
          fullWidth
          margin="normal"
          disabled={isReadOnly}
        />
        <AppTextField
          label="City"
          name="City"
          fullWidth
          margin="normal"
          disabled={isReadOnly}
        />
        <AppTextField
          label="State"
          name="State"
          fullWidth
          margin="normal"
          disabled={isReadOnly}
        />
        <Box sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
          <FormikSubmitButton label="Submit" />
        </Box>
      </Form>
    </Formik>
  );
};

export default StoreForm;
