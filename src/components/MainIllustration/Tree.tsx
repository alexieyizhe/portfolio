import { useTheme } from 'services/context/theme';
import {
  onClickListeners,
  useHoverListeners,
  useStoreFocusListeners,
} from 'services/utils';

import Layers from './layers';
import { Group } from './styles';

const Tree = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const {
    isHovering,
    setHovering,
    listeners: hoverListeners,
  } = useHoverListeners();
  const storeFocusListeners = useStoreFocusListeners();

  const onIllustrationClick = () => {
    setHovering(false);
    toggleDarkMode();
  };

  const onIllustrationEnter = () => {
    hoverListeners.onMouseEnter();
    storeFocusListeners.onMouseEnter();
  };

  const onIllustrationLeave = () => {
    hoverListeners.onMouseLeave();
    storeFocusListeners.onMouseLeave();
  };

  const starIsLit = (isDarkMode && !isHovering) || (!isDarkMode && isHovering);

  return (
    <svg viewBox="0 0 870 1385" id="illustration-tree">
      <Group
        {...onClickListeners(onIllustrationClick)}
        onMouseEnter={onIllustrationEnter}
        onMouseLeave={onIllustrationLeave}
        role="button"
        tabIndex={0}
      >
        <g id="Tree" transform="translate(118.297468, 165.000000)">
          <ellipse
            id="Shadow"
            rx="200"
            ry="30"
            fill={isDarkMode ? '#3b474a' : '#e0f8ff'}
            transform="translate(350 1125)"
            style={{ transition: 'fill 250ms' }}
          />
          <polygon
            id="leg"
            fill="#B07C4F"
            points="343.333625 928 326 1115 404 1115 382.334282 928"
          />
          <path
            d="M186.354586,660.738064 C186.354586,660.738064 4.17404409,923.462506 0.0290088009,939.87761 C-4.97656472,959.702126 639.361616,963.555616 733,929.803092 C733,929.803092 569.567368,709.1596 518.023099,632.123964 C466.478829,555.087015 186.354586,660.738064 186.354586,660.738064"
            fill="#13D6C3"
          />
          <path
            d="M599,746.190123 C566.478285,701.123341 536.081751,658.360893 518.58219,632.169651 C467.017956,555.006687 186.792352,660.832361 186.792352,660.832361 C186.792352,660.832361 137.772553,731.616622 90,802.056088 C160.016644,804.012996 466.17682,808.675621 599,746.190123"
            fill="#0bb5a4"
          />
          <path
            d="M22.0467774,730.70487 C67.0208714,733.717692 147.450587,720.082508 147.450587,720.082508 C147.450587,720.082508 180.209154,762.810987 190.522037,762.810987 C216.086272,762.810987 252.904864,721.682166 265.889852,719.748917 C275.980825,718.24776 335.632459,770.842113 349.201765,769.98975 C367.193503,768.862897 405.566775,712.761903 419.985639,709.535006 C428.826566,707.55579 477.233035,749.568494 502.634449,748.857973 C517.554908,748.441641 556.168472,696.417282 562.379312,695.691 C579.785419,693.65925 708.357676,703.53169 698.457099,690.616222 C654.125098,632.778982 565.281205,534.627197 499.548726,408.968642 C253.305352,388.308357 235.866418,396.6757 235.866418,396.6757 C235.866418,396.6757 3.56788843,729.466383 22.0467774,730.70487"
            fill="#13D6C3"
          />
          <path
            d="M207.048516,438.071608 C184.081144,471.403188 150.42406,520.584446 118,569.199691 C192.252228,573.48691 385.802809,561.442682 561,511.258396 C541.839492,482.88272 522.920856,452.395684 505.436366,420 L207.048516,438.071608 Z"
            fill="#0bb5a4"
          />
          <path
            d="M82.5204736,463.883041 C65.001209,481.964906 143.156602,479.489037 182.732296,473.513028 C199.331776,494.607223 211.993265,520.678139 221.322507,519.986526 C239.283268,518.653264 273.827742,480.247708 294.575449,478.34117 C301.737942,477.682429 346.364566,519.828744 361.583056,519.898431 C380.819689,519.986526 424.82086,473.561678 433.31047,473.363135 C442.650223,473.146184 480.408686,505.54549 493.582626,499.493219 C506.757881,493.439633 513.093881,456.817018 522.637301,450.812082 C559.106752,465.495051 626.432341,461.288835 617.126751,449.198757 C602.570506,430.287218 465.956246,277.898324 444.416209,241.44138 C422.874859,204.984437 257.025909,216.841786 257.025909,216.841786 C257.025909,216.841786 157.992724,385.987173 82.5204736,463.883041"
            fill="#13D6C3"
          />
          <path
            d="M477,286.364659 L477,286.364659 C461.388641,266.74021 449.17927,250.467815 443.857842,241.445276 C422.349091,204.982961 256.75113,216.842057 256.75113,216.842057 C256.75113,216.842057 228.828065,263.570946 194,317 C238.409521,316.512117 476.622147,312.67218 477,286.364659"
            fill="#0bb5a4"
          />
          <path
            d="M155.051712,276.22926 C158.672092,282.132453 245.448412,260.774893 256.592887,261.02168 C261.89622,261.139822 286.91882,284.277398 299.616386,285.943209 C312.313952,287.60902 346.151391,252.073032 352.811055,252.351324 C363.424279,252.793702 397.412567,281.247696 410.502341,281.247696 C422.567652,281.247696 444.857914,255.795838 457.787657,251.92601 C465.017924,249.762688 542.231717,276.858041 536.718508,261.369544 C523.94355,225.473878 369.515962,21.7159263 353.08783,0 C339.070662,8.40650377 151.431331,270.326067 155.051712,276.22926"
            fill="#13D6C3"
          />
        </g>
        <g
          id="Lights"
          transform="translate(493.797468, 672.000000) scale(-1, 1) translate(-493.797468, -672.000000) translate(269.297468, 282.000000)"
        >
          {Layers.BLINKING_LIGHTS}
        </g>
        <g
          id="Star"
          transform="translate(388.297468, 0.000000)"
          style={{
            transition: 'fill 100ms',
            fill: starIsLit ? '#FFC81A' : '#EEE',
          }}
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
      </Group>
    </svg>
  );
};

export default Tree;
