import { Box, Typography, CircularProgress } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { RootState } from "../redux/store";

interface User {
  first_name: string;
  last_name: string;
  email: string;
}

interface Subscription {
  name: string;
}

interface Project {
  id: string;
  name: string;
  user: User;
  subscription: Subscription;
}

const Menu = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const token = useSelector((state: RootState) => state.auth.token);
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    axios
      .get("https://api.test.01cloud.dev/projects", config)
      .then((res) => {
        setProjects(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <Box sx={{ paddingTop: 12 }}>
      {loading ? (
        <CircularProgress />
      ) : projects.length > 0 ? (
        projects.map((project) => (
          <Box
            key={project.id}
            sx={{
              marginBottom: 2,
              padding: 2,
              border: "1px solid #ccc",
              borderRadius: 4,
            }}
          >
            <Typography variant="h6">Project Name: {project.name}</Typography>
            <Typography variant="body2">
              User: {project.user.first_name} {project.user.last_name}
            </Typography>
            <Typography variant="body2">Email: {project.user.email}</Typography>
            <Typography variant="body2">
              Subscription: {project.subscription.name}
            </Typography>
          </Box>
        ))
      ) : (
        <Typography variant="body1">No projects available</Typography>
      )}
    </Box>
  );
};

export default Menu;
