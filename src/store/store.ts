import { configureStore } from "@reduxjs/toolkit";
import albumReducer from "../features/Album/albumSlice"
import imageReducer from "../features/Images/ImageSlice"
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import shareAlbumReducer from "../features/SharedAlbums/SharedAlbumSlice"

export const store = configureStore({
    reducer:{
        album: albumReducer,
        image:imageReducer,
        sharedAlbum:shareAlbumReducer
    }
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useAppDispatch = ()=> useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;