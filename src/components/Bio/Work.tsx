import { FC, memo } from 'react';
import { styled } from 'goober';

import { Text } from 'components/core';

const Work: FC = memo(() => {
  return (
    <>
      <p>
        <Text>
          Next spring, I'll be helping a stealth startup make it easier for data
          scientists to build and configure apps to interact with their data.
        </Text>
      </p>

      <p>
        <Text>
          Previously, I've done work as part of Shopify, Hack the North, Faire,
          and Flipp.
        </Text>
      </p>

      <p>
        <Text>
          My absolute favourite way to learn is by doing. Some of the projects
          I've built in the past include intern+, etc.
        </Text>
      </p>
    </>
  );
});

export default Work;
