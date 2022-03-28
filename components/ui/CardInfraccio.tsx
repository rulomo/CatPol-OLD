import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { Card, Text, Row, Divider } from "@nextui-org/react";
import { OrdenancaShort } from "../../interfaces";
import TrackVisibility from 'react-on-screen';

interface Infraccio {
  infraccio: OrdenancaShort;
}

export const CardInfraccio: NextPage<Infraccio> = ({ infraccio }) => {
  
  
  return (
    <Card    
    clickable 
    bordered
    color="primary"
    css={{ borderColor: '$gray700', px: 5, py: 0, }}   
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
                `${infraccio.apartado ? `.${infraccio.apartado}` : ``}` +
                `${infraccio.opcion ? `.${infraccio.opcion}` : ``}`
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


        <Divider css={{ background: '$white' }} />

        <Row justify='flex-start'>
          <Text size={14} css={{overflow:'hidden',textOverflow:'ellipsis',display:'-webkit-box',lineClamp:2, overflowClipBox:'unset', boxOrient:'vertical'}} >{infraccio.texto}</Text>
        </Row>
      </Card.Body>

    </Card>

  )
}

