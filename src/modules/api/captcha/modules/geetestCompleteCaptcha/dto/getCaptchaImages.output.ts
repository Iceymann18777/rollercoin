export type GetCaptchaImagesOutput = Promise<
  | {
      captcha: any;
      puzzle: any;
      original: any;
    }
  | false
>;
