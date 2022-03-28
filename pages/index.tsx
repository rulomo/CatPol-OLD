import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { Grid, Loading } from '@nextui-org/react';


import { Layout } from '../components/layouts';
import { Data, OrdenancaShort } from '../interfaces';

import { CardInfraccio } from '../components/ui';
import InfiniteScroll from 'react-infinite-scroll-component';



interface Infraccio {
  infraccio: OrdenancaShort;
}

const CardGrid: NextPage<Infraccio> = ({ infraccio }) => {  

  return (
    <Grid xs={12} sm={6} md={4} lg={4} css={{ mb: -15, height: '250px' }} >
      <CardInfraccio infraccio={infraccio} />
    </Grid>
  )

}





const HomePage: NextPage = (props) => {

  const [data, setdata] = useState<Data>()

  const fetchData = async () => {
    const datas = await fetch(
      `api/manresa?page=${data?.info.nextPage || 1}`
    ).then((result) => result.json())
    setdata((prevState) => ({
      ...prevState,
      results: prevState?.results ? prevState?.results.concat(datas.results) : datas.results,
      info: datas.info
    }))

  }

  useEffect(() => {
    fetchData()
      .catch(console.error);
  }, [])

  return (
    <Layout title='Llista Infraccions'>
      <InfiniteScroll
        dataLength={data?.info?.currentPage || 1 * 30 || 0}
        next={fetchData}
        hasMore={data?.info?.hasNext || false}
        loader={<Loading size="xl" style={{margin: "25px",display:"flex"}}/>}
        style={{ overflow: "inherit" }}
      >
        <Grid.Container gap={2} justify='flex-start' css={{ mt: 0, p: 0 }}>
          {
            data?.results && data?.results.map((infraccio) => (
              <CardGrid key={infraccio.id} infraccio={infraccio} />
            ))

          }
        </Grid.Container>
      </InfiniteScroll>

    </Layout>
  )
}


/*export cone :  = async (ctx) => {


  // const { count } = await supabase
  //   .from('manresa_circulacio')
  //   .select('*', { count: 'exact' })
  return {
    // props: {  },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
 }
}*/



export default HomePage;

