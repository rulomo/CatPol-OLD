import { useEffect, useState } from 'react';
import { NextPage  } from 'next';
import { Grid } from '@nextui-org/react';


import { Layout } from '../components/layouts';
import { OrdenancaStandard } from '../interfaces';

import { CardInfraccio } from '../components/ui';
import InfiniteScroll from 'react-infinite-scroller';


export interface Info {
  count: number;
  pages: number;
  next: string;
  prev: string;
  hasNext: boolean;
}


const HomePage: NextPage = (props) => {

  const [infraccions, setinfraccions] = useState<OrdenancaStandard[]>([])
  const [info, setinfo] = useState<Info>()
  const [page, setpage] = useState(1)

  

  const fetchData = async () => {

    const { results: data, info } = await fetch(
      `api/manresa?page=${page}`
    ).then((result) => result.json())
    setinfraccions(prev => prev?.concat(data) || [])
    setinfo(info || "")
    setpage(prev => prev + 1)
  }

  useEffect(() => {

    fetchData()
      .catch(console.error);

  }, [])

  const handleNext = () => {
    return fetchData();
  }

  return (
    <Layout title='Llista Infraccions'>
      <InfiniteScroll
        pageStart={0}
        loadMore={handleNext}
        hasMore={info?.hasNext || false}        
      >
        <Grid.Container gap={2} justify='flex-start' css={{ mt: 0, p: 0 }}>
          {
            infraccions && infraccions.map((infraccio) => (              
              <Grid xs={12} sm={6} md={4} lg={3} css={{ mb: -15 }} key={infraccio.id}>
                <CardInfraccio infraccio={infraccio} />
              </Grid>              
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

