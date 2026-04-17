<?php

namespace App\Http\Controllers;

use App\Http\Requests\Pdf\CatalogoProductosRequest;
use App\Http\Requests\Ventas\ReporteVentaRequest;
use App\Models\Venta;
use App\Models\VentaProducto;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\DB;
use Picqer\Barcode\BarcodeGeneratorPNG;
use Symfony\Component\HttpFoundation\File\Stream;
use Symfony\Component\HttpFoundation\Response;

use function Symfony\Component\Clock\now;

class PdfGeneratorController extends Controller
{
    /**
     * @return Stream
     */
    public function catalogoProductos(CatalogoProductosRequest $param): Response
    {
        $productos = DB::table('productos as p')
            ->leftJoin('subcategoria as s', 'p.subcategoria_id', '=', 's.id')
            ->leftJoin('imagen_producto as i', 'p.imagen_id', '=', 'i.id')
            ->select([
                'p.codigo',
                'p.nombre',
                'p.unidad',
                'p.precio_venta',
                'p.stock',
                's.nombre as subcategoria_nombre',
                'i.path',
                'i.archivo',
            ])
            ->where('p.categoria_id', $param->categoria_id)
            ->whereNull('p.deleted_at')
            ->orderBy('s.nombre')
            ->orderBy('p.nombre')
            ->cursor();

        $productosAgrupados = [];
        foreach ($productos as $item) {
            $subName = $item->subcategoria_nombre ?? 'Sin subcategoría';
            $productosAgrupados[$subName][] = [
                'codigo' => $item->codigo,
                'nombre' => $item->nombre,
                'unidad' => $item->unidad,
                'precio_venta' => $item->precio_venta,
                'stock' => $item->stock,
                'image_path' => ($item->path && $item->archivo)
                    ? storage_path("app/private/{$item->path}/{$item->archivo}")
                    : null,
            ];
        }

        unset($productos);
        $pdf = Pdf::loadView('pdf.catalogo-productos', [
            'productos' => $productosAgrupados,
            'print_barcode' => $param->print_barcode,
            'print_image' => $param->print_image,
            'generator' => new BarcodeGeneratorPNG,
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
            'expedido' => now()->format('Y-m-d'),
            'fechaReporte' => $params?->fecha_inicio,
        ])->setPaper('letter');

        return $pdf->download('reporte-venta.pdf');
    }
}
