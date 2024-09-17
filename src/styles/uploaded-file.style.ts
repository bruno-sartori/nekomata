import { css } from "lit";
import { textStyle } from "./text.style";

export const uploadedFileStyle = [
  textStyle,
  css`
    .uploaded-file {
      margin-top: 1rem;
      margin-bottom: 1rem;
      width: 40rem;
      display: flex;
      padding: 1rem;
      flex-direction: row;
      background-color: var(--bg-secondary);
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
      width: 33.125rem;
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
      font-size: 1.125rem;
      line-height: 1.375rem;
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
      font-size: 1rem;
      line-height: 1.125rem;
      font-weight: 200;
      color: rgb(109 111 131);
    }

    .uploaded-file__percentage-complete {
      margin: 0;
      text-align: right;
      font-size: 1rem;
      line-height: 1.125rem;
      font-weight: 200;
      color: rgb(109 111 131);
    }

    .uploaded-file__progress {
      margin-left: 0.5rem;
    }

    .uploaded_file__show-metadata {
      background: none;
      color: inherit;
      border: none;
      padding: 0;
      font: inherit;
      cursor: pointer;
      outline: inherit;
    }
  `
];
