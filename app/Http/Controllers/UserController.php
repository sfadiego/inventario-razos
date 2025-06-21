<?php

namespace App\Http\Controllers;

use App\Core\Data\IndexData;
use App\Http\Requests\Users\UserStoreRequest;
use App\Http\Requests\Users\UserUpdateRequest;
use App\Logic\User\UserIndexLogic;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Response;

class UserController extends Controller
{
    public function index(IndexData $data, UserIndexLogic $logic): JsonResponse
    {
        return $logic->run($data);
    }

    public function store(UserStoreRequest $params): JsonResponse
    {
        $validated = $params->validated();

        $validated['password'] = Hash::make($validated['password']);

        $user = User::create($validated);

        return Response::success($user);
    }

    public function show(User $user): JsonResponse
    {
        return Response::success($user);
    }

    public function update(UserUpdateRequest $params, User $user): JsonResponse
    {
        $validated = $params->validated();

        if (! empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $user->update($validated);

        return Response::success($user);
    }

    public function delete(User $user): JsonResponse
    {
        return Response::success($user->delete());
    }
}
