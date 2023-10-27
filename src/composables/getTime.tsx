const timeAgo = (timestamp: any) => {
    const currentTime: any = new Date();
    const providedTime: any = new Date(timestamp);

    const timeDifference = currentTime - providedTime;
    const secondsAgo = Math.floor(timeDifference / 1000);
    const minutesAgo = Math.floor(secondsAgo / 60);
    const hoursAgo = Math.floor(minutesAgo / 60);
    const daysAgo = Math.floor(hoursAgo / 24);

    if (daysAgo >= 2) {
        return `${daysAgo} days ago`;
    } else if (daysAgo === 1 || hoursAgo >= 24) {
        return "1 day ago";
    } else if (hoursAgo >= 2) {
        return `${hoursAgo} hours ago`;
    } else if (hoursAgo === 1 || minutesAgo >= 60) {
        return "1 hour ago";
    } else if (minutesAgo >= 2) {
        return `${minutesAgo} minutes ago`;
    } else {
        return "just now";
    }
}
const formatDate = (timestamp: any) => {
    const date = new Date(timestamp);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day} ${year}`;
};
export { timeAgo, formatDate }