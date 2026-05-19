<?php

namespace Tests\Feature\Images;

use App\Models\Categoria;
use App\Models\Producto;
use App\Models\Proveedor;
use App\Models\Ubicacion;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;

class TestImages extends TestCase
{
    public function test_product_image(): void
    {
        $this->loginAdmin();

        $producto = Producto::factory()->create([
            'proveedor_id' => Proveedor::factory()->create()->id,
            'categoria_id' => Categoria::factory()->create()->id,
            'ubicacion_id' => Ubicacion::factory()->create()->id,
        ]);

        $file = UploadedFile::fake()->image('new_image.jpg');
        $payload = [
            'file' => $file,
        ];

        $response = $this->post("/api/productos/{$producto->id}", $payload);
        $response->assertStatus(200);

        $imagePath = $response->json('data.imagen.path');
        $imageArchivo = $response->json('data.imagen.archivo');

        $this->assertNotNull($imagePath);
        $this->assertNotNull($imageArchivo);
    }

    public function test_store_images_single_file(): void
    {
        $this->loginAdmin();

        $producto = Producto::factory()->create([
            'proveedor_id' => Proveedor::factory()->create()->id,
            'categoria_id' => Categoria::factory()->create()->id,
            'ubicacion_id' => Ubicacion::factory()->create()->id,
        ]);

        $file = UploadedFile::fake()->image('producto.jpg');

        $response = $this->post('/api/imports/images', [
            'file' => [$file],
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'status',
                'message',
                'data' => [
                    'assigned',
                    'invalid',
                ],
            ]);
    }

    public function test_store_images_multiple_files(): void
    {
        $this->loginAdmin();

        $file1 = UploadedFile::fake()->image('image1.jpg');
        $file2 = UploadedFile::fake()->image('image2.jpg');

        $response = $this->post('/api/imports/images', [
            'file' => [$file1, $file2],
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'status',
                'message',
                'data' => [
                    'assigned',
                    'invalid',
                ],
            ]);
    }

    public function test_store_images_no_files(): void
    {
        $this->loginAdmin();

        $response = $this->post('/api/imports/images', [
            'file' => [],
        ]);

        $response->assertStatus(422)
            ->assertJson([
                'message' => 'No se seleccionaron archivos',
            ]);
    }
}
