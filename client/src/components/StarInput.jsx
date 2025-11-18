import { Star } from "lucide-react";

const StarInput = ({ label, value, onChange }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="mb-6 w-full">
      <p className="font-bold text-lg text-center mb-2">{label}</p>

      <div className="flex justify-center gap-5 w-full">
        {stars.map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="focus:outline-none"
          >
            <Star
              size={40}
              className={
                star <= value
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default StarInput;
