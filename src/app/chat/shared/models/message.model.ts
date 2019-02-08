export interface Message {
  id?: number;
  userId?: string;
  friendId?: string;
  date?: string;
  content?: string;
  friendFullName?: string;
  userFullName?: string;
}