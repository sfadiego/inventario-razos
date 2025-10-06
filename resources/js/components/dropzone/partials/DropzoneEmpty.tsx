import { Upload } from 'lucide-react';

interface IDropzoneEmptyProps {
  getRootProps: () => any;
  getInputProps: () => any;
  isDragActive: boolean;
}
export const DropzoneEmpty = ({ getRootProps, getInputProps, isDragActive }: IDropzoneEmptyProps) => {
  return (
    <form
      {...getRootProps()}
      className={`dropzone rounded-xl border-dashed border-gray-300 p-7 lg:p-10 ${
        isDragActive ? 'border-brand-500 bg-gray-100 dark:bg-gray-800' : 'border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900'
      } `}
      id="upload-form"
    >
      {/* Hidden Input */}
      <input {...getInputProps()} />

      <div className="dz-message m-0! flex flex-col items-center">
        {/* Icon Container */}
        <div className="mb-[22px] flex justify-center">
          <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
            <Upload />
          </div>
        </div>

        {/* Text Content */}
        <h4 className="text-theme-xl mb-3 font-semibold text-gray-800 dark:text-white/90">
          {isDragActive ? 'Suelta tu archivo aqui' : 'Arrastra y suelta Archivos'}
        </h4>

        <span className="mb-5 block w-full max-w-[290px] text-center text-sm text-gray-700 dark:text-gray-400">
          Arrastra o selecciona tus archivos aqui o busca un archivo
        </span>

        <span className="text-theme-sm text-brand-500 font-medium underline">Buscar Archivo</span>
      </div>
    </form>
  );
};
