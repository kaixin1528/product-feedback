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

export const menuVariants = {
  hidden: {
    x: 500,
    opacity: 0,
    transition: { type: "spring", duration: 0.8 },
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

export const sortVariants = {
  up: { rotate: 180 },
  down: { rotate: 0 },
};

export const hoverFocusVariants = {
  hover: { backgroundColor: "#CFD7FF" },
  focus: { backgroundColor: "#4661E6", color: "white" },
};

export const filterVariants = {
  hidden: { backgroundColor: "#F2F4FF" },
  visible: {
    backgroundColor: "#4661E6",
    color: "white",
    transition: { duration: 0.2 },
  },
};
