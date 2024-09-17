import { css } from "lit";
import { textStyle } from "./text.style";

export const iconAgeRatingClassIndStyle = [
  textStyle,
  css`
    .icon-age-rating-classind {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      text-align: center;
      font-size: 16px;
      font-weight: bold;
    }

    .age-ER {
      background-color: #fff;
      border: 1px solid #000;
      color: #000;
    }

    .age-L {
      background-color: #0c9447;
      color: #fff;
    }

    .age-10 {
      background-color: #0f7dc2;
      color: #fff;
    }

    .age-12 {
      background-color: #f8c411;
      color: #fff;
    }

    .age-14 {
      background-color: #e67824;
      color: #fff;
    }

    .age-16 {
      background-color: #db2827;
      color: #fff;
    }

    .age-18 {
      background-color: #1d1815;
      color: #fff;
    }
  `
];

export const iconAgeRatingMPAStyle = [
  textStyle,
  css`
    .icon-age-rating-mpa {
      height: 24px;
      min-width: 24px;
      display: flex;
      padding-left: 5px;
      padding-right: 5px;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      flex-direction: column;
      background-color: #fff;
    }

    .age-G {
      color: #006835;
    }

    .age-PG {
      color: #f15f30;
    }

    .age-PG-13 {
      color: #83459b;
    }

    .age-R {
      color: #d82027;
    }

    .age-NC-17 {
      color: #28469d;
    }
  `
];
