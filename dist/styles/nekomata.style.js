import { css } from "lit";
export const nekomataStyle = css `
  .nekomata-editor {
    background-color: #1c1c26;
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-areas: "sidebar editor" "sidebar editor" "sidebar toolbar";
    grid-template-columns: 15% 85%;
  }

  .sidebar {
    grid-area: sidebar;
    background-color: rgba(0, 0, 0, 0);
    background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), linear-gradient(239.16deg, rgb(6, 32, 83) 10.39%, rgb(25, 30, 187) 26.87%, rgb(19, 145, 154) 48.31%, rgb(33, 133, 114) 64.98%, rgb(5, 26, 129) 92.5%);
    padding: 28px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .editor {
    grid-area: editor;
    background-color: rgba(0, 0, 0, 0);
    background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), linear-gradient(239.16deg, rgb(6, 32, 83) 10.39%, rgb(25, 30, 187) 26.87%, rgb(19, 145, 154) 48.31%, rgb(33, 133, 114) 64.98%, rgb(5, 26, 129) 92.5%);
    display: flex;
    flex-direction: column;
  }

  .editor-toolbar {
    grid-area: toolbar;
    width: 100%;
    height: 350px;
    color: #FFF;
    align-self: flex-end;
    background-color: #17181d;
    display: flex;
    flex-direction: column;
  }
`;
//# sourceMappingURL=nekomata.style.js.map