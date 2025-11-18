import { useEffect } from "react";
import { useAdminFeedbackStore } from "../store/useAdminStore.js";
import { Star } from "lucide-react";

const Dashboard = () => {
  const { feedbacks, loading, error, fetchAllFeedbacks } =
    useAdminFeedbackStore();

  useEffect(() => {
    fetchAllFeedbacks();
  }, [fetchAllFeedbacks]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40 text-gray-500">
        Loading feedbacks…
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 font-semibold">{error}</div>
    );
  }

  if (feedbacks.length === 0) {
    return (
      <div className="text-center text-gray-500 text-lg mt-10">
        No feedbacks available.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Customer Feedback Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {feedbacks.map((fb) => (
          <div
            key={fb._id}
            className="bg-white rounded-xl shadow-md p-5 border border-gray-200"
          >
            {/* USER */}
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                <User size={20} />
              </div>
              <div>
                <p className="font-semibold">
                  {fb.user?.name || "Unknown User"}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(fb.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* RATINGS */}
            <div className="space-y-3 mb-5">
              <RatingRow label="Food Quality" value={fb.foodQuality} />
              <RatingRow label="Service Quality" value={fb.serviceQuality} />
              <RatingRow
                label="Overall Experience"
                value={fb.overallExperience}
              />
            </div>

            {/* WOULD RECOMMEND */}
            <div className="flex items-center gap-2 mb-4">
              {fb.wouldRecommend ? (
                <ThumbsUp size={20} className="text-green-600" />
              ) : (
                <ThumbsDown size={20} className="text-red-500" />
              )}

              <p
                className={
                  fb.wouldRecommend
                    ? "text-green-600 font-semibold"
                    : "text-red-500 font-semibold"
                }
              >
                {fb.wouldRecommend ? "Would Recommend" : "Not Recommended"}
              </p>
            </div>

            {/* SUGGESTIONS */}
            <div className="bg-gray-50 rounded-lg p-3 border text-sm">
              <div className="flex items-center gap-2 mb-1">
                <MessageSquare size={16} className="text-gray-600" />
                <p className="font-semibold text-gray-700">Suggestions</p>
              </div>

              <p className="text-gray-600">
                {fb.suggestions?.trim() !== ""
                  ? fb.suggestions
                  : "No suggestions"}
              </p>
            </div>

            {/* FOLLOW UP */}
            <div className="mt-4 text-sm">
              <p
                className={
                  fb.followUp ? "text-blue-600 font-semibold" : "text-gray-500"
                }
              >
                {fb.followUp ? "Requested Follow Up" : "No Follow Up"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const RatingRow = ({ label, value }) => (
  <div className="flex items-center justify-between">
    <p className="text-sm font-medium">{label}</p>
    <div className="flex gap-1">
      {Array.from({ length: value }).map((_, i) => (
        <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
      ))}
    </div>
  </div>
);
export default Dashboard;
