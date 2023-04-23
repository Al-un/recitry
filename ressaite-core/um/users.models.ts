export interface UserMinimalProfile {
  id: number;
  username: string;
}

export interface HasAuthor {
  author: UserMinimalProfile;
}
