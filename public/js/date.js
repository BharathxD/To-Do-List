export const date = () => {
  const calendar = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return calendar.toLocaleDateString("en-US", options);
};
