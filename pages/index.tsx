import { useCallback, useEffect, useRef, useState } from 'react';
import { NextPage } from 'next';

import { Grid, Loading } from '@nextui-org/react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { useSearchContext } from '../context';

import { Layout } from '../components/layouts';
import { Data } from '../interfaces';
import { CardGrid } from '../components/ui';



const HomePage: NextPage = (props) => {

  const [data, setdata] = useState<Data>();
  const [dataSearch, setdataSearch] = useState<Data>();

  const { valueSearch } = useSearchContext();
  const lastSearch = useRef<string>();

  

  const fetchData = useCallback(async () => {
    const dataByPage = await fetch(
      `api/manresa?page=${data?.info.nextPage || 1}`
    ).then((result) => result.json())
    setdata((prevState) => ({
      ...prevState,
      results: prevState?.results ? prevState?.results.concat(dataByPage.results) : dataByPage.results,
      info: dataByPage.info
    }))
  }, [data?.info.nextPage])

  const fetchDataSearch = useCallback(async () => {
    let param = encodeURIComponent(valueSearch);
    if (param !== lastSearch.current) {
      const dataBySearch = await fetch(
        `api/manresa?search=${param}`
      ).then((result) => result.json())
      lastSearch.current = param;
      setdataSearch(dataBySearch)
    }
  },
    [valueSearch]
  );




  useEffect(() => {
    const delaySearch = setTimeout(() => {
      valueSearch?.length >= 1 && fetchDataSearch()
    }, 500);
    return () => {
      clearTimeout(delaySearch)
    }
  }, [fetchDataSearch, valueSearch])

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

