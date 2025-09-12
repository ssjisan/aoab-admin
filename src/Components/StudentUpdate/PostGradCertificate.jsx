"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { ArrowDown } from "../../assets/IconSet";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function PostGradCertificate({
  studentId,
  existingCertificate = null,
}) {
  const [file, setFile] = useState(null);
  const [certificate, setCertificate] = useState(existingCertificate);
  const [loading, setLoading] = useState(false);

  // Select file
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  // Upload / Replace certificate
  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a PDF file first.");
      return;
    }

    const formData = new FormData();
    formData.append("certificates", file);

    // If certificate exists, tell backend to remove it
    if (certificate?.public_id) {
      formData.append("removeCertificateIds", certificate.public_id);
    }

    try {
      setLoading(true);

      await toast.promise(
        axios.put(`/students/${studentId}/postgrad-certificates`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        }),
        {
          loading: "Uploading certificate...",
          success: (res) => {
            // Always keep only the latest certificate
            const latest = res.data.postGraduationCertificates.slice(-1)[0];
            setCertificate(latest);
            setFile(null);
            return "Certificate updated successfully!";
          },
          error: "Failed to upload certificate.",
        }
      );
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Remove certificate
  const handleRemove = async () => {
    if (!certificate?.public_id) return;

    try {
      setLoading(true);
      await toast.promise(
        axios.put(`/students/${studentId}/postgrad-certificates`, {
          removeCertificateIds: [certificate.public_id],
        }),
        {
          loading: "Removing certificate...",
          success: (res) => {
            setCertificate(null);
            return "Certificate removed successfully!";
          },
          error: "Failed to remove certificate.",
        }
      );
    } catch (err) {
      console.error("Remove error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ margin: "24px 16px" }}>
      <Accordion>
        <AccordionSummary expandIcon={<ArrowDown size={"24px"} color="#290303ff" />}>
          <Typography fontWeight="bold">Post Graduation Certificate</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box display="flex" flexDirection="column" gap={2}>
            {/* Show existing certificate */}
            {certificate ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  padding: "8px 12px",
                }}
              >
                <a
                  href={certificate.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "underline", color: "#1976d2" }}
                >
                  {certificate.name || "View Certificate"}
                </a>
                <Button
                  color="error"
                  size="small"
                  onClick={handleRemove}
                  disabled={loading}
                >
                  Remove
                </Button>
              </Box>
            ) : (
              <Typography color="text.secondary">
                No certificate.
              </Typography>
            )}

            {/* File picker */}
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              style={{ marginTop: "8px" }}
            />

            {/* Upload button */}
            {file && (
              <Button
                variant="contained"
                onClick={handleUpload}
                disabled={loading}
              >
                {loading
                  ? "Uploading..."
                  : certificate
                  ? "Replace Certificate"
                  : "Upload Certificate"}
              </Button>
            )}
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
