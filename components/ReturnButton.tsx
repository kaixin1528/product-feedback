import Link from "next/link";

const ReturnButton = ({
  arrowColor,
  textColor,
}: {
  arrowColor: string;
  textColor: string;
}) => {
  return (
    <Link href='/' passHref>
      <button className='grid grid-flow-col auto-cols-max items-center hover:underline gap-4'>
        <svg width='7' height='10' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M6 9L2 5l4-4'
            stroke={arrowColor}
            strokeWidth='2'
            fill='none'
            fillRule='evenodd'
          />
        </svg>
        <h5 className={`text-sm ${textColor} font-bold`}>Go Back</h5>
      </button>
    </Link>
  );
};

export default ReturnButton;
