import { FC, Fragment, memo } from 'react';

import { Link, Text } from 'components/core';
import { CURRENT_EXPERIENCE, PAST_EXPERIENCE } from 'services/copy';

const Work: FC = memo(() => {
  return (
    <>
      <Text as="p">
        I&apos;m a product-minded software engineer with a Bachelor of Computer
        Science from the University of Waterloo, specializing in User Experience
        Design.
      </Text>

      <Text as="p">
        Most recently at{' '}
        <Link href={CURRENT_EXPERIENCE.href} newTab bare>
          <Text bold color={CURRENT_EXPERIENCE.color}>
            {CURRENT_EXPERIENCE.label}
          </Text>
        </Link>
        , I worked across multiple engineering teams building features and
        tooling that help local brands and retailers discover each other,
        effortlessly manage their businesses, and transact confidently at scale.
      </Text>

      <Text as="p">
        Over the years, I have also taken on engineering and leadership roles at
        {PAST_EXPERIENCE.map(({ label, href, color }, i, arr) => {
          const isLast = i === arr.length - 1;
          const name = (
            <Text bold color={color}>
              {label}
            </Text>
          );
          return (
            <Fragment key={label}>
              {isLast ? ' and ' : ' '}
              {href ? (
                <Link href={href} newTab bare>
                  {name}
                </Link>
              ) : (
                name
              )}
              {isLast ? '.' : ','}
            </Fragment>
          );
        })}
      </Text>

      <Text as="p">
        Want to learn more or connect? Shoot me a message at{' '}
        <Link href="mailto:hey@alexxie.com">hey@alexxie.com</Link>.
      </Text>
    </>
  );
});

export default Work;
