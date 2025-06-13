<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\HasApiTokens;
use Laravel\Sanctum\PersonalAccessToken;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'users';

    protected $fillable = [
        'name',
        'role_id',
        'email',
        'password',
        'activo',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'activo' => 'boolean',
        ];
    }

    public static function authUser($token): ?User
    {
        $accessToken = PersonalAccessToken::findToken($token);

        return $accessToken?->tokenable;
    }

    public static function register(
        string $name,
        string $email,
        string $password,
        bool $activo = true,
    ): User {
        return self::create([
            'name' => $name,
            'email' => $email,
            'password' => $password,
            'activo' => $activo,
        ]);
    }

    public static function login(string $email, string $password): mixed
    {
        if (! Auth::attempt(['email' => $email, 'password' => $password])) {
            return false;
        }

        $user = self::where('email', $email)->first();

        return [
            'user' => $user,
            'access_token' => $user->createToken('access_token')->plainTextToken,
        ];
    }

    public static function generateAccessToken($user)
    {
        return $user->createToken('access_token')->plainTextToken;
    }

    public function roles(): hasMany
    {
        return $this->hasMany(Role::class);
    }
}
