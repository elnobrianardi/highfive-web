import { Html, Head, Main, NextScript } from "next/document";

const MATOMO_SITE_ID = "847";
const MATOMO_URL = "https://analytics.alstr.in/";

const matomoSnippet = `
  var _paq = window._paq = window._paq || [];
  /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function() {
    var u="${MATOMO_URL}";
    _paq.push(['setTrackerUrl', u+'matomo.php']);
    _paq.push(['setSiteId', '${MATOMO_SITE_ID}']);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
  })();
`;

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Matomo: loaded in <head> so client-side route changes can be tracked */}
        <script dangerouslySetInnerHTML={{ __html: matomoSnippet }} />
      </Head>
      <body>
        <Main />
        <NextScript />
        <noscript>
          <p>
            <img
              referrerPolicy="no-referrer-when-downgrade"
              src={`${MATOMO_URL}matomo.php?idsite=${MATOMO_SITE_ID}&rec=1`}
              style={{ border: 0 }}
              alt=""
            />
          </p>
        </noscript>
      </body>
    </Html>
  );
}
