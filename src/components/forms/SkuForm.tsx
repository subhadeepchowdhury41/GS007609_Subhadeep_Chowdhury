import { addSKU, SKU, updateSKU } from "../../redux/slices/skuSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Formik, Form } from "formik";
import AppTextField from "../ui/TextField";
import * as Yup from "yup";
import { FormikSubmitButton } from "../ui/Button";
import { Box } from "@mui/material";

const SkuForm = ({
  skuId,
  isEdit = false,
  onClose,
}: {
  skuId?: string;
  isEdit: boolean;
  onClose: () => void;
}) => {
  const isReadOnly = !isEdit && !!skuId;
  const dispatch = useAppDispatch();
  const skus = useAppSelector((state) => state.skus);
  const sku = skuId ? skus.find((sku) => sku.ID === skuId) : undefined;
  const handleSubmit = (values: SKU) => {
    if (skuId) {
      dispatch(updateSKU({ ...sku, ...values }));
      onClose();
    } else {
      dispatch(addSKU(values));
      onClose();
    }
  };

  return (
    <Formik
      initialValues={{
        ID: sku?.ID || "",
        Label: sku?.Label || "",
        Department: sku?.Department || "",
        Class: sku?.Class || "",
        Price: sku?.Price || 0,
        Cost: sku?.Cost || 0,
      }}
      validationSchema={Yup.object({
        ID: Yup.string().required("ID is required"),
        Label: Yup.string().required("Label is required"),
        Department: Yup.string().required("Department is required"),
        Class: Yup.string().required("Class is required"),
        Price: Yup.number().required("Price is required"),
        Cost: Yup.number().required("Cost is required"),
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
          label="Department"
          name="Department"
          fullWidth
          margin="normal"
          disabled={isReadOnly}
        />
        <AppTextField
          label="Class"
          name="Class"
          fullWidth
          margin="normal"
          disabled={isReadOnly}
        />
        <AppTextField
          label="Price"
          name="Price"
          fullWidth
          margin="normal"
          type="number"
          disabled={isReadOnly}
        />
        <AppTextField
          label="Cost"
          name="Cost"
          fullWidth
          margin="normal"
          type="number"
          disabled={isReadOnly}
        />
        <Box sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
          <FormikSubmitButton label="Submit" />
        </Box>
      </Form>
    </Formik>
  );
};

export default SkuForm;
