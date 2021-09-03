import Head from 'next/head';
import { SubscribeButton } from '../components/SubscribeButton';
import style from './home.module.scss';

export default function Home() {
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
            <span> for $9.90 month</span>
          </p>

          <SubscribeButton />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}
