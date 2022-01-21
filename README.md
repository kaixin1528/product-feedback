# Product Feedback Website

## Table of contents

- [Overview](#overview)
  - [Getting Started](#getting-started)
  - [Project Summary](#project-summary)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

### Getting Started 

First, install all the necessary dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Project Summary

Product feedback is a responsive CRUD website grouping together feedback for a product. On this website, 
one can add/remove/edit/read feedback. Inside each feedback page, one can interact with the comment section. 


### Links

- Live Site URL: [https://kaixin-product-feedback.netlify.app](https://kaixin-product-feedback.netlify.app)
  Note: The Live Version did not enable CRUD functionality. To check for CRUD operations, please install all the 
  necessary dependencies and open on localhost:3000.

## My process


### Built with

- Semantic HTML5 markup
- CSS custom properties
- CSS Grid
- Typescript
- Mobile-first workflow
- [Next](https://nextjs.org/) 
- [Tailwind](https://tailwindcss.com/) 


### What I learned

This was my first time working with Next, so I had to familiarize myself with Next's own routing and its built-in API routes. 
To fetch the feedback data, instead of directly importing the data, I used Next's getStaticProps() and made a HTTP 
GET request to my own Next API routes to fetch the data, as shown below: 

```js
export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`${url}/api`, {
    method: "GET",
  });
  const feedback = await res.json();

  return {
    props: {
      feedback,
    },
  };
};
```

After sending the request from the client side, I wrote the following code snippet to respond to the request:

```js
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const productFeedback = data.productRequests;
  switch (req.method) {
    case "GET":
      try {
        return res.status(200).json(data);
      } catch (error) {
        return res.end({ msg: error });
      }
     ...
}
```

To send HTTP requests to the server side, I had to create several handlers, such as the one shown below, where I learned to 
send a PUT request and a body of stringified content to the server side. 

```js
 const handleUpvote = async (
    e,
    upvotes: number,
    id: number,
    upvoted: boolean
  ) => {
    e.preventDefault();

    fetch("/api", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        upvotes: upvoted ? upvotes - 1 : upvotes + 1,
        upvoted: !upvoted,
      }),
    })
      .then(() => window.location.reload());
  };
```

After sending the PUT request, I wrote the corresponding API logic as shown below. To permanently store the data, in the server side code,
I used the fs module to overwrite the json file.

```js
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const productFeedback = data.productRequests;
  switch (req.method) {
    ...
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

```

This was also the first project in which I used Typescript, or Javascript with static typing. Due to this, there were many instances 
where I had to include the type for the constant.

```js
export type FeedbackData = {
  id: number;
  title: string;
  category: string;
  upvotes: number;
  upvoted: boolean;
  status: string;
  description: string;
  comments: any[];
};
```



### Continued development

For further development, I would like to figure out the issue of not being able to perform CRUD operations after deployment to Netlify. As of now, 
CRUD operations are only accessible through the local host.
  

## Author

- Portfolio Website - [Kaixin Huang](https://www.kaixin-portfolio.netlify.app)
