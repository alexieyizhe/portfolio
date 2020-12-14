export const getRandomItem = <T = unknown>(arr: T[]) =>
  arr[Math.floor(Math.random() * arr.length)];

export const getDateInZone = (timeZoneIANA: string): Date => {
  const cur = new Date();

  const dateInTimezone = new Date(
    cur.toLocaleString('en-US', {
      timeZone: timeZoneIANA,
    })
  );

  const diff = cur.getTime() - dateInTimezone.getTime();

  return new Date(cur.getTime() - diff);
};
