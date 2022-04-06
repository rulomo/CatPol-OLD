import { FC } from 'react';

import Head from 'next/head';
import { Navbar } from '../ui';
import { Container } from '@nextui-org/react';

interface Props {
  title?: string;
}


export const Layout: FC<Props> = ({ children, title }) => {
  return (
      
      <Container lg>
        <Head>
            <title>{ title || 'CatPol' }</title>
            <meta name="author" content="Rulomo" />
            <meta name="description" content={`Codificats Infraccions ${ title }`} />
            <meta name="keywords" content={ `${ title }, infraccions, codificats, catalunya, policia`} />
        </Head>
      
        <Navbar />

        <main style={{
          padding: '0px 20px',
          margin: '-10px -20px'
        }}>
            { children }
        </main>
        </Container>      
      
  )
};
