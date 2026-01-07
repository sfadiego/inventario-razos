<?php

return [
    // note: if you are using docker in localhost, you should use '/usr/bin'
    // if you use localhost as normally without docker use '/opt/homebrew/bin' for mac
    // for windows ....
    'dump_path' => env('APP_DUMP_PATH', '/usr/bin'),
];
