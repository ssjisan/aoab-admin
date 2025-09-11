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

export default function Signature({ studentId, existingSignature }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(existingSignature?.url || "");
  const [loading, setLoading] = useState(false);

  // Handle selecting file
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); // preview from local machine
    }
  };

  // Upload to server
  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("signature", file);

    try {
      setLoading(true);

      await toast.promise(
        axios.put(`/students/${studentId}/signature`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        }),
        {
          loading: "Uploading signature...",
          success: (res) => {
            if (res.data.signature) {
              setPreview(res.data.signature[0].url);
              setFile(null);
            }
            return "Signature updated successfully!";
          },
          error: "Failed to upload signature.",
        }
      );
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ margin: "24px 16px" }}>
      <Accordion>
        <AccordionSummary expandIcon={<ArrowDown size={"24px"} color="#000" />}>
          <Typography fontWeight="bold">Signature</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box display="flex" flexDirection="column" gap={2}>
            {/* Show existing or newly uploaded signature */}
            {preview ? (
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Current Signature:
                </Typography>
                <img
                  src={preview}
                  alt="signature"
                  style={{
                    width: "200px",
                    height: "auto",
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                  }}
                />
              </Box>
            ) : (
              <Typography color="text.secondary">
                No signature uploaded yet.
              </Typography>
            )}

            {/* File picker */}
            <input
              type="file"
              accept="image/*"
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
                {loading ? "Uploading..." : "Upload Signature"}
              </Button>
            )}
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
