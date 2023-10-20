import CreatorSidebar from '../../components/Creator/Sidebar'
import CreateAssetBody from '../../components/Creator/CreateAssetBody'
import '../../css/creator/video_create.css'

const CreateAsset = () => {
  return (
    <div className='dashboard-wrapper'>
               <div className="dashboard-inner">
                           <CreatorSidebar />
                           <CreateAssetBody />
               </div>
    </div>
  )
}

export default CreateAsset