import SettingsBody from "../../components/Creator/SettingsBody"
import ConsumerSidebar from "../../components/Creator/Sidebar"
import "../../css/creator/settings_creator.css"
const Settings = () => {
  return (
    <div className="dashboard-wrapper">
              <div className="dashboard-inner">
                            <ConsumerSidebar />
                            <SettingsBody />
              </div>
    </div>
  )
}

export default Settings