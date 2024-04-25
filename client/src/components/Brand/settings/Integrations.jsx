import instagram from "../../../assets/instagram.png"
import tiktok from "../../../assets/tik-tok.png"
import twitter from "../../../assets/twitter.png"
import facebook from "../../../assets/facebook.png"
import { IoIosMore } from "react-icons/io";
const Integrations = () => {
  return (
    <div className="integration-tab">
                <div className="account-intro">
                            <h3>Social Media Integrations</h3>
                            <p>Connect your account to social media to publish moments easily in one place.</p>
                 </div>

                 <div className="my-connections">
                            <h3>My Connections</h3>
                            <div className="connect-moja">
                                        <div className="connect-moja-col">
                                                   <div className="connection-profile">
                                                                <img src={instagram} alt="" />
                                                    </div>
                                                    <div className="connect-texts">
                                                               <h4>Instagram</h4>
                                                               <h5>@okundistar</h5>
                                                    </div>
                                        </div>
                                        <div className="settings-col">
                                                    <span title="Edit Settings"><IoIosMore /></span>
                                        </div>
                            </div>
                            <div className="connect-moja">
                                     <div className="connect-moja-col">
                                               <div className="connection-profile">
                                                           <img src={tiktok} alt="" />
                                               </div>
                                               <div className="connect-texts">
                                                          <h4>Tiktok</h4>
                                                          <h5>@okundi_senpai</h5>
                                               </div>
                                     </div>
                                     <div className="settings-col">
                                                 <span title="Edit Settings"><IoIosMore /></span>
                                     </div>
                            </div>
                 </div>


                 <div className="discover-connections">
                             <h2>Discover Connections</h2>

                                <div className="discover-connections-row">
                                             <div className="discover-moja">
                                                        <img src={facebook} alt="" />
                                                        <h3>Facebook</h3>
                                                        <p>Connect your account to Facebook to publish brand moments directly from Amari.</p>
                                                        <button>Connect</button>
                                             </div>
                                             <div className="discover-moja">
                                                        <img src={instagram} alt="" />
                                                        <h3>Instagram</h3>
                                                        <p>Connect your account to Instagram to share your videos to Reels from Amari.</p>
                                                        <button>Connect</button>
                                             </div>
                                             <div className="discover-moja">
                                                        <img src={tiktok} alt="" />
                                                        <h3>Tiktok</h3>
                                                        <p>Connect your account to Tiktok to automatically share your videos with your community.</p>
                                                        <button>Connect</button>
                                             </div>
                                             <div className="discover-moja">
                                                        <img src={twitter} alt="" />
                                                        <h3>Twitter</h3>
                                                        <p>Connect your account to Twitter to publish your videos directly from Amari.</p>
                                                        <button>Connect</button>
                                             </div>
                                </div>
                 </div>
    </div>
  )
}

export default Integrations