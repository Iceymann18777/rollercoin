import { GhostCursor } from "ghost-cursor";
import { Vector } from "ghost-cursor/lib/math";
import { MouseOptions, Page } from "puppeteer";
import { Position } from "types/position.types";
import { delay } from "./delay";
import { random } from "./random";

export default async function(
  page: Page,
  cursor: GhostCursor,
  position: Position,
  containerPosition: Position = null,
  options: MouseOptions,
  delays: {
    afterMoveToMinMax: [number, number];
    afterMouseDownMinMax: [number, number];
    afterMouseUpMinMax: [number, number];
  }
): Promise<boolean> {
  try {
    const randomVector: Vector =
      containerPosition != null
        ? {
            x: random(
              containerPosition.x[0] + position.x[0],
              containerPosition.x[0] + position.x[1]
            ),
            y: random(
              containerPosition.y[0] + position.y[0],
              containerPosition.y[0] + position.y[1]
            ),
          }
        : {
            x: random(position.x[0], position.x[1]),
            y: random(position.y[0], position.y[1]),
          };

    await cursor.moveTo(randomVector);
    await delay(
      random(delays.afterMoveToMinMax[0], delays.afterMoveToMinMax[1])
    );

    await page.mouse.down(options);
    await delay(
      random(delays.afterMouseDownMinMax[0], delays.afterMouseDownMinMax[1])
    );

    await page.mouse.up(options);
    await delay(
      random(delays.afterMouseUpMinMax[0], delays.afterMouseUpMinMax[1])
    );

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
