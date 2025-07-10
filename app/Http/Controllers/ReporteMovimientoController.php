<?php

namespace App\Http\Controllers;

use App\Core\Data\IndexData;
use App\Logic\ReporteMovimientos\ReporteMovimientosIndexLogic;
use Illuminate\Http\JsonResponse;

class ReporteMovimientoController extends Controller
{
    public function index(IndexData $data, ReporteMovimientosIndexLogic $logic): JsonResponse
    {
        return $logic->run($data);
    }
}
