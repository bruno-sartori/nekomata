var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { editorSidebarStyle } from '../../styles/editor-sidebar.style';
import '../video-uploader';
let EditorSidebar = class EditorSidebar extends LitElement {
    render() {
        return html `
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
};
EditorSidebar.styles = editorSidebarStyle;
EditorSidebar = __decorate([
    customElement('editor-sidebar')
], EditorSidebar);
export { EditorSidebar };
//# sourceMappingURL=editor-sidebar.js.map