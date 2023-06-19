import React, { useEffect, useState } from 'react'
import UploadFileToBlob, {isStorageConfigured} from './UploadFileFunction'

const storageConfigured = isStorageConfigured();

function ImageUpload({callBackFunc}) {
    const [blobList, setBlobList] = useState([]);
    const [fileSelected, setFileSelected] = useState();
    //const [fileUploaded, setFileUploaded] = useState('');
    const [imageURL, setImageURL] = useState(null);

    const [uploading, setUploading] = useState(false);
    const [inputKey, setInputKey] = useState(Math.random().toString(36));

    const onFileChange = (event) => {
        setFileSelected(event.target.files[0]);
        console.log(fileSelected);
    }
    

    const DisplayUploadImage = () => {
        return (

          <div className='input-file'>
              <input
               type="file"
               key= {inputKey || ''}
               onChange={onFileChange}
              />
              <button onClick={onFileUpload}>
                  Click here to upload file
              </button>
          </div>
        )
      }

    const onFileUpload = async () => {

        if(fileSelected && fileSelected?.name){
            console.log(fileSelected?.name);
            setUploading(true);
            console.log(uploading);
            const blobsInContainer = await UploadFileToBlob(fileSelected);
            // setBlobList(blobsInContainer);
            setImageURL(blobsInContainer);
            console.log(blobsInContainer);
            callBackFunc(blobsInContainer);
            // reset state/form
            setFileSelected(null);
            //setFileUploaded(fileSelected.name);
            setUploading(false);
            setInputKey(Math.random().toString(36));
        }
      };

  return (
    <>

      {storageConfigured && !uploading && DisplayUploadImage()}
      {storageConfigured && uploading && <div>Uploading</div>}
      <hr />
      {/* {console.log("image url : ", imageURL)} */}
      {/* {console.log(getBlobsInContainer())} */}
      {/* {console.log(blobList[blobList.length - 1])} */}
      {/* {storageConfigured && blobList.length > 0 && <DisplayImagesFromContainer blobList={blobList} />} */}
      {!storageConfigured && <div>Azure Storage is not configured.</div>}
    </>
  )
}

export default ImageUpload