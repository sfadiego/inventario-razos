<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Barryvdh\DomPDF\Facade\Pdf;
use Picqer\Barcode\BarcodeGeneratorPNG;

class PdfGeneratorController extends Controller
{
    public function catalogoProductos()
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
        ])->setPaper('letter');

        return $pdf->download('catalogo.pdf');
    }
}
