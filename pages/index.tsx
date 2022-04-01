import { memo, useEffect, useState } from 'react';
import { NextPage } from 'next';
import { Grid, Loading } from '@nextui-org/react';


import { Layout } from '../components/layouts';
import { Data, OrdenancaShort, OrdenancaStandard } from '../interfaces';

import { CardInfraccio } from '../components/ui';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSearchContext } from '../context';


interface Infraccio {
  infraccio: OrdenancaShort;
}

const CardGrid: NextPage<Infraccio> = memo(({ infraccio }) => {
  return (
    <Grid xs={12} sm={6} md={4} lg={4} css={{ mb: -15, height: '250px' }} >
      <CardInfraccio infraccio={infraccio} />
    </Grid>
  )
})
CardGrid.displayName = "CardInfraccio"


const HomePage: NextPage = (props) => {

  const [data, setdata] = useState<Data>();
  const [dataSearch, setdataSearch] = useState<Data>();

  const { valueSearch } = useSearchContext();
  

  const fetchData = async () => {
    const dataByPage = await fetch(
      `api/manresa?page=${data?.info.nextPage || 1}`
    ).then((result) => result.json())
    setdata((prevState) => ({
      ...prevState,
      results: prevState?.results ? prevState?.results.concat(dataByPage.results) : dataByPage.results,
      info: dataByPage.info
    }))
  }
  const fetchDataSearch = async () => {
    let param = encodeURIComponent(valueSearch)
    const dataBySearch = await fetch(
      `api/manresa?search=${param}`
    ).then((result) => result.json())
    setdataSearch(dataBySearch)
  }

  useEffect(() => {
    valueSearch?.length && fetchDataSearch()
  }, [valueSearch])

  useEffect(() => {
    fetchData()
      .catch(console.error);
  }, [])

  return (
    <Layout title='Llista Infraccions'>
      {!valueSearch?.length &&
        <InfiniteScroll
          dataLength={data?.info?.currentPage || 1 * 30 || 0}
          next={fetchData}
          hasMore={data?.info?.hasNext || false}
          loader={<Loading size="xl" style={{ margin: "25px", display: "flex" }} />}
          style={{ overflow: "inherit" }}
        >
          <Grid.Container gap={2} justify='flex-start' css={{ mt: 0, p: 0 }}>
            {
              data?.results && data?.results.map((infraccio) => (
                <CardGrid key={infraccio.id} infraccio={infraccio} />
              ))}
          </Grid.Container>
        </InfiniteScroll>
      }

      {valueSearch?.length &&
        <Grid.Container gap={2} justify='flex-start' css={{ mt: 0, p: 0 }}>
          {dataSearch?.results && dataSearch?.results.map((infraccio) => (
            <CardGrid key={infraccio.id} infraccio={infraccio} />
          ))
          }
        </Grid.Container>
      }
    </Layout>
  )
}

export default HomePage;

