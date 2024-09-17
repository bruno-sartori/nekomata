import { css } from "lit";
import { textStyle } from "./text.style";

export const fileUploaderStyle = [
  textStyle,
  css`
    .file-uploader {
      display: 'flex';
      margin: 5rem;
    }

    .file-uploader__title {
      display: flex;
      align-items: center;
      margin-top: 24px;
      margin-bottom: 12px;
      font-size: 22px;
      line-height: 24px;
      color: #fff;
    }

    .file-uploader__description {
      display: flex;
      align-items: center;
      margin-top: 24px;
      margin-bottom: 12px;
      font-size: 16px;
      line-height: 22px;
      color: rgb(109 111 131);
    }

    .file-uploader__picker {
      cursor: pointer;
      padding: 1rem;
      border: 1px dashed rgb(2 49 150);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: rgb(17 22 36);
      width: 640px;
      height: 200px;
      border-radius: 4px;
    }

    .file-uploader__picker__title {
      font-size: 18px;
      line-height: 22px;
      font-weight: 200;
      color: #fff;
    }

    .file-uploader__picker__description {
      font-size: 16px;
      line-height: 18px;
      font-weight: 200;
      color: rgb(109 111 131);
    }

    .file-uploader__file {
      width: 100%;
      height: 100%;
    }

    .title-secondary {
      margin-top: 2rem;
      font-size: 18px;
      line-height: 22px;
      font-weight: 200;
      color: #fff;
    }
  `
];
