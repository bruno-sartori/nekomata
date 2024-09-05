import { css } from "lit";
export const editorPlaybackStyle = css `
  .playback {
    position: relative;
    display: flex;
    margin-top: 1rem;
    margin-left: 24px;
    margin-right: 24px;
    height: 90px;
    width: 100%;
    background: #2f3b44;
    margin-bottom: 1rem;
    border-radius: 6px;
  }

  .playback .grabber {
    position: absolute;
    top: -4px;
    bottom: -4px;
    width: 18px;
    border-radius: 2px;
    z-index: 4;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
    cursor: pointer;
    transition: transform 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--highlight);
  }


  .playback .grabber:hover {
    transform: scaleY(1.4);
  }

  .playback .grabber svg {
    /* user-drag: none;
      -moz-user-select: none;
      -webkit-user-drag: none; */
  }

  .playback .progress {
    background: #0072cf;
    opacity: 0.3;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    cursor: pointer;
    pointer-events: none;
    z-index: 3;
    flex: 1;
  }

  .playback__snapshots {
    position: relative;
    display: flex;
    flex-direction: row;
    z-index: 2;
  }
`;
//# sourceMappingURL=editor-playback.style.js.map