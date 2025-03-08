import { AppBar, Box, Typography } from "@mui/material";

const AppHeader = () => {
  return (
    <AppBar
      elevation={0}
      position="fixed"
      sx={{ display: "flex", justifyContent: "center", height: 60 }}
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h6" fontWeight={600}>
          Data Viewer
        </Typography>
      </Box>
    </AppBar>
  );
};

export default AppHeader;
