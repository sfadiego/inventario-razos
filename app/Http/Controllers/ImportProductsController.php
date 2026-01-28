<?php

namespace App\Http\Controllers;

use App\Http\Requests\Import\ImportImageProductsUpdateRequest;
use App\Http\Requests\Import\ImportProductosStoreRequest;
use App\Imports\ImageProductImport;
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
            'importInfo' => $import->getImportInfo(),
        ];
        Log::info('Imported Productos', ['data' => $data]);
        Log::info('Finalizando importacion - Total inserted: ' . count($data['inserted']) . ', Total duplicates: ' . count($data['duplicates']));

        return Response::success($data);
    }

    public function update(ImportImageProductsUpdateRequest $param)
    {
        $files = collect($param->file('file'))->count();
        $assignedImages = [];
        if ($files > 1) {
            $assignedImages = ImageProductImport::handleMultipleFiles($param->file('file'));
            return Response::success($assignedImages);
        }

        $assignedImages[] = ImageProductImport::handleSingleImageFile($param->file('file')[0]);
        return Response::success($assignedImages);
    }
}
