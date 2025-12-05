<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">

    <style>
        {!! file_get_contents(resource_path('css/pdf/catalogo-productos.css')) !!}
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
            </tr>
        </thead>

        <tbody>
            @foreach ($productos as $p)
            <tr>
                <td>{{ $p->codigo }}</td>
                <td>{{ $p->nombre }}</td>
                <td>{{ $p->marca?->nombre ? $p->marca?->nombre : 'N/A' }}</td>
            </tr>
            @endforeach
        </tbody>

    </table>

</body>

</html>
