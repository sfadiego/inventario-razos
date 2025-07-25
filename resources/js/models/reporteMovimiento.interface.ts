export interface IInitialValuesReporteMovimiento {
    producto_id: number | null;
    tipo_movimiento_id: number | null;
    motivo: string;
    cantidad: number | null;
    cantidad_anterior: number | null;
    cantidad_actual: number | null;
    user_id: number | null;
    fecha_movimiento: string;
}
export interface IReporteMovimiento {
    id: number;
    producto_id: number;
    tipo_movimiento_id: number;
    motivo: string;
    cantidad: number;
    cantidad_anterior: number;
    cantidad_actual: number;
    user_id: number;
    fecha_movimiento: string;
}
