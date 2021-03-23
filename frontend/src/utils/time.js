import moment from 'moment-timezone';

export const formatTimeZone = (time) => moment(time).format('HH:mm:ss DD-MMM-YYYY')
