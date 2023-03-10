export const timeago = (date) => {
    var seconds = Math.floor((new Date().valueOf() - new Date(date).valueOf()) / 1000);

    if (Math.round(seconds / (60 * 60 * 24 * 365.25)) >= 2) return Math.round(seconds / (60 * 60 * 24 * 365.25)) + " years ago";
    else if (Math.round(seconds / (60 * 60 * 24 * 365.25)) >= 1) return "1 year ago";
    else if (Math.round(seconds / (60 * 60 * 24 * 30.4)) >= 2) return Math.round(seconds / (60 * 60 * 24 * 30.4)) + " months ago";
    else if (Math.round(seconds / (60 * 60 * 24 * 30.4)) >= 1) return "1 month ago";
    else if (Math.round(seconds / (60 * 60 * 24 * 7)) >= 2) return Math.round(seconds / (60 * 60 * 24 * 7)) + " weeks ago";
    else if (Math.round(seconds / (60 * 60 * 24 * 7)) >= 1) return "1 week ago";
    else if (Math.round(seconds / (60 * 60 * 24)) >= 2) return Math.round(seconds / (60 * 60 * 24)) + " days ago";
    else if (Math.round(seconds / (60 * 60 * 24)) >= 1) return "1 day ago";
    else if (Math.round(seconds / (60 * 60)) >= 2) return Math.round(seconds / (60 * 60)) + " hours ago";
    else if (Math.round(seconds / (60 * 60)) >= 1) return "1 hour ago";
    else if (Math.round(seconds / 60) >= 2) return Math.round(seconds / 60) + " minutes ago";
    else if (Math.round(seconds / 60) >= 1) return "1 minute ago";
    else if (seconds >= 2) return seconds + " seconds ago";
    else return seconds + "1 second ago";
}
