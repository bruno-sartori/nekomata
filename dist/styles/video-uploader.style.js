import { css } from "lit";
import { textStyle } from "./text.style";
export const videoUploaderStyle = [
    textStyle,
    css `
    .video-uploader__title {
      display: flex;
      align-items: center;
      margin-top: 1.5rem;
      margin-bottom: 0.75rem;
      font-size: 1.375rem;
      line-height: 1.5rem;
      color: #90919c;
    }

    .video-uploader__picker {
      border: 2px dashed #90919c;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.375rem;
      line-height: 1.5rem;
      color: #90919c;
      height: 6.25rem;
      border-radius: 0.5rem;
    }

    .video-uploader__file {
      width: 100%;
      height: 100%;
    }
  `
];
//# sourceMappingURL=video-uploader.style.js.map