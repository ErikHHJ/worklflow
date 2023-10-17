//JSDocs for the calculateMinutesAgo
/**
 * @function
 * @param {string} timestampString This string comes from a json object and refers to when a post was created.
 * @returns The difference in minutes from when it was posted compared to present time.
 */
export function calculateMinutesAgo(timestampString) {
  const postDate = new Date(timestampString);
  const currentDate = new Date();
  const timeDifferenceMillis = currentDate - postDate;
  const minutesDifference = Math.floor(timeDifferenceMillis / (1000 * 60));
  return minutesDifference;
}
//JSDocs for the calculateHours function
/** 
 * 
 * @function
 * @param {object} obj The object returned from any get request, named obj
 * @returns Returns the amount of minutes ago a specific post was created. With the help of the key of created on the object. 
 */
export function calculateHours(obj){
  const oldTime = obj.created;
  let newTime = Number(calculateMinutesAgo(oldTime));
  
  if(newTime > 60){
   newTime = Math.round(newTime / 60) + " hours ago"
  }else if(newTime > 1440) {
    newTime = Math.round((newTime / 60) / 24) + " days ago";
  } else if (newTime < 60){
    newTime = newTime + " minutes ago"
  }
  return newTime
}