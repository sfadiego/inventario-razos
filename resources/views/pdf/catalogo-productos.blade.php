<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">

    <style>
        {
            {!! file_get_contents(resource_path('css/pdf/custom.css')) !!}
        }

        .barcode {
            width: 50%;
        }

    </style>
</head>

<body>

    <h1>Catálogo de Productos</h1>

    <table>
        <thead>
            <tr>
                <th>Codigo</th>
                <th>Folio</th>
                <th>Producto</th>
                <th>Marca</th>
            </tr>
        </thead>

        <tbody>
            @foreach ($productos as $p)
            <tr>
                <td>
                    <img class="barcode" src="data:image/png;base64,{{ $p->barcode }}" alt="Codigo">
                </td>
                <td>{{ $p->codigo }}</td>
                <td>{{ $p->nombre }}</td>
                <td>{{ $p->marca?->nombre ? $p->marca?->nombre : 'N/A' }}</td>
            </tr>
            @endforeach
        </tbody>

    </table>

</body>

</html>
