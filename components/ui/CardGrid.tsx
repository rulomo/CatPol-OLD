import React, { memo } from "react";
import { NextPage } from "next";
import { Grid } from "@nextui-org/react";
import { OrdenancaShort } from "../../interfaces";
import { CardInfraccio } from "./CardInfraccio";

interface Infraccio {
  infraccio: OrdenancaShort;
}

export const CardGrid: NextPage<Infraccio> = memo(({ infraccio }) => {
  return (
    <Grid xs={12} sm={6} md={4} lg={4} css={{ mb: -15,height: '250px'}} >
      <CardInfraccio infraccio={infraccio} />
    </Grid>
  )
})
CardGrid.displayName = "CardInfraccio"
