import data from "../../../../data.json";
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

export type FeedbackData = {
  id: number;
  title: string;
  category: string;
  upvotes: number;
  upvoted: boolean;
  status: string;
  description: string;
  comments?: any[];
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  let productFeedback = data.productRequests;
  const currentFeedback: any = productFeedback.filter(
    (feedback) => feedback.id === Number(req.query.id)
  )[0];

  switch (req.method) {
    case "POST":
      try {
        const currentComment = currentFeedback.comments.filter(
          (comment) => comment.id === Number(req.body.id)
        )[0];

        const reply = req.body.reply;
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
      } catch (error) {
        return res.end({ msg: error });
      }
    case "PUT":
      try {
        const currentComment = currentFeedback.comments.filter(
          (comment) => comment.id === Number(req.body.id)
        )[0];

        const reply = req.body.reply;
        reply.replyingTo =
          currentComment.replies[req.body.replyToId].user.username;

        currentComment["replies"].push(reply);

        fs.writeFileSync("./data.json", JSON.stringify(data));
        return res
          .status(200)
          .json({ msg: "Successfully added a reply to the comment" });
      } catch (error) {
        return res.end({ msg: error });
      }
    default:
      return res.status(400).end(`Method ${req.method} Not Allowed`);
  }
}
