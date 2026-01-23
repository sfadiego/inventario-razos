<?php

namespace App\Repositories;

use App\Models\Categoria;

class CategoryRepository
{
    public static function findById(int $id): ?Categoria
    {
        return Categoria::find($id);
    }

    public static function findByName(string $name): ?Categoria
    {
        return Categoria::where('nombre', $name)->first();
    }

    public static function getAll(): \Illuminate\Database\Eloquent\Collection
    {
        return Categoria::all();
    }

    public static function getChildren(int $id)
    {
        return Categoria::find($id)?->children;
    }
}
