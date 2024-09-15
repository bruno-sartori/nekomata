import { css } from "lit";
import { textStyle } from "./text.style";

export const textFieldStyle = [
  textStyle,
  css`
    .text-field {
      display: flex;
      flex-direction: column;
      margin-bottom: 16px;
    }

    .text-field__label {
      font-weight: bold;
      margin-bottom: 8px;
      color: var(--text-secondary);
    }

    .text-field__input {
      padding: 1rem;
      border: 2px solid var(--text-tertiary);
      border-radius: 4px;
      font-size: 16px;
      outline: none;
      caret-color: var(--primary);
      color: var(--text-secondary);
      background-color: transparent;
    }

    .text-field__input:disabled {
      background-color: var(--bg-tertiary);
      color: var(--text-tertiary);
      cursor: not-allowed;
    }

    .text-field__input:focus {
      border-color: var(--primary);
    }

    .text-field__input::placeholder {
      color: var(--text-tertiary);
    }
  `
];

export const textareaFieldStyle = [
  textStyle,
  css`
    .textarea-field {
      display: flex;
      flex-direction: column;
      margin-bottom: 16px;
    }

    .textarea-field__label {
      font-weight: bold;
      margin-bottom: 8px;
      color: var(--text-secondary);
    }

    .textarea-field__input {
      resize: none;
      padding: 1rem;
      border: 2px solid var(--text-tertiary);
      border-radius: 4px;
      font-size: 16px;
      outline: none;
      caret-color: var(--primary);
      color: var(--text-secondary);
      background-color: transparent;
      height: 8rem;
    }

    .textarea-field__input:focus {
      border-color: var(--primary);
    }

    .textarea-field__input::placeholder {
      color: var(--text-tertiary);
    }
  `
];

export const keywordsFieldStyle = [
  textStyle,
  css`
    .keywords-field {
      display: flex;
      flex-direction: column;
      margin-bottom: 16px;
    }

    .keywords-field__label {
      font-weight: bold;
      margin-bottom: 8px;
      color: var(--text-secondary);
    }

    .multi-search-filter {
      min-height: 16px;
      padding: 1rem;
      border: 2px solid var(--text-tertiary);
      border-radius: 4px;
      font-size: 16px;
      background-color: transparent;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }

    .multi-search-filter:focus-within {
      border-color: var(--primary);
    }

    .keywords-field__input {
      border: 0px;
      width: 150px;
      outline: none;
      position: relative;
      font-size: 16px;
      height: 16px;
      z-index: 9;
      caret-color: var(--primary);
      color: var(--text-secondary);
      background-color: transparent;
    }

    .multi-search-item__placeholder {
      z-index: 1;
      margin-left: 1px;
      color: var(--text-tertiary);
      position: absolute;
    }

    .multi-search-item {
      margin: 2px;
      padding: 2px 24px 2px 8px;
      float: left;
      display: flex;
      background-color: var(--primary);
      color: var(--text-primary);
      border-radius: 3px;
      position: relative;
      align-self: center;
    }

    .multi-search-item > span {
      line-height: 18px;
      margin-right: 0.45rem;
    }

    .multi-search-item__close {
      line-height: 18px;
      margin-left: 1rem;
      position: absolute;
      right: 8px;
      top: 2px;
      cursor: pointer;
    }
    
  `
];

export const selectFieldStyle = [
  textStyle,
  css`
    .select-field {
      display: flex;
      flex-direction: column;
      margin-bottom: 16px;
    }

    .select-field__label {
      font-weight: bold;
      margin-bottom: 8px;
      color: var(--text-secondary);
    }

    .select-field__input {
      border: 0px;
      width: 150px;
      outline: none;
      position: relative;
      font-size: 16px;
      height: 16px;
      z-index: 9;
      caret-color: var(--primary);
      color: var(--text-secondary);
      background-color: transparent;
    }

    .select-field__container {
      display: flex;
      position: relative;
    }

    .select-field__container2 {
      width: -webkit-fill-available;
      min-height: 16px;
      padding: 1rem;
      border: 2px solid var(--text-tertiary);
      border-radius: 4px;
      font-size: 16px;
      background-color: transparent;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }

    .select-field__placeholder {
      z-index: 1;
      margin-left: 1px;
      color: var(--text-tertiary);
      position: absolute;
    }

    .select-field__icon {
      position: absolute;
      top: 50%;
      right: 1rem;
      transform: translateY(-50%);
    }

    .select-field__input:disabled {
      background-color: var(--bg-tertiary);
      color: var(--text-tertiary);
      cursor: not-allowed;
    }

    .select-field__input:focus {
      border-color: var(--primary);
    }

    .select-field__input::placeholder {
      color: var(--text-tertiary);
    }

    .select-field__list {
      position: absolute;
      width: 100%;
      margin-top: 58px;
      background-color: var(--bg-tertiary);
      border-radius: 4px;
      padding: 4px;
      z-index: 1000;
      flex-direction: column;
      display: none;
    }

    .select-field__list.active {
      display: flex;
    }

    .select-field__option {
      padding: 1rem;
      color: var(--text-primary);
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      gap: 1rem;
    }

    .select-field__value {
      color: var(--text-primary);
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      gap: 1rem;
    }

    .select-field__option:hover {
      background-color: var(--icon-primary);
    }
  `
];

