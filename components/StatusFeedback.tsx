import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useState } from "react";
import { FeedbackData } from "../lib/Constant";

const StatusFeedback = ({
  productRequests,
  currentStatus,
  description,
  borderColor,
}: {
  productRequests: any[];
  currentStatus: string;
  description: string;
  borderColor: string;
}) => {
  const router = useRouter();
  const [upvote, setUpvote] = useState<number>(-1);

  const hoverFocusVariants = {
    hover: { backgroundColor: "#CFD7FF" },
    focus: { backgroundColor: "#4661E6", color: "white" },
  };

  return (
    <section className='grid py-10 px-6 t:px-2 gap-5'>
      <article className='grid gap-1'>
        <h3 className='capitalize text-lg text-dark-indigo font-bold'>
          {currentStatus} (
          {
            productRequests.filter(
              (feedback: FeedbackData) => feedback.status === currentStatus
            ).length
          }
          )
        </h3>
        <p className='text-sm text-dark-grey-blue font-light'>{description}</p>
      </article>
      {productRequests.map((feedback: FeedbackData, index: number) => {
        return (
          feedback.status === currentStatus && (
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, transition: { duration: 1.5 } }}
              viewport={{ once: true }}
              key={index}
              className={`grid p-8 gap-4 text-sm text-left bg-white rounded-lg shadow-sm`}
            >
              <article className='grid grid-flow-col auto-cols-max gap-2 items-center'>
                <section
                  className={`h-2.5 w-2.5 bg-${borderColor} rounded-full`}
                ></section>
                <h4 className='capitalize text-black text-opacity-50 font-light'>
                  {currentStatus}
                </h4>
              </article>
              <button
                className='text-base text-left text-dark-indigo font-bold hover:text-ocean-blue'
                onClick={() => router.push(`/feedback/${feedback.id}`)}
              >
                {feedback.title}
              </button>
              <article className='grid gap-3'>
                <p className='text-dark-grey-blue font-light'>
                  {feedback.description}
                </p>
                <h4 className='capitalize text-xs mt-2 py-3 px-5 text-ocean-blue font-bold bg-moderate-rice-white rounded-xl justify-self-start'>
                  {feedback.category}
                </h4>
              </article>
              <article className='grid grid-cols-2 text-sm'>
                <motion.button
                  variants={hoverFocusVariants}
                  whileHover='hover'
                  whileFocus='focus'
                  className='group grid t:grid-flow-row t:justify-items-center t:px-4 t:self-start justify-self-start py-2 px-5 gap-1 font-bold bg-moderate-rice-white rounded-xl'
                  onClick={() => setUpvote(feedback.id)}
                >
                  <section className='justify-self-center'>
                    <svg
                      width='10'
                      height='7'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M1 6l4-4 4 4'
                        stroke={upvote === feedback.id ? "white" : "#4661E6"}
                        strokeWidth='2'
                        fill='none'
                        fillRule='evenodd'
                      />
                    </svg>
                  </section>
                  <h4 className='group-focus:text-white text-dark-indigo'>
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
                  <h5 className='text-sm text-dark-indigo '>
                    {"comments" in feedback
                      ? Object.keys(feedback.comments).length
                      : 0}
                  </h5>
                </article>
              </article>
            </motion.section>
          )
        );
      })}
    </section>
  );
};

export default StatusFeedback;
