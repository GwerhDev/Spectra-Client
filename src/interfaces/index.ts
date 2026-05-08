export interface UserData {
  loader: boolean;
  id?: string;
  email?: string;
  role?: string;
  username?: string;
  profilePic?: string;
}

export interface Session {
  logged: boolean;
  userData: UserData;
}

export interface Community {
  id: string;
  name: string;
  members: number;
  color: number;
  glyph: string;
}

export interface Room {
  id: string;
  community: string;
  title: string;
  mode: 'film' | 'music' | 'screen';
  content: string;
  elapsed?: string;
  duration?: string;
  host: string;
  participants: number;
  peak: number;
  tags: string[];
  sync: boolean;
  cover: string;
  locked?: boolean;
}

export interface CatalogItem {
  title: string;
  year: number;
  runtime: string;
  kind: string;
  hue: number;
}

export interface ChatMsg {
  who: string;
  at: string;
  text: string;
  highlight?: boolean;
  reactions?: string[];
}

export interface Person {
  name: string;
  role: 'host' | 'member';
}
