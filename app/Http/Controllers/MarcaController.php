<?php

namespace App\Http\Controllers;

use App\Core\Data\IndexData;
use App\Logic\Marca\MarcaIndexLogic;
use Illuminate\Http\JsonResponse;

class MarcaController extends Controller
{
    public function index(IndexData $data, MarcaIndexLogic $logic): JsonResponse
    {
        return $logic->run($data);
    }
}
