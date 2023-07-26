import { expect } from "chai";
import { parseDate } from "./datetime";

describe("datetime", () => {
  describe("parseDate", () => {
    it("returns a date object when argument is valid", () => {
      const result = parseDate("2020-08-31");
      const date = new Date("2020-08-31");

      // https://www.stephenlewis.me/blog/chai-check-date/
      expect(result?.getTime()).to.be.closeTo(date.getTime(), 100);
    });

    it("returns null when argument is null", () => {
      expect(parseDate(null)).to.be.null;
    });

    it("returns null by default when argument is invalid", () => {
      expect(parseDate("prout")).to.be.null;
    });

    it("throws error if requested when argument is invalid", () => {
      const fn = () => parseDate("prout", true);
      expect(fn).to.throw(Error, /not a valid date/);
    });
  });
});
