import { Box, Container, Typography, useMediaQuery } from "@mui/material";
import InputFields from "../Components/Login/InputFields";
export default function Login() {
  const forBelow390 = useMediaQuery("(max-width:390px)");
  const forBelow776 = useMediaQuery("(max-width:776px)");
  const forBelow1024 = useMediaQuery("(max-width:1240px)");
  return (
    <Box
      sx={{
        background: "#F2F3F3",
        height: "100vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
      }}
    >
      <Container>
        <Box
          sx={{
            padding: forBelow776 ? "0px 20px" : "0px 40px",
            maxWidth: "472px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            border: "4px solid #fff",
            margin: "auto",
            borderRadius: "20px",
            background: "#fff",
          }}
        >
          <Box
            sx={{
              width: forBelow390
                ? "160px"
                : forBelow776
                ? "198px"
                : forBelow1024
                ? "248px"
                : "284px",
            }}
          >
            <img src="form.png" alt="logo" width="100%" />
          </Box>
          <Box sx={{ padding: forBelow776 ? "20px 0px" : "40px 0px" }}>
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              Login to InsightTech Global Portal
            </Typography>
          </Box>
          <InputFields />
        </Box>
      </Container>
    </Box>
  );
}
