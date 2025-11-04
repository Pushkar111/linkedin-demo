// client/src/utils/dateUtils.js
import { formatDistanceToNow, format, isToday, isYesterday } from 'date-fns';

/**
 * Format date for display
 * Shows relative time for recent dates, absolute for older
 */
export const formatDate = (date) => {
  const dateObj = new Date(date);

  if (isToday(dateObj)) {
    return formatDistanceToNow(dateObj, { addSuffix: true });
  }

  if (isYesterday(dateObj)) {
    return 'Yesterday';
  }

  // Within last 7 days
  const daysDiff = Math.floor((new Date() - dateObj) / (1000 * 60 * 60 * 24));
  if (daysDiff < 7) {
    return formatDistanceToNow(dateObj, { addSuffix: true });
  }

  // Older dates
  return format(dateObj, 'MMM d, yyyy');
};

/**
 * Format date to readable string
 */
export const formatFullDate = (date) => {
  return format(new Date(date), 'MMMM d, yyyy \'at\' h:mm a');
};

/**
 * Get relative time string
 */
export const getRelativeTime = (date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};
