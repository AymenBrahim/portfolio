import type { HTMLAttributes } from "react";
import { formatMonthYear, isSameDay } from "../utils";
import "./time-entry.css";
import { twMerge } from "tailwind-merge";
import { FaRegCalendar } from "react-icons/fa";
type TimeEntryProps = {
  startDate: Date;
  endDate: Date;
} & HTMLAttributes<HTMLTimeElement>;

export default function TimeEntry({
  startDate,
  endDate,
  className,
  ...rest
}: TimeEntryProps) {
  const dateRange = `${formatMonthYear(startDate)} — ${isSameDay(new Date(), endDate) ? "Present" : formatMonthYear(endDate)}`;

  return (
    <time className={twMerge("time-entry with-hr-prefix", className)} {...rest}>
      <FaRegCalendar className="calendar" />

      <span>{dateRange}</span>
    </time>
  );
}
