import Document, {
  DocumentContext,
  Head,
  Main,
  Html,
  NextScript,
} from 'next/document';
import { extractCss } from 'goober';

export default class CustomDocument extends Document<{ css: any }> {
  static async getInitialProps({ renderPage }: DocumentContext) {
    const page = renderPage();

    // extract the css for each page render
    const css = extractCss();
    return { ...page, css };
  }

  render() {
    return (
      <Html>
        <Head>
          <style
            id={'_goober'}
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
