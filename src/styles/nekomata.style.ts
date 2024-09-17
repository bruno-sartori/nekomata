import { css } from "lit";
import { scrollbarStyle } from "./scrollbar.style";

export const nekomataStyle = [
  scrollbarStyle, 
  css`
    :host {
      --error: #e52e2e;
      --primary: #004de5;
      --secondary: #023196;
      --text-primary: #e4e5e5;
      --text-secondary: #cfd0d1;
      --text-tertiary: #6d6f83;
      --bg-primary: #12131a;
      --bg-primary-2: rgba(18, 19, 26, 0.5);
      --bg-secondary: #171820;
      --bg-tertiary: #12131a;
      --icon-primary: #3a3d4d;
    }

    .nekomata-main {
      background-color: var(--bg-primary);
      width: 100%;
      height: 100vh;
      overflow-y: scroll;
      display: flex;
    }

    .nekomata-main__container {
      width: 100%;
      display: flex;
      align-items: flex-start;
      justify-content: center;
    }
  `
];
