<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Barryvdh\DomPDF\Facade\Pdf;

class PdfGeneratorController extends Controller
{
    public function catalogoProductos()
    {
        $productos = Producto::with([
            'marca:id,nombre',
            'categoria:id,nombre',
        ])
            ->select([
                'codigo',
                'nombre',
                'marca_id',
                'precio_venta',
            ])
            ->orderBy('nombre')
            ->get();

        $pdf = Pdf::loadView('pdf.catalogo-productos', [
            'productos' => $productos,
        ])->setPaper('letter');

        return $pdf->download('catalogo.pdf');
    }
}
