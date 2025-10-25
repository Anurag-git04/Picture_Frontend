// import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import GoogleLogin from "./pages/Login"
import { GoogleOAuthProvider } from "@react-oauth/google"
import Dashboard from "./pages/Dashboard"
import Albums from "./pages/Albums"
import SharedAlbums from "./pages/sharedAlbum"
import ImageByAlbum from "./pages/ImageByAlbum"
import EditAlbum from "./pages/EditAlbums"
import SharedImage from "./pages/sharedAlbumImages"
import { Toaster } from "react-hot-toast"


function App() {
  const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider clientId="881004835455-nu8eod8ikiq3qr9k4f34fejf4jepd5rl.apps.googleusercontent.com">
        <GoogleLogin></GoogleLogin>
      </GoogleOAuthProvider>
    )
  }

  return (
    <>
      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<Navigate to={"/login"} />} />
          <Route path="/login" element={<GoogleAuthWrapper />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route element={<Header/>}>
            <Route path="/dashboard" element={<Dashboard/>} />
          </Route> */}
          <Route path="/albums" element={<Albums />} />
          <Route path="/shared-with" element={<SharedAlbums />} />
          <Route path="/image/:albumId" element={<ImageByAlbum />} />
          <Route path="/edit-album/:albumId" element={<EditAlbum />} />
          <Route path="/sharedImage/:albumId" element={<SharedImage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
