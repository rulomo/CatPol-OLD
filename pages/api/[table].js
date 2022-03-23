import { supabase } from "../../utils/supabaseClient";

/**
 *
 *
 */

const getInfraccions = async (req, res) => {
    const {
        query: { table, page },
    } = req;

    const { count } = await supabase
        .from("manresa_circulacio")
        .select("*", { count: "exact", head: true });
    
    const pages =
        count % 30 > 0 ?
            Number((count / 30).toFixed()) + 1 :
            (count / 30).toFixed();
   
    const pagevalid =
        parseInt(page) > 0 && parseInt(page) <= pages ? 
        parseInt(page) : 
        null;

    if (!pagevalid)
        return res
            .status(400)
            .send({ error: "El numero de pagines no és vàlid" });

    const nextPage = pagevalid ? pagevalid + 1 : null;
    const prevPage = pagevalid ? pagevalid - 1 : null;

    const next =
        nextPage && nextPage <= pages ? 
        `api/${table}/?page=${nextPage}` : 
        null;
    
    const prev =
        prevPage && prevPage >= 1 ? 
        `api/${table}/?page=${prevPage}` :
         null;

    const hasNext = next ? true : false;

    const minRange = (pagevalid - 1) * 30;
    const maxRange = pagevalid * 30 - 1;

    const { data } = await supabase
        .from("manresa_circulacio")
        .select("*")
        .order("articulo,apartado,opcion,id", { ascending: true })
        .range(minRange, maxRange);

    return res
        .status(200)
        .send({ info: { count, pages, next, prev, hasNext }, results: data });
};

export default getInfraccions;
