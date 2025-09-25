import DropzoneComponent from '@/components/dropzone/DropzoneComponent';
import { Modal } from '@/components/ui/modal';
import { useFormAgregarImagen } from './useFormAgregarImagen';

interface IModalAgregarImagenProps {
  isOpen: boolean;
  closeModal: () => void;
}

export const FormAgregarImagen = ({ isOpen, closeModal }: IModalAgregarImagenProps) => {
  const { handleSubmit } = useFormAgregarImagen();

  return (
    <Modal title={`Producto`} subtitle={`Actualiza imagen de producto`} isOpen={isOpen} onClose={closeModal} className="m-4 max-w-[700px]">
      <div className={`grid grid-cols-12 gap-3`}>
        <div className="col-span-12">
          <DropzoneComponent onUploadFile={handleSubmit} />
        </div>
      </div>
    </Modal>
  );
};
