<?php

namespace App\Logic\User;

use App\Core\Data\IndexData;
use App\Core\Logic\IndexLogic;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class UserIndexLogic extends IndexLogic
{
    public function __construct(User $modelo)
    {
        parent::__construct($modelo);
    }

    protected function tableHeaders(): array
    {
        return [
            'id' => __('#'),
            'name' => 'Nombre',
            'role_id' => 'Role',
            'email' => 'Email',
            'activo' => 'Activo',
            'actions' => '#',
        ];
    }

    public function run(IndexData $data): JsonResponse
    {
        return parent::run($data);
    }
}
