import { css } from "lit";
import { textStyle } from "./text.style";

export const fileUploaderStyle = [
  textStyle,
  css`
    .uploaded-file {
      margin-top: 1rem;
      margin-bottom: 1rem;
      width: calc(640px -2rem);
      display: flex;
      padding: 1rem;
      flex-direction: row;
      background-color: rgb(23 24 32);
      border-radius: 5px;
      align-items: center;
    }

    .uploaded-file__main {
      display: flex;
      flex-direction: column;
    }

    .uploaded-file__container {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }

    .uploaded-file__info {
      display: flex;
      width: 500px;
      flex-direction: column;
      flex: 1;
      justify-content: center;
    }

    .uploaded-file__meta {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }

    .uploaded-file__title {
      font-size: 18px;
      line-height: 22px;
      font-weight: 200;
      color: #fcfcfc;
      position: relative;
      margin-top: 0;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .uploaded-file__size {
      margin: 0;
      font-size: 16px;
      line-height: 18px;
      font-weight: 200;
      color: rgb(109 111 131);
    }

    .uploaded-file__percentage-complete {
      margin: 0;
      text-align: right;
      font-size: 16px;
      line-height: 18px;
      font-weight: 200;
      color: rgb(109 111 131);
    }

    .uploaded-file__progress {
      margin-left: 0.5rem;
    }
  `
];
