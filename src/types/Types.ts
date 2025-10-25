type User = {
  name: string;
  email: string;
  image: string;
  token: string;
  userId: string;
}

type Album = {  
  albumId: string;
  name: string;
  albumPic:string;
  description: string;
  owner:string;
  isOwner: boolean;
}

type comment={
  text:string;
  userId:{
    name:string;
    profilePicture:string;
  };
  createdAt:Date;

}

type Image = {
        imageId: string,
        albumId: string,
        name: string,
        description: string,
        imageUrl: string,
        tags: string[],
        isFavorite: boolean,
        comments:comment[],
        uploadedAt:Date,
}

type albumData = {
  albumName: string,
  imageCount: number,
}

export type { User, Album, Image, albumData };