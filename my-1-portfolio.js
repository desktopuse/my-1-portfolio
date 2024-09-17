// JavaScript code for updating the time in the browser
function getCETTime() {
  const now = new Date();
  const localTimeZoneOffset = now.getTimezoneOffset() / 60;
  // Central European Time (CET) is UTC+1
  const cetOffset = -localTimeZoneOffset + 1; // CET is UTC+1
  // Adjust for Daylight Saving Time (if applicable)
  const isDST = now.getMonth() > 2 && now.getMonth() < 9 || 
                (now.getMonth() === 2 && now.getDate() - now.getDay() >= 24) ||
                (now.getMonth() === 9 && now.getDate() - now.getDay() < 31);
  const cetTime = new Date(now.getTime() + (cetOffset + (isDST ? 1 : 0) - now.getTimezoneOffset() / 60) * 3600000);
  return cetTime;
}

function updateTime() {
  const cetTime = getCETTime();
  const hours = String(cetTime.getHours()  % 12).padStart(2, '0');
  const ampm = cetTime.getHours() >= 12 ? 'PM' : 'AM';
  const minutes = String(cetTime.getMinutes()).padStart(2, '0');
  const seconds = String(cetTime.getSeconds()).padStart(2, '0');
  document.getElementById('time').textContent = `${hours}:${minutes}:${seconds} ${ampm} CET`;
}

function startClock() {
  updateTime();
  const now = new Date();
  const msToNextSecond = 1000 - now.getMilliseconds();
  setTimeout(function() {
    updateTime();
    setInterval(updateTime, 1000);
  }, msToNextSecond);
}

startClock();