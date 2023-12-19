import CreatorSidebar from '../../components/Creator/Sidebar'
import CreateAssetBody from '../../components/Creator/CreateAssetBody'
import '../../css/creator/video_create.css'
import { useState } from 'react'
import { sidebarContext } from '../../components/Creator/context/sidebarContext'
import MobileSidebar from '../../components/Creator/MobileSidebar'
const CreateAsset = () => {
  const [status, setStatus] = useState(false)
  return (
    <div className='dashboard-wrapper'>
               <div className="dashboard-inner">
                           <CreatorSidebar />
                            <sidebarContext.Provider value={[status, setStatus]}>
                                      <MobileSidebar />
                                      <CreateAssetBody />
                            </sidebarContext.Provider>
               </div>
    </div>
  )
}

export default CreateAsset