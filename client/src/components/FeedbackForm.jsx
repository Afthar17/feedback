import { useEffect } from "react";
import { useFeedbackStore } from "../store/useFeedbackStore";
import StarInput from "./StarInput";
import CustomSelect from "./CustomSelect";
import RadioInput from "./RadioInput";

const FeedbackForm = () => {
  const {
    feedback,
    setField,
    fetchLatestFeedback,
    submitFeedback,
    loading,
    error,
    success,
  } = useFeedbackStore();

  useEffect(() => {
    fetchLatestFeedback();
  }, [fetchLatestFeedback]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitFeedback();
  };

  return (
    <div className="max-w-sm min-w-xs md:min-w-md md:max-w-xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl px-6 py-8 w-full"
      >
        {error && (
          <p className="mb-3 text-center text-sm text-red-500">{error}</p>
        )}
        {success && (
          <p className="mb-3 text-center text-sm text-green-600">
            Feedback submitted successfully
          </p>
        )}

        <div className="flex flex-col items-center justify-center mb-4">
          <h1 className="text-xl font-bold mb-3">
            How often do you visit here?
          </h1>
          <CustomSelect />
        </div>

        <StarInput
          label="QUALITY OF THE FOOD"
          value={feedback.foodQuality}
          onChange={(val) => setField("foodQuality", val)}
        />

        <StarInput
          label="SERVICE QUALITY"
          value={feedback.serviceQuality}
          onChange={(val) => setField("serviceQuality", val)}
        />

        <StarInput
          label="OVERALL EXPERIENCE"
          value={feedback.overallExperience}
          onChange={(val) => setField("overallExperience", val)}
        />

        <div className="flex flex-col items-center justify-center mb-4">
          <h1 className="text-xl font-bold mb-3">
            Would you recommend our restaurant to others?
          </h1>
          <RadioInput
            value={feedback.wouldRecommend}
            onChange={(val) => setField("wouldRecommend", val)}
          />
        </div>

        <div className="flex flex-col items-center justify-center mb-4">
          <h1 className="text-xl font-bold mb-3">
            Your suggestions to improve
          </h1>

          <textarea
            rows={6}
            className="w-full border rounded-lg p-3 text-sm"
            value={feedback.suggestions}
            onChange={(e) => setField("suggestions", e.target.value)}
          ></textarea>

          <label className="flex items-center gap-2 mt-3 text-sm w-full font-medium">
            <input
              type="checkbox"
              checked={feedback.followUp}
              onChange={(e) => setField("followUp", e.target.checked)}
              className="w-4 h-4"
            />
            <span className="uppercase font-bold text-sm">
              Receive personal follow up to your feedback
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full bg-red-500 uppercase text-white rounded-lg py-2.5 text-sm font-medium disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
