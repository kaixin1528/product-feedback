import ReturnButton from "../components/ReturnButton";
import { GetStaticProps } from "next";
import StatusButton from "../components/StatusButton";
import StatusFeedback from "../components/StatusFeedback";
import { useState } from "react";
import { url } from "../lib/Constant";
import data from "../data.json";

const Roadmap = ({ feedback }) => {
  const [status, setStatus] = useState("in-progress");
  const productRequests: any[] = feedback["productRequests"];

  return (
    <main className='grid bg-rice-white d:pb-10'>
      <header className='grid grid-cols-2 p-6 t:px-12 t:py-8 d:mx-40 d:mt-10 d:rounded-lg bg-dark-indigo'>
        <section className='grid text-white gap-1'>
          <ReturnButton arrowColor='#F2F4FF' textColor='text-white' />
          <h3 className='text-xl font-bold'>Roadmap</h3>
        </section>
      </header>
      {/* <section className='t:hidden grid grid-cols-3 pt-5 text-sm text-black text-opacity-30 border-b justify-items-center'>
        <StatusButton
          productRequests={productRequests}
          status='planned'
          onStatus={() => setStatus("planned")}
          focusColor='#F49F85'
        />
        <StatusButton
          productRequests={productRequests}
          status='in-progress'
          onStatus={() => setStatus("in-progress")}
          focusColor='#AD1FEA'
        />
        <StatusButton
          productRequests={productRequests}
          status='live'
          onStatus={() => setStatus("live")}
          focusColor='#62BCFA'
        />
      </section> */}
      <section className='grid t:grid-cols-3 t:items-start t:px-10 d:mx-28 bg-rice-white'>
        <StatusFeedback
          productRequests={productRequests}
          status={status}
          currentStatus='planned'
          description='Features currently being planned'
          borderColor='orange'
        />
        <StatusFeedback
          productRequests={productRequests}
          status={status}
          currentStatus='in-progress'
          description='Features currently being developed'
          borderColor='purple'
        />
        <StatusFeedback
          productRequests={productRequests}
          status={status}
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
  // const res = await fetch(`${url}/api`);
  // const feedback = await res.json();
  const feedback = data;

  return {
    props: {
      feedback,
    },
  };
};
