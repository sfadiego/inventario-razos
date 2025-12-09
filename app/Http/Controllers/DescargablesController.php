<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Response;

class DescargablesController extends Controller
{
    public function downloadTemplateImport()
    {
        $path = storage_path('app/public/template/imports/productos.xlsx');
        if (! file_exists($path)) {
            return Response::error('Archivo no encontrado');
        }

        return Response::download($path, 'plantilla.xlsx');
    }
}
