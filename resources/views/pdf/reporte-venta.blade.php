<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">

    <style>
        {!!file_get_contents(resource_path('css/pdf/custom.css')) !!}

    </style>
</head>

<body>

    <h1>Reporte de ventas</h1>
    <table>
        <thead>
            <tr>
                <th>Total de ventas</th>
                <th>Periodo</th>
            </tr>
        </thead>

        <tbody>
            <tr>
                <td>{{ "$ $total" }}</td>
                <td>{{ $fechaReporte }}</td>
            </tr>
        </tbody>
    </table>

    <table>
        <thead>
            <tr>
                <th>Folio Venta</th>
                <th>Total de venta</th>
                <th>Fecha</th>
            </tr>
        </thead>

        <tbody>
            @foreach ($ventas as $venta)
            <tr>
                <td>{{ $venta->folio }}</td>
                <td>{{  "$ ". number_format($venta->venta_total, 2, '.', '') }}</td>
                <td>{{ $venta->created_at->format('Y-m-d') }}</td>
            </tr>
            @endforeach
        </tbody>

    </table>

</body>

</html>
