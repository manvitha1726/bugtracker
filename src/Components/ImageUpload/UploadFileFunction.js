import { BlobServiceClient } from "@azure/storage-blob";

const storageAccountName = "issuetracking";
const sastoken =  "sp=racwdl&st=2023-06-30T12:53:14Z&se=2023-07-30T20:53:14Z&spr=https&sv=2022-11-02&sr=c&sig=ttu7AfViX%2Bz1Erbna3Jh5Yg6kY6rzGCY871hbAOfAPI%3D"
const containerName = "issue-images";
const uploadUrl = `https://${storageAccountName}.blob.core.windows.net/?${sastoken}`
// console.log(uploadUrl);

const blobService = new BlobServiceClient(uploadUrl)
const containerClient = blobService.getContainerClient(containerName);


const createBlobInContainer = async (file) => {
  console.log(file);
  const blobClient = containerClient.getBlockBlobClient(file.name);

  const options = {blobHTTPHeaders: {blobContentType: file.type}};
  await blobClient.uploadData(file, {
    blobHTTPHeaders: { blobContentType: file.type }
  })
  // await blobClient.uploadBrowserData(file, options);
  // await blobClient.setMetadata({UserName: 'karthik'})
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

export const getRecentImageInContainer = async (files) => {
  const imgList = [];
  for(let i = 0; i < files.length; i++){
      imgList.push(`https://${storageAccountName}.blob.core.windows.net/${containerName}/${files[i].name}`)
  }
  console.log("imgList : ", imgList);
  return imgList
}

const UploadFileToBlob = async (files) => {
  // console.log("files in uploadfiletoblob : ", files);
  if(!files) return [];
  //get container - full public read access
  for(let i = 0; i < files.length; i++){
    console.log("files[index] in uploadfiletoblob : ", files[i]);
    await createBlobInContainer(files[i]);
  }
  // return `https://${storageAccountName}.blob.core.windows.net/${containerName}/${file?.name}`

  return getRecentImageInContainer(files);
}

export const isStorageConfigured = () => {
  return !storageAccountName || !sastoken ? false: true;
};

export default UploadFileToBlob;

