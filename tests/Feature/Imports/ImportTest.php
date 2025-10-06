<?php

namespace Tests\Feature\Imports;

use App\Models\Producto;
use Tests\TestCase;
use Illuminate\Http\UploadedFile;

class ImportTest extends TestCase
{
    public function test_import_products_successfully(): void
    {
        $this->loginAdmin();
        $totalProductosAntes = Producto::count();
        $filePath = base_path('tests/Feature/Imports/productos.xlsx');
        $file = new UploadedFile(
            $filePath,
            'productos.xlsx',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            null,
            true
        );
        $response = $this->post('/api/imports', [
            'file' => $file,
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'status',
            'message',
            'data' => [
                'inserted',
            ],
        ]);

        $totalInsertados = count($response->json('data.inserted'));
        $this->assertEquals($totalProductosAntes + $totalInsertados, Producto::count());
    }
}
