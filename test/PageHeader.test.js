import React from 'react';
import PageHeader from '../src/components/PageHeader';

describe('Page Header', () => {

  jest.mock('react-device-detect', ()=>({
    isIOS: true
  }))

  it('should render the header', () => {
    const header = render(
      <PageHeader className="pageHeader" title="Test Header" />
    );

    expect(header).toMatchSnapshot();
  });

  it('should have narrower letter spacing on iOS', () => {
    const header = render(
      <PageHeader className="pageHeader" title="Test Header" />
    );

    expect(header).toMatchSnapshot();
  })
});
