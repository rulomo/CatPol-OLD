
import NextLink from 'next/link';
import { Spacer, Text, useTheme, Link, Input, FormElement, Loading } from '@nextui-org/react';
import React, { useState } from 'react';
import { useSearchContext } from '../../context';



export const Navbar = () => {

    // const { theme } = useTheme();
    
    const {setValueSearch}=useSearchContext();

    //Solo pone en el Input las palabras de mas de tres caracteres
    const handleInputChange = (e:React.ChangeEvent<FormElement>) => {
        const value = e.currentTarget.value;        
        const arrayFilter = value.split(' ').filter((word)=>word.length>=3)
        setValueSearch(arrayFilter)
    }

    return (

        <div style={{
            display: 'flex',
            height: '60px',
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'start',
            padding: '0x 50px',
            // backgroundColor: theme?.colors.gray900.value
        }}>
            <NextLink href="/" passHref>
                <Link>
                    <Text color='white' h2>C</Text>
                    <Text color='white' h3>atpol</Text>
                </Link>
            </NextLink>
            <Spacer css={{ flex: 1 }} />
            <Input
                width='14em'
                id='infraction-search'
                size="sm" 
                type={"search"}       
                borderWeight={ "normal"}         
                placeholder="Buscar..."
                bordered
                aria-label="Search"
                onChange={handleInputChange}
                css={{mr:0,mt:5}}
            />
        </div>
    )
};
