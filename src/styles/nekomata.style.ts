import { css } from "lit";
import { scrollbarStyle } from "./scrollbar.style";

export const nekomataStyle = [
  scrollbarStyle, 
  css`
    :host {
      --error: #e52e2e;
      --primary: #004de5;
      --secondary: #023196;
      --text-primary: #e4e5e5;
      --text-secondary: #cfd0d1;
      --text-tertiary: #6d6f83;
      --bg-primary: #12131a;
      --bg-primary-2: rgba(18, 19, 26, 0.5);
      --bg-secondary: #171820;
      --bg-tertiary: #12131a;
      --icon-primary: #3a3d4d;

      /* http://meyerweb.com/eric/tools/css/reset/ 
        v2.0 | 20110126
        License: none (public domain)
      */

      html, body, div, span, applet, object, iframe,
      h1, h2, h3, h4, h5, h6, p, blockquote, pre,
      a, abbr, acronym, address, big, cite, code,
      del, dfn, em, img, ins, kbd, q, s, samp,
      small, strike, strong, sub, sup, tt, var,
      b, u, i, center,
      dl, dt, dd, ol, ul, li,
      fieldset, form, label, legend,
      table, caption, tbody, tfoot, thead, tr, th, td,
      article, aside, canvas, details, embed, 
      figure, figcaption, footer, header, hgroup, 
      menu, nav, output, ruby, section, summary,
      time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
      }
      /* HTML5 display-role reset for older browsers */
      article, aside, details, figcaption, figure, 
      footer, header, hgroup, menu, nav, section {
        display: block;
      }
      body {
        line-height: 1;
      }
      ol, ul {
        list-style: none;
      }
      blockquote, q {
        quotes: none;
      }
      blockquote:before, blockquote:after,
      q:before, q:after {
        content: '';
        content: none;
      }
      table {
        border-collapse: collapse;
        border-spacing: 0;
      }
    }

    .nekomata-main {
      background-color: var(--bg-primary);
      width: 100%;
      height: 100vh;
      overflow-y: scroll;
      display: flex;
    }

    .nekomata-main__container {
      width: 100%;
      display: flex;
      align-items: flex-start;
      justify-content: center;
    }
  `
];
