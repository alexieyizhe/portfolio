import { keyframes } from 'goober';
import { useState } from 'react';

import { useStore } from 'services/store';

const LIT_STYLES = {
  fill: '#FFC81A',
};
const DIM_STYLES = { fill: '#eee' };

const blink = keyframes`
  from { fill: #FFC81A; opacity: 0.5; }
  50% { fill: #FFC81A; opacity: 1; }
  to { fill: #FFC81A; opacity: 0.5; }
`;

const BLINKING_LIGHTS = [
  {
    d:
      'M180.713049,99.0088838 C180.713049,112.578696 169.713267,123.578478 156.143455,123.578478 C142.573643,123.578478 131.573861,112.578696 131.573861,99.0088838 C131.573861,85.4390715 142.573643,74.4392895 156.143455,74.4392895 C169.713267,74.4392895 180.713049,85.4390715 180.713049,99.0088838',
    transform:
      'translate(156.143455, 99.008884) scale(-1, 1) translate(-156.143455, -99.008884)',
  },
  {
    d:
      'M399.174813,307.97782 C399.174813,321.547632 388.175031,332.547414 374.605219,332.547414 C361.035407,332.547414 350.035625,321.547632 350.035625,307.97782 C350.035625,294.408008 361.035407,283.408226 374.605219,283.408226 C388.175031,283.408226 399.174813,294.408008 399.174813,307.97782',
    transform:
      'translate(374.605219, 307.977820) scale(-1, 1) translate(-374.605219, -307.977820)',
  },
  {
    d:
      'M107.002953,490.391266 C107.002953,503.961078 96.0031714,514.96086 82.4333591,514.96086 C68.8635469,514.96086 57.8637649,503.961078 57.8637649,490.391266 C57.8637649,476.821453 68.8635469,465.821671 82.4333591,465.821671 C96.0031714,465.821671 107.002953,476.821453 107.002953,490.391266',
    transform:
      'translate(82.433359, 490.391266) scale(-1, 1) translate(-82.433359, -490.391266)',
  },
  {
    d:
      'M448.314659,496.603595 C448.314659,510.173407 437.314877,521.173189 423.745064,521.173189 C410.175252,521.173189 399.17547,510.173407 399.17547,496.603595 C399.17547,483.033782 410.175252,472.034 423.745064,472.034 C437.314877,472.034 448.314659,483.033782 448.314659,496.603595',
    transform:
      'translate(423.745064, 496.603595) scale(-1, 1) translate(-423.745064, -496.603595)',
  },
  {
    d:
      'M150.279269,291.166513 C150.279269,304.736325 139.279487,315.736107 125.709674,315.736107 C112.139862,315.736107 101.14008,304.736325 101.14008,291.166513 C101.14008,277.596701 112.139862,266.596919 125.709674,266.596919 C139.279487,266.596919 150.279269,277.596701 150.279269,291.166513',
    transform:
      'translate(125.709674, 291.166513) scale(-1, 1) translate(-125.709674, -291.166513)',
  },
  {
    d:
      'M293.413275,577.354418 C293.413275,590.92423 282.413493,601.924012 268.843681,601.924012 C255.273869,601.924012 244.274087,590.92423 244.274087,577.354418 C244.274087,563.784606 255.273869,552.784824 268.843681,552.784824 C282.413493,552.784824 293.413275,563.784606 293.413275,577.354418',
    transform:
      'translate(268.843681, 577.354418) scale(-1, 1) translate(-268.843681, -577.354418)',
  },
  {
    d:
      'M49.1391885,714.817286 C49.1391885,728.387098 38.1394065,739.388193 24.5695943,739.388193 C10.999782,739.388193 3.63797881e-12,728.387098 3.63797881e-12,714.817286 C3.63797881e-12,701.248787 10.999782,690.247692 24.5695943,690.247692 C38.1394065,690.247692 49.1391885,701.248787 49.1391885,714.817286',
    transform:
      'translate(24.569594, 714.817942) scale(-1, 1) translate(-24.569594, -714.817942)',
  },
  {
    d:
      'M310.464849,24.5695943 C310.464849,38.1394065 299.465067,49.1391885 285.895254,49.1391885 C272.325442,49.1391885 261.32566,38.1394065 261.32566,24.5695943 C261.32566,10.999782 272.325442,6.60804744e-13 285.895254,6.60804744e-13 C299.465067,6.60804744e-13 310.464849,10.999782 310.464849,24.5695943',
    transform:
      'translate(285.895254, 24.569594) scale(-1, 1) translate(-285.895254, -24.569594)',
  },
  {
    d:
      'M244.273561,479.028633 C244.273561,492.598445 233.273779,503.598227 219.703967,503.598227 C206.134155,503.598227 195.134373,492.598445 195.134373,479.028633 C195.134373,465.45882 206.134155,454.459038 219.703967,454.459038 C233.273779,454.459038 244.273561,465.45882 244.273561,479.028633',
    transform:
      'translate(219.703967, 479.028633) scale(-1, 1) translate(-219.703967, -479.028633)',
  },
  {
    d:
      'M293.413275,243.378527 C293.413275,256.94834 282.413493,267.948122 268.843681,267.948122 C255.273869,267.948122 244.274087,256.94834 244.274087,243.378527 C244.274087,229.808715 255.273869,218.808933 268.843681,218.808933 C282.413493,218.808933 293.413275,229.808715 293.413275,243.378527',
    transform:
      'translate(268.843681, 243.378527) scale(-1, 1) translate(-268.843681, -243.378527)',
  },
  {
    d:
      'M448.314659,723.273828 C448.314659,736.84364 437.314877,747.843422 423.745064,747.843422 C410.175252,747.843422 399.17547,736.84364 399.17547,723.273828 C399.17547,709.704016 410.175252,698.704234 423.745064,698.704234 C437.314877,698.704234 448.314659,709.704016 448.314659,723.273828',
    transform:
      'translate(423.745064, 723.273828) scale(-1, 1) translate(-423.745064, -723.273828)',
  },
  {
    d:
      'M244.273561,754.686768 C244.273561,768.25658 233.273779,779.256362 219.703967,779.256362 C206.134155,779.256362 195.134373,768.25658 195.134373,754.686768 C195.134373,741.116956 206.134155,730.117174 219.703967,730.117174 C233.273779,730.117174 244.273561,741.116956 244.273561,754.686768',
    transform:
      'translate(219.703967, 754.686768) scale(-1, 1) translate(-219.703967, -754.686768)',
  },
].map((props, i) => (
  <path
    {...props}
    style={{
      animation: `${blink} ${i * 100 + 2000}ms linear infinite`,
    }}
  />
));

const Tree = () => {
  const { dispatch, isDarkMode } = useStore('isDarkMode');
  const [isHovering, setHovering] = useState(false);

  const onIllustrationClick = () => {
    setHovering(false);
    dispatch('dark-mode/toggle', undefined);
  };

  const starStyles =
    (isDarkMode && !isHovering) || (!isDarkMode && isHovering)
      ? LIT_STYLES
      : DIM_STYLES;

  return (
    <svg viewBox="0 0 870 1385" id="illustration-tree">
      <g
        id="Group"
        onClick={onIllustrationClick}
        onKeyUp={(e) => (e.key === 'Enter' ? onIllustrationClick() : null)}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        style={{ cursor: 'pointer', outline: 'none' }}
        role="button"
        tabIndex={0}
      >
        <g id="Tree" transform="translate(118.297468, 165.000000)">
          <g id="Shadow" transform="translate(350 1125)">
            <ellipse rx="200" ry="30" fill="#e0f8ff" />
          </g>
          <polygon
            id="leg"
            fill="#B07C4F"
            points="343.333625 928 326 1115 404 1115 382.334282 928"
          />
          <path
            d="M186.354586,660.738064 C186.354586,660.738064 4.17404409,923.462506 0.0290088009,939.87761 C-4.97656472,959.702126 639.361616,963.555616 733,929.803092 C733,929.803092 569.567368,709.1596 518.023099,632.123964 C466.478829,555.087015 186.354586,660.738064 186.354586,660.738064"
            id="Fill-2"
            fill="#13D6C3"
          />
          <path
            d="M599,746.190123 C566.478285,701.123341 536.081751,658.360893 518.58219,632.169651 C467.017956,555.006687 186.792352,660.832361 186.792352,660.832361 C186.792352,660.832361 137.772553,731.616622 90,802.056088 C160.016644,804.012996 466.17682,808.675621 599,746.190123"
            id="Fill-5"
            fill="#0bb5a4"
          />
          <path
            d="M22.0467774,730.70487 C67.0208714,733.717692 147.450587,720.082508 147.450587,720.082508 C147.450587,720.082508 180.209154,762.810987 190.522037,762.810987 C216.086272,762.810987 252.904864,721.682166 265.889852,719.748917 C275.980825,718.24776 335.632459,770.842113 349.201765,769.98975 C367.193503,768.862897 405.566775,712.761903 419.985639,709.535006 C428.826566,707.55579 477.233035,749.568494 502.634449,748.857973 C517.554908,748.441641 556.168472,696.417282 562.379312,695.691 C579.785419,693.65925 708.357676,703.53169 698.457099,690.616222 C654.125098,632.778982 565.281205,534.627197 499.548726,408.968642 C253.305352,388.308357 235.866418,396.6757 235.866418,396.6757 C235.866418,396.6757 3.56788843,729.466383 22.0467774,730.70487"
            id="Fill-7"
            fill="#13D6C3"
          />
          <path
            d="M207.048516,438.071608 C184.081144,471.403188 150.42406,520.584446 118,569.199691 C192.252228,573.48691 385.802809,561.442682 561,511.258396 C541.839492,482.88272 522.920856,452.395684 505.436366,420 L207.048516,438.071608 Z"
            id="Fill-9"
            fill="#0bb5a4"
          />
          <path
            d="M82.5204736,463.883041 C65.001209,481.964906 143.156602,479.489037 182.732296,473.513028 C199.331776,494.607223 211.993265,520.678139 221.322507,519.986526 C239.283268,518.653264 273.827742,480.247708 294.575449,478.34117 C301.737942,477.682429 346.364566,519.828744 361.583056,519.898431 C380.819689,519.986526 424.82086,473.561678 433.31047,473.363135 C442.650223,473.146184 480.408686,505.54549 493.582626,499.493219 C506.757881,493.439633 513.093881,456.817018 522.637301,450.812082 C559.106752,465.495051 626.432341,461.288835 617.126751,449.198757 C602.570506,430.287218 465.956246,277.898324 444.416209,241.44138 C422.874859,204.984437 257.025909,216.841786 257.025909,216.841786 C257.025909,216.841786 157.992724,385.987173 82.5204736,463.883041"
            id="Fill-11"
            fill="#13D6C3"
          />
          <path
            d="M477,286.364659 L477,286.364659 C461.388641,266.74021 449.17927,250.467815 443.857842,241.445276 C422.349091,204.982961 256.75113,216.842057 256.75113,216.842057 C256.75113,216.842057 228.828065,263.570946 194,317 C238.409521,316.512117 476.622147,312.67218 477,286.364659"
            id="Fill-13"
            fill="#0bb5a4"
          />
          <path
            d="M155.051712,276.22926 C158.672092,282.132453 245.448412,260.774893 256.592887,261.02168 C261.89622,261.139822 286.91882,284.277398 299.616386,285.943209 C312.313952,287.60902 346.151391,252.073032 352.811055,252.351324 C363.424279,252.793702 397.412567,281.247696 410.502341,281.247696 C422.567652,281.247696 444.857914,255.795838 457.787657,251.92601 C465.017924,249.762688 542.231717,276.858041 536.718508,261.369544 C523.94355,225.473878 369.515962,21.7159263 353.08783,0 C339.070662,8.40650377 151.431331,270.326067 155.051712,276.22926"
            id="Fill-15"
            fill="#13D6C3"
          />
        </g>
        <g
          id="Lights"
          transform="translate(493.797468, 672.000000) scale(-1, 1) translate(-493.797468, -672.000000) translate(269.297468, 282.000000)"
        >
          {BLINKING_LIGHTS}
        </g>
        <g
          id="Star"
          transform="translate(388.297468, 0.000000)"
          style={{ transition: 'fill 100ms', ...starStyles }}
        >
          <polygon
            id="top"
            points="63 188 98 188 86.3468133 111 74.6088334 112.802601"
          />
          <polygon
            id="star"
            points="81 0 100.352444 58.5029919 162 58.8228818 112.313713 95.2995452 131.060323 154 81 118.039373 30.9396768 154 49.6862866 95.2995452 0 58.8228818 61.6462391 58.5029919"
          />
        </g>
      </g>
    </svg>
  );
};

export default Tree;
