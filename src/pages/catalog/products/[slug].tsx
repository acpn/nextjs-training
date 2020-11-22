import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import PrismicDOM from 'prismic-dom';
import Prismic from 'prismic-javascript';
import { client } from '@/lib/prismic';
import { Document } from 'prismic-javascript/types/documents';

interface IProductProps {
  product: Document;
}

// Lazy loading using components
// The ssr property let you the option to never render the component by the server side.
// So when you set to False the component will always be rendered in the client side.
// const AddToCartModal = dynamic(
//   () => import('@/components/AddToCartModal'),
//   { loading: () => <p>Loading...</p>, ssr: false }
// )

export default function Product({ product }: IProductProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Loading..</p>
  }
  
  return (
    <div>
      <h1>
        {PrismicDOM.RichText.asText(product.data.title)}
      </h1>

      <img src={product.data.thumbnail.url} width="300" alt=""/>

      <div dangerouslySetInnerHTML={
        { __html: PrismicDOM.RichText.asHtml(product.data.description) }}>

      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async() => {
  return {
    paths: [],
    fallback: true,
  }
};

export const getStaticProps: GetStaticProps<IProductProps> = async(context) => {
  const { slug } = context.params;

  const product = await client().getByUID('product', String(slug), {});

  return {
    props: {
      product,
    },
    revalidate: 5,
  }
}
