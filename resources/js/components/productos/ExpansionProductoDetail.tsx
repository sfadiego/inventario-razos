interface ExpansionProductoDetailProps {
  nombre: string;
  compatibilidad: string;
}

export const ExpansionProductoDetail = ({ nombre, compatibilidad }: ExpansionProductoDetailProps) => {
  return (
    <div className="flex px-8 pt-2">
      <div className="flex-1">
        <h3 className="mb-1 text-lg font-bold">Detalles de {nombre}</h3>
        <p className="mb-2">
          <span className="font-bold">Compatibilidad:</span> {compatibilidad}
        </p>
      </div>
    </div>
  );
};
