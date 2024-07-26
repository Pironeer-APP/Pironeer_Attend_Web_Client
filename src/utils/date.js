

const formatDate = (dateTime) => {
  const localeDate = new Date(dateTime);
  const year = localeDate.getFullYear();
  const month = localeDate.toLocaleString('default', { month: 'long' });
  const day = String(localeDate.getDate()).padStart(2, '0');

  return `${month} ${day}, ${year}`;
}

//요일 리턴해주는 함수
const dayOfWeek = (num) => {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  return days[num];
}

const getLocal = (datetime) => {
  const itemDate = new Date(datetime);

  const month = String(itemDate.getMonth() + 1).padStart(2, '0');
  const date = String(itemDate.getDate()).padStart(2, '0');
  const day = dayOfWeek(itemDate.getDay());
  const hour = String(itemDate.getHours()).padStart(2, '0');
  const min = String(itemDate.getMinutes()).padStart(2, '0');

  return {
    month,
    date,
    day,
    hour,
    min
  }
}
export { formatDate, getLocal };



