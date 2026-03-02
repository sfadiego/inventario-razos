<?php

namespace App\Http\Controllers;

use App\Http\Requests\Pdf\CatalogoProductosRequest;
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
    public function catalogoProductos(CatalogoProductosRequest $param): Response
    {
        $productosAgrupados = [];
        $generator = new BarcodeGeneratorPNG;

        // Usamos chunkById para no cargar todo de golpe
        Producto::query()
            ->select([
                'id',
                'codigo',
                'nombre',
                'unidad',
                'precio_venta',
                'stock',
                'subcategoria_id',
                'imagen_id',
            ])
            ->with([
                'imagen:id,path,archivo',
                'subcategoria:id,nombre',
            ])
            ->where('categoria_id', $param->categoria_id)
            ->orderBy('subcategoria_id')
            ->orderBy('nombre')
            ->chunkById(100, function ($productos) use (&$productosAgrupados) {
                foreach ($productos as $item) {
                    $subName = $item->subcategoria?->nombre ?? 'Sin subcategoría';

                    // Guardamos solo los datos estrictamente necesarios en formato array
                    // Esto es mucho más ligero que un objeto Eloquent
                    $productosAgrupados[$subName][] = [
                        'codigo' => $item->codigo,
                        'nombre' => $item->nombre,
                        'unidad' => $item->unidad,
                        'precio_venta' => $item->precio_venta,
                        'stock' => $item->stock,
                        'image_path' => $item->imagen
                            ? storage_path("app/{$item->imagen->path}/{$item->imagen->archivo}")
                            : null,
                    ];
                }
            });

        // dd($productosAgrupados);
        $pdf = Pdf::loadView('pdf.catalogo-productos', [
            'productos' => $productosAgrupados,
            'print_barcode' => $param->print_barcode,
            'print_image' => $param->print_image,
            'generator' => $generator,
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
