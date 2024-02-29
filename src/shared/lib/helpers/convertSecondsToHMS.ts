const formatDatePart = (value?: number | null) => {
  if (value) {
    return value > 9 ? value : `0${value}`
  }
  return '00'
}

export const convertSecondsToHMS = (seconds: number) => {
  const SECONDS_IN_HOUR = 3600
  const SECONDS_IN_MINUTE = 60
  const hours = Math.floor(seconds / SECONDS_IN_HOUR);
  const minutes = Math.floor((seconds % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE);
  const secs = seconds % SECONDS_IN_MINUTE;

  if (hours) {
    return formatDatePart(hours) + ':' + formatDatePart(minutes) + ':' + formatDatePart(secs);
  } else {
    return formatDatePart(minutes) + ':' + formatDatePart(secs);
  }
}