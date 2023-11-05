// dateTimeUtils.js 파일

// parseISOString 함수
function parseISOString(s) {
    const year = s.slice(0, 4);
    const month = s.slice(5, 7) - 1;
    const day = s.slice(8, 10);
    const hour = s.slice(11, 13);
    const minute = s.slice(14, 16);
    const second = s.slice(17, 19);

    return new Date(Date.UTC(year, month, day, hour, minute, second) + (9 * 60 * 60 * 1000));
}

// formatDateTime 함수
function formatDateTime(regDate) {
    const currentDate = new Date();
    const messageDate = parseISOString(regDate);
    const timeDiff = currentDate - messageDate;
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (seconds < 60) {
        return "방금";
    } else if (minutes < 60) {
        return `${minutes}분 전`;
    } else if (hours < 24) {
        return `${hours}시간 전`;
    } else if (hours >= 24 && hours < 48) {
        return "어제";
    } else {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return messageDate.toLocaleDateString(undefined, options);
    }
}

// Export functions to be used in other files
module.exports = {
    parseISOString,
    formatDateTime
};
