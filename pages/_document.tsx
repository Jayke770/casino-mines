import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" className=' scroll-smooth dark'>
      <Head />
      <body className='dark:bg-primary-dark dark:text-white'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
