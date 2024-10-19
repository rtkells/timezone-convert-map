const geonames = require("geonames.js")({
  username: `${process.env.REACT_APP_GEONAMES_USERNAME}`,
  lan: "en",
  encoding: "JSON",
});

const moment = require("moment-timezone");

export async function fetchLocationDataGeoNames(lat, lng) {
  try {
    const locationDataRaw = await geonames.findNearbyPlaceName({ lat, lng });
    const locationData = locationDataRaw.geonames[0];

    const timezoneData = await geonames.timezone({ lat, lng });

    const countryName = locationData.countryName;
    const regionName = locationData.name;
    const zoneName = timezoneData.timezoneId;

    const timestamp = timezoneData.time.substring(11, 16);
    const timestampAMPMInfo = toAMPM(timestamp);
    const timestampAMPM = timestampAMPMInfo.timestampAMPM;
    const pm = timestampAMPMInfo.isPM;

    return { countryName, regionName, zoneName, timestamp, timestampAMPM, pm };
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export function toMinutes(timestamp) {
  let [hours, minutes] = timestamp.split(":").map(Number);
  return hours * 60 + minutes;
}

export function convertTimezones(
  timezoneFrom,
  timezoneTo,
  timestamp,
  ampm = false
) {
  let fromTime = moment.tz(`2000-10-10 ${timestamp}`, timezoneFrom);

  let toTime = fromTime.clone().tz(timezoneTo);

  let newTimestamp = toTime.format("HH:mm");

  return newTimestamp;
}

// Below functions are for future plans
export function toAMPM(timestamp) {
  let hour = timestamp.substring(0, 2);
  let hourNum = parseInt(hour, 10);
  let pm = false;

  if (hourNum == 0) {
    hourNum += 12;
  }

  if (hourNum > 12) {
    hourNum -= 12;
    pm = true;
  }

  let hourStr = "";

  if (hourNum < 10) {
    hourStr += "0";
  }

  hourStr += hourNum.toString();

  let newTimestamp = hourStr + timestamp.substring(2);

  return { timestampAMPM: newTimestamp, isPM: pm };
}

export function fromAMPM(timestamp, pm) {
  let hour = timestamp.substring(0, 2);
  let hourNum = parseInt(hour, 10);

  if (pm) {
    hourNum += 12;
  }

  let hourStr = "";

  if (hourNum < 10) {
    hourStr += "0";
  }

  hourStr += hourNum.toString();

  let newTimestamp = hourStr + timestamp.substring(2);

  return newTimestamp;
}
