module.exports = {
  format_time: (date) => {
    // Ensure the date is a valid Date object
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    return date.toLocaleTimeString();
  },
  format_date: (date) => {
    // Ensure the date is a valid Date object
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    // Format the date as MM/DD/YYYY
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  },
};
