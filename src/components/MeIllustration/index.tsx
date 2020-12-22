import { FC, memo, useState } from 'react';
import { styled } from 'goober';

import { useSiteStore } from 'services/store';

import Layers from './layers';

const Container = styled('svg')`
  height: 280px;

  @media only screen and (max-width: 600px) {
    height: 220px;
  }
`;

const SantaHat = memo(() => Layers.SANTA_HAT);

const MeIllustration: FC = () => {
  const { isFocusingOnSomething } = useSiteStore('isFocusingOnSomething');
  const [, setNumClicks] = useState(0);
  const [isHovering, setHovering] = useState(false);
  const expression = isFocusingOnSomething
    ? Layers.SURPRISED
    : isHovering
    ? Layers.WEIRD
    : Layers.GRIN_HAPPY;

  const onIllustrationClick = () =>
    setNumClicks((prev) => {
      if ((prev + 1) % 3 === 0)
        window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
      return prev + 1;
    });

  return (
    <Container
      overflow="visible"
      viewBox="233.511 78 682.97 695.5"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={onIllustrationClick}
    >
      <g
        id="Master/Character/Sitting"
        fill="none"
        fillRule="evenodd"
        stroke="none"
        strokeWidth="1"
      >
        <g id="Shadow" transform="translate(585 715)">
          <ellipse rx="275" ry="55" fill="#e0f8ff" />
        </g>

        <g id="Upper Body" transform="translate(272 187)">
          <g
            id="Upper Body/Arms Up"
            fill="none"
            fillRule="evenodd"
            stroke="none"
            strokeWidth="1"
          >
            <g id="Hand-2" transform="translate(346.853 -91.843)">
              <path
                id="Fill-1"
                fill="#FFF"
                d="M213.308 57.491c9.719-15.647 2.215-19.392-3.191-16.093 0 0 9.362-11.507 4.75-16.49-2.881-3.114-5.906-2.679-13.599 4.364 0 0 8.766-12.902 3.763-17.864-4.643-4.605-11.031 3.96-16.647 10.521 0 0 5.169-16.079-3.634-16.789-8.711-.703-21.206 24.891-26.455 35.448 1.779-12.863-5.792-24.92-10-19.34-5.2 6.9-26.184 73.783-57.935 131.19C49.999 218.06 0 212.795 0 212.795l26.85 88.918s7.874 4.301 38.627-12.876c55.732-31.13 88.165-95.476 102.549-131.073 1.338-.793 2.149-1.576 2.327-2.31a260.802 260.802 0 014.108-14.89c1.495-4.372 2.31-7.104 2.488-7.709 11.375-33.603 27.547-61.178 36.359-75.364"
              />
              <path
                id="Fill-3"
                fill="#141414"
                d="M214.883 35.255c2.6-4.343 5.269-10.77 1.545-14.792-2.753-2.974-5.65-3.17-9.033-1.464 5.227-13.583-6.594-19.138-15.432-7.49.5-5.128-1.186-11.12-7.041-11.488-7.65-.62-16.233 12.734-24.598 28.847-1.425-8.766-6.974-18.614-13.728-11.9C133.72 46.313 115.946 98.06 92.2 141.804c-.188.339-1.044 2.12-1.293 2.546-19.088 32.624-40.44 48.123-55.992 55.46-9.155 4.318-17.273 6.323-23.351 7.234l1.202 4.142c6.278-.99 14.442-3.074 23.684-7.398 33.256-15.56 54.505-48.065 66.713-73.473.369-.768 1.966-4.672 2.31-5.381 18.938-38.881 33.966-80.214 44.52-105.406 3.094-2.335 7.564 9.118 6.196 17.769-.2 2.344-.136 4.577.502 6.87.379 2.172 2.457 3.702 4.067 5.182 6.052 5.563 3.89 15.662 3.755 16.254-.142.62-.16 1.027-.383 1.486-.635 1.24 1.09 2.186 1.793 1.02 4.426-7.624.813-17.55-4.475-23.78-.931-1.78-1.215-4.556-.868-6.56 4.187-8.428 16.928-34.08 24-33.51 5.272.959 2.832 9.596 1.85 13.787l-10.507 16.858a1.625 1.625 0 002.712 1.786l11.435-16.461c3.85-3.924 9.483-13.188 13.464-10.31 4.557 7.287-11.86 25.63-15.24 32.47-1.17 1.75 1.545 3.602 2.746 1.869l11.824-16.563c7.845-7.144 9.166-5.722 10.442-4.343 2.53 2.733-2.168 10.414-4.84 13.706-.006.015-9.193 11.586-9.203 11.6-1.201 1.472 1.025 3.393 2.306 1.99l9.865-10.547c6.212-2.717 5.839 3.753.069 13.27-5.792 6.18-31.834 59.372-38.621 82.37-.474 1.607-2.901 8.05-3.453 9.526-4.217 11.27-10.92 27.396-20.34 44.956-29.424 54.848-62.273 81.26-84.65 93.758-12.737 7.114-21.396 10.43-27.09 11.925l1.19 4.1c7.46-1.97 16.844-6.095 27.975-12.313 41.465-23.16 69.854-64.74 86.369-95.544 8.988-16.764 15.529-32.245 19.824-43.528.29-.762 6.056-17.405 6.264-18.105 8.238-24.354 20.35-49.478 36.144-74.903 7.717-13.17 5.963-18.506-.232-20.358"
              />
            </g>
            <g id="Hand-1" transform="translate(-36 -109)">
              <path
                id="Fill-5"
                fill="#FFF"
                d="M212.79 234.02c-40.75-7.525-77.186-32.169-100.798-88.184l-.23-.046C90.145 89.731 78.145 31.704 74.069 24.936c-3.606-5.988-12.387 5.22-11.952 18.198C57.99 32.09 48.218 5.337 39.48 5.131c-8.83-.204-5.355 16.324-5.355 16.324-4.905-7.108-10.37-16.29-15.466-12.19-5.491 4.416 1.89 18.157 1.89 18.157-6.921-7.802-9.884-8.549-13.072-5.752-5.105 4.48 3.013 16.894 3.013 16.894-5.035-3.84-12.887-.895-4.843 15.676 8.873 18.276 26.53 57.384 32.563 101.89.123.908 1.155 1.983 2.938 3.137 29.2 100.543 93.167 142.72 145.342 163.823l26.3-89.07z"
              />
              <path
                id="Fill-7"
                fill="#141414"
                d="M187.108 318C127.608 293.817 59.44 245.24 36.377 129.36c-.103-.519-.82-2.898-1.088-4.058-7.286-26.88-23.35-69.218-27.73-74.99-4.752-10.064-4.451-16.538 1.445-13.19l8.718 11.511c1.129 1.53 3.542-.15 2.5-1.738-.01-.016-7.946-12.477-7.951-12.494-2.316-3.55-6.191-11.677-3.392-14.133 1.412-1.24 2.874-2.517 9.935 5.403l10.043 17.7c1.015 1.848 3.907.288 2.924-1.574-2.653-7.154-17.077-27.102-11.79-33.877 4.258-2.449 8.9 7.35 12.324 11.652l9.665 17.558a1.629 1.629 0 002.134.677 1.625 1.625 0 00.749-2.172L36.16 17.778c-.542-4.27-2.072-13.113 3.27-13.519 7.094.166 17.106 27.001 20.396 35.82.137 2.026-.434 4.76-1.545 6.433-5.905 5.647-10.527 15.145-6.916 23.187.578 1.232 2.564.421 2.06-.879-.175-.48-.493-.97-.398-1.467.114-.597-1.175-10.872 5.42-15.778 1.755-1.305 3.98-2.61 4.583-4.732.872-2.214 1.167-4.428 1.212-6.78-.464-8.747 5.17-19.674 8.005-17.03 9.198 30.508 21.13 80.533 40.055 126.55.25.658 1.65 3.32 2.245 4.467 14.373 29.762 33.765 51.323 57.672 64.771 12.152 6.835 25.4 11.566 39.96 14.272l1.216-4.118c-45.717-8.3-78.49-36.819-99.51-86.68-.126-.304-.271-.576-.485-1.045C96.475 97.627 84.974 49.236 75.892 20.84c-6.022-7.38-12.562 1.84-14.888 10.41C54.354 14.357 47.204.184 39.53.007c-5.861-.239-8.16 5.544-8.195 10.697C23.753-1.798 11.42 2.5 15.21 16.552c-3.19-2.047-6.09-2.153-9.136.52-4.121 3.615-2.133 10.282.002 14.872-6.353 1.2-8.652 6.326-2.342 20.224 14.633 30.144 22.908 54.783 29.953 84.84.536 2.286 1.947 6.8 2.796 10.282 13.882 57.021 39.807 98.522 76.33 130.685 24.152 21.268 50.283 34.927 73.077 44.15l1.218-4.126z"
              />
            </g>
            <path
              id="T-Shirt"
              fill="#ed6663"
              d="M367.247 196.113a2.127 2.127 0 114.145-.955l6.237 27.076c36.853-9.01 43.433-24.417 43.433-24.417S415 149 390 102c-66 6-84-3-94-3-20-7-59.002-4.827-81 2-29 9-33 11-66.545 6.957-3.984 16.552-25.338 59.328-45.083 93.25C117 210 129.392 214.23 154.297 220.934l1.392-20.971c.078-1.171 1.096-2.045 2.263-1.981a2.127 2.127 0 011.98 2.263l-1.797 27.103c-.003.04-.014.076-.02.115-1.93 77.19-4.457 166.784-4.457 166.784l256.03-4s-27.1-113.073-35.573-164.337c-.003-.013-.01-.024-.012-.037l-6.856-29.76z"
            />
            <g id="neck" transform="translate(232.774 68.641)">
              <path
                id="Fill-30"
                fill="#FFF"
                d="M5.766 2L2 37.165s7.427 16.097 30.211 17.2C62.95 55.85 56.516 36.806 56.516 36.806l-.855-31.757"
              />
              <path
                id="Fill-32"
                fill="#141414"
                d="M32.114 56.361C8.392 55.213.508 38.704.184 38.002a2.01 2.01 0 01-.173-1.05L3.778 1.786A2.004 2.004 0 015.98.011a2.001 2.001 0 011.776 2.202L4.052 36.787c1.39 2.575 8.91 14.642 28.256 15.578 10.251.493 19.116-1.336 21.855-5.298 2.81-4.064.545-9.406.522-9.459a2.041 2.041 0 01-.168-.749l-.855-31.756a2 2 0 011.946-2.053c1.095-.042 2.023.841 2.053 1.945l.845 31.398c.612 1.613 2.538 7.713-1.028 12.913-3.253 4.743-11.97 7.14-21.992 7.14-1.085 0-2.209-.029-3.372-.085z"
              />
            </g>
          </g>
        </g>
        <g id="Lower Body Sit" transform="translate(264 454)">
          <g
            id="Lower Body Sit/Legs Crossed"
            fill="none"
            fillRule="evenodd"
            stroke="none"
            strokeWidth="1"
          >
            <g id="Shoe-1" transform="translate(299.859 229.826)">
              <path
                id="Fill-1"
                fill="#dedede"
                d="M50.201 0S-2.47 30.81.091 60.259C2.65 89.708 25.537 89.068 36.1 88.588 62.348 87.395 91 64.461 91 64.461L50.201 0z"
              />
              <path
                id="Fill-3"
                fill="#141414"
                d="M36.826 73.973a1.99 1.99 0 01-1.28-.465c-11.63-9.71-15.186-21.826-15.33-22.338a2 2 0 013.845-1.097c.057.195 3.441 11.509 14.048 20.365a2 2 0 01-1.283 3.535"
              />
              <path
                id="Fill-5"
                fill="#141414"
                d="M51.191 65.189a1.99 1.99 0 01-1.28-.465C36.55 53.569 32.471 39.666 32.304 39.08a2 2 0 013.846-1.099c.038.133 3.95 13.34 16.323 23.672a2 2 0 01-1.283 3.536"
              />
            </g>
            <g id="Leg-1" transform="translate(301.505 45.115)">
              <path
                id="Fill-7"
                fill="#145374"
                d="M0 56.39S85.625 16.474 191.526 1.912c102.431-14.084 118.107 52.568 93.468 102.431C231.219 213.177 91.587 261.862 91.587 261.862 15.928 223.635 41.287 132.77 0 56.39"
              />
              <path
                id="Fill-9"
                fill="#FFF"
                d="M87.115 141.392a2 2 0 01-1.183-3.614c.694-.507 69.544-51.153 90.156-90.923a1.999 1.999 0 113.55 1.841c-8.85 17.079-26.925 37.814-53.723 61.629-19.895 17.681-37.446 30.553-37.62 30.681a1.99 1.99 0 01-1.18.386"
              />
            </g>
            <g id="Shoe-2" transform="translate(474.777 181.69)">
              <path
                id="Fill-11"
                fill="#141414"
                d="M29.78 72.366s-14.476 9.848.301 25.887c7.147 7.76 93.353 42.042 121.037 24.541 12.788-8.084 15.698-17.168 17.036-21.043C153.63 97.326 29.78 72.366 29.78 72.366"
              />
              <path
                id="Fill-13"
                fill="#dedede"
                d="M59.438 19.058c17.295-1.107 49.801 13.793 89.953 34.057 40.272 20.323 24.436 63.422-12.285 65.91-21.72 1.473-76.057-11.054-100.913-26.116-19.28-11.684-12.952-34.48-8.67-43.466 6.323-13.27 20.012-29.623 31.915-30.385"
              />
              <path
                id="Fill-16"
                fill="#141414"
                d="M101.784 87.269c-.023-.001-.049-.002-.074-.005a1.901 1.901 0 01-1.744-2.048c1.542-19.366 11.567-32.041 11.992-32.571a1.906 1.906 0 012.676-.291c.818.658.948 1.854.292 2.674-.097.12-9.723 12.34-11.168 30.49a1.903 1.903 0 01-1.974 1.75"
              />
              <path
                id="Fill-18"
                fill="#141414"
                d="M121.324 90.88c-.024-.002-.05-.003-.074-.006a1.902 1.902 0 01-1.745-2.048c1.143-14.365 8.594-23.786 8.911-24.179a1.902 1.902 0 012.968 2.38c-.07.09-7.039 8.953-8.087 22.102a1.903 1.903 0 01-1.973 1.75"
              />
              <path
                id="SKIN"
                fill="#FFF"
                d="M38.568 2.31s47.4 32.67 50.251 41.064c5.975 17.59-3.466 32.13-15.18 36.917C51.91 89.17 2.943 58.689 2.943 58.689"
              />
              <path
                id="Fill-22"
                fill="#141414"
                d="M67.146 83.78C43.016 85.775 3.723 61.53 1.887 60.385a2 2 0 012.114-3.396c.122.076 12.325 7.638 26.982 14.014 19.043 8.283 33.532 10.852 41.9 7.435 10.954-4.475 19.6-18.06 14.042-34.422-1.922-5.658-31.377-27.574-49.492-40.06a2 2 0 012.27-3.293c.12.082 12.026 8.298 24.127 17.434 22.322 16.854 26.032 22.13 26.882 24.632 6.344 18.677-3.672 34.245-16.317 39.411-2.192.897-4.634 1.422-7.249 1.638"
              />
            </g>
            <g id="Leg-2" transform="translate(158.164 40)">
              <path
                id="Fill-24"
                fill="#5588a3"
                d="M.43 106.617C8.483-62.498 165.957 16.26 196.919 32.173c100.67 51.743 202.956 114.966 202.956 114.966 2.883 52.664-56.04 99.89-91.94 105.138l-124.638-62.598S151.643 235.21 94.84 232.8C20.376 229.64-3.616 191.585.43 106.617"
              />
              <path
                id="Fill-27"
                fill="#FFF"
                d="M183.402 189.758c-6.242-3.295-48.32-25.719-69.347-42.303a2 2 0 10-2.477 3.141c20.634 16.274 61.05 37.98 69.274 42.34.929-1.056 1.882-2.203 2.55-3.178"
              />
            </g>
          </g>
        </g>

        <g id="Head" transform="translate(439 92)">
          <g
            id="Head/Short Hair 5"
            fill="none"
            fillRule="evenodd"
            stroke="none"
            strokeWidth="1"
          >
            <g id="Short-Hair" transform="translate(15 16)">
              <path
                id="SKIN"
                fill="#FFF"
                d="M133.168 80.613c-11.446-50.16-44.047-53.78-67.665-49.486C46.68 34.549 28.4 50.732 30.533 82.039c-6.644-6.395-16.093-2.5-17.857 4.839-2.058 8.567 3.376 28.024 17.328 25.56 1.344 22.996 20.35 56.683 58.054 56.374 41.07-.336 55.255-43.74 45.11-88.2"
              />
              <path
                id="ink"
                fill="#141414"
                d="M59.202 16.873C72.657-1.857 88.715-3.949 95.96 5.47c5.852 7.607 7.516 8.528 13.392 4.048 15.138-11.541 23.407-.936 24.363 13.787 12.442 2.792 10.738 18.986.452 27.649 5.072 8.503 8.232 33.717 3.336 42.982 2.828 23.967-1.687 45.631-12.795 59.676-25.905 32.732-77.82 14.431-90.27-17.449-12.032-4.008-36.785-31.227-23.43-78.88C9.09 55.502-1.72 59.46.234 55.605c.561-1.106 9.13-3.149 11.774-3.937.236-.576-3.907-28.796 3.6-8.835 18.978-28.152 32.674-10.759 43.593-25.96zm31.152 35c-6.045-2.396-13.626 8.124-29.937 5.083-19.574-3.65-20.138 7.099-17.736 19.262 3.693 18.701-9.059 12.895-13.018 7.618-2.626-2.369-5.812-3.721-9.074-2.686-10.375 3.699-6.636 18.679-.542 26.016 4.461 5.89 10.993 1.091 11.952 5.155 7.124 70.114 103.726 76.401 102.332-3.711.14-17.244-4.139-38.223-12.459-52.469-9.208 1.645-20.512.096-31.518-4.268zM23.38 89.782c1.075-.175 2.53.513 2.95 3.09.42 2.577-.513 5.108-1.588 5.283-1.075.174-2.287-1.773-2.706-4.35-.419-2.577.27-3.848 1.344-4.023z"
              />
            </g>
          </g>
        </g>
        <g id="Face" transform="translate(499 178)">
          {expression}
        </g>
        <g id="Accessories" fill="#000" transform="translate(491 176)">
          <g
            id="Accessories/Glasses"
            fill="none"
            fillRule="evenodd"
            stroke="none"
            strokeWidth="1"
          >
            <path
              id="Glass"
              fill="#aaa9ad"
              d="M77.205 44.267c-9.315 0-16.34-7.253-16.34-16.87C60.865 17.803 68.352 10 77.556 10c9.555 0 17.041 7.34 17.041 16.708 0 9.518-7.965 17.56-17.392 17.56m-51.98 6.686C15.888 50.954 8 41.917 8 31.222c0-9.846 8.265-17.855 18.424-17.855 9.666 0 17.53 8.61 17.53 19.192 0 9.971-8.577 18.395-18.729 18.395M77.556 6c-8.768 0-16.259 5.677-19.268 13.655-3.714-.274-10.353.59-13.247 1.277C41.31 14.024 34.364 9.367 26.424 9.367 14.06 9.367 4 19.171 4 31.222c0 13.086 9.521 23.732 21.225 23.732 12.32 0 22.73-10.256 22.73-22.395 0-2.787-.46-5.46-1.3-7.938 2.474-.494 7.83-1.055 10.561-1.054a22.04 22.04 0 00-.35 3.83c0 11.703 8.934 20.87 20.34 20.87 11.595 0 21.391-9.873 21.391-21.559C98.597 15.096 89.354 6 77.557 6"
            />
          </g>
        </g>
        <SantaHat />
      </g>
    </Container>
  );
};

export default MeIllustration;
