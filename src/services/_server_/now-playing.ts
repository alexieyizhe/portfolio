import { createCanvas, Image as CanvasImage } from 'canvas';

import { getNowPlaying } from 'services/now-playing';

const SERVER_SIDE_COLOR_OPTIONS = {
  canvasBuilder: () => createCanvas(64, 64),
  imageClass: CanvasImage,
};

const getNowPlayingDataServerSide = async (accessToken: string) =>
  getNowPlaying(accessToken, SERVER_SIDE_COLOR_OPTIONS);

export { getNowPlayingDataServerSide };
