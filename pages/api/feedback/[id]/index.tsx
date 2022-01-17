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
  const currentFeedback: FeedbackData = productFeedback.filter(
    (feedback) => feedback.id === Number(req.query.id)
  )[0];

  switch (req.method) {
    case "GET":
      return res.status(200).json(JSON.stringify(currentFeedback));
    case "POST":
      const comment = req.body;
      let totalComments = 0;
      productFeedback.map((feedback) => {
        "comments" in feedback
          ? (totalComments += feedback.comments.length)
          : (totalComments += 0);
      });

      const id = totalComments + 1;

      {
        "comments" in currentFeedback
          ? currentFeedback["comments"].push({ id, ...comment })
          : (currentFeedback["comments"] = [{ id, ...comment }]);
      }

      fs.writeFileSync("./data.json", JSON.stringify(data));
      return res.status(200).json({});
    case "PUT":
      const params = req.body;
      currentFeedback.title = params.title;
      currentFeedback.category = params.category;
      currentFeedback.upvotes = params.upvotes;
      currentFeedback.status = params.status;
      currentFeedback.description = params.description;

      fs.writeFileSync("./data.json", JSON.stringify(data));
      return res.status(200).json({});
    case "DELETE":
      productFeedback = productFeedback.filter(
        (feedback) => feedback.id !== Number(req.query.id)
      );

      const newData = {
        currentUser: data.currentUser,
        productRequests: productFeedback,
      };
      fs.writeFileSync("./data.json", JSON.stringify(newData));
      console.log(newData);
      return res.status(200).json({});
    default:
      return res.status(400).end(`Method ${req.method} Not Allowed`);
  }
}
