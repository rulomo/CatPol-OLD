
import { useEffect } from 'react';
import { Layout } from '../../components/layouts';




const FavoritesPage = () => {
  console.log("RENDEEEEEEEEEEER")
  useEffect(() => {

    console.log("hello")
      return () => {
    
      }
    }, [])
    
  return (
      <Layout title='Pokémons - Favoritos'>
        <h1>Favoritos</h1>
      </Layout>
  )
};

export default FavoritesPage;
