import ReturnButton from "../components/ReturnButton";
import { useState } from "react";
import icon from "../public/assets/shared/icon-new-feedback.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Link from "next/link";
import { url } from "../lib/Constant";

const NewFeedback = ({}) => {
  const router = useRouter();
  const filter: string | string[] =
    router.query.filter === "" ? "feature" : router.query.filter;
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(filter);
  const [detail, setDetail] = useState("");
  const [openCategory, setOpenCategory] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    fetch(`${url}/api`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        category: category,
        upvotes: 0,
        status: "suggestion",
        description: detail,
      }),
    })
      .then((res) => res.json())
      .then(() => router.push("/"));
  };

  const sortVariants = {
    up: { rotate: 180 },
    down: { rotate: 0 },
  };

  return (
    <main className='grid px-6 t:px-32 t:py-20 d:px-96 py-10 gap-16 bg-rice-white'>
      <ReturnButton arrowColor='#4661E6' textColor='text-indigo' />
      <form
        onSubmit={handleSubmit}
        className='grid p-6 mb-16 gap-8 t:px-10 d:px-12 text-sm t:text-base bg-white rounded-xl'
      >
        <motion.section
          initial={{ y: -50 }}
          animate={{
            y: 0,
            transition: { type: "spring", duration: 1.5, stiffness: 200 },
          }}
          className='-mt-12'
        >
          <Image src={icon} alt='icon'></Image>
        </motion.section>
        <h2 className='text-lg t:text-2xl text-dark-indigo font-bold'>
          Create New Feedback
        </h2>
        <section className='grid gap-4 text-sm'>
          <article className='grid gap-1'>
            <h4 className='text-base text-dark-indigo font-bold'>
              Feedback Title
            </h4>
            <p className='text-dark-grey-blue font-light'>
              Add a short, descriptive headline
            </p>
          </article>
          <textarea
            name='title'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='text-dark-indigo font-light px-5 py-3 h-12 resize-none focus:outline-none focus:ring-1 focus:ring-blue-700 bg-rice-white rounded-lg'
          ></textarea>
        </section>
        <article className='grid gap-4 text-sm'>
          <article className='grid gap-1'>
            <h4 className='text-base text-dark-indigo font-bold'>Category</h4>
            <p className='text-dark-grey-blue font-light'>
              Choose a category for your feedback
            </p>
          </article>
          <section className='grid'>
            <button
              type='button'
              name='title'
              id='title'
              className='grid grid-cols-2 px-5 py-3 h-12 justify-items-start items-center resize-none focus:outline-none focus:ring-1 focus:ring-blue-700  bg-rice-white rounded-lg'
              onClick={() => {
                setOpenCategory(!openCategory);
              }}
            >
              <p
                className={`${
                  category === "ui" || category === "ux"
                    ? "uppercase"
                    : "capitalize"
                } text-indigo`}
              >
                {category}
              </p>
              <motion.svg
                variants={sortVariants}
                animate={openCategory ? "up" : "down"}
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
              </motion.svg>
            </button>
            {openCategory && (
              <article className='grid sectionide-y mt-3 -mb-[16rem] z-10 text-indigo bg-white rounded-lg shadow-xl'>
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
          </section>
        </article>
        <article className='grid gap-4 text-sm'>
          <article className='grid gap-1'>
            <h4 className='text-base text-dark-indigo font-bold'>
              Feedback Detail
            </h4>
            <p className='text-dark-grey-blue font-light'>
              Include any specific comments on what should be improved, added,
              etc.
            </p>
          </article>
          <textarea
            name='detail'
            id='detail'
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            className='text-dark-indigo font-light gap-7 p-5 h-36 resize-none focus:outline-none focus:ring-1 focus:ring-blue-700 bg-rice-white rounded-lg'
          ></textarea>
        </article>
        <footer className='grid text-xs t:grid-cols-4 t:justify-content-end t:gap-0 mt-3 gap-3'>
          <motion.button
            whileHover={{ opacity: 0.5, transition: { duration: 0.2 } }}
            type='submit'
            className='grid t:order-last py-3 text-white font-bold bg-purple rounded-xl'
          >
            Add Feedback
          </motion.button>
          <Link href='/' passHref>
            <motion.button
              whileHover={{ opacity: 0.5, transition: { duration: 0.2 } }}
              type='button'
              className='grid t:col-start-3 t:mx-auto t:px-8 py-3 text-white font-bold bg-dark-indigo rounded-xl'
            >
              Cancel
            </motion.button>
          </Link>
        </footer>
      </form>
    </main>
  );
};

export default NewFeedback;
