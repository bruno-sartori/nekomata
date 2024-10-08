import { css } from "lit";

export const progressBarStyle = css`
   .progress-bar {
      margin-top: 0.5rem;
      background-color: rgb(37 40 51); 
      width: 100%; 
      border-radius: 0.938rem; 
      height: 0.313rem;
    } 

    .progress-bar__fill { 
      background-color: var(--primary); 
      height: 0.313rem;
      border-radius: 0.938rem; 
    }

    .error {
      background-color: var(--error);
    }
`;
