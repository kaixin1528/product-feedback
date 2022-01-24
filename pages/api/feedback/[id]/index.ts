import data from "../../../../data.json";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { FeedbackData, Comment, EditFeedback } from "../../../../lib/Constant";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      try {
        return getCurrentFeedback(req, res);
      } catch (error) {
        return res.end({ msg: error });
      }
    case "POST":
      try {
        return addComment(req, res);
      } catch (error) {
        return res.end({ msg: error });
      }
    case "PUT":
      try {
        return editFeedback(req, res);
      } catch (error) {
        return res.end({ msg: error });
      }
    case "DELETE":
      try {
        return deleteFeedback(req, res);
      } catch (error) {
        return res.end({ msg: error });
      }
    default:
      return res.status(400).end(`Method ${req.method} Not Allowed`);
  }
}

export const getCurrentFeedback = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  let productFeedback: any[] = data.productRequests;
  const currentFeedback: FeedbackData = productFeedback.filter(
    (feedback: FeedbackData) => feedback.id === Number(req.query.id)
  )[0];
  return res.status(200).json(currentFeedback);
};

export const addComment = async (req: NextApiRequest, res: NextApiResponse) => {
  let productFeedback: any[] = data.productRequests;
  const currentFeedback: FeedbackData = productFeedback.filter(
    (feedback: FeedbackData) => feedback.id === Number(req.query.id)
  )[0];
  const comment: Comment = req.body;
  let totalComments: number = 0;
  productFeedback.map((feedback: FeedbackData) => {
    "comments" in feedback
      ? (totalComments += feedback.comments.length)
      : (totalComments += 0);
  });

  const id: number = totalComments + 1;

  {
    "comments" in currentFeedback
      ? currentFeedback["comments"].push({ id, ...comment })
      : (currentFeedback["comments"] = [{ id, ...comment }]);
  }

  fs.writeFileSync("./data.json", JSON.stringify(data));
  return res
    .status(200)
    .json({ msg: "Successfully added a comment to the feedback" });
};

export const editFeedback = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  let productFeedback: any[] = data.productRequests;
  const currentFeedback: FeedbackData = productFeedback.filter(
    (feedback: FeedbackData) => feedback.id === Number(req.query.id)
  )[0];
  const params: EditFeedback = req.body;
  currentFeedback.title = params.title;
  currentFeedback.category = params.category;
  currentFeedback.upvotes = params.upvotes;
  currentFeedback.status = params.status;
  currentFeedback.description = params.description;

  fs.writeFileSync("./data.json", JSON.stringify(data));
  return res.status(200).json({ msg: "Successfully edited the feedback" });
};

export const deleteFeedback = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  let productFeedback: any[] = data.productRequests;
  productFeedback = productFeedback.filter(
    (feedback: FeedbackData) => feedback.id !== Number(req.query.id)
  );

  const newData = {
    currentUser: data.currentUser,
    productRequests: productFeedback,
  };
  fs.writeFileSync("./data.json", JSON.stringify(newData));
  return res.status(200).json({ msg: "Successfully deleted the feedback" });
};
