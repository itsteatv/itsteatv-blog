export interface UserAuthAPIData {
  fullname?: string;
  email: string;
  password: string;
  type: string;
}

export interface UserData {
  fullname: string;
  username: string;
  email: string;
  profile_img: string;
}

export interface UseImageUploadOptions {
  onImageUploaded: (url: string) => void;
}
