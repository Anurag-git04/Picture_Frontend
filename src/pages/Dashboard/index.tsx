import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchAlbums } from "../../features/Album/albumSlice";
import { Box, Typography } from "@mui/material";
import MiniDrawer, { DrawerHeader } from "../../components/materialUI/Sidenav";
import axios from "axios";
import type { albumData, User } from "../../types/Types";
import SelectActionCard from "../../components/materialUI/SelectActionCard";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const { albums } = useAppSelector(state => state.album);

  const [albumStats, setAlbumStats] = useState<albumData[] | null>(null);

  useEffect(() => {
    dispatch(fetchAlbums());
  }, [dispatch]);

  useEffect(() => {
    const StatData = async () => {
      const res = localStorage.getItem("user-info");
      const user: User | null = res ? JSON.parse(res) : null;
      const response = await axios.get(`https://picture-backend.vercel.app/api/albums/stat/album-stat`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      console.log(response.data.stats);
      setAlbumStats(response.data.stats);
    };
    StatData();
  }, []);

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#a6cee3", "#b2df8a"];

  return (
    <Box sx={{ display: "flex" }}>
      <MiniDrawer />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography variant="h4" gutterBottom>
          Welcome to Dashboard
        </Typography>

        <Typography variant="h6">
          Total Number of Albums: {albums.length}
        </Typography>
        <Box sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
          alignItems: "flex-start",
          justifyContent: "space-between",
          flexWrap: "wrap",
          mt: 4
        }}>
          {/* Card Grid Display */}
          {albumStats && <Box sx={{ flex: 1, minWidth: 300 }}> <SelectActionCard albums={albumStats} /> </Box>}

          {/* Pie Chart Visualization */}
          {albumStats && (
            <Box sx={{
              flex: 1,
              minWidth: { xs: "100%", md: 300 },
              // minWidth: 300,
              height: { xs: 300, md: 400 },
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={albumStats}
                    dataKey="imageCount"
                    nameKey="albumName"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                    label
                  >
                    {albumStats.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          )}
        </Box>

      </Box>
    </Box>
  );
}
