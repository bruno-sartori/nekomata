import { css } from "lit";

export const scrollbarStyle = css`
  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent 
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background-color: rgb(2, 49, 150);
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background-color: rgb(0, 77, 229); 
  }
`;
