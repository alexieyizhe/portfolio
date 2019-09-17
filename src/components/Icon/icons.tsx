import React from "react";

export interface IconDict {
  [name: string]: any;
}

const iconDict: IconDict = {
  "arrow-left": [<path key="arrow-left-path1" d="M19 12H5M12 19l-7-7 7-7" />],
  "arrow-right": [<path key="arrow-right-path1" d="M5 12h14M12 5l7 7-7 7" />],
  "chevron-left": [<path key="chevron-left-path1" d="M15 18l-6-6 6-6" />],
  "chevron-right": [<path key="chevron-right-path1" d="M9 18l6-6-6-6" />],
  "chevrons-up": [
    <path key="chevrons-up-path1" d="M17 11l-5-5-5 5M17 18l-5-5-5 5" />,
  ],
  download: [
    <path
      key="download-path1"
      d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"
    />,
  ],
  "file-text": [
    <path
      key="file-text-path1"
      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
    />,
    <path key="path2" d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />,
  ],
  github: [
    <path
      key="github-path1"
      d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
    />,
  ],
  linkedin: [
    <path
      key="linkedin-path1"
      d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"
    />,
    <path key="linkedin-path2" d="M2,4a2,2 0 1,0 4,0a2,2 0 1,0 -4,0" />,
  ],
  send: [<path key="send-path1" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />],
};

export default iconDict;
