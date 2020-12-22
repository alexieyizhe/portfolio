import { createCanvas, Image as CanvasImage } from 'canvas';

import { getNowPlaying } from 'services/now-playing';

// document `canvas` and Image don't exist server-side
const SERVER_SIDE_COLOR_OPTIONS = {
  canvasBuilder: () => createCanvas(64, 64),
  imageClass: CanvasImage,
};

export const getNowPlayingDataServerSide = async (accessToken: string | null) =>
  getNowPlaying(accessToken, SERVER_SIDE_COLOR_OPTIONS);
