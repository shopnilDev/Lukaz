import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

/**

 *
 * @param dateString - The date string to convert
 * @returns string - Time ago format
 */
export const timeAgo = (dateString) => {
  if (!dateString) return "Invalid date";
  return dayjs(dateString).fromNow();
};
