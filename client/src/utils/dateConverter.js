import relativeTime from "dayjs/plugin/relativeTime"
import dayjs from "dayjs";

export  const calculateTimePassed = (t) => {
    dayjs.extend(relativeTime);

    const a = Date.now()

    const result = dayjs(t).from(a)

    return result
}

export const sanitizeNotifications = (notifications) => {
        const ordered = [...notifications].sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt)
        })
        return ordered;
}