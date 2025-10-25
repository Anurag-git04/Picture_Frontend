import { Box, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import MiniDrawer, { DrawerHeader } from "../../components/materialUI/Sidenav";
import FormDialogAddImage from "../../components/materialUI/FormDialogForImage";
import { useAppDispatch, useAppSelector } from "../../store/store";
import React from "react";
import { fetchImages } from "../../features/Images/ImageSlice";
import ImageViewDialog from "../../components/ImageViewDialog";
import CircularWithValueLabel from "../../components/materialUI/CircularProgressWithLabel";

const ImageByAlbum = () => {
  const { albumId } = useParams();

  const dispatch = useAppDispatch();
  const { Images, isLoading, error } = useAppSelector((state) => state.image);

  React.useEffect(() => {
    if (!albumId) return;
    dispatch(fetchImages(albumId));
  }, [dispatch, albumId]);

  return (
    <Box sx={{ display: "flex" }}>
      <MiniDrawer />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {albumId && <FormDialogAddImage albumId={albumId} />}
        <br />
        {isLoading && <CircularWithValueLabel />}
        {error && <div>{error}</div>}

        <Box sx={{ flexGrow: 1, p: { xs: 1, sm: 2, md: 3 } }}>
          <Grid
            container
            spacing={2}
            justifyContent="flex-start"
            alignItems="stretch"
          >
            {Images?.map((img) => (
              // <Grid item key={img.imageId} xs={12} sm={6} md={4} lg={3}>
              <Box sx={{ display: "flex", justifyContent: "center", height: "100%" }}>
                <ImageViewDialog image={img} albumId={albumId} />
              </Box>
              // </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default ImageByAlbum;
