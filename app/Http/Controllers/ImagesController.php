<?php

namespace App\Http\Controllers;

use App\Core\Enums\Http;
use App\Models\ImagenProducto;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;

class ImagesController extends Controller
{
    public function show(string $folder, string $image)
    {
        $path = "{$folder}/{$image}";
        if (! Storage::disk('local')->exists($path)) {
            Response::error('Image not found', Http::NotFound);
        }
        $stream = Storage::disk('local')->readStream($path);

        return Response::streamFile($stream, Http::Success);
    }
}
