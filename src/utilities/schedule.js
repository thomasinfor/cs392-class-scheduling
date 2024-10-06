const weekdays = ["M", "Tu", "W", "Th", "F"];
const timeRegex = /(\d{1,2}):(\d{2})-(\d{1,2}):(\d{2})/;

export const conflict = (meet1, meet2) => {
  if (meet1.length === 0 || meet2.length === 0)
    return false;
  // day intersection
  if (!weekdays.some(w => meet1.indexOf(w) !== -1 && meet2.indexOf(w) !== -1))
    return false;
  // time intersection
  const t1 = meet1.match(timeRegex);
  const t2 = meet2.match(timeRegex);
  const l1 = t1[1] * 60 + t1[2], r1 = t1[3] * 60 + t1[4];
  const l2 = t2[1] * 60 + t2[2], r2 = t2[3] * 60 + t2[4];
  if (l1 >= r2 || r1 <= l2)
    return false;
  return true;
}

export const validMeet = meet => {
  if (meet.length === 0) return true;
  const day = weekdays.filter(d => meet.indexOf(d) !== -1).join("");
  const t = meet.match(timeRegex);
  if (!t) return false;
  const [t1, t2, t3, t4] = t.slice(1).map(e => Number(e));
  if (meet !== `${day} ${t1}:${t[2]}-${t3}:${t[4]}`)
    return false;
  if (t1 > 23 || t3 > 23 || t2 > 59 || t4 > 59)
    return false;
  if (t1 * 60 + t2 >= t3 * 60 + t4)
    return false;
  return true;
}