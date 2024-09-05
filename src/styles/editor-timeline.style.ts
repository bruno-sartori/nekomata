import { css } from "lit";

export const editorTimelineStyle = css`
  .timeline {
    width: 100%;
    display: flex;
    flex: 1;
  }

  .timeline__scroll {
    overflow-x: scroll;
    display: flex;
    flex-direction: column;
  }

  .timeline__info {
    width: fit-content;
    display: flex;
    flex-direction: row;
    height: 36px;
    border-top: 2px solid #90919c;
  }

  .timeline__time {
    width: 24px;
    margin-left: 24px;
    color: var(--color-secondary);
    border-left: 2px solid #90919c;
    padding: 4px;
  }

  .timeline__time--half {
    height: 50%;
  }
`;
