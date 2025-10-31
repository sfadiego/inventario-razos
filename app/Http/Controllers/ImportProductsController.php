<?php

namespace App\Http\Controllers;

use App\Http\Requests\Import\ImportProductosStoreRequest;
use App\Imports\ImportProducto;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Response;
use Maatwebsite\Excel\Facades\Excel;

class ImportProductsController extends Controller
{
    public function store(ImportProductosStoreRequest $param): JsonResponse
    {
        Log::info('Iniciando importacion');
        $file = $param->file('file');
        $import = new ImportProducto;
        Excel::import($import, $file);
        $data = [
            'inserted' => $import->getInserted(),
            'duplicates' => $import->getDuplicates(),
        ];
        Log::info('Finalizando importacion');

        return Response::success($data);
    }
}
