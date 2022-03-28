import Image from 'next/image';
import NextLink from 'next/link';
import { Spacer, Text, useTheme, Link, Input } from '@nextui-org/react';


export const Navbar = () => {

    const { theme } = useTheme()

    return (
       
        <div style={{
            display: 'flex',
            height:'76px',
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'start',
            padding: '0x 50px',
            // backgroundColor: theme?.colors.gray900.value
        }}>
            {/* <Image 
                src=""
                alt="icono de la app"
                width={70}
                height={70}
            /> */}

            <NextLink href="/" passHref>
                <Link>
                    <Text color='white' h2>C</Text>
                    <Text color='white' h3>atpol</Text>                    
                </Link>
            </NextLink>            
            <Spacer css={{ flex: 1 }}/>
            <Input id='infraction-search' placeholder="Buscar..." bordered clearable aria-label="Search" />
            
            
            
        </div>
    )
};
