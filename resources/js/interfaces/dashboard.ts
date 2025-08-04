export interface IDashboardMasVendidos {
    producto: string;
    cantidad: number;
}

export interface IVentasItem {
    month: string;
    total: number;
    cantidad: number;
}

export interface IDashboardVentas {
    month: IVentasItem;
}

export interface IDashboardTotalVentas {
    total: number;
}
