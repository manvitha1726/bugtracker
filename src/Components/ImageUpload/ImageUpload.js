import React, { useEffect, useState } from 'react'
import UploadFileToBlob, {isStorageConfigured} from './UploadFileFunction'
import ImageCarouselModal from '../ImageCarouselModal.js';
import '../Home.css';

const storageConfigured = isStorageConfigured();

function ImageUpload({callBackFunc}) {
    const [blobList, setBlobList] = useState([]);
    const [fileSelected, setFileSelected] = useState();
    //const [fileUploaded, setFileUploaded] = useState('');
    const [imageURL, setImageURL] = useState(null);
    const [isUploaded, setIsUploaded] = useState(false);

    const [uploading, setUploading] = useState(false);
    const [inputKey, setInputKey] = useState(Math.random().toString(36));

    const onFileChange = (event) => {
        setFileSelected(event.target.files);
        console.log(event.target.files)
    }
    

    const DisplayUploadImage = () => {
        return (

          <div className='input-file'>
              <input
               type="file"
               key= {inputKey || ''}
               multiple
               onChange={onFileChange}
              />
              <button className='button-background-color' onClick={onFileUpload}>
                   Upload file
              </button>
          </div>
        )
      }

    const onFileUpload = async () => {

        if(fileSelected){
            // console.log(fileSelected?.name);
            setUploading(true);
            // console.log(uploading);
            console.log("fileselected : ", fileSelected);
            const blobsInContainer = await UploadFileToBlob(fileSelected);
            // setBlobList(blobsInContainer);

            setImageURL(blobsInContainer.join());
            console.log(blobsInContainer.join());
            callBackFunc(blobsInContainer.join());
            // reset state/form
            setFileSelected(null);
            //setFileUploaded(fileSelected.name);
            setUploading(false);
            setIsUploaded(true);
            setInputKey(Math.random().toString(36));
        }
      };

  return (
    <>
        {storageConfigured && !uploading && DisplayUploadImage()}
      {
        isUploaded?
        <>
            <h5>Uploaded Images : </h5>
            <ImageCarouselModal images={imageURL} />
        </>
        :
        <span></span>
        // <img src={imageURL} alt='uploaded image' />
      }
      {storageConfigured && uploading && <>
          <div class="text-center my-auto">
            <div class="spinner-border" role="status">
            </div>
            <br/>
            <span>Uploading....</span>
          </div>
        </>}
      {/* {console.log("image url : ", imageURL)} */}
      {/* {console.log(getBlobsInContainer())} */}
      {/* {console.log(blobList[blobList.length - 1])} */}
      {/* {storageConfigured && blobList.length > 0 && <DisplayImagesFromContainer blobList={blobList} />} */}
      {!storageConfigured && <div>Azure Storage is not configured.</div>}
    </>
  )
}

export default ImageUpload