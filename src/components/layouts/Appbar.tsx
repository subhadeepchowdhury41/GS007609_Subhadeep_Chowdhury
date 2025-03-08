import { AppBar, Box, Typography } from "@mui/material";

const AppHeader = () => {
  return (
    <AppBar
      elevation={0}
      position="fixed"
      variant="outlined"
      sx={{
        display: "flex",
        justifyContent: "center",
        height: 60,
        backgroundColor: "white",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h6" fontWeight={600} color="black">
          Data Viewer App
        </Typography>
      </Box>
    </AppBar>
  );
};

export default AppHeader;
