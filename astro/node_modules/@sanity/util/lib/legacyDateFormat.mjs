import { TZDateMini } from "@date-fns/tz";
import { UTCDateMini } from "@date-fns/utc";
import { format as format$1, parse as parse$1, parseISO } from "date-fns";
const sanitizeLocale = (locale) => locale.replace(/@posix$/, "");
function getMonthName(date, style = "long", locale = "en-US") {
  const validLocale = sanitizeLocale(locale);
  return new Intl.DateTimeFormat(validLocale, { month: style }).format(date);
}
function getDayName(date, style = "long", locale = "en-US") {
  const validLocale = sanitizeLocale(locale);
  return new Intl.DateTimeFormat(validLocale, { weekday: style }).format(date);
}
function zeroPad(num, length) {
  return String(num).padStart(length, "0");
}
function getOrdinal(day) {
  const j = day % 10, k = day % 100;
  return j === 1 && k !== 11 ? `${day}st` : j === 2 && k !== 12 ? `${day}nd` : j === 3 && k !== 13 ? `${day}rd` : `${day}th`;
}
function getISODayOfWeek(date) {
  const dow = date.getDay();
  return dow === 0 ? 7 : dow;
}
function getISOWeekYear(date) {
  const temp = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())), dayOfWeek = getISODayOfWeek(temp);
  return temp.setUTCDate(temp.getUTCDate() - dayOfWeek + 4), temp.getUTCFullYear();
}
function getISOWeekNumber(date) {
  const temp = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())), dayOfWeek = getISODayOfWeek(temp);
  temp.setUTCDate(temp.getUTCDate() - dayOfWeek + 4);
  const yearStart = new Date(Date.UTC(temp.getUTCFullYear(), 0, 1));
  return Math.ceil(((temp.valueOf() - yearStart.valueOf()) / 864e5 + 1) / 7);
}
function getDayOfYear(date) {
  const startOfYear = new Date(Date.UTC(date.getFullYear(), 0, 1)), diff = date.valueOf() - startOfYear.valueOf() + (startOfYear.getTimezoneOffset() - date.getTimezoneOffset()) * 6e4;
  return Math.floor(diff / (1e3 * 60 * 60 * 24)) + 1;
}
function getLocaleWeekYear(date) {
  return getISOWeekYear(date);
}
function getFractionalSeconds(date, length) {
  const ms = zeroPad(date.getMilliseconds(), 3);
  return length === 1 ? ms.slice(0, 1) : length === 2 ? ms.slice(0, 2) : length === 3 ? ms : `${ms}0`;
}
function getTimeZoneAbbreviation(date) {
  const tz = new Intl.DateTimeFormat(sanitizeLocale("en-US"), {
    timeZoneName: "short"
  }).formatToParts(date).find((part) => part.type === "timeZoneName");
  return tz ? tz.value : "";
}
function formatMomentLike(date, formatStr) {
  const escapeSequences = [], escapeToken = "\uE000", processedFormat = formatStr.replace(/\[([^\]]+)\]/g, (_, contents) => (escapeSequences.push(contents), escapeToken)), year = date.getFullYear(), monthIndex = date.getMonth(), dayOfMonth = date.getDate(), dayOfWeek = date.getDay(), hours = date.getHours(), minutes = date.getMinutes(), seconds = date.getSeconds(), isoWeekNum = getISOWeekNumber(date), isoWeekYear = getISOWeekYear(date), localeWeekYear = getLocaleWeekYear(date), unixMs = date.getTime(), unixSec = Math.floor(unixMs / 1e3), tokens = [
    // Year
    // 1970 1971 ... 2029 2030
    { key: "YYYY", value: String(year) },
    // 70 71 ... 29 30
    { key: "YY", value: String(year).slice(-2) },
    // 1970 1971 ... 9999 +10000 +10001
    { key: "Y", value: String(year) },
    // Expanded years, -001970 -001971 ... +001907 +001971
    { key: "YYYYY", value: zeroPad(year, 5) },
    // ISO week-year
    // 1970 1971 ... 2029 2030
    { key: "GGGG", value: String(isoWeekYear) },
    // 70 71 ... 29 30
    { key: "GG", value: String(isoWeekYear).slice(-2) },
    // "locale" week-year
    { key: "gggg", value: String(localeWeekYear) },
    { key: "gg", value: String(localeWeekYear).slice(-2) },
    // Quarter
    { key: "Q", value: String(Math.floor(monthIndex / 3) + 1) },
    { key: "Qo", value: getOrdinal(Math.floor(monthIndex / 3) + 1) },
    // --- Month (using Intl) ---
    { key: "MMMM", value: getMonthName(date, "long") },
    // e.g. "January"
    { key: "MMM", value: getMonthName(date, "short") },
    // e.g. "Jan"
    // For numeric months, we still do a manual approach:
    { key: "MM", value: zeroPad(monthIndex + 1, 2) },
    { key: "M", value: String(monthIndex + 1) },
    { key: "Mo", value: getOrdinal(monthIndex + 1) },
    // Day of Month
    { key: "DD", value: zeroPad(dayOfMonth, 2) },
    { key: "D", value: String(dayOfMonth) },
    { key: "Do", value: getOrdinal(dayOfMonth) },
    // --- Day of Week (using Intl) ---
    { key: "dddd", value: getDayName(date, "long") },
    // e.g. "Monday"
    { key: "ddd", value: getDayName(date, "short") },
    // e.g. "Mon"
    {
      key: "dd",
      // e.g. "Mo" => first 2 chars of short day name
      value: getDayName(date, "short").slice(0, 2)
    },
    { key: "d", value: String(dayOfWeek) },
    { key: "do", value: getOrdinal(dayOfWeek + 1) },
    // Day of the year
    { key: "DDDD", value: zeroPad(getDayOfYear(date), 3) },
    { key: "DDD", value: String(getDayOfYear(date)) },
    { key: "DDDo", value: getOrdinal(getDayOfYear(date)) },
    // ISO day of week
    { key: "E", value: String(getISODayOfWeek(date)) },
    // Day of Year
    { key: "DDDD", value: zeroPad(getDayOfYear(date), 3) },
    { key: "DDD", value: String(getDayOfYear(date)) },
    // Week of the year
    // w 1 2 ... 52 53
    { key: "w", value: zeroPad(isoWeekNum, 2) },
    // week 1st 2nd ... 52nd 53rd
    { key: "wo", value: getOrdinal(isoWeekNum) },
    // 01 02 ... 52 53
    { key: "ww", value: zeroPad(isoWeekNum, 2) },
    // ISO Week
    { key: "WW", value: zeroPad(isoWeekNum, 2) },
    { key: "W", value: String(isoWeekNum) },
    { key: "Wo", value: getOrdinal(isoWeekNum) },
    // or "locale" week => replace isoWeekNum
    // 24h hours
    { key: "HH", value: zeroPad(hours, 2) },
    { key: "H", value: String(hours) },
    // 12h hours
    { key: "hh", value: zeroPad((hours + 11) % 12 + 1, 2) },
    { key: "h", value: String((hours + 11) % 12 + 1) },
    // 1 2 ... 23 24
    { key: "k", value: String(hours || 24) },
    // 01 02 ... 23 24
    { key: "kk", value: zeroPad(hours || 24, 2) },
    // Minutes
    { key: "mm", value: zeroPad(minutes, 2) },
    { key: "m", value: String(minutes) },
    // Seconds
    { key: "ss", value: zeroPad(seconds, 2) },
    { key: "s", value: String(seconds) },
    // Fractional seconds (S..SSSS) => handled separately
    // Timezone offset (Z, ZZ) => handled separately
    // AM/PM
    { key: "A", value: hours < 12 ? "AM" : "PM" },
    { key: "a", value: hours < 12 ? "am" : "pm" },
    // Unix timestamps
    { key: "X", value: String(unixSec) },
    { key: "x", value: String(unixMs) },
    // Eras BC AD
    { key: "N", value: year < 0 ? "BC" : "AD" },
    { key: "NN", value: year < 0 ? "BC" : "AD" },
    { key: "NNN", value: year < 0 ? "BC" : "AD" },
    // Before Christ, Anno Domini
    { key: "NNNN", value: year < 0 ? "Before Christ" : "Anno Domini" },
    { key: "NNNNN", value: year < 0 ? "BC" : "AD" },
    // Time zone offset
    { key: "z", value: getTimeZoneAbbreviation(date) },
    { key: "zz", value: getTimeZoneAbbreviation(date) },
    { key: "Z", value: format$1(date, "xxx") },
    { key: "ZZ", value: format$1(date, "xx") }
  ];
  tokens.sort((a, b) => b.key.length - a.key.length);
  const fracSecRegex = /(S{1,4})/g;
  let output = processedFormat.replace(fracSecRegex, (match) => getFractionalSeconds(date, match.length));
  for (const { key, value } of tokens) {
    const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), tokenRegex = new RegExp(`(^|[^A-Z0-9a-z])(${escapedKey})(?![A-Z0-9a-z])`, "g");
    output = output.replace(tokenRegex, `$1${value}`);
  }
  return output = output.replace(new RegExp(escapeToken, "g"), () => escapeSequences.shift() || ""), output;
}
function momentToDateFnsFormat(momentFormat) {
  const formatMap = {
    YYYY: "yyyy",
    YY: "yy",
    MMMM: "MMMM",
    MMM: "MMM",
    MM: "MM",
    M: "M",
    DD: "dd",
    D: "d",
    dddd: "EEEE",
    ddd: "EEE",
    HH: "HH",
    H: "H",
    hh: "hh",
    h: "h",
    mm: "mm",
    m: "m",
    ss: "ss",
    s: "s",
    A: "a",
    a: "a"
  };
  return Object.keys(formatMap).reduce(
    (acc, key) => acc.replace(new RegExp(key, "g"), formatMap[key]),
    momentFormat
  );
}
const DEFAULT_DATE_FORMAT = "YYYY-MM-DD", DEFAULT_TIME_FORMAT = "HH:mm", DEFAULT_TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;
function format(input, dateFormat, options = { useUTC: !1, timeZone: void 0 }) {
  const { useUTC, timeZone } = options;
  return formatMomentLike(useUTC ? new UTCDateMini(input) : timeZone ? new TZDateMini(input, timeZone || DEFAULT_TIMEZONE) : new Date(input), dateFormat);
}
function parse(dateString, dateFormat, timeZone) {
  const dnsFormat = dateFormat ? momentToDateFnsFormat(dateFormat) : void 0, parsed = dnsFormat ? parse$1(dateString, dnsFormat, /* @__PURE__ */ new Date()) : parseISO(dateString);
  return parsed && !isNaN(parsed.getTime()) ? { isValid: !0, date: timeZone && isValidTimeZoneString(timeZone) ? new TZDateMini(parsed, timeZone) : parsed } : { isValid: !1, error: `Invalid date. Must be on the format "${dateFormat}"` };
}
function isValidTimeZoneString(timeZone) {
  return Intl.supportedValuesOf("timeZone").includes(timeZone);
}
export {
  DEFAULT_DATE_FORMAT,
  DEFAULT_TIME_FORMAT,
  format,
  isValidTimeZoneString,
  parse,
  sanitizeLocale
};
//# sourceMappingURL=legacyDateFormat.mjs.map
