import { Content, CurrentlyGrabbed, SeekableStyle } from "../types";
import { PendingFile } from "./api";
import { DeepOptional } from "./deep-optional";

export type SettingsContext = {
  ratingSystem: 'ClassInd' | 'MPA';
  language: 'pt-BR' | 'en' | 'es-ES';
};
export type SettingsContextUnreq = DeepOptional<SettingsContext>;

// --------------------

export type UserContext = {
  name: string;
  email: string;
  pendingUploads: PendingFile[];
};
export type UserContextUnreq = DeepOptional<UserContext>;

export type ContentContext = {
  [key: string]: Content;
};
export type ContentContextUnreq = DeepOptional<ContentContext>;

// --------------------

export type PlayerContext = {
  src: string;
  playing: boolean;
  seek: number;
  video?: HTMLVideoElement;
  loaded: boolean;
  currentTime: number;
  duration: number;
};
export type PlayerContextUnreq = DeepOptional<PlayerContext>;

// --------------------

export type TimelineContext = {
  duration: number;
  metric: 'hours' | 'minutes',
  fill: boolean;
};
export type TimelineContextUnreq = DeepOptional<TimelineContext>;

// --------------------

export type SeekableContext = {
  rect?: DOMRect;
  style: SeekableStyle;
};
export type SeekableContextUnreq = DeepOptional<SeekableContext>;

// --------------------

export type GrabbersContext = {
  visible: boolean;
  currentlyGrabbed?: CurrentlyGrabbed;
};
export type GrabbersContextUnreq = DeepOptional<GrabbersContext>;
