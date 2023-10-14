import relativeTime from "dayjs/plugin/relativeTime"
import dayjs from "dayjs";

export  const calculateTimePassed = (t) => {
    dayjs.extend(relativeTime);

    const a = Date.now()

    const result = dayjs(t).from(a)

    return result

    
}