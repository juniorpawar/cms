export default function dateFormat(date) {
    return date.toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric"
    })
}