import { css } from 'lit';
import { textStyle } from './text.style';

export const editorToolbarStyle = [
  textStyle,
  css`
    .toolbar {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 12px 48px;
    }

    .toolbar__group {
      display: flex;
      flex-direction: row;
      gap: 12px;
    }

    .toolbar__button {
      border-radius: 6px;
      background-color: #1c1c26;
      outline: none;
      border: none;
      padding: 8px;
    }

    .toolbar__timeline {
      width: 100%;
      display: flex;
      flex: 1;
    }
  `
];
