<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Response;

class DescargablesController extends Controller
{
    public function templateImport()
    {
        $path = storage_path('app/public/templates/imports/productos.xlsx');
        if (! file_exists($path)) {
            return Response::error('Archivo no encontrado');
        }

        return Response::download($path, 'plantilla.xlsx');
    }
}
