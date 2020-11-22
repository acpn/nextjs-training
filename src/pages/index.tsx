import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { Title } from '@/styles/Pages/Home';
import SEO from '@/components/SEO';
import { client } from '@/lib/prismic';
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';
import { Document } from 'prismic-javascript/types/documents';

interface IHomeProps {
  recommendedProducts: Document[];
}

export default function Home({ recommendedProducts }: IHomeProps) {
  // async function handleSum() {
  //   // Dynamic import
  //   const math = (await import('@/lib/math')).default;

  //   alert(math.sum(10, 12));
  // }

  // Used for client side example
  // const [recommendedProducts, setRecommendedProducts] = useState<IProduct[]>([]);

  // Client side fectching it's used when I don't need to allow the informations
  // for search engines.

  // Server side rendering get informations when the screen itś loaded,
  // this strategy it's used when you need informations vailable for crawlers 
  // and search engines.

    // Client side examle
      // useEffect(() => {
      //   fetch('http://localhost:3333/recommended').then(response => {
      //     response.json().then(data => {
      //       setRecommendedProducts(data);
      //     })
      //   });
      // }, []);

  return (
    <div>
      <SEO 
        title="DevCommerce, you're best store!" 
        image="boost.png"
        shouldExcludeTitleSuffix 
      />

      <section>
        <Title>Products</Title>

        <ul>
          {recommendedProducts.map(recommendedProduct => {
            return (
              <li key={recommendedProduct.id}>
                <Link href={`/catalog/products/${recommendedProduct.uid}`}>
                  <a>
                    {PrismicDOM.RichText.asText(recommendedProduct.data.title)}
                  </a>                  
                </Link>                 
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}

// Server side example, doesn't use as silver bullet, because you've delay to 
// Show informations to your user.
// The environment variables are available only in  the server side.
// If you want to turns the env variable public just put NEXT_PUBLIC_*
export const getServerSideProps: GetServerSideProps<IHomeProps>  = async() => {
  const recommendedProducts = await client().query([
    Prismic.Predicates.at('document.type', 'product')
  ]);

  return {
    props: {
      recommendedProducts: recommendedProducts.results
    }
  }  
}
