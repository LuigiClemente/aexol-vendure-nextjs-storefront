import Page, { getStaticProps } from '@/src/pages/[locale]/customer/sign-in/index.page';
import { Redirect } from '@/src/lib/redirect';
import React from 'react';
import type { InferGetStaticPropsType } from 'next';

export default (props: InferGetStaticPropsType<typeof getStaticProps>) => {
    return Redirect({ children: <Page {...props} /> })();
};

export { getStaticProps };
