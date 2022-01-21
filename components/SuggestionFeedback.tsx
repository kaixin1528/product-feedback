import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Image from "next/image";
import empty from "../public/assets/suggestions/illustration-empty.svg";
import suggestion from "../public/assets/suggestions/icon-suggestions.svg";
import AddFeedbackButton from "./AddFeedbackButton";
import { useState } from "react";
import SortFeedback from "../lib/SortFeedback";

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

const SuggestionFeedback = ({ productRequests, filter }) => {
  const [openSort, setOpenSort] = useState(false);
  const [sortBy, setSortBy] = useState("Most Upvotes");

  const router = useRouter();

  const numSuggestions: number = productRequests
    .map((feedback: FeedbackData) => {
      return (
        feedback.status === "suggestion" &&
        feedback.category.includes(filter) &&
        feedback
      );
    })
    .filter(Boolean).length;

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
    }).then(() => window.location.reload());
  };

  const sortVariants = {
    up: { rotate: 180 },
    down: { rotate: 0 },
  };

  return (
    <section className='grid d:col-span-3'>
      <header className='grid grid-cols-2 t:grid-cols-3 t:mx-12 d:mx-8 t:rounded-lg items-center text-xs py-3 px-6 gap-2 text-white bg-indigo'>
        <section className='t:grid grid-flow-col auto-cols-max items-center gap-3 hidden'>
          <Image src={suggestion} alt='suggestion'></Image>
          <h4 className='text-base font-bold'>
            {numSuggestions}{" "}
            {numSuggestions <= 1 ? "Suggestion" : "Suggestions"}
          </h4>
        </section>
        <section
          className='grid grid-cols-8 t:col-start-2'
          onClick={() => {
            setOpenSort(!openSort);
          }}
        >
          <button className='grid grid-flow-col auto-cols-max gap-1'>
            <h4 className='font-light'>Sort by :</h4>
            <section
              className={`grid grid-flow-col auto-cols-max items-center gap-2`}
            >
              <h4 className='font-semibold'> {sortBy}</h4>
              <motion.svg
                variants={sortVariants}
                animate={openSort ? "up" : "down"}
                width='10'
                height='7'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M1 1l4 4 4-4'
                  stroke='white'
                  strokeWidth='2'
                  fill='none'
                  fillRule='evenodd'
                />
              </motion.svg>
            </section>
          </button>
          {openSort && (
            <section className='grid col-span-8 sectionide-y mt-10 -mb-[14rem] z-10 text-indigo bg-white rounded-lg shadow-xl'>
              <button
                className='py-3 pr-10 pl-5 text-left font-light hover:text-purple'
                onClick={() => {
                  setSortBy("Most Upvotes");
                  setOpenSort(!openSort);
                  SortFeedback(productRequests, "Most Upvotes");
                }}
              >
                Most Upvotes
              </button>
              <button
                className='py-3 pr-10 pl-5 text-left font-light hover:text-purple'
                onClick={() => {
                  setSortBy("Least Upvotes");
                  setOpenSort(!openSort);
                  SortFeedback(productRequests, "Least Upvotes");
                }}
              >
                Least Upvotes
              </button>
              <button
                className='py-3 pr-10 pl-5 text-left font-light hover:text-purple'
                onClick={() => {
                  setSortBy("Most Comments");
                  setOpenSort(!openSort);
                  SortFeedback(productRequests, "Most Comments");
                }}
              >
                Most Comments
              </button>
              <button
                className='py-3 pr-10 pl-5 text-left font-light hover:text-purple'
                onClick={() => {
                  setSortBy("Least Comments");
                  setOpenSort(!openSort);
                  SortFeedback(productRequests, "Least Comments");
                }}
              >
                Least Comments
              </button>
            </section>
          )}
        </section>
        <AddFeedbackButton position='justify-self-end' filter={filter} />
      </header>
      <ul className='grid py-10 d:py-5 px-6 t:px-12 d:px-8 gap-5 bg-rice-white'>
        {productRequests?.map((feedback: FeedbackData, index: number) => {
          const comments = feedback.comments;
          let totalReplies = 0;
          const totalComments = () => {
            if (comments) {
              comments.map((comment: any) => {
                if (comment.replies) totalReplies += comment.replies.length;
              });
              totalReplies += comments.length;
            }
          };
          totalComments();
          return (
            feedback.status === "suggestion" &&
            feedback.category.includes(filter) && (
              <motion.li
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1, transition: { duration: 1.5 } }}
                viewport={{ once: true }}
                key={index}
                className='grid t:grid-cols-8 p-8 gap-4 text-sm text-left bg-white rounded-lg shadow-sm'
              >
                <motion.button
                  whileHover={{ backgroundColor: "#CFD7FF" }}
                  name='upvote'
                  type='submit'
                  className={`${
                    feedback.upvoted
                      ? "bg-ocean-blue text-white"
                      : "bg-moderate-rice-white"
                  } hidden t:grid t:grid-flow-row t:justify-items-center t:self-start t:px-3 grid-flow-col auto-cols-max items-center py-2 px-5 gap-1 font-bold rounded-xl justify-self-start`}
                  onClick={(e) =>
                    handleUpvote(
                      e,
                      feedback.upvotes,
                      feedback.id,
                      feedback.upvoted
                    )
                  }
                >
                  <svg width='10' height='7' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M1 6l4-4 4 4'
                      stroke={feedback.upvoted ? "#FFFFFF" : "#4661E6"}
                      strokeWidth='2'
                      fill='none'
                      fillRule='evenodd'
                    />
                  </svg>
                  <h4
                    className={`${
                      feedback.upvoted ? "text-white" : "text-dark-indigo"
                    }`}
                  >
                    {feedback.upvotes}
                  </h4>
                </motion.button>
                <article className='grid t:col-span-6 gap-2'>
                  <motion.button
                    whileHover={{ color: "#4661E6" }}
                    type='submit'
                    className='text-left text-dark-indigo font-bold t:text-base'
                    onClick={() => router.push(`/feedback/${feedback.id}`)}
                  >
                    {feedback.title}
                  </motion.button>
                  <section className='grid gap-3'>
                    <p className='text-dark-grey-blue font-light'>
                      {feedback.description}
                    </p>
                    <h4 className='capitalize mt-2 py-3 px-5 text-xs text-ocean-blue font-bold bg-moderate-rice-white rounded-xl justify-self-start'>
                      {feedback.category}
                    </h4>
                  </section>
                </article>
                <article className='grid grid-cols-2 text-sm'>
                  <motion.button
                    whileHover={{ backgroundColor: "#CFD7FF" }}
                    name='upvote'
                    type='submit'
                    className={`${
                      feedback.upvoted
                        ? "bg-ocean-blue"
                        : "bg-moderate-rice-white"
                    } t:hidden grid grid-flow-col auto-cols-max items-center py-2 px-5 gap-2 font-bold rounded-xl justify-self-start`}
                    onClick={(e) =>
                      handleUpvote(
                        e,
                        feedback.upvotes,
                        feedback.id,
                        feedback.upvoted
                      )
                    }
                  >
                    <svg
                      width='10'
                      height='7'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M1 6l4-4 4 4'
                        stroke={feedback.upvoted ? "#FFFFFF" : "#4661E6"}
                        strokeWidth='2'
                        fill='none'
                        fillRule='evenodd'
                      />
                    </svg>
                    <h4
                      className={`${
                        feedback.upvoted ? "text-white" : "text-dark-indigo"
                      }`}
                    >
                      {feedback.upvotes}
                    </h4>
                  </motion.button>
                  <article className='grid grid-flow-col auto-cols-max items-center py-2 px-5 gap-2 font-bold justify-self-end'>
                    <svg
                      width='18'
                      height='16'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M2.62 16H1.346l.902-.91c.486-.491.79-1.13.872-1.823C1.036 11.887 0 9.89 0 7.794 0 3.928 3.52 0 9.03 0 14.87 0 18 3.615 18 7.455c0 3.866-3.164 7.478-8.97 7.478-1.017 0-2.078-.137-3.025-.388A4.705 4.705 0 012.62 16z'
                        fill='#CDD2EE'
                        fillRule='nonzero'
                      />
                    </svg>
                    <h4 className='text-dark-indigo'>
                      {"comments" in feedback ? totalReplies : 0}
                    </h4>
                  </article>
                </article>
              </motion.li>
            )
          );
        })}
        {!numSuggestions && (
          <section className='grid py-10 px-6 t:px-12 h-screen bg-rice-white'>
            <section className='grid py-28 px-10 gap-3 t:gap-12 text-center bg-white rounded-lg'>
              <section className=''>
                <Image src={empty} alt='empty' height={120}></Image>
              </section>
              <h2 className='text-2xl text-indigo font-bold'>
                There is no feedback yet.
              </h2>
              <p className='t:w-4/5 t:mx-auto text-dark-grey-blue font-light'>
                Got a suggestion? Found a bug that needs to be squashed? We love
                hearing about new ideas to improve our app.
              </p>
              <AddFeedbackButton
                position='mx-auto px-4 py-0 t:py-3'
                filter={filter}
              />
            </section>
          </section>
        )}
      </ul>
    </section>
  );
};

export default SuggestionFeedback;
