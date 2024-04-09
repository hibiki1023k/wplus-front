// utils/timeFormatter.js
export function formatMicrosecondsToTime(microseconds) {
    const milliseconds = microseconds / 1000;
    const date = new Date(milliseconds);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}
