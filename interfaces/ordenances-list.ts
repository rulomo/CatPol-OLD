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

