<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Support\Facades\Response;
use Picqer\Barcode\BarcodeGeneratorPNG;

class BarcodeGeneratorController extends Controller
{
    public function generateBarcode(Producto $producto)
    {
        $generator = new BarcodeGeneratorPNG;
        $barcode = $generator->getBarcode($producto->codigo, $generator::TYPE_CODE_128);

        return Response::make($barcode, 200, ['Content-Type' => 'image/png']);
    }
}
