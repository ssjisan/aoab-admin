import { Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";

export default function Certificate({ profile }) {
  const certificates = profile.postGraduationCertificates || [];
  const hasCertificates = certificates.length > 0;

  return (
    <Stack
      sx={{
        width: "100%",
        borderRadius: "12px",
        border: "1px solid #05060f08",
        boxShadow:
          "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
        p: "16px",
      }}
      flexDirection="column"
      gap="16px"
    >
      {/* Header */}
      <Stack direction="row" alignItems="center" sx={{ width: "100%" }}>
        <Typography variant="h5" sx={{ fontWeight: "700" }}>
          Post graduation certificates
        </Typography>
      </Stack>

      {/* Certificate Preview */}
      <Stack
        sx={{ width: "100%", p: "24px" }}
        direction="row"
        flexWrap="wrap"
        gap={2}
        justifyContent={hasCertificates ? "flex-start" : "center"}
      >
        {hasCertificates ? (
          certificates.map((doc, index) => {
            const pdfUrl = doc.url;
            const jpgUrl = pdfUrl.replace(".pdf", ".jpg");

            return (
              <Stack key={index} alignItems="center" spacing={1}>
                <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                  <img
                    src={jpgUrl}
                    alt={doc.name}
                    style={{
                      width: 115,
                      height: 90,
                      border: "1px solid #ccc",
                      borderRadius: 8,
                      objectFit: "cover",
                    }}
                  />
                </a>
                <Typography
                  variant="body1"
                  sx={{ wordBreak: "break-word", maxWidth: 120 }}
                >
                  {doc.name || pdfUrl.split("/").pop()}
                </Typography>
              </Stack>
            );
          })
        ) : (
          <Typography color="text.secondary" sx={{ textAlign: "center" }}>
            No certificate uploaded yet.
          </Typography>
        )}
      </Stack>
    </Stack>
  );
}

Certificate.propTypes = {
  profile: PropTypes.shape({
    postGraduationCertificates: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
        public_id: PropTypes.string,
        name: PropTypes.string,
      })
    ),
  }).isRequired,
};
