import bannerImg from "../assets/banner.png";
import home from "../assets/home.jpg";
import FeedbackForm from "../components/FeedbackForm";

const HomePage = () => {
  return (
    <div className="flex flex-col mx-2 md:mx-20 items-center justify-center mt-5 min-h-screen">
      <img src={bannerImg} alt="banner logo" className="object-contain mb-4" />
      <img src={home} alt="" className="object-contain max-h-[350px] mb-4" />
      <h1 className="text-2xl font-bold uppercase mb-3">
        Hello, Thanks for Visiting
      </h1>
      <h3 className="text-sm text-slate-800 text-center mb-3">
        Please help us improve our cafe services by filling in our feedback
        form. Thank you!
      </h3>
      {/* form */}
      <FeedbackForm />
    </div>
  );
};

export default HomePage;
