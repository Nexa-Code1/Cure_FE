import { useNavigate } from "react-router-dom";

import { ChevronLeft } from "lucide-react";

function GoBackButton() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      aria-label="Go back"
      onClick={() => navigate(-1)}
      className="cursor-pointer shadow-none hover:scale-110 transition-transform"
    >
      <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={1.3} />
    </button>
  );
}

export default GoBackButton;
