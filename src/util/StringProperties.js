export default function byString(object, string) {
  let result = object;
  //convert indexes to properties
  const formattedString = string.replace("/[(w+)]/g", ".$1");
  const splitByDot = formattedString.split(".");
  for (let i = 0; i < splitByDot.length; i++) {
    if (splitByDot[i] in result) {
      result = result[splitByDot[i]];
    } else {
      return;
    }
  }
  return result;
}
