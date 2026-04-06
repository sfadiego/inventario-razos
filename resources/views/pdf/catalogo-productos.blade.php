<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">

    <style>
        body {
            font-family: sans-serif;
            font-size: 12px;
            margin: 25px;
        }

        h1 {
            text-align: center;
            color: black;
            padding: 12px 0;
            font-size: 22px;
            border-radius: 4px;
            margin-bottom: 25px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        th {
            background: #4a4a4a;
            color: white;
            font-weight: bold;
            padding: 7px;
            font-size: 11px;
            border: 1px solid #000;
            text-align: left;
        }

        td {
            border: 1px solid #000;
            padding: 6px;
            font-size: 11px;
        }

        tbody tr:nth-child(even) {
            background: #ebebeb;
        }

        tbody tr:nth-child(odd) {
            background: #ffffff;
        }


        .barcode {
            width: 100%;
        }

        .image {
            width: 100%;
        }

    </style>
</head>

<body>

    <h1>Catálogo de Productos</h1>
    @foreach ($productos as $categoria => $items)
    <h3>{{ $categoria }}</h3>
    <table>
        <thead>
            <tr>
                @if ($print_image) <th>Foto</th> @endif
                @if ($print_barcode) <th>Código Barras</th> @endif
                <th>Clave</th>
                <th>Producto</th>
                <th>Unidad</th>
                <th>Precio</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($items as $item)
            <tr>
                @if ($print_image)
                <td>
                    @if($item['image_path'] && file_exists($item['image_path']))
                    <img src="{{ $item['image_path'] }}" width="60">
                    @endif
                </td>
                @endif

                @if ($print_barcode && isset($item['codigo']))
                <td>
                    @php
                    $barcodeData = base64_encode($generator->getBarcode($item['codigo'], $generator::TYPE_CODE_128, 1, 25));
                    @endphp
                    <img class="barcode" src="data:image/png;base64,{{ $barcodeData }}">
                </td>
                @endif

                <td>{{ $item['codigo'] }}</td>
                <td>{{ $item['nombre'] }}</td>
                <td>{{ $item['unidad'] }}</td>
                <td>{{ number_format($item['precio_venta'], 2) }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
    <div style="page-break-after: always;"></div>
    @endforeach
</body>

</html>

</html>
