import ReturnButton from "../components/ReturnButton";
import { GetStaticProps } from "next";
import StatusFeedback from "../components/StatusFeedback";
import { url, FeedbackData } from "../lib/Constant";

const Roadmap = ({ feedback }: { feedback: FeedbackData }) => {
  const productRequests: any[] = feedback["productRequests"];

  return (
    <main className='grid bg-rice-white d:pb-10'>
      <header className='grid grid-cols-2 p-6 t:px-12 t:py-8 d:mx-40 d:mt-10 d:rounded-lg bg-dark-indigo'>
        <article className='grid text-white gap-1'>
          <ReturnButton arrowColor='#F2F4FF' textColor='text-white' />
          <h3 className='text-xl font-bold'>Roadmap</h3>
        </article>
      </header>
      <section className='grid t:grid-cols-3 t:items-start t:px-10 d:mx-28 bg-rice-white'>
        <StatusFeedback
          productRequests={productRequests}
          currentStatus='planned'
          description='Features currently being planned'
          borderColor='orange'
        />
        <StatusFeedback
          productRequests={productRequests}
          currentStatus='in-progress'
          description='Features currently being developed'
          borderColor='purple'
        />
        <StatusFeedback
          productRequests={productRequests}
          currentStatus='live'
          description='Features currently being live'
          borderColor='cyan'
        />
      </section>
    </main>
  );
};

export default Roadmap;

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`${url}/api`);
  const feedback = await res.json();

  return {
    props: {
      feedback,
    },
  };
};
