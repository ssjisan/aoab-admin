import {
  Stack,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState, useMemo } from "react";

export default function Certificate({ profile }) {
  const [openPdf, setOpenPdf] = useState(false);
  const [activePdf, setActivePdf] = useState(null);

  // ✅ Normalize data (supports BOTH old + future schema)
  const certificates = useMemo(() => {
    const data = profile?.postGraduationCertificates;

    if (!data) return [];

    // If already array (future-proof)
    if (Array.isArray(data)) return data;

    // Current schema (single object)
    return data?.url ? [data] : [];
  }, [profile]);

  const handleOpenPdf = (doc) => {
    setActivePdf(doc);
    setOpenPdf(true);
  };

  const handleClose = () => {
    setOpenPdf(false);
    setActivePdf(null);
  };

  const handleDownload = async (doc) => {
    try {
      const response = await fetch(doc.url);
      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = doc.name || doc.url.split("/").pop();

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  const hasCertificates = certificates.length > 0;

  return (
    <>
      <Stack
        sx={{
          width: "100%",
          borderRadius: "12px",
          border: "1px solid #05060f08",
          boxShadow:
            "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
          p: "16px",
          background: "#fff",
        }}
        flexDirection="column"
        gap="16px"
      >
        {/* Header */}
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Post Graduation Certificates
        </Typography>

        {/* Content */}
        <Stack
          direction="row"
          flexWrap="wrap"
          gap={2}
          justifyContent={hasCertificates ? "flex-start" : "center"}
        >
          {hasCertificates ? (
            certificates.map((doc, index) => (
              <Stack
                key={index}
                alignItems="center"
                spacing={1}
                sx={{ width: 160 }}
              >
                {/* PDF Preview */}
                <Stack
                  sx={{
                    width: 140,
                    height: 110,
                    border: "1px solid #e5e7eb",
                    borderRadius: "10px",
                    overflow: "hidden",
                    cursor: "pointer",
                    background: "#f8fafc",
                  }}
                  onClick={() => handleOpenPdf(doc)}
                >
                  <iframe
                    src={`${doc.url}#toolbar=0`}
                    width="100%"
                    height="100%"
                    title="pdf-preview"
                    style={{ border: "none", pointerEvents: "none" }}
                  />
                </Stack>

                {/* Name */}
                <Typography
                  variant="body2"
                  sx={{
                    textAlign: "center",
                    wordBreak: "break-word",
                    fontSize: "12px",
                  }}
                >
                  {doc.name || doc.url?.split("/").pop()}
                </Typography>

                {/* Actions */}
                <Stack direction="row" spacing={1}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleOpenPdf(doc)}
                  >
                    View
                  </Button>

                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => handleDownload(doc)}
                  >
                    Download
                  </Button>
                </Stack>
              </Stack>
            ))
          ) : (
            <Typography color="text.secondary">
              No certificate uploaded yet.
            </Typography>
          )}
        </Stack>
      </Stack>

      {/* PDF Modal */}
      <Dialog open={openPdf} onClose={handleClose} fullWidth maxWidth="lg">
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {activePdf?.name || "Certificate"}

          <IconButton onClick={handleClose}>✕</IconButton>
        </DialogTitle>

        <DialogContent sx={{ height: "85vh", p: 0 }}>
          {activePdf && (
            <iframe
              src={`${activePdf.url}#toolbar=0`}
              width="100%"
              height="100%"
              style={{ border: "none" }}
              title="PDF Viewer"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

Certificate.propTypes = {
  profile: PropTypes.shape({
    postGraduationCertificates: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.shape({
        url: PropTypes.string,
        name: PropTypes.string,
        size: PropTypes.number,
      }),
    ]),
  }),
};
