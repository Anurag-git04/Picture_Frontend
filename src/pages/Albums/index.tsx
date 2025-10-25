import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import MiniDrawer, { DrawerHeader } from '../../components/materialUI/Sidenav'
import FormDialogAddAlbum from '../../components/materialUI/FormDialogForAlbum'
import { useAppDispatch, useAppSelector } from '../../store/store'
import React, { useEffect } from 'react'
import { fetchAlbums } from '../../features/Album/albumSlice'
import { useNavigate } from 'react-router-dom'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Delete, EditNote } from '@mui/icons-material'
import { blue, red } from '@mui/material/colors'
import axios from 'axios'
import toast from 'react-hot-toast'
import type { User } from '../../types/Types'


const Albums = () => {
  const dispatch = useAppDispatch()
  const { albums, isLoading, error } = useAppSelector(state => state.album)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchAlbums())
  }, [dispatch])

  const [anchorE1, setAnchorE1] = React.useState<null | HTMLElement>()

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setAnchorE1(event.currentTarget)
  }

  const handleMenuClose = () => setAnchorE1(null);

  const DeleteAlbum = async (albumId: string) => {
    const response = localStorage.getItem("user-info")
    const user: User = response ? JSON.parse(response) : ""
    const res = await axios.delete(`https://picture-backend.vercel.app/api/albums/${albumId}`, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
    if (res.data.success) {
      dispatch(fetchAlbums())
      toast.success("Album is Deleted Successfully")
    }
  }

  return (
    <Box sx={{ display: "flex" }}>
      <MiniDrawer />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <FormDialogAddAlbum />
        <Typography gutterBottom sx={{ mt: 2 }} variant="h5" component="div">
          Your Albums
        </Typography>
        {
          isLoading ? <>... Loading</> : ""
        }
        {
          error ? <>{error}</> : ""
        }
        <Box sx={{ flexGrow: 1, p: { xs: 1, sm: 2, md: 3 } }}>
          <Grid
            container
            spacing={2}
            justifyContent="flex-start"
            alignItems="stretch"
          >
            {
              albums.map((album) => {
                return (
                  <Card sx={{ width: 345 }} onClick={() => navigate(`/image/${album.albumId}`)}>
                    <CardMedia
                      sx={{ height: 180 }}
                      image={album.albumPic}
                      title="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {album.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {album.description}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box>
                        <Button size="small">Images</Button>
                      </Box>
                      <IconButton
                        aria-label='setting'
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
                        <MenuItem sx={{ color: blue[300] }}>
                          <IconButton sx={{ color: blue[800] }} onClick={() => navigate(`/edit-album/${album.albumId}`)}>
                            <EditNote />
                          </IconButton>
                          Edit
                        </MenuItem>
                        <MenuItem sx={{ color: red[500] }} onClick={() => DeleteAlbum(album.albumId)}>
                          <IconButton sx={{ color: red[700] }}>
                            <Delete />
                          </IconButton>
                          Delete
                        </MenuItem>
                      </Menu>

                    </CardActions>
                  </Card>
                )
              })
            }
          </Grid>
        </Box>
      </Box>
    </Box>

  )
}

export default Albums