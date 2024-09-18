import { css } from "lit";

export const iconLoadingStyle = css`
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(359deg); }
  }

  .loading-spin,
  .icon_loading-spin {
    -webkit-animation: spin 2s infinite linear;
    animation: spin 2s infinite linear;
  }

  .icon-loading {
    align-self: center;
    justify-self: center;
    display: flex;
    margin: auto;
    position: relative;
    width: 1rem;
    height: 1rem;
  }

  .icon-loading div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 0.8rem; /* Proporcional ao 64px baseado no novo tamanho de 1rem */
    height: 0.8rem; /* Proporcional ao 64px */
    margin: 0.1rem; /* Proporcional ao margin de 8px */
    border: 0.125rem solid var(--primary); /* Proporcional ao border de 8px */
    border-radius: 50%;
    animation: spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: var(--primary) transparent transparent transparent;
  }

  .icon-loading div:nth-child(1) {
    animation-delay: -0.45s;
  }

  .icon-loading div:nth-child(2) {
    animation-delay: -0.3s;
  }

  .icon-loading div:nth-child(3) {
    animation-delay: -0.15s;
  }
`;
