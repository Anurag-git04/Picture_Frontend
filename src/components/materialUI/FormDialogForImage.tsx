import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import axios, { AxiosError } from 'axios';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Typography } from '@mui/material';
import type { User } from '../../types/Types';
import { fetchImages } from '../../features/Images/ImageSlice';
import { useAppDispatch } from '../../store/store';
import toast from 'react-hot-toast';

interface Props {
  albumId: string
}


export default function FormDialogAddImage({ albumId }: Props) {
  const [open, setOpen] = React.useState(false);

  //Album fields
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [tags, setTags] = React.useState<string>("");
  const [Image, setImage] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);

  const dispatch = useAppDispatch()

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImage(event.target.files![0]);
    setPreview(URL.createObjectURL(event.target.files![0]));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeTags = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTags(event.target.value);
    console.log(event.target.value)
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'name') {
      setName(event.target.value);
    }
    else if (event.target.name === 'description') {
      setDescription(event.target.value);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = localStorage.getItem("user-info");
    const user: User | null = res ? JSON.parse(res) : null;

    if (!Image) {
      alert("Please select an image!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    const t = tags.split(',')
    formData.append("tags", JSON.stringify(t));
    formData.append("image", Image); // 👈 This is important!

    console.log(formData)

    try {
      const response = await axios.post(
        `https://picture-backend.vercel.app/api/images/${albumId}/images`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Upload success:", response.data);
      toast.success("Image is Add successfully")
      dispatch(fetchImages(albumId))
      handleClose();
    } catch (err) {
      const error = err as AxiosError<{ message: string }>
      console.error("Upload failed:", error.response?.data || error.message);
    }
  };


  return (
    <React.Fragment>
      <Button variant="outlined" sx={{}} onClick={handleClickOpen}>
        Add New Image
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Image Form</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Upload an image to your album. Add a name, description, and optional tags
            to organize your photos easily.
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
              label="Image Name"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              required
              value={description}
              onChange={handleChange}
              margin="dense"
              id="description"
              name="description"
              label="Image Description"
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

            <TextField
              autoFocus
              required
              value={tags}
              onChange={handleChangeTags}
              margin="dense"
              id="tags"
              name="tags"
              label="Tags (comma separated)"
              type="text"
              fullWidth
              variant="standard"
            />

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
