export interface OrdenancaStandard {
    id: number;
    norma: string;
    articulo: number;
    apartado: null | string;
    opcion: null | string;
    puntos: null | string;
    calificacion: string;
    texto: string;
    multa: number | null;
    responsabilidad: string;
    comentario: null | string;
    materia: string;
    materiaDGT: string;
}

export interface OrdenancaShort {
    id: number;
    norma: string;
    articulo: number;
    apartado: null | string;
    opcion: null | string;
    puntos: null | string;
    calificacion: string;
    texto: string;
    multa: number | null;
    materia: string;    
}

export interface Data {
    info:    Info;
    results: OrdenancaStandard[];
}

export interface Info {
    count:   number;
    pages:   number;
    next:    string;
    prev:    string;
    hasNext: boolean;
    currentPage:number;
    nextPage:string;
}
