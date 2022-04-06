export async function delay(timeInMs: number): Promise<number> {
  return await new Promise(function(resolve) {
    setTimeout(resolve, timeInMs);
  });
}
