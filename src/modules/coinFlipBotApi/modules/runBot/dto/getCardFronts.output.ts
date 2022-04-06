import { CardFront } from "../types/shared.types";

export type GetCardFrontsOutput = Promise<
  | {
      firstCardFront: CardFront;
      secondCardFront: CardFront;
    }
  | false
>;
