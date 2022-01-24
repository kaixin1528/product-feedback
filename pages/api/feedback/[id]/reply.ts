import data from "../../../../data.json";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { FeedbackData, Reply, Comment } from "../../../../lib/Constant";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      try {
        return addReply(req, res);
      } catch (error) {
        return res.end({ msg: error });
      }
    case "PUT":
      try {
        return addAdditionalReply(req, res);
      } catch (error) {
        return res.end({ msg: error });
      }
    default:
      return res.status(400).end(`Method ${req.method} Not Allowed`);
  }
}

export const addReply = async (req: NextApiRequest, res: NextApiResponse) => {
  let productFeedback: any[] = data.productRequests;
  const currentFeedback: FeedbackData = productFeedback.filter(
    (feedback: FeedbackData) => feedback.id === Number(req.query.id)
  )[0];

  const currentComment: Comment = currentFeedback.comments.filter(
    (comment: Comment) => comment.id === Number(req.body.id)
  )[0];

  const reply: Reply = req.body.reply;
  reply.replyingTo = currentComment.user.username;

  {
    "replies" in currentFeedback
      ? currentComment["replies"].push({ reply })
      : (currentComment["replies"] = [reply]);
  }

  fs.writeFileSync("./data.json", JSON.stringify(data));
  return res
    .status(200)
    .json({ msg: "Successfully added a reply to the comment" });
};

export const addAdditionalReply = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  let productFeedback: any[] = data.productRequests;
  const currentFeedback: FeedbackData = productFeedback.filter(
    (feedback: FeedbackData) => feedback.id === Number(req.query.id)
  )[0];

  const currentComment: Comment = currentFeedback.comments.filter(
    (comment: Comment) => comment.id === Number(req.body.id)
  )[0];

  const reply: Reply = req.body.reply;
  reply.replyingTo = currentComment.replies[req.body.replyToId].user.username;

  currentComment["replies"].push(reply);

  fs.writeFileSync("./data.json", JSON.stringify(data));
  return res
    .status(200)
    .json({ msg: "Successfully added a reply to the comment" });
};
