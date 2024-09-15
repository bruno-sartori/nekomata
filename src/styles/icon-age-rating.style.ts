import { css } from "lit";
import { textStyle } from "./text.style";

export const iconAgeRatingStyle = [
  textStyle,
  css`
    .icon-age-rating {
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
