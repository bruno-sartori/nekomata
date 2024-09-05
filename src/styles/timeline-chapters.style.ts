import { css } from "lit";

export const timelineChaptersStyle = css`
  .chapters {
    display: flex;
    flex-direction: row;
    margin-top: 6px;
    margin-bottom: 6px;
    margin-left: 24px;
    height: 36px;
  }

  .chapters__chapter {
    position: relative;
    height: 24px;
    background-color: chartreuse;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    border-radius: 4px;
  }
`;
