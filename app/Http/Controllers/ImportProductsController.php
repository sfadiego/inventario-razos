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
    // todo: ajustar test para validar respuesta correcta, se modifico el response de la api
    public function store(ImportProductosStoreRequest $param): JsonResponse
    {
        try {
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
        } catch (\Throwable $th) {
            Log::error('Error al importar productos', ['error' => $th->getMessage()]);
            return Response::error($th->getMessage());
        }
    }

    // TODO: crear test para esta api
    public function storeImages(ImportImageProductsUpdateRequest $param)
    {
        $files = collect($param->file('file'))->count();

        if ($files == 0) {
            return Response::error('No se seleccionaron archivos');
        }

        if ($files > 1) {
            $import = new ImageProductImport;
            $import->handleMultipleFiles($param->file('file'));

            return Response::success([
                'assigned' => $import->assignedImages,
                'invalid' => $import->invalidImages,
            ]);
        }

        $import = new ImageProductImport;
        $import->handleSingleImageFile($param->file('file')[0]);

        return Response::success([
            'assigned' => $import->assignedImages,
            'invalid' => $import->invalidImages,
        ]);
    }
}
