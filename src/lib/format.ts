/**
 * format.ts — tiny display helpers shared by components.
 * Pure functions, no state: config data in, human-friendly strings out.
 */

import type { Weekday } from "./types";

const WEEK_ORDER: Weekday[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const ABBREV: Record<Weekday, string> = {
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat",
  Sunday: "Sun",
};

/**
 * Turns ["Tuesday","Wednesday","Thursday"] into "Tue – Thu" and
 * ["Saturday","Sunday"] into "Sat – Sun"; non-consecutive days are
 * comma-separated ("Mon, Wed"). Keeps the hours table compact.
 */
export function formatDays(days: Weekday[]): string {
  const indexes = days
    .map((d) => WEEK_ORDER.indexOf(d))
    .sort((a, b) => a - b);

  // Collapse consecutive day indexes into [start, end] runs.
  const runs: Array<[number, number]> = [];
  for (const i of indexes) {
    const last = runs[runs.length - 1];
    if (last && i === last[1] + 1) last[1] = i;
    else runs.push([i, i]);
  }

  return runs
    .map(([start, end]) =>
      start === end
        ? ABBREV[WEEK_ORDER[start]]
        : `${ABBREV[WEEK_ORDER[start]]} – ${ABBREV[WEEK_ORDER[end]]}`,
    )
    .join(", ");
}

/** Turns 24-hour "14:30" into "2:30 PM" for display. */
export function formatTime(time: string): string {
  const [hour, minute] = time.split(":").map(Number);
  const suffix = hour < 12 ? "AM" : "PM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}:${String(minute).padStart(2, "0")} ${suffix}`;
}

/** Turns "(508) 555-0134" into "tel:5085550134" so tap-to-call works. */
export function telHref(phone: string): string {
  return "tel:" + phone.replace(/[^+\d]/g, "");
}

/** Strips "$" etc. from a display price ("$4.25" → "4.25") for JSON-LD. */
export function priceNumber(price: string): string {
  const match = price.match(/\d+(?:\.\d+)?/);
  return match ? match[0] : "";
}
