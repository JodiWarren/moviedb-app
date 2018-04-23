import { ConfigurationResult } from "@jodi/tmdb-typescript-api";

export const stripLeadingW = (size: string): string => size.replace(/^w/, "");

export const isNotOriginal = (size: string): boolean => size !== "original";

export function findClosestImageSizes(
  imageSizes: string[],
  desiredWidth: number
) {
  const cleanSizes = imageSizes
    .map(stripLeadingW)
    .filter(isNotOriginal)
    .map(Number);

  const chosenImageSize = cleanSizes.reduce((prevVal, curVal) => {
    if (curVal - desiredWidth > prevVal) {
      return curVal;
    }
    return prevVal;
  }, 0);
  if (chosenImageSize === 0) {
    return "original";
  } else {
    return `w${chosenImageSize}`;
  }
}

export class GetImageUrl {
  public config: ConfigurationResult;

  constructor(config: ConfigurationResult) {
    this.config = config;
  }

  public buildPath = (
    filePath: string,
    imageType: "backdrop" | "logo" | "poster" | "profile" | "still",
    desiredWidth: number | string = "original"
  ) => {
    if (!filePath) {
      return null;
    }
    const imageSize =
      typeof desiredWidth === "string"
        ? "original"
        : findClosestImageSizes(
            this.config.images[`${imageType}_sizes`],
            desiredWidth
          );

    return `${this.config.images.secure_base_url}${imageSize}/${filePath}`;
  };
}
