import { FunctionalComponent } from 'preact';
import TextLoop from 'react-text-loop';
import { useCopyContext } from 'services/copy';

const DynamicTagline: FunctionalComponent = () => {
  const { taglines } = useCopyContext();

  return (
    <TextLoop>
      {taglines.map((tl) => (
        <span>{tl}</span>
      ))}
    </TextLoop>
  );
};

export default DynamicTagline;
