export type AcceptedTypes = 'images' | 'documents';
export const acceptedFiles = {
  images: {
    'image/png': [],
    'image/jpeg': [],
  },
  documents: {
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['xlsx'],
  },
};
