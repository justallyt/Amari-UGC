import CreatorSidebar from '../../components/Creator/Sidebar'
import VideoCreateBody from '../../components/Creator/VideoCreateBody'
import '../../css/creator/video_create.css'

const VideoCreate = () => {
  return (
    <div className='dashboard-wrapper'>
               <div className="dashboard-inner">
                           <CreatorSidebar />
                           <VideoCreateBody />
               </div>
    </div>
  )
}

export default VideoCreate