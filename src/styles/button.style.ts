import { css } from "lit";

export const buttonPrimaryStyle = css`
  .button-primary {
    background-color: rgb(2, 49, 150);
    color: var(--text-primary);
    border-radius: 5px;
    height: 54px;
    width: 100%;
    outline: none;
    border: none;
    font-size: 18px;
    transition: background-color 0.1s ease-in-out;
  }

  .button-primary:hover {
    background-color: var(--primary);
    cursor: pointer;
  }

  .button-primary:active {
    background-color: rgb(2, 49, 150);
  }
`;
