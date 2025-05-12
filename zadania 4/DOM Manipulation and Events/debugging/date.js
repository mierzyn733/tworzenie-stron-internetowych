const currentDate = new Date();
const options = {
    weekday: 'short', 
    month: 'short', 
    day: '2-digit', 
    year: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit', 
    timeZoneName: 'short'
};
const currentDateFormat = `Current Date and Time: ${currentDate.toLocaleString('en-US', options)}`;
console.log(currentDateFormat);
function formatDateMMDDYYYY(date) {
    const month = date.getMonth() + 1; 
    const day = date.getDate();
    const year = date.getFullYear();
    return `Formatted Date (MM/DD/YYYY): ${month}/${day}/${year}`;
}
function formatDateLong(date) {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return `Formatted Date (Month Day, Year): ${date.toLocaleDateString('en-US', options)}`;
}
const exampleDate = new Date('Fri Sep 27 2024 16:16:11 GMT+0500');
console.log(formatDateMMDDYYYY(exampleDate)); 
console.log(formatDateLong(exampleDate));    