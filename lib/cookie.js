export function parse(header) {
  let map = new Map();
  if (header) {
    let values = header.split("; ");
    values.forEach((pair) => map.set(...pair.split("=")));
  }
  return map;
}
