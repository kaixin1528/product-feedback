import ReturnButton from "../../../components/ReturnButton";
import Image from "next/image";
import { GetServerSideProps } from "next";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";
import { url, FeedbackData, Comment } from "../../../lib/Constant";

const Index = ({
  currentFeedback,
  id,
}: {
  currentFeedback: FeedbackData;
  id: string;
}) => {
  const router = useRouter();
  const comments: Comment[] = currentFeedback.comments;
  let totalReplies: number = 0;
  const totalComments = () => {
    if (comments) {
      comments.map((comment: any) => {
        if (comment.replies) totalReplies += comment.replies.length;
      });
      totalReplies += comments.length;
    }
  };
  totalComments();

  const [reply, setReply] = useState<number>(-1);
  const [replyContent, setReplyContent] = useState<string>("");
  const [commentId, setCommentId] = useState<number>(-1);
  const [replyToId, setReplyToId] = useState<number>(-1);
  const [charactersLeft, setCharactersLeft] = useState<number>(250);
  const [myComment, setMyComment] = useState<string>("");

  const handleUpvote = async (
    e: React.MouseEvent<HTMLButtonElement>,
    upvotes: number,
    id: number,
    upvoted: boolean
  ) => {
    e.preventDefault();

    await fetch(`/api`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        upvotes: upvoted ? upvotes - 1 : upvotes + 1,
        upvoted: !upvoted,
      }),
    });
    window.location.reload();
  };

  const handleAddComment = async () => {
    await fetch(`/api/feedback/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: myComment,
        user: {
          image: "/assets/user-images/image-zena.jpg",
          name: "Zena Kelley",
          username: "velvetround",
        },
      }),
    });
  };

  const handleAddReply = async () => {
    await fetch(`/api/feedback/${id}/reply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: commentId,
        reply: {
          content: replyContent,
          user: {
            image: "/assets/user-images/image-zena.jpg",
            name: "Zena Kelley",
            username: "velvetround",
          },
        },
      }),
    });
  };

  const handleAddAdditionalReply = async () => {
    await fetch(`/api/feedback/${id}/reply`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: commentId,
        replyToId: replyToId,
        reply: {
          content: replyContent,
          user: {
            image: "/assets/user-images/image-zena.jpg",
            name: "Zena Kelley",
            username: "velvetround",
          },
        },
      }),
    });
  };

  return (
    <main className='grid px-6 py-8 t:py-12 t:px-40 lg:px-80 d:px-96 d:py-16 gap-6 bg-rice-white'>
      <header className='grid grid-cols-2'>
        <ReturnButton arrowColor='#4661E6' textColor='text-indigo' />
        <motion.button
          whileHover={{ opacity: 0.5, transition: { duration: 0.2 } }}
          className='py-3 px-4 text-xs text-white font-bold justify-self-end bg-ocean-blue rounded-lg'
          onClick={() =>
            router.push(
              {
                pathname: `/feedback/${id}/edit-feedback`,
                query: {
                  id: id,
                  title: currentFeedback.title,
                  category: currentFeedback.category,
                  upvotes: currentFeedback.upvotes,
                  status: currentFeedback.status,
                  detail: currentFeedback.description,
                },
              },
              `/feedback/${id}/edit-feedback`
            )
          }
        >
          Edit Feedback
        </motion.button>
      </header>
      <section className='grid t:flex p-8 gap-4 d:gap-10 text-sm text-left bg-white rounded-lg'>
        <motion.button
          whileHover={{ backgroundColor: "#CFD7FF" }}
          className={`group ${
            currentFeedback.upvoted
              ? "bg-ocean-blue text-white"
              : "bg-moderate-rice-white"
          } hidden t:grid t:grid-flow-row t:justify-items-center t:px-3 items-center t:self-start py-2 px-5 gap-1 font-bold rounded-xl justify-self-start`}
          onClick={(e) =>
            handleUpvote(
              e,
              currentFeedback.upvotes,
              currentFeedback.id,
              currentFeedback.upvoted
            )
          }
        >
          <svg width='10' height='7' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M1 6l4-4 4 4'
              stroke={currentFeedback.upvoted ? "white" : "#4661E6"}
              strokeWidth='2'
              fill='none'
              fillRule='evenodd'
            />
          </svg>
          <h4
            className={`${
              currentFeedback.upvoted ? "text-white" : "text-dark-indigo"
            }`}
          >
            {currentFeedback.upvotes}
          </h4>
        </motion.button>
        <article className='grow gap-2'>
          <h3 className='text-base t:text-lg text-dark-indigo font-bold'>
            {currentFeedback.title}
          </h3>
          <article className='grid gap-3'>
            <p className='text-dark-grey-blue font-light'>
              {currentFeedback.description}
            </p>
            <h4 className='capitalize text-xs py-2 px-4 text-ocean-blue font-bold bg-moderate-rice-white rounded-xl justify-self-start'>
              {currentFeedback.category}
            </h4>
          </article>
        </article>
        <article className='grid grid-cols-2 t:grid-cols-1 text-sm'>
          <motion.button
            whileHover={{ backgroundColor: "#CFD7FF" }}
            className={`group ${
              currentFeedback.upvoted
                ? "bg-ocean-blue text-white"
                : "bg-moderate-rice-white"
            }  t:hidden flex items-center py-2 px-3 gap-2 font-bold rounded-xl justify-self-start`}
            onClick={(e) =>
              handleUpvote(
                e,
                currentFeedback.upvotes,
                currentFeedback.id,
                currentFeedback.upvoted
              )
            }
          >
            <svg width='10' height='7' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M1 6l4-4 4 4'
                stroke={currentFeedback.upvoted ? "white" : "#4661E6"}
                strokeWidth='2'
                fill='none'
                fillRule='evenodd'
              />
            </svg>
            <h4
              className={`${
                currentFeedback.upvoted ? "text-white" : "text-dark-indigo"
              }`}
            >
              {currentFeedback.upvotes}
            </h4>
          </motion.button>
          <article className='grid grid-flow-col auto-cols-max items-center py-2 px-5 gap-2 font-bold justify-self-end'>
            <svg width='18' height='16' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M2.62 16H1.346l.902-.91c.486-.491.79-1.13.872-1.823C1.036 11.887 0 9.89 0 7.794 0 3.928 3.52 0 9.03 0 14.87 0 18 3.615 18 7.455c0 3.866-3.164 7.478-8.97 7.478-1.017 0-2.078-.137-3.025-.388A4.705 4.705 0 012.62 16z'
                fill='#CDD2EE'
                fillRule='nonzero'
              />
            </svg>
            <h4 className='text-dark-indigo'>{comments ? totalReplies : 0}</h4>
          </article>
        </article>
      </section>
      {/* Comments */}
      <article className='grid px-6 pt-8 pb-4 t:px-12 gap-2 bg-white rounded-lg'>
        <h3 className='t:text-lg text-dark-indigo font-bold'>
          {comments ? totalReplies : 0}{" "}
          {!comments || totalReplies <= 1 ? "Comment" : "Comments"}
        </h3>
        <ul className='grid divide-y'>
          {comments?.map((comment, index: number) => {
            return (
              <li key={index} className='grid text-sm gap-2 t:gap-0 py-5'>
                <header className='grid grid-cols-6 items-center gap-4'>
                  <div className=''>
                    <Image
                      src={comment.user.image}
                      alt='user'
                      width={70}
                      height={70}
                      className='rounded-full'
                    ></Image>
                  </div>
                  <article className='grid col-span-4 justify-self-start'>
                    <h4 className='text-dark-indigo font-bold'>
                      {comment.user.name}
                    </h4>
                    <h4 className='text-dark-grey-blue font-light'>
                      @{comment.user.username}
                    </h4>
                  </article>
                  <button
                    type='button'
                    className='text-ocean-blue font-semibold hover:underline justify-self-end'
                    onClick={() => {
                      setReply(comment.id);
                    }}
                  >
                    Reply
                  </button>
                </header>
                <article className='grid t:grid-cols-6'>
                  <h4 className='leading-6 col-span-6 pb-5 t:col-start-2 text-dark-grey-blue font-light'>
                    {comment.content}
                  </h4>
                  {reply === comment.id && (
                    <form
                      className='grid col-span-6 t:col-start-2 grid-cols-8 items-start pb-4 gap-3 bg-white rounded-lg'
                      onSubmit={handleAddReply}
                    >
                      <textarea
                        placeholder='Type your comment here'
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        className='col-span-6 text-dark-indigo font-light p-4 h-20 focus:outline-none focus:ring-1 focus:ring-blue-700 placeholder:text-gray-400 placeholder:text-sm resize-none bg-rice-white rounded-lg'
                      ></textarea>
                      <button
                        type='submit'
                        className='col-span-2 px-2 py-3 t:px-5 text-white text-xs font-semibold bg-purple rounded-xl justify-self-start'
                        onClick={() => setCommentId(comment.id)}
                      >
                        Post Reply
                      </button>
                    </form>
                  )}
                  {/* replies */}
                  {comment.replies && (
                    <ul className='grid col-span-6 col-start-2 border-l pl-5 text-sm gap-2 t:gap-0 py-5'>
                      {comment.replies?.map((currentReply, idx: number) => {
                        return (
                          <li key={idx}>
                            <header className='flex items-center gap-4'>
                              <div className='h-12 w-12 t:h-16 t:w-16'>
                                <Image
                                  src={currentReply.user.image}
                                  alt='James'
                                  width={100}
                                  height={100}
                                  className='rounded-full'
                                ></Image>
                              </div>
                              <article className='grow justify-self-start'>
                                <h4 className='text-dark-indigo font-bold'>
                                  {currentReply.user.name}
                                </h4>
                                <h4 className='text-dark-grey-blue font-light'>
                                  @{currentReply.user.username}
                                </h4>
                              </article>
                              <button
                                type='button'
                                className='text-ocean-blue font-semibold hover:underline justify-self-end'
                                onClick={() => {
                                  setReply(idx);
                                }}
                              >
                                Reply
                              </button>
                            </header>
                            <footer className='grid t:grid-cols-7 d:grid-cols-6 gap-5'>
                              <h4 className='leading-7 col-span-7 t:col-start-2 text-dark-grey-blue font-light'>
                                <span className='text-purple font-bold'>
                                  @{currentReply.replyingTo}
                                </span>
                                &nbsp;&nbsp;
                                {currentReply.content}
                              </h4>
                              {reply === idx && (
                                <form
                                  className='grid col-span-7 t:col-start-2 grid-cols-7 t:grid-cols-8 items-start gap-3 bg-white rounded-lg'
                                  onSubmit={handleAddAdditionalReply}
                                >
                                  <textarea
                                    placeholder='Type your comment here'
                                    value={replyContent}
                                    onChange={(e) =>
                                      setReplyContent(e.target.value)
                                    }
                                    className='col-span-5 t:col-span-6 text-dark-indigo font-light p-4 h-20 focus:outline-none focus:ring-1 focus:ring-blue-700 placeholder:text-gray-400 placeholder:text-sm resize-none bg-rice-white rounded-lg'
                                  ></textarea>
                                  <button
                                    type='submit'
                                    className='col-span-2 t:col-span-2 px-2 py-3 t:px-4 text-white text-xs font-semibold bg-purple rounded-xl justify-self-start'
                                    onClick={() => {
                                      setCommentId(comment.id);
                                      setReplyToId(idx);
                                    }}
                                  >
                                    Post Reply
                                  </button>
                                </form>
                              )}
                            </footer>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </article>
              </li>
            );
          })}
        </ul>
      </article>
      <form
        className='grid px-6 py-8 t:px-12 gap-5 bg-white rounded-lg'
        onSubmit={handleAddComment}
      >
        <h3 className='text-lg text-dark-indigo font-bold'>Add Comment</h3>
        <textarea
          placeholder='Type your comment here'
          value={myComment}
          onChange={(e) => {
            setMyComment(e.target.value);
            setCharactersLeft(250 - e.target.value.length);
          }}
          className='text-dark-indigo font-light p-4 h-28 focus:outline-none focus:ring-1 focus:ring-blue-700 placeholder:text-gray-400 placeholder:text-sm resize-none bg-rice-white rounded-lg'
        ></textarea>
        <footer className='grid grid-cols-2 text-xs items-center'>
          <h5 className='t:text-sm text-dark-grey-blue font-light'>
            {charactersLeft} Characters left
          </h5>
          <button
            type='submit'
            className='px-2 py-3 t:px-5 text-white font-semibold bg-purple rounded-xl justify-self-end'
          >
            Post Comment
          </button>
        </footer>
      </form>
    </main>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params.id;
  const res = await fetch(`${url}/api/feedback/${id}`, {
    method: "GET",
  });
  const currentFeedback = await res.json();

  return {
    props: {
      currentFeedback,
      id,
    },
  };
};
