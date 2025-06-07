import React, { useState } from "react";
import { Star, Send, Heart, MessageCircle, Users, Award, CheckCircle, Mail, Phone, MapPin } from 'lucide-react';

// Mock ContactDetails component
const ContactDetails = () => (
  <div className="bg-gradient-to-br from-black via-pink-800 to-black backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 h-fit">
    <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
      <MessageCircle className="w-5 h-5 text-blue-400" />
      Get in Touch
    </h3>
    <div className="space-y-4">
      <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
        <Mail className="w-5 h-5 text-blue-400" />
        <div>
          <p className="text-sm text-gray-400">Email</p>
          <p className="text-white">support@brainn.com</p>
        </div>
      </div>
      <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
        <Phone className="w-5 h-5 text-green-400" />
        <div>
          <p className="text-sm text-gray-400">Phone</p>
          <p className="text-white">+1 (555) 123-4567</p>
        </div>
      </div>
      <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
        <MapPin className="w-5 h-5 text-purple-400" />
        <div>
          <p className="text-sm text-gray-400">Address</p>
          <p className="text-white">123 Learning St, Education City</p>
        </div>
      </div>
    </div>
  </div>
);

// Mock ReviewSlider component
const ReviewSlider = () => {
  const reviews = [
    { name: "Sarah Johnson", rating: 5, comment: "Brainn transformed my learning experience!" },
    { name: "Mike Chen", rating: 5, comment: "Excellent platform with great instructors." },
    { name: "Emma Davis", rating: 4, comment: "Love the interactive courses and community." }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6 w-full">
      {reviews.map((review, index) => (
        <div key={index} className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} />
            ))}
          </div>
          <p className="text-gray-300 text-sm mb-4">{review.comment}</p>
          <p className="text-white font-medium">{review.name}</p>
        </div>
      ))}
    </div>
  );
};

function RateUs() {
  const [errorRating, setErrorRating] = useState(false);
  const [errorFeedback, setErrorFeedback] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleMouseOver = (index) => {
    setHoverRating(index);
  };

  const handleMouseOut = () => {
    setHoverRating(0);
  };

  const handleClick = (index) => {
    setRating(index);
    setErrorRating(false);
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
    if (e.target.value) setErrorFeedback(false);
  };

  const handleSubmit = () => {
    setErrorRating(false);
    setErrorFeedback(false);

    let hasError = false;

    if (!rating) {
      setErrorRating(true);
      hasError = true;
    }
    if (!feedback.trim()) {
      setErrorFeedback(true);
      hasError = true;
    }

    if (!hasError) {
      setIsSubmitted(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setRating(0);
        setFeedback("");
        setIsSubmitted(false);
      }, 3000);
    }
  };

  const getRatingText = (rating) => {
    const texts = {
      1: "Poor",
      2: "Fair",
      3: "Good",
      4: "Very Good",
      5: "Excellent"
    };
    return texts[rating] || "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.15) 2px, transparent 0), 
                           radial-gradient(circle at 75px 75px, rgba(255,255,255,0.1) 2px, transparent 0)`,
          backgroundSize: '100px 100px'
        }}></div>
      </div>

      {/* Header Section */}
      <div className="relative z-10 pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 mb-6">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
              We Value Your Feedback
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Your experience matters to us. Share your thoughts and help us improve our platform to serve you better.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">

            {/* Rating Form */}
            <div className="lg:col-span-2">
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden">
                {!isSubmitted ? (
                  <div className="p-8">
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-semibold text-white mb-2">Rate Your Experience</h2>
                      <p className="text-gray-400">How would you rate our platform and services?</p>
                    </div>

                    {/* Star Rating */}
                    <div className="flex flex-col items-center mb-8">
                      <div className="flex items-center gap-2 mb-4">
                        {[...Array(5)].map((_, index) => {
                          const starIndex = index + 1;
                          return (
                            <button
                              key={starIndex}
                              className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${starIndex <= (hoverRating || rating)
                                ? 'text-yellow-400'
                                : 'text-gray-500 hover:text-gray-400'
                                }`}
                              onMouseEnter={() => handleMouseOver(starIndex)}
                              onMouseLeave={handleMouseOut}
                              onClick={() => handleClick(starIndex)}
                            >
                              <Star
                                className={`w-8 h-8 transition-all duration-200 ${starIndex <= (hoverRating || rating) ? 'fill-yellow-400' : ''
                                  }`}
                              />
                            </button>
                          );
                        })}
                      </div>

                      {(rating || hoverRating) && (
                        <div className="text-center">
                          <p className="text-lg font-medium text-white">
                            {getRatingText(hoverRating || rating)}
                          </p>
                          <div className="flex items-center gap-1 justify-center mt-1">
                            {[...Array(hoverRating || rating)].map((_, i) => (
                              <div key={i} className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                            ))}
                          </div>
                        </div>
                      )}

                      {errorRating && (
                        <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                          <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                          Please select a rating
                        </p>
                      )}
                    </div>

                    {/* Feedback Textarea */}
                    <div className="mb-8">
                      <label className="block text-white font-medium mb-3">
                        Tell us more about your experience
                      </label>
                      <div className="relative">
                        <textarea
                          className={`w-full h-32 p-4 bg-gray-700/50 text-white placeholder-gray-400 border rounded-xl shadow-sm resize-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 ${errorFeedback ? 'border-red-500' : 'border-gray-600/50'
                            }`}
                          placeholder="Share your thoughts, suggestions, or any specific feedback about our platform..."
                          value={feedback}
                          onChange={handleFeedbackChange}
                        />
                        <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                          {feedback.length}/500
                        </div>
                      </div>
                      {errorFeedback && (
                        <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                          <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                          Please share your feedback
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      onClick={handleSubmit}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group"
                    >
                      <Send className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                      Submit Feedback
                    </button>
                  </div>
                ) : (
                  // Success State
                  <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-2">Thank You!</h3>
                    <p className="text-gray-300 mb-6">
                      Your feedback has been submitted successfully. We appreciate you taking the time to help us improve.
                    </p>
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                      <p className="text-green-400 text-sm">
                        Our team will review your feedback and use it to enhance your learning experience.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Details */}
            <div className="lg:col-span-1">
              <ContactDetails />
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="relative z-10 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 mb-4">
                <Award className="w-6 h-6 text-yellow-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Happy & Satisfied Learners</h2>
              <p className="text-gray-400">See what our community says about their learning journey</p>
            </div>
            <ReviewSlider />

            {/* Stats */}
            <div className="mt-8 pt-8 border-t border-gray-700/50">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-400 mb-1">10K+</div>
                  <div className="text-sm text-gray-400">Happy Students</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400 mb-1">4.8</div>
                  <div className="text-sm text-gray-400">Average Rating</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-400 mb-1">95%</div>
                  <div className="text-sm text-gray-400">Satisfaction Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RateUs;