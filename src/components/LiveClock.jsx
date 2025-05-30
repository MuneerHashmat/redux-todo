import { useState, useEffect } from "react";

const LiveClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const formattedDate = currentTime.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex flex-col gap-[2px]">
      <h1 className="text-[17px] font-semibold">{formattedTime}</h1>
      <p className="text-xs">{formattedDate}</p>
    </div>
  );
};

export default LiveClock;
