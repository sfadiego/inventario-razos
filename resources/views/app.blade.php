<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="UTF-8" />
    <link rel="icon" href={{ asset('images/logo/logo.svg') }} />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @routes
    @viteReactRefresh
    @vite(['resources/js/main.tsx', 'resources/css/app.css'])
</head>

<body class="dark:bg-gray-900">
    <div id="root">
        <noscript>
            <strong>
                Lo sentimos, este sitio no funciona correctamente sin Javascript. Habilitalo para poder
                continuar
            </strong>
        </noscript>
    </div>
</body>

</html>
