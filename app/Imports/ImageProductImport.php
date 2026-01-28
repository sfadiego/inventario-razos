<?php

namespace App\Imports;

use App\Models\Producto;
use Illuminate\Http\UploadedFile;

class ImageProductImport
{
    public array $assignedImages = [];
    public array $invalidImages = [];

    public function handleSingleImageFile(UploadedFile $file): void
    {
        $fileName = $file->getClientOriginalName();
        $codigo = pathinfo($fileName, PATHINFO_FILENAME);
        $producto = Producto::where('codigo', $codigo)->first();
        if (!$producto) {
            $this->invalidImages[] = $fileName;
        } else {
            $image = $producto->handleProductoImage($file);
            $producto->imagen()->associate($image);
            $producto->save();
            $this->assignedImages[] = $fileName;
        }
    }

    public function handleMultipleFiles(array $files): void
    {
        foreach ($files as $file) {
            $this->handleSingleImageFile($file);
        }
    }
}
