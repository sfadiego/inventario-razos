<?php

namespace App\Imports;

use App\Models\Producto;
use Illuminate\Http\UploadedFile;

class ImageProductImport
{
    public static function handleSingleImageFile(UploadedFile $file): string
    {
        $fileName = $file->getClientOriginalName();
        $codigo = pathinfo($fileName, PATHINFO_FILENAME);
        $producto = Producto::where('codigo', $codigo)->first();
        $image = $producto->handleProductoImage($file);
        $producto->imagen()->associate($image);
        $producto->save();
        return $fileName;
    }

    public static function handleMultipleFiles(array $files): array
    {
        $assignedImages = [];
        foreach ($files as $file) {
            $assignedImages[] = ImageProductImport::handleSingleImageFile($file);
        }

        return $assignedImages;
    }
}
