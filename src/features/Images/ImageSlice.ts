import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Image, User } from "../../types/Types";
import axios, { AxiosError } from "axios";

interface I{
    Images:Image[]|null,
    isLoading:boolean,
    error:string|null
}

const initialState:I ={
    Images:null,
    isLoading:false,
    error:null
}

export const fetchImages = createAsyncThunk<Image[],string,{rejectValue:string}>(
    'images/fetchImages',
    async (albumId,{rejectWithValue})=>{
        try {
            const res = localStorage.getItem("user-info");
            const user:User|null =res ?  JSON.parse(res):null
            const response = await axios.get(`https://picture-backend.vercel.app/api/images/${albumId}/images`,{
                headers:{
                    'Authorization': `Bearer ${user?.token}`
                }
            })  
            console.log(response)
            return response.data.images
        } catch (err) {
            const error = err as AxiosError<{message:string}>

            console.error(
                "Fetch images failed:",
                error.response?.data || error.message
            );

            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch images"
            );
        }
    }
)


const ImageSlice = createSlice({
    name:'images', 
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchImages.pending,(state)=>{
            state.isLoading = true
            state.error = null
        })
        .addCase(fetchImages.fulfilled,(state,action)=>{
            state.isLoading = false 
            state.Images = action.payload
        })
        .addCase(fetchImages.rejected,(state,action)=>{
            state.isLoading = false
            state.error = action.payload || "Failed to fetch Images"
        })
    }
})

export default ImageSlice.reducer