import React from "react";
import { motion } from "framer-motion";

const bars = [
  { day: "Mon", base: 30 },
  { day: "Tue", base: 45 },
  { day: "Wed", base: 60 },
  { day: "Thu", base: 40 },
  { day: "Fri", base: 75 },
  { day: "Sat", base: 50 },
  { day: "Sun", base: 35 },
];

export default function WeeklyStats() {
  return (
    <div className="weekly-stats-live">
      {bars.map((bar, index) => (
        <motion.div
          key={bar.day}
          className="bar-container"
          animate={{
            height: [
              `${bar.base}px`,
              `${bar.base + 20}px`,
              `${bar.base}px`,
            ],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 2 + index * 0.1,
            ease: "easeInOut",
          }}
        >
          <div className="day-label">{bar.day}</div>
        </motion.div>
      ))}
    </div>
  );
}
