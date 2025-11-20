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
        $import = new ImportProducto();
        Excel::import($import, $file);
        $data = [
            'inserted' => $import->getInserted(),
            'duplicates' => $import->getDuplicates(),
            'importInfo' => $import->getImportInfo(),
        ];
        Log::info('Imported Productos', ['data' => $data]);
        Log::info('Finalizando importacion - Total inserted: ' . count($data['inserted']) . ', Total duplicates: ' . count($data['duplicates']));

        return Response::success($data);
    }
}
