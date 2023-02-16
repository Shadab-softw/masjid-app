import React from 'react';
import {Text} from 'react-native';
const DateTimeFormat = ({startDate, endDate}) => {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];
  const convertDate = () => {
    var date = new Date(startDate);
    var edate = new Date(endDate);
    var options = {
      weekday: 'short',
      year: 'numeric',
      month: '2-digit',
      day: 'numeric',
    };
    // const day = date.toLocaleString('en', {day: 'numeric'});
    // const mn = date.toLocaleString('en', {month: 'short'});
    // const sTime = date.toLocaleString('en', {
    //   hour: '2-digit',
    //   minute: '2-digit',
    // });
    // const eTime = edate.toLocaleString('en', {
    //   hour: '2-digit',
    //   minute: '2-digit',
    // });
    const day = date.getUTCDate();
    // const mn = date.toLocaleString('en', {month: 'short'});
    const mn = date.getUTCMonth();
    const mName = monthNames[mn];
    const sTimeH = date.getUTCHours();
    const ssTimeH = sTimeH > 12 ? sTimeH - 12 : sTimeH;
    const sTimeM = String(date.getUTCMinutes()).padStart(2, '0');

    const eTimeH = edate.getUTCHours();
    const eeTimeH = eTimeH > 12 ? eTimeH - 12 : eTimeH;
    const eTimeM = String(edate.getUTCMinutes()).padStart(2, '0');
    var sAmPm = sTimeH >= 12 ? 'PM' : 'AM';
    var eAmPm = eTimeH >= 12 ? 'PM' : 'AM';
    return `${day} ${mName} | ${ssTimeH}:${sTimeM} ${sAmPm} - ${eeTimeH}:${eTimeM} ${eAmPm}`;
  };
  return <Text style={{color: '#9D9D9D', marginLeft: 5}}>{convertDate()}</Text>;
};

export default DateTimeFormat;
