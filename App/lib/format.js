
export const hhmmss = (seconds) => {
  const date = new Date(null);
  date.setSeconds(seconds);
  return date.toISOString().substr(11, 8);
};

export default {
  hhmmss,
};
