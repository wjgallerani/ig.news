import { GetStaticProps } from 'next';
import Head from 'next/head';
import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';
import style from './home.module.scss';

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | IG.Newns</title>
      </Head>

      <main className={style.contentConteiner}>
        <section className={style.hero}>
          <span> 👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world. </h1>
          <p>
            Get access to all the publications <br />
            <span> for {product.amount} month</span>
          </p>

          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1JXcVvF8XvXuvwg7Igaw2j0c');

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount / 100), // vem em centavos
  };

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24 //  24 horas
  };
}