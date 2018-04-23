import { findClosestImageSizes, GetImageUrl } from "./GetImageUrl";

// tslist:disable-next-line:no-var-requires
const configurationFixture = require("../fixtures/configuration.json");

describe("findClosestImageSizes", () => {
  const imageSizes = ["w100", "w400", "w800", "w1000", "w1500", "original"];

  it("should return the closest image size", () => {
    expect(findClosestImageSizes(imageSizes, 950)).toBe("w1000");
    expect(findClosestImageSizes(imageSizes, 1200)).toBe("w1500");
    expect(findClosestImageSizes(imageSizes, 1800)).toBe("original");
  });
});

describe("GetImageUrl", () => {
  const getImageUrl = new GetImageUrl(configurationFixture);
  it("should set a class property when instantiated", () => {
    expect(getImageUrl).toBeInstanceOf(GetImageUrl);
    expect(getImageUrl).toHaveProperty("config");
    expect(getImageUrl.config.images.base_url).toBe(
      "http://image.tmdb.org/t/p/"
    );
  });

  describe("-> buildPath", () => {
    it("is on GetImageUrl", () => {
      expect(getImageUrl).toHaveProperty("buildPath");
    });

    it("should work out the buildPath for a file", () => {
      const jpg500Path = getImageUrl.buildPath("test.jpg", "backdrop", 500);
      const jpgOriginalPath = getImageUrl.buildPath(
        "test.jpg",
        "backdrop",
        "original"
      );
      const jpgMassivePath = getImageUrl.buildPath(
        "test.jpg",
        "backdrop",
        "4000"
      );
      expect(jpg500Path).toBe("https://image.tmdb.org/t/p/w780/test.jpg");
      expect(jpgOriginalPath).toBe(
        "https://image.tmdb.org/t/p/original/test.jpg"
      );
      expect(jpgMassivePath).toBe(
        "https://image.tmdb.org/t/p/original/test.jpg"
      );
    });
  });
});
