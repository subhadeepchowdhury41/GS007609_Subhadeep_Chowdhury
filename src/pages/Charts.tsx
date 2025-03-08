import { AgCharts } from "ag-charts-react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { setSelectedStore } from "../redux/slices/chartSlice";
import { Box, MenuItem, TextField, Typography } from "@mui/material";

export interface ChartData {
  Store: string;
  StoreId: string;
  Week: string;
  GM_Dollars: number;
  GM_Percent: number;
}

const Chart = () => {
  const dispatch = useAppDispatch();
  const chart = useAppSelector((state) => state.chart);
  const stores = useAppSelector((state) => state.stores);

  const filteredData = chart.selectedStore
    ? chart.chartData.filter((c) => c.StoreId === chart.selectedStore?.ID)
    : chart.chartData;

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
      <div
        style={{
          flexGrow: 1,
          width: "100%",
        }}
      >
        <AgCharts
          options={{
            autoSize: true,
            theme: "ag-material",
            data: filteredData,
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
                  renderer: (params: any) =>
                    `Week: ${
                      params.datum.Week
                    } <br /> GM Dollars: $${params.datum.GM_Dollars.toFixed(
                      2
                    )}`,
                },
              },
              {
                type: "line",
                xKey: "Week",
                yKey: "GM_Percent",
                yName: "Gross Margin (%)",
                stroke: "#ff7300",
                marker: { enabled: true },
                yAxis: {
                  position: "right",
                },
                tooltip: {
                  renderer: (params: any) =>
                    `Week: ${
                      params.datum.Week
                    } <br /> GM Percent: ${params.datum.GM_Percent.toFixed(
                      2
                    )}%`,
                },
              },
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
                  formatter: ({ value }: any) => `$${value}`,
                },
              },
              {
                type: "number",
                position: "right",
                title: {
                  text: "Gross Margin (%)",
                },
                label: {
                  formatter: ({ value }: any) => `${value}%`,
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
          }}
        />
      </div>
    </Box>
  );
};

export default Chart;
