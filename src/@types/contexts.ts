import { DeepOptional } from "./deep-optional";

export type PlayerContext = {
  src: string;
  playing: boolean;
  seek: number;
  video?: HTMLVideoElement;
};

export type PlayerContextUnreq = DeepOptional<PlayerContext>;
