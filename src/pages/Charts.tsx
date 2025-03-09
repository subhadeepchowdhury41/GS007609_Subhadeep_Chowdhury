import { useAppDispatch, useAppSelector } from "../redux/store";
import { setSelectedStore } from "../redux/slices/chartSlice";
import { Box, MenuItem, TextField, Typography } from "@mui/material";
import {
  AgCartesianChartOptions,
  AgBarSeriesOptions,
  AgLineSeriesOptions,
  AgCharts as AgChartsCore,
  AgChartInstance,
} from "ag-charts-community";
import { useRef, useEffect } from "react";

export interface ChartData {
  Store: string;
  StoreId: string;
  Week: string;
  GM_Dollars: number;
  GM_Percent: number;
}

interface TooltipParams {
  datum: ChartData;
}

const Chart = () => {
  const dispatch = useAppDispatch();
  const chart = useAppSelector((state) => state.chart);
  const stores = useAppSelector((state) => state.stores);
  const chartRef = useRef<HTMLDivElement>(null);

  const filteredData = chart.selectedStore
    ? chart.chartData.filter((c) => c.StoreId === chart.selectedStore?.ID)
    : chart.chartData;

  const chartOptions: AgCartesianChartOptions = {
    theme: "ag-material",
    data: filteredData,
    padding: {
      top: 20,
      right: 40,
      bottom: 20,
      left: 40,
    },
    title: {
      text: `Gross Margin Overview`,
      fontSize: 18,
      fontWeight: "bold",
    },
    series: [
      {
        type: "bar",
        xKey: "Week",
        yKey: "GM_Dollars",
        yName: "Gross Margin ($)",
        fill: "#8884d8",
        tooltip: {
          renderer: ({ datum }: TooltipParams) =>
            `Week: ${datum.Week} <br /> GM Dollars: $${datum.GM_Dollars.toFixed(
              2
            )}`,
        },
      } as AgBarSeriesOptions,
      {
        type: "line",
        xKey: "Week",
        yKey: "GM_Percent",
        yName: "Gross Margin (%)",
        stroke: "#ff7300",
        strokeWidth: 3,
        marker: { enabled: true, size: 6 },
        yAxisKeys: ["percentage"],
        tooltip: {
          renderer: ({ datum }: TooltipParams) =>
            `Week: ${datum.Week} <br /> GM Percent: ${datum.GM_Percent.toFixed(
              2
            )}%`,
        },
      } as AgLineSeriesOptions,
    ],
    axes: [
      {
        type: "category",
        position: "bottom",
        title: {
          text: "Week",
        },
      },
      {
        type: "number",
        position: "left",
        title: {
          text: "Gross Margin ($)",
        },
        label: {
          formatter: ({ value }: { value: number }) => `$${value}`,
        },
      },
      {
        type: "number",
        position: "right",
        keys: ["percentage"],
        title: {
          text: "Gross Margin (%)",
        },
        label: {
          formatter: ({ value }: { value: number }) => `${value}%`,
        },
        min: 0,
        max: 100,
      },
    ],
    legend: {
      position: "bottom",
    },
    tooltip: {
      enabled: true,
    },
  };

  useEffect(() => {
    let chartInstance: AgChartInstance | undefined;

    if (chartRef.current) {
      chartInstance = AgChartsCore.create({
        ...chartOptions,
        container: chartRef.current,
      });
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [chartOptions]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 2,
        marginTop: "60px",
        height: "calc(100vh - 60px)",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography fontSize={23} fontWeight={600}>
          Gross Margin Chart
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            select
            value={chart.selectedStore?.ID || ""}
            onChange={(e) =>
              dispatch(
                setSelectedStore({
                  ID: e.target.value,
                  Label:
                    stores.find((s) => s.ID === e.target.value)?.Label || "",
                })
              )
            }
            sx={{ width: 240 }}
            label="Select Store"
          >
            {stores.map((s) => (
              <MenuItem key={s.ID} value={s.ID}>
                {s.Label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Box>
      {chart?.selectedStore ? (
        <div
          ref={chartRef}
          style={{ flex: 1, width: "100%", height: "500px" }}
        />
      ) : (
        <div style={{ flex: 1, width: "100%", height: "500px" }}>
          Please select a store
        </div>
      )}
    </Box>
  );
};

export default Chart;
