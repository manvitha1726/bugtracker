import { BlobServiceClient } from "@azure/storage-blob";

const storageAccountName = "issuetracking";
const sastoken =  "sp=racwdl&st=2023-06-14T04:31:41Z&se=2023-06-30T12:31:41Z&sv=2022-11-02&sr=c&sig=S4gBhwimJ0cx%2F7XSr99iJSAGs5QbcGSq5F968YA7VBk%3D"
const containerName = "issue-images";
const uploadUrl = `https://${storageAccountName}.blob.core.windows.net/?${sastoken}`
// console.log(uploadUrl);

const blobService = new BlobServiceClient(uploadUrl)
const containerClient = blobService.getContainerClient(containerName);


const createBlobInContainer = async (file) => {
  console.log(file?.name);
  const blobClient = containerClient.getBlockBlobClient(file.name);

  const options = {blobHTTPHeaders: {blobContentType: file.type}};

  await blobClient.uploadBrowserData(file, options);
  await blobClient.setMetadata({UserName: 'karthik'})
}

export const getBlobsInContainer = async () => {
  const returnedBlobItems = [];

  for await (const blob of containerClient.listBlobsFlat()){
    const blobItem = {
      url: `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blob.name}`,
      name: blob.name
    }
    returnedBlobItems.push(blobItem)
  }
  return returnedBlobItems;
}

export const getRecentImageInContainer = async (file) => {
  return `https://${storageAccountName}.blob.core.windows.net/${containerName}/${file?.name}`
}

const UploadFileToBlob = async (file) => {
  if(!file) return [];
  //get container - full public read access

  await createBlobInContainer(file);

  // return `https://${storageAccountName}.blob.core.windows.net/${containerName}/${file?.name}`

  return getRecentImageInContainer(file);
}

export const isStorageConfigured = () => {
  return !storageAccountName || !sastoken ? false: true;
};

export default UploadFileToBlob;

