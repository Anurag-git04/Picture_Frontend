import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Album, User } from "../../types/Types";
import axios, { AxiosError } from "axios";


interface sharedAlbum{
    sharedAlbum: Album[] | null;
    isLoading:boolean;
    error:string|null;
}

const initialState:sharedAlbum = {
    sharedAlbum:[],
    isLoading:false, 
    error:null
}

export const fetchSharedAlbums = createAsyncThunk<Album[], void, {rejectValue:string}>(
    'album/fetchAlbums',
    async (_, thunkAPI) => {
        try {
           const res = localStorage.getItem("user-info");
            const user:User|null =res ?  JSON.parse(res):null 
            const response = await axios.get('https://picture-backend.vercel.app/api/albums/album/shared',{
                headers:{
                    Authorization: `Bearer ${user?.token}`
                }
            })
            console.log(response)
            return response.data.albums as Album[]
        } catch (error) {
            const err = error as AxiosError<{ message?: string }>;

            const message =
                err.response?.data?.message ||
                err.message ||
                "Something went wrong while fetching albums";

            return thunkAPI.rejectWithValue(message);
        }
    }
)

const sharedAlbumSlice = createSlice({
    name:'shared_Albums',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(fetchSharedAlbums.pending,(state)=>{
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchSharedAlbums.fulfilled,(state,action)=>{
                state.isLoading = false
                state.sharedAlbum = action.payload
            })
            .addCase(fetchSharedAlbums.rejected,(state,action)=>{
                state.isLoading = false
                state.error = action.payload || "Failed to fetch shared albums"
            })
    }
})

export default sharedAlbumSlice.reducer