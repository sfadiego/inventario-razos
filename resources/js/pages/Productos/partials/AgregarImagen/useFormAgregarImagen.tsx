export const useFormAgregarImagen = () => {
  const handleSubmit = (files: File[]) => {
    console.log('submit');
  };

  return { handleSubmit };
};
