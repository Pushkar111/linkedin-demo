// client/src/utils/formatUtils.js

/**
 * Truncate text to specified length
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Format number with K, M suffixes
 */
export const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

/**
 * Get initials from name
 */
export const getInitials = (name) => {
  if (!name) return '??';
  const parts = name.split(' ');
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

/**
 * Generate random color for avatar
 */
export const getAvatarColor = (name) => {
  const colors = [
    '#0a66c2', '#8a3ffc', '#33b679', '#ea4335', 
    '#fbbc04', '#ff6d00', '#46bdc6', '#7e57c2'
  ];
  const index = name ? name.charCodeAt(0) % colors.length : 0;
  return colors[index];
};
