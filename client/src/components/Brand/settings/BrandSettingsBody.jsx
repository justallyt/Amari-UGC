import Sidebar from "../Sidebar"


const BrandSettingsBody = () => {
  return (
    <div className="brand-dashboard-wrapper">
             <div className="dashboard-wrapper-inner">
                        <Sidebar />

                        <div className="brand-settings-skewed">
                                  <div className="settings-header">
                                           <h2>Settings</h2>
                                           <p>Manage your account settings and preferences.</p>
                                  </div>

                                  <div className="settings-options">
                                             <ul>
                                                        <li>Profile</li>
                                                        <li>Notifications</li>
                                                        <li>Integrations</li>
                                                        <li>Security</li>
                                                        <li>Billing</li>
                                                        <li>Preferences</li>
                                             </ul>
                                  </div>
                        </div>
            </div>
   </div>
  )
}

export default BrandSettingsBody