<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">

    <style>
        {!! file_get_contents(resource_path('css/pdf/catalogoPdf.css')) !!}
    </style>
</head>

<body>

    <h1>Catálogo de Productos</h1>

    <table>
        <thead>
            <tr>
                <th>Código</th>
                <th>Producto</th>
                <th>Marca</th>
                <th>Precio Venta</th>
            </tr>
        </thead>

        <tbody>
            @foreach ($productos as $p)
                <tr>
                    <td>{{ $p->codigo }}</td>
                    <td>{{ $p->nombre }}</td>
                    <td>{{ optional($p->marca)->nombre ?? 'N/A' }}</td>
                    <td>${{ number_format($p->precio_venta, 2) }}</td>
                </tr>
            @endforeach
        </tbody>

    </table>

</body>

</html>
