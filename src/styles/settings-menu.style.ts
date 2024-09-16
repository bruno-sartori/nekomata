import { css } from "lit";
import { textStyle } from "./text.style";
import { scrollbarStyle } from "./scrollbar.style";

export const settingsMenuStyle = [
  textStyle,
  scrollbarStyle,
  css`
    .settings-menu {
      background-color: var(--bg-primary-2);
      backdrop-filter: blur(5px);
      position: fixed;
      z-index: 1000;
      top: 0;
      right: 0;
      width: 100%;
      height: 100vh;
      visibility: hidden;
      transition: visibility 0.2s ease-in-out;
      will-change: visibility;
    }

    .settings-menu.active {
      visibility: visible;
    }
    
    .settings-menu__container {
      background-color: var(--bg-secondary);
      position: fixed;
      top: 0;
      padding: 2rem;
      width: 35vw;
      height: 100vh;
      left: -100%;
      direction:rtl; 
      overflow-y: scroll;
      transition: left 0.2s ease-in-out;
      will-change: left;
    }

    .settings-menu__container-scroll {
      width: 100%;
      direction:ltr;
      margin-bottom: 5rem;
    }

    .settings-menu__container.active {
      left: 0;
    }

    .settings-menu__close {
      position: absolute;
      right: 1rem;
      top: 1rem;
      background: none;
      color: inherit;
      border: none;
      padding: 0;
      font: inherit;
      cursor: pointer;
      outline: inherit;
    }

    .settings-menu__title {
      display: flex;
      align-items: center;
      margin-top: 24px;
      margin-bottom: 12px;
      font-size: 22px;
      line-height: 24px;
      color: var(--text-primary);
    }

    .settings-menu__description {
      display: flex;
      align-items: center;
      margin-top: 24px;
      margin-bottom: 12px;
      font-size: 16px;
      line-height: 22px;
      color: var(--text-tertiary);
    }

    .settings-menu__form {
      margin-top: 2.5rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  `
];
