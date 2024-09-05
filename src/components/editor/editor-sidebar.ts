import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { editorSidebarStyle } from '../../styles/editor-sidebar.style';
import '../video-uploader'

@customElement('editor-sidebar')
export class EditorSidebar extends LitElement {
  static override styles = editorSidebarStyle;

  override render() {
    return html`
      <h1 class="sidebar__title text">Video Maker</h1>
      <video-uploader></video-uploader>
      <br />
      <div>
        <button title="Add grabber" class="sidebar__button text">Add</button><br />
        <button title="Delete grabber" class="sidebar__button text">Delete</button><br />
        <button title="Save changes" class="sidebar__button text">Save</button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'editor-sidebar': EditorSidebar;
  }
}
