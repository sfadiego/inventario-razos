<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(): \Inertia\Response
    {
        $widgets = [
            [
                'title' => 'Venta del dia',
                'value' => 1000 // TODO: obtener de la base de datos
            ],
            [
                'title' => 'Producto mas vendidos',
                'value' => 'Refaccion 1', // TODO: obtener de la base de datos
            ],
            [
                'title' => 'Producto menos vendidos',
                'value' => 1000, // TODO: obtener de la base de datos
            ]
        ];
        return Inertia::render('dashboard', [
            'widgets' => $widgets
        ]);
    }
}
