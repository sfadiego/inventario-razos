export const downloadBlob = (blobdata: any) => {
  const blob = new Blob([blobdata], { type: 'application/octet-stream' });
  const fileURL = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = fileURL;
  link.setAttribute('download', 'plantilla.xlsx');
  link.click();
  window.URL.revokeObjectURL(fileURL);
};
