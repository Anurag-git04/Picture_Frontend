import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from "axios";
import type { Album, User } from '../../types/Types';

interface AlbumState {
  albums: Album[];
  isLoading: boolean;
  error: string | null;
}

const initialState:AlbumState={
   albums:[],
   isLoading: false,
   error: null,
} 

export const fetchAlbums = createAsyncThunk<Album[], void, {rejectValue:string}>(
    'album/fetchAlbums',
    async (_, thunkAPI) => {
        try {
           const res = localStorage.getItem("user-info");
            const user:User|null =res ?  JSON.parse(res):null 
            const response = await axios.get('https://picture-backend.vercel.app/api/albums',{
                headers:{
                    Authorization: `Bearer ${user?.token}`
                }
            })
            console.log(response)
            return response.data.albums as Album[]
        } catch (error) {
            const err = error as AxiosError<{ message?: string }>;

            // 👇 Safely extract message from various shapes
            const message =
                err.response?.data?.message ||
                err.message ||
                "Something went wrong while fetching albums";

            return thunkAPI.rejectWithValue(message);

            // return thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)

const albumSlice = createSlice({
    name: 'album',
    initialState,
    reducers:{
        addAlbum:(state,action)=>{
            state.albums.push(action.payload)
        } 
    },
    extraReducers:(builder)=>{
        builder
            .addCase(fetchAlbums.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAlbums.fulfilled, (state, action) => {
                state.isLoading = false;
                state.albums = action.payload;
            })
            .addCase(fetchAlbums.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch albums';
            })
    }
})

export const { addAlbum } = albumSlice.actions
export default albumSlice.reducer