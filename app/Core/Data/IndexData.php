<?php

namespace App\Core\Data;

use Illuminate\Http\Request;

class IndexData extends Request
{
    public ?int $page;

    public ?int $limit;

    public ?int $id;

    public ?string $order;

    public ?string $orderParam;

    public ?array $filters;

    public ?array $params;

    public ?string $search;

    public function __construct(Request $request)
    {
        parent::__construct();
        $this->id = $request->route('id') ?? $request->query('id');
        $this->page = $request->input('page', 1);
        $this->limit = $request->input('limit', 15);
        $this->orderParam = $request->input('orderParam', 'id');
        $this->order = $request->input('order', 'asc');
        $this->filters = $request->input('filters', []);
        $this->params = $request->all() ?? [];
        $this->search = $request->input('search');
    }
}
