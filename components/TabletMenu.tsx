import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const TabletMenu = ({
  productRequests,
  filter,
  onFilter,
}: {
  productRequests: any[];
  filter: string;
  onFilter: Function;
}) => {
  const filterVariants = {
    hidden: { backgroundColor: "#F2F4FF" },
    visible: {
      backgroundColor: "#4661E6",
      color: "white",
      transition: { duration: 0.2 },
    },
  };

  return (
    <aside className='hidden t:grid t:col-span-2 t:grid-cols-2 d:grid-cols-1 d:col-span-1 t:p-0 t:ml-0 t:gap-3 d:gap-6 bg-rice-white'>
      <AnimatePresence exitBeforeEnter>
        <motion.nav className='grid grid-cols-3 text-xs p-5 d:px-8 gap-3 text-ocean-blue bg-white rounded-lg'>
          <motion.button
            variants={filterVariants}
            whileFocus='visible'
            whileHover={{ backgroundColor: "#CFD7FF" }}
            name='all'
            id=''
            className={`p-2 ${
              filter === ""
                ? "bg-ocean-blue text-white"
                : "bg-moderate-rice-white"
            } font-semibold rounded-xl`}
            onClick={(e) => onFilter(e.currentTarget.id)}
          >
            All
          </motion.button>
          <motion.button
            variants={filterVariants}
            whileFocus='visible'
            whileHover={{ backgroundColor: "#CFD7FF" }}
            name='ui'
            id='ui'
            className='p-2 bg-moderate-rice-white font-semibold rounded-xl'
            onClick={(e) => onFilter(e.currentTarget.id)}
          >
            UI
          </motion.button>
          <motion.button
            variants={filterVariants}
            whileFocus='visible'
            whileHover={{ backgroundColor: "#CFD7FF" }}
            name='ux'
            id='ux'
            className='p-2 bg-moderate-rice-white font-semibold rounded-xl'
            onClick={(e) => onFilter(e.currentTarget.id)}
          >
            UX
          </motion.button>
          <motion.button
            variants={filterVariants}
            whileFocus='visible'
            whileHover={{ backgroundColor: "#CFD7FF" }}
            name='enhancement'
            id='enhancement'
            className='col-span-2 p-2 bg-moderate-rice-white font-semibold rounded-xl'
            onClick={(e) => onFilter(e.currentTarget.id)}
          >
            Enhancement
          </motion.button>
          <motion.button
            variants={filterVariants}
            whileFocus='visible'
            whileHover={{ backgroundColor: "#CFD7FF" }}
            name='bug'
            id='bug'
            className='p-2 bg-moderate-rice-white font-semibold rounded-xl'
            onClick={(e) => onFilter(e.currentTarget.id)}
          >
            Bug
          </motion.button>
          <motion.button
            variants={filterVariants}
            whileFocus='visible'
            whileHover={{ backgroundColor: "#CFD7FF" }}
            name='feature'
            id='feature'
            className='col-span-2 p-2 px-4 justify-self-start bg-moderate-rice-white font-semibold rounded-xl'
            onClick={(e) => onFilter(e.currentTarget.id)}
          >
            Feature
          </motion.button>
        </motion.nav>
      </AnimatePresence>
      <section className='grid p-5 d:px-8 gap-6 bg-white rounded-lg'>
        <nav className='grid grid-cols-2 items-center'>
          <h3 className='text-lg text-dark-indigo font-bold'>Roadmap</h3>
          <Link href='/roadmap' passHref>
            <motion.button
              whileHover={{ opacity: 0.5 }}
              className='text-xs text-ocean-blue font-medium underline justify-self-end'
            >
              View
            </motion.button>
          </Link>
        </nav>
        <article className='grid gap-2 text-sm'>
          <article className='grid grid-cols-8 gap-2 items-center'>
            <section className='h-2.5 w-2.5 bg-orange rounded-full'></section>
            <h4 className='col-span-6 capitalize text-indigo font-light'>
              Planned
            </h4>
            <h4 className='text-dark-grey-blue font-bold'>
              {
                productRequests.filter(
                  (feedback) => feedback.status === "planned"
                ).length
              }
            </h4>
          </article>
          <article className='grid grid-cols-8 gap-2 items-center'>
            <section className='h-2.5 w-2.5 bg-purple rounded-full'></section>
            <h4 className='col-span-6 capitalize text-indigo font-light'>
              In-Progress
            </h4>
            <h4 className='text-dark-grey-blue font-bold'>
              {
                productRequests.filter(
                  (feedback) => feedback.status === "in-progress"
                ).length
              }
            </h4>
          </article>
          <article className='grid grid-cols-8 gap-2 items-center'>
            <section className='h-2.5 w-2.5 bg-cyan rounded-full'></section>
            <h4 className='col-span-6 capitalize text-indigo font-light'>
              Live
            </h4>
            <h4 className='text-dark-grey-blue font-bold'>
              {
                productRequests.filter((feedback) => feedback.status === "live")
                  .length
              }
            </h4>
          </article>
        </article>
      </section>
    </aside>
  );
};

export default TabletMenu;
