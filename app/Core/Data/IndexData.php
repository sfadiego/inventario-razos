<?php

namespace App\Core\Data;

use Illuminate\Http\Request;

class IndexData extends Request
{
    public ?int $page = 1;

    public ?int $limit = 15;

    public ?string $order = 'asc';

    public ?array $filters = [];

    public ?string $search = null;
}
