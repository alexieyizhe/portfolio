import { memo } from 'react';
import TextLoop from 'react-text-loop';

import { TAGLINES } from 'services/copy';
import { getShuffledArray } from 'services/utils';

const taglines = getShuffledArray(TAGLINES);

const DynamicTagline = memo(() => <TextLoop children={taglines} />);

export default DynamicTagline;
