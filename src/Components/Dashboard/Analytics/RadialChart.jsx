import { useEffect, useState } from "react";
import {
  Typography,
  CircularProgress,
  Box,
  Stack,
} from "@mui/material";
import Chart from "react-apexcharts";
import axios from "axios";

export default function RadialChart() {
  const [series, setSeries] = useState([0, 0]);
  const [loading, setLoading] = useState(true);
  const [rawCounts, setRawCounts] = useState([0, 0]);

  const chartOptions = (label, color) => ({
    chart: {
      type: "radialBar",
      sparkline: { enabled: true },
      fontFamily: "Public Sans, sans-serif",
    },
    plotOptions: {
      radialBar: {
        hollow: { size: "60%" },
        track: { background: "#919eab3d" },
        dataLabels: {
          name: { show: false },
          value: {
            show: true,
            fontSize: "16px",
            fontWeight: 600,
            color: color,
            offsetY: 5,
          },
        },
      },
    },
    stroke: { lineCap: "round" },
    colors: [color],
    labels: [label],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/all-student");
        const summary = data.summary || {};
        const { total = 0, wrongEntry = 0, accountNotComplete = 0 } = summary;

        if (!total || (wrongEntry === 0 && accountNotComplete === 0)) {
          setSeries([0, 0]);
          setRawCounts([0, 0]);
        } else {
          const wrongPct = ((wrongEntry / total) * 100).toFixed(2);
          const incompletePct = ((accountNotComplete / total) * 100).toFixed(2);
          setSeries([+wrongPct, +incompletePct]);
          setRawCounts([wrongEntry, accountNotComplete]);
        }
      } catch (error) {
        console.error("Error fetching student status summary:", error);
        setSeries([0, 0]);
        setRawCounts([0, 0]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const chartData = [
    {
      label: "Unverified Email",
      value: series[0],
      count: rawCounts[0],
      color: "#ff5630",
    },
    {
      label: "Account Not Complete",
      value: series[1],
      count: rawCounts[1],
      color: "#006c9c",
    },
  ];

  return (
    <Box
      sx={{
        borderRadius: "16px",
        boxShadow:
          "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
        width: "100%",
        p: 2,
      }}
    >
      {loading ? (
        <Stack justifyContent="center" alignItems="center" minHeight={200}>
          <CircularProgress />
        </Stack>
      ) : (
        <Stack spacing={4}>
          {chartData.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "16px",
                px: 1,
                py: 1,
                backgroundColor: "#f9f9f9",
              }}
            >
              <Stack
                sx={{ width: "100%" }}
                justifyContent="center"
                alignItems="flex-end"
              >
                <Chart
                  options={chartOptions(item.label, item.color)}
                  series={[item.value]}
                  type="radialBar"
                  height={160}
                  width={160}
                />
              </Stack>
              <Box textAlign="left" sx={{ width: "100%" }}>
                <Typography variant="h6">{item.count} Students</Typography>
                <Typography
                  variant="body1"
                  fontWeight={500}
                  color="text.secondary"
                >
                  {item.label}
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
}
