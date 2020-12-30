import Document, {
  DocumentContext,
  Head,
  Main,
  Html,
  NextScript,
} from 'next/document';
import { extractCss } from 'goober';

import 'services/style';

export default class CustomDocument extends Document<{ css: string }> {
  static async getInitialProps({ renderPage }: DocumentContext) {
    // inline critical css for initial page render
    const page = renderPage();
    const css = extractCss();
    return { ...page, css };
  }

  render() {
    return (
      <Html>
        <Head>
          <style
            id="_goober"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: ` ${this.props.css}` }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
