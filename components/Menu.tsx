import { motion } from "framer-motion";
import Link from "next/link";

const Menu = ({
  productRequests,
  filter,
  onFilter,
  onOpenMenu,
}: {
  productRequests: any[];
  filter: string;
  onFilter: Function;
  onOpenMenu: Function;
}) => {
  return (
    <aside className='min-h-screen p-6 ml-[7.5rem] gap-5 bg-rice-white'>
      <nav className='grid grid-cols-3 text-xs p-5 mb-5 gap-3 text-ocean-blue bg-white rounded-lg'>
        <motion.button
          id=''
          className={`p-2 hover:bg-hover focus:text-white ${
            filter === ""
              ? "bg-ocean-blue text-white"
              : "bg-moderate-rice-white"
          } font-semibold rounded-xl`}
          onClick={(e) => {
            onFilter(e.currentTarget.id);
            onOpenMenu();
          }}
        >
          All
        </motion.button>
        <motion.button
          id='ui'
          className={`p-2 hover:bg-hover focus:text-white ${
            filter === "ui"
              ? "bg-ocean-blue text-white"
              : "bg-moderate-rice-white"
          } font-semibold rounded-xl`}
          onClick={(e) => {
            onFilter(e.currentTarget.id);
            onOpenMenu();
          }}
        >
          UI
        </motion.button>
        <motion.button
          id='ux'
          className={`p-2 hover:bg-hover focus:text-white ${
            filter === "ux"
              ? "bg-ocean-blue text-white"
              : "bg-moderate-rice-white"
          } font-semibold rounded-xl`}
          onClick={(e) => {
            onFilter(e.currentTarget.id);
            onOpenMenu();
          }}
        >
          UX
        </motion.button>
        <motion.button
          id='enhancement'
          className={`col-span-2 p-2 hover:bg-hover focus:text-white ${
            filter === "enhancement"
              ? "bg-ocean-blue text-white"
              : "bg-moderate-rice-white"
          } font-semibold rounded-xl`}
          onClick={(e) => {
            onFilter(e.currentTarget.id);
            onOpenMenu();
          }}
        >
          Enhancement
        </motion.button>
        <motion.button
          id='bug'
          className={`p-2 hover:bg-hover focus:text-white ${
            filter === "bug"
              ? "bg-ocean-blue text-white"
              : "bg-moderate-rice-white"
          } font-semibold rounded-xl`}
          onClick={(e) => {
            onFilter(e.currentTarget.id);
            onOpenMenu();
          }}
        >
          Bug
        </motion.button>
        <motion.button
          id='feature'
          className={`p-2 hover:bg-hover focus:text-white ${
            filter === "feature"
              ? "bg-ocean-blue text-white"
              : "bg-moderate-rice-white"
          } font-semibold rounded-xl`}
          onClick={(e) => {
            onFilter(e.currentTarget.id);
            onOpenMenu();
          }}
        >
          Feature
        </motion.button>
      </nav>
      <section className='grid p-5 gap-6 bg-white rounded-lg'>
        <nav className='grid grid-cols-2 items-center'>
          <h3 className='text-lg text-dark-indigo font-bold'>Roadmap</h3>
          <Link href='/roadmap' passHref>
            <button className='text-xs text-ocean-blue font-medium underline justify-self-end'>
              View
            </button>
          </Link>
        </nav>
        <article className='grid gap-2 text-sm'>
          <article className='grid grid-cols-8 gap-2 items-center'>
            <div className='h-2.5 w-2.5 bg-orange rounded-full'></div>
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
            <div className='h-2.5 w-2.5 bg-purple rounded-full'></div>
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
            <div className='h-2.5 w-2.5 bg-cyan rounded-full'></div>
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

export default Menu;
