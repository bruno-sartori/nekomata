import { fixture, assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './playback-grabbers';
import { PlaybackGrabbers } from '../src/components/playback/playback-grabbers';

suite('playback-grabbers', () => {
  test('is defined', () => {
    const el = document.createElement('playback-grabbers');
    assert.instanceOf(el, PlaybackGrabbers);
  });

  test('renders with default values', async () => {
    const el = await fixture(html`<playback-grabbers></playback-grabbers>`);
    assert.shadowDom.equal(
      el,
      `
      <div id="grabbers"></div>
      `
    );
  });

  test('renders grabbers when shouldShowGrabbers is true and timings are set', async () => {
    const el: PlaybackGrabbers = await fixture(html`<playback-grabbers></playback-grabbers>`);
    el.shouldShowGrabbers = true;
    el.timings = [{ start: 10, end: 20 }];
    el.videoDuration = 100;
    await el.updateComplete;
    assert.shadowDom.equal(
      el,
      `
      <div id="grabbers">
        <div id='grabberStart0' class='grabber' style="left: 10%"
          @mousedown="${el.handleGrabberMouseDown(0, 'start')}"
          @pointerdown="${el.handleGrabberPointerDown(0, 'start')}"
        >
          <icon-grabber></icon-grabber>
        </div>
        <div id='grabberEnd0' class='grabber' style="left: 20%"
          @mousedown="${el.handleGrabberMouseDown(0, 'end')}"
          @pointerdown="${el.handleGrabberPointerDown(0, 'end')}"
        >
          <icon-grabber></icon-grabber>
        </div>
      </div>
      `
    );
  });

  test('handles mouse down on grabber', async () => {
    const el = await fixture(html`<playback-grabbers></playback-grabbers>`);
    el.shouldShowGrabbers = true;
    el.timings = [{ start: 10, end: 20 }];
    el.videoDuration = 100;
    await el.updateComplete;

    const grabberStart = el.shadowRoot!.getElementById('grabberStart0')!;
    grabberStart.dispatchEvent(new MouseEvent('mousedown'));
    assert.equal(el.currentlyGrabbed!.index, 0);
    assert.equal(el.currentlyGrabbed!.type, 'start');
  });

  test('handles pointer down on grabber', async () => {
    const el = await fixture(html`<playback-grabbers></playback-grabbers>`);
    el.shouldShowGrabbers = true;
    el.timings = [{ start: 10, end: 20 }];
    el.videoDuration = 100;
    await el.updateComplete;

    const grabberEnd = el.shadowRoot!.getElementById('grabberEnd0')!;
    grabberEnd.dispatchEvent(new PointerEvent('pointerdown'));
    assert.equal(el.currentlyGrabbed!.index, 0);
    assert.equal(el.currentlyGrabbed!.type, 'end');
  });
});
