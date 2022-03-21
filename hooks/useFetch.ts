import { useState, useEffect, useRef } from 'react';


export const useFetch = ( url : string ) => {
    
    const isMounted = useRef(true);
    const [state, setState] = useState({ data: null, loading: true, error: "" });

    useEffect( () => {
        return () => {
            isMounted.current = false;
        }
    }, [])


    useEffect( () => {

        setState({ data: null, loading: true, error: "" });

        fetch( url )
            .then( resp => resp.json() )
            .then( data => {

                if ( isMounted.current ) {
                    setState({
                        loading: false,
                        error: "",
                        data
                    });
                }

            })
            .catch( () => {
                setState({
                    data: null,
                    loading: false,
                    error: 'No se pudo cargar la info' 
                })
            })

    },[url])

    return state;
}