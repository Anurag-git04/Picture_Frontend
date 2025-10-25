import { Box, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import MiniDrawer, { DrawerHeader } from "../../components/materialUI/Sidenav";
import { useAppDispatch, useAppSelector } from "../../store/store";
import React from "react";
import { fetchImages } from "../../features/Images/ImageSlice";
import ImageViewDialog from "../../components/ImageViewDialog";
import CircularWithValueLabel from "../../components/materialUI/CircularProgressWithLabel";


const SharedImage = () => {
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
        {/* {albumId && <FormDialogAddImage albumId={albumId} />} */}

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
              <Box sx={{ flexGrow: 1, p: 2 }}>
                <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
                  <ImageViewDialog image={img} albumId={albumId} />
                </Grid>
              </Box>

            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default SharedImage;
