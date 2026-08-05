export const getStorageFileEndpoint = (endpoint: string, folderName: string, fileName: string) => {
  const searchParams = new URLSearchParams({
    folderName,
    fileName
  });

  return `${endpoint}?${searchParams.toString()}`;
};
