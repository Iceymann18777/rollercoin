export function random(from: number, to: number): number {
  const maxRange = to - from;
  return Math.floor(Math.random() * maxRange + from);
}
