export interface User {
  id: number;
  username: string | null;
  email: string;
  password: string;
  salt: string;
}

export interface UserMinimalProfile {
  id: number;
  username: string;
}

export interface UserFullProfile extends UserMinimalProfile {
  email: string;
}

export interface HasAuthor {
  author: UserMinimalProfile;
}

/**
 * Given an user, via a token, provide the different information required
 * for a session
 */
export interface SessionInfo {
  user: UserMinimalProfile;
}
