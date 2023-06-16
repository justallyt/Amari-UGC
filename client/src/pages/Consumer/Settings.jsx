import SettingsBody from "../../components/Consumer/SettingsBody"
import ConsumerSidebar from "../../components/Consumer/Sidebar"
import "../../css/consumer/settings.css"
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