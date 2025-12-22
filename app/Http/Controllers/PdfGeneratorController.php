<?php

namespace App\Http\Controllers;

use App\Http\Requests\Ventas\ReporteVentaRequest;
use App\Models\Producto;
use App\Models\Venta;
use App\Models\VentaProducto;
use Barryvdh\DomPDF\Facade\Pdf;
use Picqer\Barcode\BarcodeGeneratorPNG;
use Symfony\Component\HttpFoundation\File\Stream;
use Symfony\Component\HttpFoundation\Response;

use function Symfony\Component\Clock\now;

class PdfGeneratorController extends Controller
{
    /**
     * @return Stream
     */
    public function catalogoProductos(): Response
    {
        $productos = Producto::with([
            'marca:id,nombre',
            'categoria:id,nombre',
        ])
            ->select([
                'id',
                'codigo',
                'nombre',
                'marca_id',
                'precio_venta',
            ])
            ->orderBy('nombre')
            ->get();

        $productos->map(function ($item) {
            $generator = new BarcodeGeneratorPNG;
            $barcode = $generator->getBarcode($item->id, $generator::TYPE_CODE_128);
            $item->barcode = base64_encode($barcode);

            return $item;
        });

        $pdf = Pdf::loadView('pdf.catalogo-productos', [
            'productos' => $productos,
        ])->setPaper('letter', 'landscape');

        return $pdf->download('catalogo.pdf');
    }

    public function reporteVentas(ReporteVentaRequest $params): Response
    {
        $reporte = Venta::reporteVentas($params?->fecha_inicio, $params?->fecha_fin, $params?->order_date ?? 'desc');
        $reportePorCategoria = VentaProducto::reporteVentasPorCategoria($params?->fecha_inicio, $params?->fecha_fin, $params?->order_date ?? 'desc');
        $pdf = Pdf::loadView('pdf.reporte-venta', [
            'ventas' => $reporte,
            'reportePorCategoria' => $reportePorCategoria,
            'total' => number_format($reporte->sum('venta_total'), 2, '.', ''),
            'fechaReporte' => now()->format('Y-m-d'),
            'periodo' => $params?->fecha_inicio.' al '.$params?->fecha_fin,
        ])->setPaper('letter');

        return $pdf->download('reporte-venta.pdf');
    }
}
