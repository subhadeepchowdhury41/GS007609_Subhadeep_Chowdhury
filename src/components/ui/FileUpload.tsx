import { AttachFile } from "@mui/icons-material";
import { Button, ButtonProps, styled } from "@mui/material";
import * as XLSX from "xlsx";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function UploadButton({
  onFileUpload,
  props,
  label,
}: {
  label: string;
  props?: ButtonProps;
  onFileUpload: (workbook: XLSX.WorkBook) => void;
}) {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files);
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (e) => {
      if (!e.target) return;
      const binaryStr = e.target.result as string;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      onFileUpload(workbook);
    };
  };
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<AttachFile />}
      {...props}
    >
      {label ? label : "Upload"}
      <VisuallyHiddenInput
        type="file"
        accept=".xlsx, .xls"
        onChange={(event) => handleFileUpload(event)}
        multiple
      />
    </Button>
  );
}
