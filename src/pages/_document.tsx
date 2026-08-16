import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Main,
  Html,
  NextScript,
} from 'next/document';
import { extractCss } from 'goober';

import 'services/style';

export default class CustomDocument extends Document<{ css: string }> {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps & { css: string }> {
    // Document.getInitialProps awaits renderPage internally, so every goober
    // `css` call has registered by the time we extract the stylesheet.
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, css: extractCss() };
  }

  render() {
    return (
      <Html>
        <Head>
          <style
            id="_goober"

            dangerouslySetInnerHTML={{ __html: ` ${this.props.css}` }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script
            data-skip-dnt="true"
            data-hostname="alexxie.com"
            async
            defer
            src="https://scripts.simpleanalyticscdn.com/latest.js"
          />
          <noscript>
            {/* analytics pixel, must stay a plain img inside noscript */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://queue.simpleanalyticscdn.com/noscript.gif"
              alt=""
            />
          </noscript>
        </body>
      </Html>
    );
  }
}
