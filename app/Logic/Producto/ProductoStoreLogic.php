<?php

namespace App\Logic\Producto;

use App\Models\Producto;
use Illuminate\Support\Str;

class ProductoStoreLogic
{
    public function handle(array $data): Producto
    {
        $data['codigo'] = $this->generateUniqueCodigo($data['nombre']);
        return Producto::create($data);
    }

    private function generateUniqueCodigo(string $nombre): string
    {
        do {
            $codigo = $this->generateCodigo($nombre);
        } while (Producto::where('codigo', $codigo)->exists());

        return $codigo;
    }

    private function generateCodigo(string $nombre): string
    {
        $baseNombre = $this->formatNombre($nombre);
        $rand = random_int(0, 99999);
        $randFormat = str_pad($rand, 5, '0', STR_PAD_LEFT);
        $date = now()->format('dmy');

        return "{$baseNombre}-{$randFormat}-{$date}";
    }

    private function formatNombre(string $nombre): string
    {
        $str = Str::of($nombre)
            ->upper()
            ->replaceMatches('/[^A-Z0-9]/', '');

        if ($str->length() <= 5) {
            return (string) $str->substr(0, 5);
        }

        $words = Str::of($nombre)
            ->upper()
            ->explode(' ')
            ->filter();

        if ($words->count() > 1) {
            $initials = $words
                ->map(fn($w) => Str::substr((string) $w, 0, 1))
                ->join('');

            return Str::limit($initials, 5, '');
        }

        return (string) $str->substr(0, 5);
    }
}
