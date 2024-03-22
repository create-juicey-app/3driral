import { Html, Head, Main, NextScript } from "next/document";
import { getInitColorSchemeScript } from '@mui/joy/styles';
export default function Document() {
  return (
    <Html lang="en" data-color-scheme="dark">
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap" rel="stylesheet"></link>
      </Head>
    
      <body>
        {getInitColorSchemeScript()}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
