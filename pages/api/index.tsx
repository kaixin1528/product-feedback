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
      try {
        return res.status(200).json(data);
      } catch (error) {
        return res.end({ msg: error });
      }
    case "POST":
      try {
        const feedback = req.body;
        const id =
          productFeedback.length > 0 ? productFeedback.at(-1).id + 1 : 1;
        data.productRequests.push({ id, ...feedback });
        fs.writeFileSync("./data.json", JSON.stringify(data));
        return res.status(200).json({ msg: "Successfully created a feedback" });
      } catch (error) {
        return res.end({ msg: error });
      }
    case "PUT":
      try {
        const params = req.body;
        const currentFeedback: any = productFeedback.filter(
          (feedback) => feedback.id === Number(params.id)
        )[0];
        currentFeedback.upvotes = Number(params.upvotes);
        currentFeedback.upvoted = params.upvoted;
        fs.writeFileSync("./data.json", JSON.stringify(data));
        return res
          .status(200)
          .json({ msg: "Successfully upvoted the feedback" });
      } catch (error) {
        return res.end({ msg: error });
      }
    default:
      return res.status(400).end(`Method ${req.method} Not Allowed`);
  }
}
