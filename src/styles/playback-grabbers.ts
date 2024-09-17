import { css } from "lit";

export const playbackGrabbersStyle = css`
  .grabber {
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
    background-color: #655dc2;
  }

  .grabber:hover {
    transform: scaleY(1.4);
  }

  /*
  .grabber svg {
    user-drag: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
  }*/
`;
