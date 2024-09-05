import { css } from 'lit';
import { textStyle } from './text.style';

export const editorSidebarStyle = [
  textStyle,
  css`
    .sidebar__title {
      display: flex;
      align-items: center;
      font-size: 28px;
      line-height: 30px;
      color: #FFF;
    }

    .sidebar__title::before {
      height: 34px;
      width: 4px;
      content: '';
      display: inline-block;
      margin-right: 22px;
      background-color: #655dc2;
    }

    .sidebar__button {
      align-items: flex-start;
      appearance: auto;
      background-attachment: fixed, fixed;
      background-clip: border-box, border-box;
      background-color: oklab(0.199408 -0.00255457 -0.0217059);
      background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), linear-gradient(239.16deg, rgb(6, 32, 83) 10.39%, rgb(25, 30, 187) 26.87%, rgb(19, 145, 154) 48.31%, rgb(33, 133, 114) 64.98%, rgb(5, 26, 129) 92.5%);
      background-origin: padding-box, padding-box;
      background-position-x: 0px, 0px;
      background-position-y: 0px, 0px;
      background-repeat: repeat, repeat;
      background-size: cover, cover;
      border-bottom-color: oklab(0.767392 -0.0105193 -0.0112646);
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      border-bottom-style: none;
      border-bottom-width: 0px;
      border-image-outset: 0;
      border-image-repeat: stretch;
      border-image-slice: 100%;
      border-image-source: none;
      border-image-width: 1;
      border-left-color: oklab(0.767392 -0.0105193 -0.0112646);
      border-left-style: none;
      border-left-width: 0px;
      border-right-color: oklab(0.767392 -0.0105193 -0.0112646);
      border-right-style: none;
      border-right-width: 0px;
      border-top-color: oklab(0.767392 -0.0105193 -0.0112646);
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      border-top-style: none;
      border-top-width: 0px;
      box-shadow: none;
      box-sizing: border-box;
      color: oklab(0.767392 -0.0105193 -0.0112646);
      cursor: pointer;
      display: block;
      font-family: "gg sans", "Noto Sans", "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple: Symbols";
      font-feature-settings: normal;
      font-kerning: auto;
      font-optical-sizing: auto;
      font-size: 14px;
      font-size-adjust: none;
      font-stretch: 100%;
      font-style: normal;
      font-variant-alternates: normal;
      font-variant-caps: normal;
      font-variant-east-asian: normal;
      font-variant-ligatures: normal;
      font-variant-numeric: normal;
      font-variant-position: normal;
      font-variation-settings: normal;
      font-weight: 500;
      height: 28px;
      letter-spacing: normal;
      line-height: 24px;
      margin-bottom: 0px;
      margin-left: 0px;
      margin-right: 0px;
      margin-top: 0px;
      outline-color: oklab(0.767392 -0.0105193 -0.0112646);
      outline-style: none;
      outline-width: 0px;
      overflow-x: hidden;
      overflow-y: hidden;
      padding-block-end: 1px;
      padding-block-start: 1px;
      padding-inline-end: 6px;
      padding-inline-start: 6px;
      text-align: left;
      text-indent: 0px;
      text-overflow: ellipsis;
      text-rendering: optimizelegibility;
      text-shadow: none;
      text-transform: none;
      text-wrap: nowrap;
      user-select: none;
      white-space-collapse: collapse;
      width: 220px;
      height: 50px;
      word-spacing: 0px;
      -webkit-border-image: none;
    }
  `
];
