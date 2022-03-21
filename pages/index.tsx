import { NextPage, GetStaticProps } from 'next';
import { Card, Grid, Row, Text, Input, Divider } from '@nextui-org/react';


import { Layout } from '../components/layouts';
import { OrdenancaShort, OrdenancaStandard } from '../interfaces';
import { supabase } from '../utils/supabaseClient'
import { useFetch } from '../hooks/useFetch';
import { useEffect, useState } from 'react';
import { time } from 'console';
import InfiniteScroll from 'react-infinite-scroll-component';

interface Props {
  count: number;
}

export interface Data {
  info:    Info;
  results: OrdenancaShort[];
}

export interface Info {
  count:   number;
  pages:   number;
  next:    string;
  prev:    string;
  hasNext: boolean;
}



const HomePage: NextPage<Props> = ({count}) => {

  const [infraccions, setinfraccions] = useState<OrdenancaStandard[]>([])
  const [info, setinfo] = useState<Info>()
  const [page, setpage] = useState(1)
  

  const fetchData = async () => {
    
    const { results:data,info} = await fetch(
      `api/manresa?page=${page}`
    ).then((result) => result.json())
      
    
    
    
      setinfraccions(prev => prev?.concat(data) || [])
      setinfo(info||"")
      setpage(prev=>prev+1)
    } 

  useEffect(() => {
      
      fetchData()
      .catch(console.error);
     
  }, [])
  
  const handleNext = ()=>{
    
    return fetchData();
  }
  
  return (
    <Layout title='Llista Infraccions'>
      
      <Input label="Search" clearable  size="md" rounded bordered css={{display:'grid'}} />
      
        
      <InfiniteScroll
          dataLength={page* 30 || 0}
          next={handleNext}
          hasMore={info?.hasNext||false}
          loader={<h4>Loading...</h4>}
        >
          <Grid.Container  gap={2} justify='flex-start' css={{ mt: 0, p: 0}}>
        {
          infraccions && infraccions.map((infraccio) => (
            <Grid xs={12} sm={6} md={4} lg={3}  key={infraccio.id} css={{ mb: -15 }}>
              <Card
                hoverable
                clickable
                bordered
                color="primary"
                css={{ borderColor: '$gray700', px: 5, py: 0,} }
              >
                <Card.Header css={{ py: 2, pb: 1, jc: 'center' }}>
                  <Text size={14} transform='capitalize'>{infraccio.norma}</Text>
                </Card.Header>
                <Divider css={{ background: '$white' }} />
                <Card.Body css={{ py: 2, px: 5 }}>

                  <Row justify='space-between'>
                    <div style={{ display: 'flex' }}>
                      <Text size={14} transform='capitalize'>Article:</Text>
                      <Text size={14} css={{ fontWeight: '$bold', ml: 5 }}>
                        {`${infraccio.articulo}` +
                          `${infraccio.apartado ? `.${infraccio.apartado}` : ""}` +
                          `${infraccio.opcion ? `.${infraccio.opcion}` : ""}`
                        }
                      </Text>
                    </div>
                    <div style={{ display: 'flex' }}>
                      <Text size={14} transform='capitalize' css={{ mt: 15 }}>Punts:</Text>
                      <Text size={14} css={{ fontWeight: '$bold', ml: 5 }}>
                        {infraccio.puntos}
                      </Text>

                    </div>
                  </Row>

                  <Row justify='space-between' >
                    <div style={{ display: 'flex' }}>
                      <Text size={14} transform='capitalize'>calificació:</Text>
                      <Text size={14} transform='capitalize' css={{ ml: 5 }}>{infraccio.calificacion}</Text>
                    </div>


                    <div style={{ display: 'flex' }}>
                      <Text size={14} transform='capitalize' css={{ mt: 15 }}>Multa:</Text>
                      <Text size={14} css={{ fontWeight: '$bold', ml: 5 }}>
                        {infraccio.multa}
                      </Text>
                    </div>
                  </Row>

                </Card.Body>
                <Divider css={{ background: '$white' }} />
                <Card.Body css={{ py: 2, px: 5 }}>
                  <Row justify='flex-start'>
                    <Text size={14}>{infraccio.texto}</Text>
                  </Row>
                </Card.Body>


              </Card>
            </Grid>
          ))

        }
      </Grid.Container>
      </InfiniteScroll>
      <style jsx global>{`
          p{
            letter-spacing:0.0px
          }
        `}</style> 
    </Layout>
  )
}


export const getStaticProps: GetStaticProps = async (ctx) => {



  const { data,count } = await supabase
    .from('manresa_circulacio')
    .select('*', { count: 'exact' })
    


  return {
    props: { count },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every day
    revalidate: 86400, // In seconds
  }
}



export default HomePage;



