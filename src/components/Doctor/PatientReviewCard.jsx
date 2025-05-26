import React from "react";
import {
  Star,
  Calendar,
  User,
  MessageSquare,
  ThumbsUp,
  Clock,
} from "lucide-react";

const PatientReviewCard = () => {
  const review = {
    id: 1,
    patientName: "Sarah Johnson",
    patientAge: 34,
    rating: 5,
    date: "2024-05-20",
    reviewText:
      "Dr. Smith was incredibly thorough and took the time to explain my condition in detail. The staff was professional and the office was clean and welcoming. I felt heard and cared for throughout my visit. Highly recommend!",
    appointmentType: "Annual Physical",
    verified: true,
    helpful: 12,
    response: null,
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="p-3 lg:p-6 bg-white rounded-lg shadow-sm lg:shadow-lg border border-gray-200">
      <h2 className="text-[18px] lg:text-[22px] font-semibold text-gray-800 mb-4">
        Patient Review
      </h2>
      {/* Header Section */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="lg:w-12 lg:h-12 p-1 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-gray-900">
                {review.patientName}
              </h3>
              {review.verified && (
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                  Verified Patient
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600">Age: {review.patientAge}</p>
          </div>
        </div>

        <div className="text-right">
          <div className="flex items-center space-x-1 mb-1">
            {renderStars(review.rating)}
            <span className="ml-2 text-sm font-medium text-gray-700">
              {review.rating}.0
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            {formatDate(review.date)}
          </div>
        </div>
      </div>

      {/* Appointment Type */}
      <div className="mb-4">
        <span className="inline-flex items-center bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full">
          <Clock className="w-4 h-4 mr-1" />
          {review.appointmentType}
        </span>
      </div>

      {/* Review Content */}
      <div className="mb-4">
        <div className="bg-gray-50 lg:p-4 rounded-lg">
          <div className="flex items-start space-x-2 mb-2">
            <MessageSquare className="w-5 h-5 text-gray-400 mt-0.5" />
            <p className="text-gray-800 leading-relaxed">{review.reviewText}</p>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-sm text-gray-600">
            <ThumbsUp className="w-4 h-4 mr-1" />
            {review.helpful} found helpful
          </div>
        </div>

        <div className="flex space-x-2">
          <button className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            Reply
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            Mark as Read
          </button>
        </div>
      </div>

      {/* Response Section (if doctor has replied) */}
      {review.response && (
        <div className="mt-4 pl-8 border-l-2 border-blue-200">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-medium">Dr</span>
              </div>
              <span className="text-sm font-medium text-blue-800">
                Dr. Smith replied
              </span>
            </div>
            <p className="text-sm text-gray-700">{review.response}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientReviewCard;
