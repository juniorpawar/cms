export default function dateFormat(date) {
    return date.toLocaleString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Asia/Kolkata"
    })
}