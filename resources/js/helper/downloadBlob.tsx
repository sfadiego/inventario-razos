export const downloadBlob = (blobdata: any, name: string) => {
  const blob = new Blob([blobdata], { type: 'application/octet-stream' });
  const fileURL = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = fileURL;
  link.setAttribute('download', name);
  link.click();
  window.URL.revokeObjectURL(fileURL);
};
