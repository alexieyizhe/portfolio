import React from 'react';
import PageHeader from '../src/components/PageHeader';

describe('Page Header', () => {

  test('should render the header', () => {
    const component = renderer.create(
        <PageHeader className="pageHeader" title="Test Header" />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
