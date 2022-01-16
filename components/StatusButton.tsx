import { motion } from "framer-motion";

const Status = ({ productRequests, status, onStatus, focusColor }) => {
  return (
    <motion.button
      whileFocus={{ borderBottom: `4px solid ${focusColor}` }}
      className='capitalize font-semibold pb-4'
      onClick={onStatus}
    >
      {status} (
      {productRequests.filter((feedback) => feedback.status === status).length})
    </motion.button>
  );
};

export default Status;
