const prod = "https://kaixin-product-feedback.netlify.app";
const dev = "http://localhost:3000";
export const url = process.env.NODE_ENV === "development" ? dev : prod;

export interface FeedbackData {
  id: number;
  title: string;
  category: string;
  upvotes: number;
  upvoted: boolean;
  status: string;
  description: string;
  comments?: any[];
}

export interface NewFeedback {
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
  upvoted: boolean;
}

export interface Upvoted {
  id: number;
  upvotes: number;
  upvoted: boolean;
}

export interface Comment {
  id?: number;
  content: string;
  user: {
    image: string;
    name: string;
    username: string;
  };
  replies?: any[];
}

export interface EditFeedback {
  id: number;
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
}

export interface Reply {
  content: string;
  replyingTo?: string;
  user: {
    image: string;
    name: string;
    username: string;
  };
}
