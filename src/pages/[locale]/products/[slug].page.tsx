import { ContentContainer } from '@/src/components/atoms/ContentContainer';
import { ProductImage } from '@/src/components/atoms/ProductImage';
import { Stack } from '@/src/components/atoms/Stack';
import { TH1, TP, TPriceBig } from '@/src/components/atoms/TypoGraphy';
import { Button } from '@/src/components/molecules/Button';
import { storefrontApiQuery } from '@/src/graphql/client';
import { ProductDetailSelector, ProductSlugSelector } from '@/src/graphql/selectors';
import { getCollections } from '@/src/graphql/sharedQueries';
import { Layout } from '@/src/layouts';
import { localizeGetStaticPaths } from '@/src/lib/getStatic';
import { useCart } from '@/src/state/cart';
import styled from '@emotion/styled';
import { InferGetStaticPropsType } from 'next';
import React from 'react';

const ProductPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = props => {
    const { addToCart } = useCart();
    return (
        <Layout categories={props.collections}>
            <ContentContainer>
                <Stack gap="4rem">
                    <Stack>
                        <AssetBrowser column>
                            {props.product?.assets.map(a => (
                                <ProductImage key={a.preview} size="thumbnail" src={a.preview} />
                            ))}
                        </AssetBrowser>
                        <ProductImage size="detail" src={props.product?.featuredAsset?.source} />
                    </Stack>
                    <Stack column gap="2.5rem">
                        <TH1>{props.product?.name}</TH1>
                        <TP>{props.product?.description}</TP>
                        <Stack gap="2.5rem" justifyBetween>
                            <Stack gap="1rem">
                                <TPriceBig>{props.product?.variants[0].price}</TPriceBig>
                                <TPriceBig>{props.product?.variants[0].currencyCode}</TPriceBig>
                            </Stack>
                            <Button onClick={() => props.product?.id && addToCart(props.product.id, 1)}>
                                Add to cart
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            </ContentContainer>
        </Layout>
    );
};
const AssetBrowser = styled(Stack)`
    width: 10rem;
`;

export const getStaticPaths = async () => {
    const resp = await storefrontApiQuery({
        products: [{}, { items: ProductSlugSelector }],
    });
    const paths = localizeGetStaticPaths(
        resp.products.items.map(product => ({
            params: { id: product.id, slug: product.slug },
        })),
    );
    return { paths, fallback: false };
};

export const getStaticProps = async (context: { params: { slug?: string } }) => {
    const { slug } = context.params || {};
    const collections = await getCollections();
    const response =
        typeof slug === 'string'
            ? await storefrontApiQuery({
                  product: [{ slug }, ProductDetailSelector],
              })
            : undefined;
    const returnedStuff = {
        slug: context.params?.slug,
        product: response?.product,
        collections: collections,
    };
    return {
        props: returnedStuff,
        revalidate: 10,
    };
};

export default ProductPage;