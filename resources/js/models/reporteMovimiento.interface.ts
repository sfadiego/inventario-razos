export interface IInitialValuesReporteMovimiento {
    producto_id: number;
    tipo_movimiento_id: number;
    motivo?: string;
    cantidad: number;
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
    created_at: string;
}
