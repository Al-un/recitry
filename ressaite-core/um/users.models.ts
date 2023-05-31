export interface User {
  id: number;
  username: string;
  email: string | null;
  password: string;
  salt: string;
}

export interface UserMinimalProfile {
  id: number;
  username: string;
}

export interface UserFullProfile extends UserMinimalProfile {
  email: string | null
}

export interface HasAuthor {
  author: UserMinimalProfile;
}
