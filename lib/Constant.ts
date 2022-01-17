const prod = "https://kaixin-product-feedback.vercel.app";
const dev = "http://localhost:3000";
export const url = process.env.NODE_ENV === "development" ? dev : prod;
