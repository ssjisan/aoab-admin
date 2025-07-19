import { Box, Button, Toolbar, Typography } from "@mui/material";
import Sidebar from "../../Layout/Sidebar";
import AllUserList from "../../Components/User/UserList/AllUserList";
import { useContext } from "react";
import { DataContext } from "../../DataProcessing/DataProcessing";
export default function UserList() {
  const drawerWidth = 280;
  const { auth } = useContext(DataContext);

  const handleBackupDownload = () => {
    window.open(`${process.env.REACT_APP_SERVER_API}/mongodb-backup`, "_blank");
  };

  return (
    <Box>
      <Sidebar />
      <Box
        component="main"
        sx={{
          p: 3,
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          ml: { lg: `${drawerWidth}px` },
        }}
      >
        <Toolbar />
        <AllUserList />
        {auth?.user?.role === 0 && (
          <Box mt={4}>
            <Typography variant="h6" gutterBottom>
              Backup the database
            </Typography>
            <Button variant="contained" onClick={handleBackupDownload}>
              Download
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
