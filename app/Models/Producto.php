<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;

class Producto extends Model
{
    use HasFactory;

    protected $table = 'productos';

    protected $fillable = ['nombre', 'proveedor_id', 'categoria_id', 'subcategoria_id', 'codigo', 'precio_compra', 'precio_venta', 'stock', 'cantidad_minima', 'compatibilidad', 'ubicacion_id', 'activo', 'imagen_id', 'unidad', 'marca_id'];

    public function proveedor(): BelongsTo
    {
        return $this->belongsTo(Proveedor::class);
    }

    public function categoria(): BelongsTo
    {
        return $this->belongsTo(Categoria::class);
    }

    public function ubicacion(): BelongsTo
    {
        return $this->belongsTo(Ubicacion::class);
    }

    public function ventaProductos(): HasMany
    {
        return $this->hasMany(VentaProducto::class);
    }

    public function tipoMovimientos(): HasMany
    {
        return $this->hasMany(TipoMovimiento::class);
    }

    public static function createFolio(string $nombre): string
    {
        $iniciales = collect(explode(' ', $nombre))
            ->map(function ($p) {
                $soloLetras = preg_replace('/[^A-Za-zÁÉÍÓÚÑáéíóúñ]/u', '', $p);

                return $soloLetras !== '' ? Str::substr($soloLetras, 0, 1) : '';
            })
            ->implode('');
        $iniciales = Str::substr($iniciales, 0, 10);
        $random = md5(uniqid() . microtime());

        return "$iniciales-" . substr($random, 0, 4);
    }

    public function imagen()
    {
        return $this->belongsTo(ImagenProducto::class, 'imagen_id', 'id');
    }

    public function handleProductoImage(UploadedFile $file)
    {
        $extension = $file->getClientOriginalExtension();
        $path = $this->path ?? now()->format('Ymd');
        $name = $this->name ?? md5(uniqid() . microtime()) . ".{$extension}";

        return ImagenProducto::storeFile($file, $name, $path);
    }

    public function marca(): BelongsTo
    {
        return $this->belongsTo(Marca::class);
    }
}
