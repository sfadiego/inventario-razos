<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">

    <style>
        {
            {!! file_get_contents(resource_path('css/pdf/custom.css')) !!}
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

    <table>
        <thead>
            <tr>
                @if ($print_image)
                <th>Foto</th>
                @endif
                @if ($print_barcode)
                <th>Código</th>
                @endif
                <th>Clave</th>
                <th>Producto</th>
                <th>Unidad</th>
                <th>Precio</th>
            </tr>
        </thead>

        <tbody>
            @foreach ($productos as $categoria => $productos)
            <tr>
                <td colspan="6">
                    {{ $categoria }}
                </td>
            </tr>

            @foreach ($productos as $item)
            <tr>
                @if ($print_image)
                <td>
                    @if($print_image && $item['image_path'] && file_exists($item['image_path']))
                        <td>
                            <img src="data:image/png;base64,{{ base64_encode(file_get_contents($item['image_path'])) }}" width="60">
                        </td>
                    @endif
                </td>
                @endif

                @if ($print_barcode && isset($item['codigo']))
                <td>
                    @php
                    $codigo = $item['codigo'];
                    @endphp
                    <img class="barcode" src="data:image/png;base64,{{ base64_encode($generator->getBarcode($codigo, $generator::TYPE_CODE_128)) }}">
                </td>
                @endif
                <td>{{ $item['codigo'] }}</td>
                <td>{{ $item['nombre'] }}</td>
                <td>{{ $item['unidad'] }}</td>
                <td>{{ $item['precio_venta'] }}</td>
            </tr>
            @endforeach
            @endforeach
        </tbody>


    </table>

</body>

</html>

</html>
