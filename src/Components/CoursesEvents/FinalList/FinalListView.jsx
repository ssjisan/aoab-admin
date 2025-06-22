import { Box, Button, Stack, Table, TableContainer } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Body from "./Table/Body";
import Header from "./Table/Header";
import { useParams } from "react-router-dom";

export default function FinalListView() {
  const [loading, setLoading] = useState(false);
  const { courseId } = useParams();
  const [enrollmentDetails, setEnrollmentDetails] = useState([]);
  console.log("here",enrollmentDetails);
  
  useEffect(() => {
    loadEnrollmentHistory(true);
  }, []);

  const loadEnrollmentHistory = async () => {
    if (loading) return;

    try {
      setLoading(true);
      const res = await axios.get(`/enrollment-history/final/${courseId}`);      
      // res.data is already an array of enrollments
      setEnrollmentDetails(res.data);
    } catch (err) {
      toast.error(
        err?.response?.data?.error || "Error loading enrollment details"
      );
    } finally {
      setLoading(false);
    }
  };
const handleIssueCertificate = async () => {
  try {
    setLoading(true);

    const res = await axios.post(`/certificate/issue/${courseId}`, {
      courseCategoryId: enrollmentDetails.categoryId, // 💡 pass it explicitly
    });

    toast.success(res.data.message || "Certificates issued successfully");

    // Optionally reload data
    loadEnrollmentHistory();
  } catch (err) {
    toast.error(
      err?.response?.data?.error || "Failed to issue certificates"
    );
  } finally {
    setLoading(false);
  }
};


  return (
    <Box
      sx={{
        boxShadow:
          "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
        borderRadius: "16px",
        p: 2,
        mt: 3,
      }}
    >
      <TableContainer>
        <Stack
          justifyContent="flex-end"
          flexDirection="row"
          sx={{ width: "100%" }}
        >
          <Button
            sx={{ width: "fit-content" }}
            variant="contained"
            color="primary"
            size="small"
            onClick={handleIssueCertificate}
          >
            Issue Certificate
          </Button>
        </Stack>
        <Table sx={{ mt: "16px" }}>
          <Header />
          <Body enrollmentDetails={enrollmentDetails} loading={loading} />
        </Table>
      </TableContainer>
    </Box>
  );
}
