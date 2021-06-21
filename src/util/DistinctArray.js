export default function distinctArray(array) {
  return array.filter(
    (value, index, self) => self.indexOf(value) === index && !!value
  );
}
