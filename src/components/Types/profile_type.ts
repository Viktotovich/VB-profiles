export interface PublicProfileType {
  profileData: ProfileType;
  editable: boolean;
}

export interface ProfileType {
  userProfile: UserProfile;
  userData: UserData;
}

export interface UserData {
  fullname: string;
  username: string;
  avatarUrl: string;
  posts: number[]; //Reference to owned postIds
  likes: number[]; //Reference to liked post > Use lazy loading
  roleId: number; //Changeable to student <--> default
}

export interface UserProfile {
  profileStatus: number;
  bio: string;
  linkedinUrl: string;
  instagramUrl: string;
  additionalUrl: string;
  additionalUrlName: string;
  mobileNumber: string;
  profileTitle: string;
  color: string;
}

export interface ProfilePropTypes {
  profileInfo: ProfileType;
}

export interface UpdateAvatarProps {
  formData: {
    avatarUrl: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setAvatarUrl: (url: string) => void;
}

export interface ServerFetchAvatar {
  profileData: ProfileType;
  message: string;
  editable: boolean;
}

export interface ServerUpdateAvatarResponse {
  avatarUrl: string;
}

export interface PrivateProfileProps {
  profileData: ProfileType;
  message: string;
  editable: boolean;
}
