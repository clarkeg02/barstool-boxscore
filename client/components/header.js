import { useContext } from 'react';
import Head from 'next/head'
import PageContext from './page-context';

export default function Header({ stylesheets }) {

  let { page } = useContext(PageContext);
  if (!page) page = {};

  return (
    <div>
      <Head>
        <title>{page.title || 'Title'}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={page.description || ''} />
        <link rel="canonical" href={page.ogUrl || ''} />
        <meta name="keywords" content={page.keywords || ''} />
        <meta property="og:url" content={page.ogUrl || ''} />
        <meta property="og:title" content={page.ogTitle || ''} />
        <meta property="og:description" content={page.ogDescription || ''} />
        <meta property="og:image" content={page.ogImage || ''} />
        <meta property="og:type" content={page.ogType || ''} />
        <meta name="twitter:url" content={page.ogUrl || ''} />
        <meta name="twitter:title" content={page.ogTitle || ''} />
        <meta name="twitter:description" content={page.ogDescription || ''} />
        <meta name="twitter:image" content={page.ogImage || ''} />
        {stylesheets}
      </Head>
    </div>
  )
}