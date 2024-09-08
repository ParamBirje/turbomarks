import React from "react";

export default function ReviewStars({ className }: { className?: string }) {
  return (
    <div className={`flex ${className}`}>
      <img
        src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a947e84e6cf91_Vector.svg"
        alt=""
        className="mr-3 inline-block w-4 flex-none"
      />
      <img
        src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a947e84e6cf91_Vector.svg"
        alt=""
        className="mr-3 inline-block w-4 flex-none"
      />
      <img
        src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a947e84e6cf91_Vector.svg"
        alt=""
        className="mr-3 inline-block w-4 flex-none"
      />
      <img
        src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a947e84e6cf91_Vector.svg"
        alt=""
        className="mr-3 inline-block w-4 flex-none"
      />
      <img
        src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a947e84e6cf91_Vector.svg"
        alt=""
        className="mr-3 inline-block w-4 flex-none"
      />
    </div>
  );
}
