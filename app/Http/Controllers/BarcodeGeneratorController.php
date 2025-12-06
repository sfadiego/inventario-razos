<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Support\Facades\Response;
use Picqer\Barcode\BarcodeGeneratorPNG;

class BarcodeGeneratorController extends Controller
{
    public function generateBarcode(Producto $producto)
    {
        $generator = new BarcodeGeneratorPNG();
        $barcode = $generator->getBarcode($producto->id, $generator::TYPE_CODE_128);
        return Response::image($barcode);
    }

    public function readBarcode() {}
}
