import { Box, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material"
import MiniDrawer, { DrawerHeader } from "../../components/materialUI/Sidenav"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { useEffect, useState } from "react"
import { fetchSharedAlbums } from "../../features/SharedAlbums/SharedAlbumSlice"
import { useNavigate } from "react-router-dom"
import type { Album } from "../../types/Types"
import CircularWithValueLabel from "../../components/materialUI/CircularProgressWithLabel"



const SharedAlbums = () => {
  const dispatch = useAppDispatch()
  const { sharedAlbum, isLoading, error } = useAppSelector((state) => state.sharedAlbum)
  const [album, setAlbums] = useState<Album[] | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchSharedAlbums())
  }, [dispatch])

  useEffect(() => {
    if (sharedAlbum) {
      setAlbums(sharedAlbum?.filter((a) => a.isOwner == false))
    }
  }, [sharedAlbum])
  return (
    <Box sx={{ display: "flex" }}>
      <MiniDrawer />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <div>Shared Albums</div> <br /> <br />
        {isLoading && <CircularWithValueLabel />}
        {error ? error : ""}
        <Box sx={{ flexGrow: 1, p: { xs: 1, sm: 2, md: 3 } }}>
          <Grid
            container
            spacing={2}
            justifyContent="flex-start"
            alignItems="stretch"
          >
            {
              album?.map((album) => {
                return (
                  <Card sx={{ width: 345 }} onClick={() => navigate(`/sharedImage/${album.albumId}`)}>
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
                    {/* <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                  </Box>
                </CardActions> */}
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

export default SharedAlbums