export function formatDateTime(timestamp: string): string {
  const date = new Date(timestamp);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const month = monthNames[date.getUTCMonth()];
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");

  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;

  return `${month} ${day}, ${year} ${hours}:${minutes}${ampm}`;
}

export function timeAgo(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const secondsPast = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (secondsPast < 60) {
    return `${secondsPast} seconds ago`;
  }
  if (secondsPast < 3600) {
    const minutes = Math.floor(secondsPast / 60);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  }
  if (secondsPast < 86400) {
    const hours = Math.floor(secondsPast / 3600);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }
  if (secondsPast < 604800) {
    const days = Math.floor(secondsPast / 86400);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }
  if (secondsPast < 2419200) {
    const weeks = Math.floor(secondsPast / 604800);
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  }
  if (secondsPast < 29030400) {
    const months = Math.floor(secondsPast / 2419200);
    return `${months} month${months > 1 ? "s" : ""} ago`;
  }

  const years = Math.floor(secondsPast / 29030400);
  return `${years} year${years > 1 ? "s" : ""} ago`;
}

export const capitalizeFirstLetter = (text: string) => {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};


export const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();
};
