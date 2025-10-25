import * as React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { Image, User } from "../types/Types";
import axios, { AxiosError } from "axios";
import { blue, red } from "@mui/material/colors";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Delete, EditNote, Favorite } from "@mui/icons-material";




export default function ImageViewDialog({ image, albumId }: { image: Image, albumId?: string }) {
  const [open, setOpen] = React.useState(false);
  const [comment, setComment] = React.useState("");
  //const [comments, setComments] = React.useState(image.comments);
  console.log(image)


  const handleAddComment = async () => {
    const response = localStorage.getItem("user-info")
    const user = response ? JSON.parse(response) : ""
    console.log(user)
    try {
      const call = await axios.post(`https://picture-backend.vercel.app/api/images/${albumId}/images/${image.imageId}/comments`, { text: comment },
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      )
      console.log(call)
    } catch (err) {
      const error = err as AxiosError<{ message: string }>
      console.log("Failed in Comment Posting", error)
    }

  };


  const [anchorE1, setAnchorE1] = React.useState<null | HTMLElement>()

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Menu handler
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setAnchorE1(event.currentTarget)
  }

  const handleMenuClose = () => setAnchorE1(null);

  const DeleteImageHandle = async (imgId: string) => {
    const res = localStorage.getItem("user-info");
    const user: User | null = res ? JSON.parse(res) : null;
    try {
      const response = await axios.delete(`https://picture-backend.vercel.app/api/images/${albumId}/images/${imgId}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`
        }
      })
      const res = JSON.parse(response.data)
      console.log(res)
    } catch (err) {
      const error = err as AxiosError<{ message: string }>
      console.log(error)
    }
  }


  return (
    <>
      {/* Clickable image thumbnail */}
      {/* <Box
        component="img"
        src={image.imageUrl}
        alt={image.name}
        sx={{
          width: 200,
          height: 200,
          objectFit: "cover",
          borderRadius: 1,
          cursor: "pointer",
        }}
        onClick={handleOpen}
      /> */}
      <Card
        // sx={{maxWidth:345}} 
        onClick={handleOpen}
        sx={{
          // width: "100%",
          width: 320,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRadius: 2,
          boxShadow: 3,
          transition: "transform 0.2s",
          "&:hover": { transform: "scale(1.02)" },
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="image">
              {image.name[0]?.toUpperCase()}
            </Avatar>
          }
          action={
            <>
              <IconButton
                aria-label="setting"
                onClick={handleMenuOpen}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorE1}
                open={Boolean(anchorE1)}
                onClose={handleMenuClose}
                onClick={(e) => e.stopPropagation()}
              >
                <MenuItem
                  sx={{ color: blue[200] }}
                >
                  <IconButton sx={{ color: blue[800] }}>
                    <EditNote />
                  </IconButton>
                  Edit
                </MenuItem>
                <MenuItem
                  sx={{ color: red[300] }}
                  onClick={() => DeleteImageHandle(image.imageId)}
                >
                  <IconButton sx={{ color: red[800] }}>
                    <Delete />
                  </IconButton>
                  Delete
                </MenuItem>
              </Menu>
            </>
          }
          title={image.name}
          subheader={new Date(image.uploadedAt).toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
          })}
        />
        <CardMedia
          component="img"
          // height="280"
          image={image.imageUrl}
          alt={image.name}
          sx={{
            height: 280, // ✅ Keep images uniform
            objectFit: "cover",
            width: "100%",
          }}
        />
        <CardContent>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {image.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton>
            <Favorite sx={{ color: red[700] }} />
          </IconButton>
        </CardActions>

      </Card>
      {/* Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="xl" fullWidth>
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">{image.name}</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" }, // ✅ Stack vertically on small screens
            p: 0,
          }}
        >
          {/* Full Image Section */}
          <Box
            sx={{
              flex: 1,
              backgroundColor: "#000",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: { xs: "auto", md: "85vh" }, // ✅ auto height on mobile
            }}
          >
            <img
              src={image.imageUrl}
              alt={image.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                maxHeight: "85vh",
              }}
            />
          </Box>

          {/* Info + Comments Section */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              height: { xs: "auto", md: "85vh" }, // ✅ let content expand on mobile
              borderLeft: { xs: "none", md: "1px solid #ddd" }, // ✅ no border on mobile
              borderTop: { xs: "1px solid #ddd", md: "none" },  // ✅ small divider on mobile
            }}
          >
            {/* Upper: Name + Description + Tags */}
            <Box sx={{ p: 2, flexShrink: 0 }}>
              <Typography variant="h6">{image.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {image.description}
              </Typography>

              <Box sx={{ mt: 1 }}>
                {image.tags.map((tag) => (
                  <Typography
                    key={tag}
                    variant="caption"
                    sx={{
                      mr: 1,
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      backgroundColor: "#f0f0f0",
                    }}
                  >
                    #{tag}
                  </Typography>
                ))}
              </Box>
            </Box>

            <Divider />

            {/* Middle: Comments */}
            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                p: 2,
              }}
            >
              {image.comments.map((c, index) => (
                <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
                    {c.userId.profilePicture}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2">{c.userId.name}</Typography>
                    <Typography variant="body2">{c.text}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(c.createdAt).toLocaleString()}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>

            <Divider />

            {/* Lower: Comment Input */}
            <Box
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
                borderTop: "1px solid #eee",
                backgroundColor: "#fafafa",
              }}
            >
              <TextField
                placeholder="Add a comment..."
                variant="outlined"
                size="small"
                fullWidth
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button variant="contained" onClick={handleAddComment}>
                Post
              </Button>
            </Box>
          </Box>
        </DialogContent>

      </Dialog>
    </>
  );
}
