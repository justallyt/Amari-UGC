import { Link } from "react-router-dom"
import logo from "../assets/logo.png"

const Privacy = () => {
  return (
    <div className="policy-wrapper">
              <div className="inner-row">
                        <div className="policy-content">
                                  <header>
                                         <div className="logo">
                                              <Link to={'/'}>
                                                        <img src={logo} alt="App logo" />
                                                 </Link>
                                          </div>
                                             <div className="header-btns">
                                                      <Link className="btn outline" to={'/user/login'}>Login</Link>
                                                      <Link className="btn background" to={'/user/register'}>Sign Up</Link>
                                             </div>
                                  </header>

                                  <div className="policy-body">
                                            <h2>Amari Privacy Policy</h2>

                                            <div className="policy-wrap">
                                                      <h3>1. Introduction</h3>
                                                      <p>Welcome to AMARI! This Privacy Policy explains how we collect, use, and disclose information about our users (&apos;Users&apos; or &apos;you&apos;) when you access or use our platform.</p>
                                            </div>
                                            <div className="policy-wrap">
                                                       <h3>2. Information We Collect</h3>
                                                        <h4>2.1 Information provided by Users:</h4>
                                                          <ul>
                                                                     <li>2.1.1 Account Information: When you sign up for an account, we may collect your name, email address, username, and other necessary information to create and manage your account.</li>
                                                                     <li>2.1.2 Content Submission: Content Creators may provide photos, videos, or other materials when using the platform.</li>
                                                          </ul>
                                                          <h4>2.2 Automatically Collected Information:</h4>
                                                          <ul>
                                                                  <li>2.2.1 Usage Data: We may collect information about your interactions with the platform, such as pages visited, time spent on the platform, and other usage statistics.</li>
                                                                  <li>2.2.2 Device Information: We may collect device information such as IP addresses, device type, browser type, and operating system.</li>
                                                          </ul>
                                            </div>
                                            <div className="policy-wrap">
                                                       <h3>3. Use of Information</h3>
                                                       <h4>3.1 Internal Use:</h4>
                                                        <ul>
                                                                 <li>3.1.1 We use the collected information to provide and maintain the platform&apos;s functionality, improve user experience, and develop new features.</li>
                                                                 <li>3.1.2 Information may be used to communicate with Users, provide customer support, and respond to inquiries.</li>
                                                        </ul>
                                                        <h4>3.2 Sharing of Information:</h4>
                                                        <ul>
                                                                 <li>3.2.1 We may share certain information with third-party service providers that assist us in operating the platform, but we do not sell or rent your personal information to third parties.</li>
                                                                 <li>3.2.2 Content submitted by Creators may be shared with Businesses for marketing purposes.</li>
                                                        </ul>

                                            </div>
                                            <div className="policy-wrap">
                                                        <h3>4. Data Security</h3>
                                                        <h4>4.1 Security Measures:</h4>
                                                        <ul>
                                                                  <li>4.1.1 We implement security measures to protect against unauthorized access, alteration, disclosure, or destruction of personal information stored on our platform.</li>
                                                                  <li>4.1.2 However, please note that no method of transmission over the internet or electronic storage is entirely secure, and we cannot guarantee absolute security.</li>
                                                        </ul>
                                            </div>
                                            <div className="policy-wrap">
                                                        <h3>5. User Choices and Control</h3>
                                                        <h4>5.1 Account Settings:</h4>
                                                        <ul>
                                                                 <li>5.1.1 Users can manage their account settings and preferences to control the information they provide and how it&apos;s used within the platform.</li>
                                                        </ul>
                                                        <h4>5.2 Opt-Out:</h4>
                                                        <ul>
                                                                 <li>5.2.1 Users can opt-out of certain communications or the sharing of their content within the platform.</li>
                                                        </ul>
                                            </div>

                                            <div className="policy-wrap">
                                                       <h3>6. Changes to this Privacy Policy</h3>
                                                       <h4>6.1 Updates:</h4>
                                                       <ul>
                                                                <li>6.1.1 We reserve the right to update or modify this Privacy Policy at any time. Changes will be effective upon posting the updated policy on the platform.</li>
                                                       </ul>
                                            </div>
                                            <div className="policy-wrap">
                                                      <h3>7. Contact Us</h3>
                                                      <h4>7.1 Questions or Concerns:</h4>
                                                      <ul>
                                                                <li>7.1.1 If you have any questions or concerns regarding this Privacy Policy or our practices, please contact us at hello@amari.co.ke.</li>
                                                      </ul>
                                            </div>
                                  </div>
                        </div>
              </div>

              <div className="footer">
                     <div className="inner-row">
                              <div className="footer-content">
                                          <p>Copyright &copy; { new Date().getFullYear() } Amari | All rights Reserved</p>
                                         <div className="footer-policy">
                                                  <Link to={'/privacy'}>Privacy Policy</Link>
                                                 <Link to={"/terms-of-service"}>Terms of Use</Link>
                                          </div>
                              </div>
                     </div>
            </div>
    </div>
  )
}

export default Privacy