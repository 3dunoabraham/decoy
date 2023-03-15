import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
    <Html>
        <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect"href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
            <link rel="stylesheet"
            href={`https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap`}
            />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <body className='ma-0'>
            <Main />
            <NextScript />
        </body>
    </Html>
    )
}