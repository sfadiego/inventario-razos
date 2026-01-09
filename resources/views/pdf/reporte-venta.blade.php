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
    <h3>Generado el: {{ $expedido }}</h3>
    <table>
        <thead>
            <tr>
                <th>Total de ventas</th>
                <th>Reporte</th>
            </tr>
        </thead>

        <tbody>
            <tr>
                <td width="80%">{{ "$ $total" }}</td>
                <td width="20%">{{ $fechaReporte }}</td>
            </tr>
        </tbody>
    </table>
    <table>
        <thead>
            <tr>
                <th>Categoria</th>
                <th>Total</th>
            </tr>
        </thead>

        <tbody>
            @foreach ($reportePorCategoria as $item)
            <tr>
                <td>{{ $item['categoria'] }}</td>
                <td>{{ "$ " . number_format($item['total'], 2, '.', '') }}</td>
            </tr>
            @endforeach
            @if(count($reportePorCategoria) === 0)
            <tr>
                <td colspan="2">No hay ventas registradas en el período seleccionado</td>
            </tr>
            @endif
        </tbody>
    </table>

    <table>
        <thead>
            <tr>
                <th>Folio Venta</th>
                <th>Nombre Venta</th>
                <th>Total de venta</th>
                <th>Fecha</th>
            </tr>
        </thead>

        <tbody>
            @foreach ($ventas as $venta)
            <tr>
                <td>{{ $venta->folio }}</td>
                <td>{{ $venta->nombre_venta ?? 'N/A' }}</td>
                <td>{{ "$ ". number_format($venta->venta_total, 2, '.', '') }}</td>
                <td>{{ $venta->created_at->format('Y-m-d') }}</td>
            </tr>
            @endforeach
            @if(count($ventas) === 0)
            <tr>
                <td colspan="4">No hay ventas registradas en el período seleccionado</td>
            </tr>
            @endif
        </tbody>

    </table>

</body>

</html>
