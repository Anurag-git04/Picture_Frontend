
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useAppDispatch } from '../../store/store';
import { fetchAlbums } from '../../features/Album/albumSlice';
import toast from 'react-hot-toast';


type User = {
  name: string;
  email: string;
  image: string;
  token: string;
  userId: string;
}

export default function FormDialogAddAlbum() {
  const [open, setOpen] = React.useState(false);

  //Album fields
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [Image, setImage] = React.useState<File | null>(null)
  const [preview, setPreview] = React.useState('')

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'name') {
      setName(event.target.value);
    }
    else if (event.target.name === 'description') {
      setDescription(event.target.value);
    }
  };

  const dispatch = useAppDispatch()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = localStorage.getItem("user-info");
    const user: User | null = res ? JSON.parse(res) : null
    console.log(user)

    if (!Image) {
      alert("No Image Found")
      return
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", Image);

    console.log(formData)

    const response = await axios.post('https://picture-backend.vercel.app/api/albums', formData, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "multipart/form-data",
      }
    });
    console.log(response.data)
    toast.success("Album is created Successfully")
    dispatch(fetchAlbums())
    handleClose();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImage(event.target.files![0])
    setPreview(URL.createObjectURL(event.target.files![0]))
  }

  return (
    <React.Fragment >
      <Button variant="outlined" onClick={handleClickOpen}>
        Add New Album
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Album Form</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in the album name and description to add a new album.
          </DialogContentText>
          <form onSubmit={handleSubmit} id="subscription-form">
            <TextField
              autoFocus
              required
              value={name}
              onChange={handleChange}
              margin="dense"
              id="name"
              name="name"
              label="Album Name"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              multiline
              value={description}
              onChange={handleChange}
              margin="dense"
              id="description"
              name="description"
              label="Album Description"
              type="text"
              fullWidth
              variant="standard"
            />
            <Box mt={2}>
              <Button
                variant="outlined"
                component="label"
                startIcon={<CloudUploadIcon />}
              >
                Choose Image
                <input type="file" hidden accept="image/*" onChange={handleImageChange} />
              </Button>
            </Box>
            {
              preview && (
                <Box mt={2} textAlign={'center'}>
                  <Typography variant='body2' sx={{ mb: 2 }}>
                    Preview
                  </Typography>
                  <Box
                    component={'img'}
                    src={preview}
                    alt='preview'
                    sx={{
                      width: '100%',
                      maxWidth: '200',
                      objectFit: 'cover',
                      borderRadius: 2,
                      boxShadow: 1,
                    }}
                  >
                  </Box>
                </Box>
              )
            }
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="subscription-form">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
