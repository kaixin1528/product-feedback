import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
const AddFeedbackButton = ({ position, filter }) => {
  const router = useRouter();
  return (
    <motion.button
      whileHover={{ opacity: 0.8, transition: { duration: 0.2 } }}
      className={`${position} text-xs text-white p-3 gap-2 font-semibold bg-purple rounded-xl`}
      onClick={() =>
        router.push(
          {
            pathname: "/create-new-feedback",
            query: { filter: filter },
          },
          "/create-new-feedback"
        )
      }
    >
      + Add Feedback
    </motion.button>
  );
};

export default AddFeedbackButton;
