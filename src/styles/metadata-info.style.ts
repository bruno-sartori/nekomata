import { css } from "lit";
import { textStyle } from "./text.style";
import { scrollbarStyle } from "./scrollbar.style";

export const metadataInfoStyle = [
  textStyle,
  scrollbarStyle,
  css`
    .metadata-info {
      background-color: var(--bg-primary-2);
      backdrop-filter: blur(5px);
      position: fixed;
      z-index: 1000;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      visibility: hidden;
      transition: visibility 0.2s ease-in-out;
      will-change: visibility;
    }

    .metadata-info.active {
      visibility: visible;
    }
    
    .metadata-info__container {
      background-color: var(--bg-secondary);
      position: fixed;
      top: 0;
      padding: 2rem;
      width: 35vw;
      height: 100vh;
      right: -100%;
      overflow-y: scroll;
      transition: right 0.2s ease-in-out;
      will-change: right;
    }

    .metadata-info__container-scroll {
      width: 100%;
      margin-bottom: 5rem;
    }

    .metadata-info__container.active {
      right: 0;
    }

    .metadata-info__close {
      background: none;
      color: inherit;
      border: none;
      padding: 0;
      font: inherit;
      cursor: pointer;
      outline: inherit;
    }

    .metadata-info__title {
      display: flex;
      align-items: center;
      margin-top: 24px;
      margin-bottom: 12px;
      font-size: 22px;
      line-height: 24px;
      color: var(--text-primary);
    }

    .metadata-info__description {
      display: flex;
      align-items: center;
      margin-top: 24px;
      margin-bottom: 12px;
      font-size: 16px;
      line-height: 22px;
      color: var(--text-tertiary);
    }

    .metadata-info__form {
      margin-top: 2.5rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  `
];
