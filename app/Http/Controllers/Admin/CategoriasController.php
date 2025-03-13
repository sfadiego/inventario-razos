<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Categoria;
use Inertia\Inertia;

class CategoriasController extends Controller
{
    public function index()
    {
        $categorias = Categoria::all();
        return Inertia::render('categorias/index', [
            'categorias' => $categorias
        ]);
    }
}
