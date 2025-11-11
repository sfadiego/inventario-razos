<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ErrorReporting extends Model
{
    protected $table = 'error_reporting';
    protected $fillable = [
        'endpoint',
        'method',
        'status_code',
        'error_message',
        'request_payload',
        'response_body'
    ];

    protected $casts = [
        'request_payload' => 'array',
        'response_body' => 'array',
    ];
}
