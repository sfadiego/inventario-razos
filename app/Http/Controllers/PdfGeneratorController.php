<?php

namespace App\Http\Controllers;

use App\Http\Requests\Pdf\CatalogoProductosRequest;
use App\Http\Requests\Ventas\ReporteVentaRequest;
use App\Models\Producto;
use App\Models\Venta;
use App\Models\VentaProducto;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;
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
        $generator = new BarcodeGeneratorPNG;
        $productos = Producto::select('productos.id', 'productos.codigo', 'productos.nombre', 'productos.unidad', 'productos.precio_venta', 'productos.stock', 'productos.categoria_id', 'productos.subcategoria_id', 'productos.marca_id', 'productos.imagen_id')
            ->with([
                'imagen',
                'marca:id,nombre',
                'categoria:id,nombre',
                'subcategoria:id,nombre'
            ])
            ->where('categoria_id', $param->categoria_id)
            ->orderBy('subcategoria_id', 'asc')
            ->orderBy('nombre')
            ->get()
            ->map(function ($item) use ($generator) {
                $barcode = $generator->getBarcode($item->codigo, $generator::TYPE_CODE_128);
                $item->barcode = base64_encode($barcode);
                $image = null;
                if ($item->imagen_id) {
                    $path = "{$item->imagen->path}/{$item->imagen->archivo}";
                    $image = Storage::disk('local')->readStream($path);
                    $image = base64_encode(stream_get_contents($image));
                }

                $item->encodedimagen = $item->imagen ? $image : null;
                return $item;
            });

        $productosAgrupados = $productos->groupBy(function ($item) {
            return $item->subcategoria?->nombre ?? 'Sin subcategoría';
        });

        $pdf = Pdf::loadView('pdf.catalogo-productos', [
            'productos' => $productosAgrupados,
            'print_barcode' => $param->print_barcode,
            'print_image' => $param->print_image,
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
            'periodo' => $params?->fecha_inicio . ' al ' . $params?->fecha_fin,
        ])->setPaper('letter');

        return $pdf->download('reporte-venta.pdf');
    }
}
