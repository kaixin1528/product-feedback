import ReturnButton from "../../../components/ReturnButton";
import icon from "../../../public/assets/shared/icon-edit-feedback.svg";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Link from "next/link";

const EditFeedback = () => {
  const router = useRouter();

  const id = router.query.id;
  const [title, setTitle] = useState(router.query.title);
  const [category, setCategory] = useState(router.query.category);
  const [upvotes, setUpvotes] = useState(router.query.upvotes);
  const [status, setStatus] = useState(router.query.status);
  const [detail, setDetail] = useState(router.query.detail);
  const [openCategory, setOpenCategory] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);

  const [action, setAction] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(action);

    if (action === "save") {
      fetch(`http://localhost:3000/api/feedback/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          title: title,
          category: category,
          upvotes: upvotes,
          status: status,
          description: detail,
        }),
      })
        .then((res) => res.json())
        .then(() => router.push(`http://localhost:3000/feedback/${id}`));
    } else if (action === "delete") {
      const url = ["planned", "in-progress", "live"].includes(status.toString())
        ? "http://localhost:3000/roadmap"
        : "http://localhost:3000";
      fetch(`http://localhost:3000/api/feedback/${id}`, {
        method: "DELETE",
      })
        .then(() => router.push(url))
        .then(() => window.location.reload());
    }
  };

  return (
    <main className='grid px-6 py-10 t:px-32 t:py-20 d:px-96 gap-16 bg-rice-white'>
      <ReturnButton arrowColor='#4661E6' textColor='text-indigo' />
      <form
        className='grid p-6 mb-12 gap-8 t:px-10 d:px-12 text-sm bg-white rounded-xl'
        onSubmit={handleSubmit}
      >
        <motion.section
          initial={{ y: -50 }}
          animate={{
            y: 0,
            transition: { type: "spring", duration: 1.5, stiffness: 200 },
          }}
          className='-mt-11'
        >
          <Image src={icon} alt='icon' width={60} height={60}></Image>
        </motion.section>
        <h2 className='text-lg t:text-2xl t:pb-12 text-dark-indigo font-bold'>
          Editing &apos;{title}&apos;
        </h2>
        <article className='grid gap-4'>
          <section className='grid gap-1'>
            <h4 className=' text-dark-indigo font-bold'>Feedback Title</h4>
            <p className='text-dark-grey-blue font-light'>
              Add a short, descriptive headline
            </p>
          </section>
          <textarea
            name='title'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='text-dark-indigo font-light px-5 py-3 h-12 resize-none focus:outline-none focus:ring-1 focus:ring-blue-700 bg-rice-white rounded-lg'
          ></textarea>
        </article>
        <article className='grid gap-4'>
          <article className='grid gap-1'>
            <h4 className='text-dark-indigo font-bold'>Category</h4>
            <p className='text-dark-grey-blue font-light'>
              Choose a category for your feedback
            </p>
          </article>
          <button
            type='button'
            name='title'
            id='title'
            className='grid grid-cols-2 px-5 py-3 h-12 justify-items-start items-center resize-none focus:outline-none focus:ring-1 focus:ring-blue-700 bg-rice-white rounded-lg'
            onClick={() => {
              setOpenCategory(!openCategory);
            }}
          >
            <p className='capitalize text-indigo'>{category}</p>
            <svg
              className='justify-self-end'
              width='10'
              height='7'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M1 1l4 4 4-4'
                stroke='#4661E6'
                strokeWidth='2'
                fill='none'
                fillRule='evenodd'
              />
            </svg>
          </button>
          {openCategory && (
            <article className='grid sectionide-y -mb-[14rem] z-10 text-indigo bg-white rounded-lg shadow-xl'>
              <button
                type='button'
                className='py-3 pr-10 pl-5 text-left font-light hover:text-purple'
                onClick={() => {
                  setCategory("Feature");
                  setOpenCategory(!openCategory);
                }}
              >
                Feature
              </button>
              <button
                type='button'
                className='py-3 pr-10 pl-5 text-left font-light hover:text-purple'
                onClick={() => {
                  setCategory("UI");
                  setOpenCategory(!openCategory);
                }}
              >
                UI
              </button>
              <button
                type='button'
                className='py-3 pr-10 pl-5 text-left font-light hover:text-purple'
                onClick={() => {
                  setCategory("UX");
                  setOpenCategory(!openCategory);
                }}
              >
                UX
              </button>
              <button
                type='button'
                className='py-3 pr-10 pl-5 text-left font-light hover:text-purple'
                onClick={() => {
                  setCategory("Enhancement");
                  setOpenCategory(!openCategory);
                }}
              >
                Enhancement
              </button>
              <button
                type='button'
                className='py-3 pr-10 pl-5 text-left font-light hover:text-purple'
                onClick={() => {
                  setCategory("Bug");
                  setOpenCategory(!openCategory);
                }}
              >
                Bug
              </button>
            </article>
          )}
        </article>
        <article className='grid gap-4'>
          <article className='grid gap-1'>
            <h4 className='text-dark-indigo font-bold'>Update Status</h4>
            <p className='text-dark-grey-blue font-light'>
              Change feature state
            </p>
          </article>
          <button
            type='button'
            name='title'
            id='title'
            className='grid grid-cols-2 px-5 py-3 h-12 justify-items-start items-center resize-none focus:outline-none focus:ring-1 focus:ring-blue-700 bg-rice-white rounded-lg'
            onClick={() => {
              setOpenStatus(!openStatus);
            }}
          >
            <p className='capitalize text-indigo'>{status}</p>
            <svg
              className='justify-self-end'
              width='10'
              height='7'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M1 1l4 4 4-4'
                stroke='#4661E6'
                strokeWidth='2'
                fill='none'
                fillRule='evenodd'
              />
            </svg>
          </button>
          {openStatus && (
            <article className='grid sectionide-y -mb-[14rem] z-10 text-indigo bg-white rounded-lg shadow-xl'>
              <button
                type='button'
                className='py-3 pr-10 pl-5 text-left font-light hover:text-purple'
                onClick={() => {
                  setStatus("suggestion");
                  setOpenStatus(!openStatus);
                }}
              >
                Suggestion
              </button>
              <button
                type='button'
                className='py-3 pr-10 pl-5 text-left font-light hover:text-purple'
                onClick={() => {
                  setStatus("planned");
                  setOpenStatus(!openStatus);
                }}
              >
                Planned
              </button>
              <button
                type='button'
                className='py-3 pr-10 pl-5 text-left font-light hover:text-purple'
                onClick={() => {
                  setStatus("in-progress");
                  setOpenStatus(!openStatus);
                }}
              >
                In-Progress
              </button>
              <button
                type='button'
                className='py-3 pr-10 pl-5 text-left font-light hover:text-purple'
                onClick={() => {
                  setStatus("live");
                  setOpenStatus(!openStatus);
                }}
              >
                Live
              </button>
            </article>
          )}
        </article>
        <article className='grid gap-4'>
          <article className='grid gap-1'>
            <h4 className='text-dark-indigo font-bold'>Feedback Detail</h4>
            <p className='text-dark-grey-blue font-light'>
              Include any specific comments on what should be improved, added,
              etc.
            </p>
          </article>
          <textarea
            name='title'
            id='title'
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            className='text-dark-indigo font-light p-5 h-36 resize-none focus:outline-none focus:ring-1 focus:ring-blue-700 bg-rice-white rounded-lg'
          ></textarea>
        </article>
        <footer className='grid t:grid-cols-4 mt-3 gap-3 text-xs'>
          <motion.button
            whileHover={{ opacity: 0.5, transition: { duration: 0.2 } }}
            type='submit'
            className='grid t:order-last py-3 text-white font-bold bg-purple rounded-xl'
            onClick={() => setAction("save")}
          >
            Save Changes
          </motion.button>
          <Link href={`/feedback/${id}`} passHref>
            <motion.button
              whileHover={{ opacity: 0.5, transition: { duration: 0.2 } }}
              type='reset'
              className='grid t:col-start-3 py-3 text-white font-bold bg-dark-indigo rounded-xl'
            >
              Cancel
            </motion.button>
          </Link>
          <motion.button
            whileHover={{ opacity: 0.5, transition: { duration: 0.2 } }}
            type='submit'
            className='grid t:order-first py-3 text-white font-bold bg-red rounded-xl'
            onClick={() => setAction("delete")}
          >
            Delete
          </motion.button>
        </footer>
      </form>
    </main>
  );
};

export default EditFeedback;
