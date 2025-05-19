import React, { useRef } from 'react'
import { toast } from 'react-toastify'
import {IKContext, IKUpload} from 'imagekitio-react'
import AxiosService from '../utils/AxiosService';


const authenticator =  async () => {
    try {
    const response = await AxiosService.get(`/blogs/upload-auth`);
    const { signature, expire, token } = response.data;
    return { signature, expire, token };
  } catch (error) {
    console.error("ImageKit auth failed:", error);
    throw new Error("ImageKit authentication failed");
  }
  };

const UploadImages = ({children, type, setProgress, setData}) => {

    const ref = useRef(null)
    const onError = (err)=>{
        toast.error("Image upload failed")
      }
      const onSuccess = (res)=>{
         console.log(res)
         setData(res)
      }
      const onUploadProgress = (progress)=>{
         console.log(progress)
        setProgress(Math.round(progress.loaded / progress.total )* 100)
      }
  return <>
  
  <IKContext 
          publicKey={import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY || "public_+hOK2ki/oJZ8Y4DD+zXOTSjo+fc="} 
          urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT || "https://ik.imagekit.io/lhqk4dwpb/"} 
          authenticator={authenticator} >
          {/* ...child components */}
          <IKUpload
          useUniqueFileName
          onError={onError}
          onSuccess={onSuccess}
          onUploadProgress={onUploadProgress}
          className='hidden'
          accept={`${type}/*`}
          ref = {ref}
        />

        <div className='cursor-pointer' onClick={()=>ref.current.click()}>{children}</div>
      </IKContext>
  
  </>
}

export default UploadImages