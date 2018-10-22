/*
  ICON.JS
    Icons from the Feather theme pack adapted to use only SVG paths. This is done
    so that the SVGDrawIcon component can wrap Icon components and draw the entire icon
    instead of having some rects/circles/other shapes not animate when used with SVGDrawIcon.
    Also adapted to allow for color, size, and fill to be defined in props for reusability.
*/

import React from 'react';
import styled from 'styled-components';

const IconWrapper = styled.span`
  & svg {
    width: ${props => props.size};
    height: ${props => props.size};
    stroke: ${props => props.color};
    fill: ${props => props.fillColor};
  }
`;

const icons = {
  paperPlane: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  ),
  file: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
    </svg>
  ),
  upArrow: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 11l-5-5-5 5M17 18l-5-5-5 5" />
    </svg>
  ),
  github: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  ),
  linkedin: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <path d="M2,4a2,2 0 1,0 4,0a2,2 0 1,0 -4,0" />
    </svg>
  ),
  monitor: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3 L23 3 L23 17 L2 17 L2 3" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  ),
  tablet: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M3 2 L21 2 L21 22 L3 22 L3 2" />
      <path d="M11,17a1,1 0 1,0 2,0a1,1 0 1,0 -2,0" />
    </svg>
  ),
  smartphone: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 2 L19 2 L19 22 L5 22 L5 2" />
      <path d="M11,17a1,1 0 1,0 2,0a1,1 0 1,0 -2,0" />
    </svg>
  ),
  terminal: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 17l6-6-6-6M12 19h8" />
    </svg>
  ),
  playCircle: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2,12a10,10 0 1,0 20,0a10,10 0 1,0 -20,0" />
      <path d="M10 8l6 4-6 4V8z" />
    </svg>
  ),
  shoppingBag: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" />
    </svg>
  ),
  messageSquare: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  star: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  briefcase: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 7 L22 7 L22 21 L2 21 L2 7" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  activity: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  heart: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  headphones: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
  ),
  crosshair: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2,12a10,10 0 1,0 20,0a10,10 0 1,0 -20,0" />
      <path d="M22 12h-4M6 12H2M12 6V2M12 22v-4" />
    </svg>
  ),
  code: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
    </svg>
  ),
  cornerRightUp: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 9l5-5 5 5" />
      <path d="M4 20a4 4 0 0 0 11-10" />
    </svg>
  ),
  cornerSlantedRightUp: (
    <svg
      viewBox="0 0 100 125"
      fill="#A7A7A7"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M24.4 56.1c15.3-2.1 30.5-5.4 45.2-9.9-.2.2-.4.3-.6.5-2.6 2.1-5.5 3.9-8.6 5.2-.2.1 0 2.4 0 2.7 0 .2.2 2.6 0 2.7 4-1.7 7.7-4.2 10.9-7.2 1.4-1.3 3.4-3.1 4.1-4.9.4-1 .3-2.5.2-3.9.1-1.1.2-2-.1-2.1-5.5-2.2-11-4.1-16.7-5.8.4.1-.5 5.2 0 5.3 3 .9 5.9 1.8 8.8 2.8-14.2 4.2-28.6 7.3-43.3 9.3-.2 0 .2 5.3.1 5.3zm50.9-11.6s0 .1-.1.1c0 0 .1 0 .1-.1z" />
    </svg>
  ),
  arrowRight: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  ),
  chevronRight: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  ),
  triangle: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    </svg>
  ),
  aperture: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2,12a10,10 0 1,0 20,0a10,10 0 1,0 -20,0" />
      <path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83M16.62 12l-5.74 9.94"/>
    </svg>
  ),
  chevronUp: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 15l-6-6-6 6" />
    </svg>
  ),
  chevronDown: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  ),
  doubleChevronRight: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13 17l5-5-5-5M6 17l5-5-5-5" />
    </svg>
  ),
  arrowRightUp: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17L17 7M7 7h10v10" />
    </svg>
  ),
  alertTriangle: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17" />
      <path d="M11.9,17a0.1,0.1 0 1,0 0.2,0a0.1,0.1 0 1,0 -0.2,0" />
    </svg>
  ),
  plane: (
    <svg viewBox="0 0 512 512">
      <path d="M501.905 10.593c-12.162-12.163-33.184-13.359-60.806-3.46-18.995 6.81-38.919 18.222-48.451 27.754l-76.55 76.55L64.116 71.859 0 135.975l209.501 82.059-67.266 67.266-95.472 5.591L.984 336.67l103.609 49.994-29.026 29.026 21.24 21.24 28.987-28.987 50.043 103.56 45.768-45.769 5.592-95.472 68.395-68.395 82.043 209.459 64.115-64.116-39.57-251.933 75.43-75.431c9.532-9.531 20.945-29.455 27.755-48.451 9.899-27.614 8.703-48.641-3.46-60.802zM53.706 124.751l20.846-20.846 215.268 33.811-57.136 57.136-178.978-70.101zm355.999 312.025l-20.845 20.846-70.087-178.935 57.128-57.128 33.804 215.217zm67.383-375.514c-5.739 16.012-15.224 31.853-20.718 37.347L197.88 357.101l-5.592 95.472-7.797 7.797-36.202-74.918 26.113-26.113-21.24-21.24-26.07 26.068L52.137 328l7.788-7.788 95.472-5.591L413.888 56.128c5.495-5.495 21.336-14.977 37.348-20.718 18.176-6.516 27.82-5.186 29.429-3.577 1.607 1.608 2.939 11.25-3.577 29.429z" />
    </svg>
  ),
  dumbbell: (
    <svg viewBox="20 20 450 400">
      <path d="M472 144h-24v-12c0-15.464-12.536-28-28-28-4.16.023-8.261.983-12 2.808V96c0-17.673-14.327-32-32-32-17.673 0-32 14.327-32 32v48h-32v-8c.058-13.197-10.593-23.943-23.79-24.002A23.89 23.89 0 0 0 272 118.24c-9.044-8.32-22.956-8.32-32 0-9.044-8.32-22.956-8.32-32 0-9.75-8.894-24.864-8.2-33.758 1.55A23.9 23.9 0 0 0 168 136v8h-32V96c0-17.673-14.327-32-32-32-17.673 0-32 14.327-32 32v10.808A27.706 27.706 0 0 0 60 104c-15.464 0-28 12.536-28 28v12H8a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h24v12c0 15.464 12.536 28 28 28a27.706 27.706 0 0 0 12-2.808V256c0 17.673 14.327 32 32 32 17.673 0 32-14.327 32-32v-48h16v26.744a39.745 39.745 0 0 0 11.72 28.28L184 283.312V416h16V280a8 8 0 0 0-2.344-5.656l-22.624-22.632A24.133 24.133 0 0 1 168 234.744V184h46.856a9.6 9.6 0 0 1 7.744 3.752c.056.08.12.16.176.248.343.546.612 1.135.8 1.752.151.493.253.999.304 1.512.056.502.056 1.01 0 1.512a6.507 6.507 0 0 1-.104.8 8.37 8.37 0 0 1-.92 2.4A7.903 7.903 0 0 1 216 200h-24a8 8 0 0 0-8 8v16a8 8 0 0 0 5.472 7.592l17.6 5.88C221.36 242.216 232 263.84 232 280h16c0-22.008-13.696-50.336-35.832-57.712L200 218.232V216h16a23.864 23.864 0 0 0 17.6-8H304v29.336a24.138 24.138 0 0 1-4.8 14.4L281.6 275.2a7.998 7.998 0 0 0-1.6 4.8v136h16V282.664l16-21.328a40.226 40.226 0 0 0 8-24V208h24v48c0 17.673 14.327 32 32 32 17.673 0 32-14.327 32-32v-10.808A27.706 27.706 0 0 0 420 248c15.464 0 28-12.536 28-28v-12h24a8 8 0 0 0 8-8v-48a8 8 0 0 0-8-8zM32 192H16v-32h16v32zm40 28c0 6.627-5.373 12-12 12s-12-5.373-12-12v-88c0-6.627 5.373-12 12-12s12 5.373 12 12v88zm48 36c0 8.837-7.163 16-16 16s-16-7.163-16-16V96c0-8.837 7.163-16 16-16s16 7.163 16 16v160zm40-88a8 8 0 0 0-8 8v16h-16v-32h32c.009 1.512.161 3.021.456 4.504.088.472.24.904.352 1.36.184.712.32 1.448.56 2.136H160zm40-8a8 8 0 0 1-16 0v-24a8 8 0 0 1 16 0v24zm32 0a8 8 0 0 1-16 0v-24a8 8 0 0 1 16 0v24zm48-24a8 8 0 0 1 16 0v24a8 8 0 0 1-16 0v-24zm-32 0a8 8 0 0 1 16 0v24a8 8 0 0 1-16 0v-24zm96 56H240v-.224a23.85 23.85 0 0 0-.496-4.736c-.048-.216-.152-.416-.2-.64-.144-.584-.352-1.128-.536-1.696a23.215 23.215 0 0 0-1.224-2.992c-.232-.48-.344-1.024-.608-1.488.091-.062.179-.129.264-.2.368-.24.688-.528 1.04-.8.6-.448 1.232-.864 1.792-1.368.464.416 1 .744 1.496 1.12.496.376.984.8 1.52 1.136.755.466 1.535.891 2.336 1.272.544.264 1.056.576 1.6.8.934.358 1.891.655 2.864.888.504.136.976.328 1.496.432 3.077.629 6.25.629 9.328 0 .52-.104.992-.296 1.496-.432.973-.233 1.93-.53 2.864-.888.568-.232 1.08-.544 1.6-.8a24.548 24.548 0 0 0 2.344-1.272c.528-.352 1.008-.752 1.512-1.136.504-.384 1.032-.704 1.496-1.12.464.416 1 .744 1.496 1.12.496.376.984.8 1.52 1.136.755.466 1.535.891 2.336 1.272.544.264 1.056.576 1.6.8.934.358 1.891.655 2.864.888.504.136.976.328 1.496.432 12.955 2.633 25.591-5.734 28.224-18.688.322-1.585.483-3.198.48-4.816h32v32zm48 64c0 8.837-7.163 16-16 16s-16-7.163-16-16V96c0-8.837 7.163-16 16-16s16 7.163 16 16v160zm40-36c0 6.627-5.373 12-12 12s-12-5.373-12-12v-88c0-6.627 5.373-12 12-12s12 5.373 12 12v88zm32-28h-16v-32h16v32z" />
    </svg>
  )
};

const Icon = props => (
  <IconWrapper size={props.size} color={props.color}>
    {icons[props.name]}
  </IconWrapper>
);

export default Icon;
