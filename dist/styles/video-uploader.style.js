import { css } from "lit";
import { textStyle } from "./text.style";
export const videoUploaderStyle = [
    textStyle,
    css `
    .video-uploader__title {
      display: flex;
      align-items: center;
      margin-top: 24px;
      margin-bottom: 12px;
      font-size: 22px;
      line-height: 24px;
      color: #90919c;
    }

    .video-uploader__picker {
      border: 2px dashed #90919c;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      line-height: 24px;
      color: #90919c;
      height: 100px;
      border-radius: 8px;
    }

    .video-uploader__file {
      width: 100%;
      height: 100%;
    }
  `
];
//# sourceMappingURL=video-uploader.style.js.map