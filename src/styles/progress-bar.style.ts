import { css } from "lit";

export const progressBarStyle = css`
   .progress-bar {
      margin-top: 0.5rem;
      background-color: rgb(37 40 51); 
      width: 100%; 
      border-radius: 15px; 
      height: 5px;
    } 

    .progress-bar__fill { 
      background-color: rgb(0 77 229); 
      height: 5px;
      border-radius: 15px; 
    } 
`;
