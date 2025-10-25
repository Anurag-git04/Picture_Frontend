import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Album, User } from "../../types/Types";
import axios from "axios";
import {
    Box,
    TextField,
    Typography,
    Button,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Paper,
} from "@mui/material";
import MiniDrawer, { DrawerHeader } from "../../components/materialUI/Sidenav";

type SimpleUser = {
    name: string;
    userId: string;
};

const EditImage: React.FC = () => {
    const { albumId } = useParams<{ albumId: string }>();
    const [album, setAlbum] = useState<Album | null>(null);
    const [users, setUsers] = useState<SimpleUser[]>([]);
    const [description, setDescription] = useState<string>("");
    const [sharedWith, setSharedWith] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Fetch album
    useEffect(() => {
        const fetchAlbum = async () => {
            try {
                const res = localStorage.getItem("user-info");
                const user: User | null = res ? JSON.parse(res) : null;

                if (!albumId || !user?.token) return;

                const response = await axios.get(
                    `https://picture-backend.vercel.app/api/albums/${albumId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                const albumData = response.data.album;
                setAlbum(albumData);
                setDescription(albumData.description || "");
                setSharedWith(albumData.sharedWith || []);
            } catch (error) {
                console.error("Error fetching album:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAlbum();
    }, [albumId]);

    // Fetch all users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`https://picture-backend.vercel.app/auth/allUser`);
                setUsers(response.data.users || []);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);

    // Handle checkbox toggle
    const handleUserToggle = (userId: string) => {
        setSharedWith((prev) =>
            prev.includes(userId)
                ? prev.filter((id) => id !== userId)
                : [...prev, userId]
        );
    };

    // Handle submit
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = localStorage.getItem("user-info");
            const user: User | null = res ? JSON.parse(res) : null;

            if (!user?.token || !albumId) return;

            console.log(sharedWith)

            const response = await axios.put(
                `https://picture-backend.vercel.app/api/albums/${albumId}`,
                {
                    description,
                    sharedWith,
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.success) {
                alert("Album updated successfully!");
            }
        } catch (error) {
            console.error("Error updating album:", error);
            alert("Failed to update album.");
        }
    };

    if (loading) {
        return (
            <Typography textAlign="center" mt={5}>
                Loading album details...
            </Typography>
        );
    }

    return (
        <Box sx={{ display: "flex" }}>
            <MiniDrawer />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />

                <Typography gutterBottom sx={{ mt: 2 }} variant="h5" component="div">
                    Edit your Album: {album ? album.name : "Loading..."}
                </Typography>

                <Paper sx={{ p: 3, borderRadius: 3, mt: 2 }}>
                    <form onSubmit={handleUpdate}>
                        <TextField
                            label="Album Name"
                            value={album?.name || ""}
                            fullWidth
                            disabled
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            label="Album Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            multiline
                            fullWidth
                            sx={{ mb: 3 }}
                        />

                        <Typography variant="subtitle1" gutterBottom>
                            Share Album With:
                        </Typography>

                        <FormGroup>
                            {users.map((user) => (
                                <FormControlLabel
                                    key={user.userId}
                                    control={
                                        <Checkbox
                                            checked={sharedWith.includes(user.userId)}
                                            onChange={() => handleUserToggle(user.userId)}
                                        />
                                    }
                                    label={user.name}
                                />
                            ))}
                        </FormGroup>

                        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                            Update Album
                        </Button>
                    </form>
                </Paper>
            </Box>
        </Box>
    );
};

export default EditImage;
