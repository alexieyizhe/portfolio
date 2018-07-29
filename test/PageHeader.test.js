import React from 'react';
import PageHeader from '../src/components/PageHeader';

describe('Page Header', () => {

  it('should render the header', () => {
    const header = render(
      <PageHeader className="pageHeader" title="Test Header" />
    );

    expect(header).toMatchSnapshot();
  });
});
