<?php

namespace Tests\Feature\Imports;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Http\File;

class ImportTest extends TestCase
{
    public function test_import_productos_correctamente(): void
    {
        $response = $this->post('/api/imports', [
            'file' => new File(public_path('tests/Feature/Imports/productos.csv')),
        ]);

        $response->assertStatus(200);
    }
}
