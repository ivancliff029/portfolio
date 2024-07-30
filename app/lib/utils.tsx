import { Timestamp } from 'firebase/firestore';
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  createdAt: { toDate: () => Date };
  likes: number;
  comments: number;
  author: string;
}

export const getContentPreview = (content: string) => {
  const stripHtml = content.replace(/<[^>]+>/g, '');
  return stripHtml.length > 150 ? stripHtml.substring(0, 150) + '...' : stripHtml;
};

export interface Comment {
  id: string;
  content: string;
  createdAt: Timestamp;
  postId: string;
  userId: string;
  username: string;
}

