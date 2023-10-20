import {useRef } from "react"

const OpenedAsset = ({ source }) => {
  const vidRef = useRef()

  const pauseVideo = () => {
       if(vidRef){
           if(vidRef.current.paused){
                  vidRef.current.play()
           }else{
                  vidRef.current.pause()
           }
       }
  }

  return (
       <>
          { source.endsWith("mp4") ? 
                <video ref={vidRef} width="100%" height="100%" autoPlay loop onClick={pauseVideo}>
                             <source src={source} type="video/mp4" />
                 </video> :

                 <img src={source} alt="asset-Image" />
          }
       </>
  )
}

export default OpenedAsset