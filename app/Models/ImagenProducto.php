<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class ImagenProducto extends Model
{
    protected $table = 'imagen_producto';

    protected $fillable = ['archivo', 'path', 'external'];

    public static function storeFile(UploadedFile $file, string $name, string $path): ImagenProducto
    {
        $file->storeAs($path, $name);

        return ImagenProducto::create([
            'archivo' => $name,
            'path' => $path,
            'external' => false,
        ]);
    }
}
