import { FaRegStar, FaStar, FaStarHalfStroke } from "react-icons/fa6";

export default function Stars({
  rating,
  size = "text-sm",
}: {
  rating: number;
  size?: string;
}) {
  return (
    <span className={`flex items-center gap-0.5 text-yellow-400 ${size}`} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => {
        const value = rating - i;
        if (value >= 0.75) return <FaStar key={i} />;
        if (value >= 0.25) return <FaStarHalfStroke key={i} />;
        return <FaRegStar key={i} />;
      })}
    </span>
  );
}
