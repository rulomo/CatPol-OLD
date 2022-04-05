import React, { useEffect, useRef } from "react";
import { NextPage } from "next";
import { Card, Text, Row, Divider } from "@nextui-org/react";
import { OrdenancaShort, OrdenancaStandard } from "../../interfaces";
import { useSearchContext } from "../../context";
import { text } from "stream/consumers";

interface Infraccio {
  infraccio: OrdenancaShort;
}

const coloredWords = (values: string[], infraccio: OrdenancaShort) => {

  console.log(values)
  console.log(infraccio.texto)
  if (values?.length > 0) {
    return infraccio.texto.replace(values[0], `<span style="color:springgreen">${values[0]}</span>`);
  } else {
    return infraccio.texto
  }


}

export const CardInfraccio: NextPage<Infraccio> = ({ infraccio }) => {

  const { valueSearch } = useSearchContext();

  const textColored = coloredWords(valueSearch, infraccio);

  console.log(textColored)
  
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
      
          <Text size={14}
              
              css={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              lineClamp: 2,
              overflowClipBox: 'unset',
              boxOrient: 'vertical'
              }}>
            {infraccio.texto}
          </Text>
          {textColored}
        </Row>
      </Card.Body>

    </Card>

  )
}

