import data from "../../data.json";
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

export type FeedbackData = {
  id: number;
  title: string;
  category: string;
  upvotes: number | string;
  upvoted: boolean;
  status: string;
  description: string;
  comments?: any[];
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const productFeedback = data.productRequests;
  switch (req.method) {
    case "GET":
      return res.status(200).json(JSON.stringify(data));
    case "POST":
      const feedback = req.body;
      const id = productFeedback.length > 0 ? productFeedback.at(-1).id + 1 : 1;
      data.productRequests.push({ id, ...feedback });
      fs.writeFileSync("./data.json", JSON.stringify(data));
      return res.status(200).json({});
    case "PUT":
      const params = req.body;
      const currentFeedback: FeedbackData = productFeedback.filter(
        (feedback) => feedback.id === Number(params.id)
      )[0];
      currentFeedback.upvotes = Number(params.upvotes);
      currentFeedback.upvoted = params.upvoted;
      fs.writeFileSync("./data.json", JSON.stringify(data));
      return res.status(200).json({});
    default:
      return res.status(400).end(`Method ${req.method} Not Allowed`);
  }
}
