import { Link } from "react-router-dom"
import logo from "../assets/logo.png"

const Terms = () => {
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
                                               <h2>Amari Terms of Service</h2>
                                               <div className="policy-wrap">
                                                      <h3>1. Introduction</h3>
                                                      <p>Welcome to AMARI! These Terms of Service (&apos;Terms&apos;) govern your use of our platform as a user (&apos;User&apos; or &apos;you&apos;). By accessing or using our platform, you agree to comply with these Terms. Please read them carefully before using the service.</p>
                                            </div>

                                            <div className="policy-wrap"> 
                                                      <h3>1. Overview</h3>
                                                      <p>AMARI operates as a connection platform between businesses (&apos;Businesses&apos;) and content creators (&apos;Creators&apos;) for the creation and exchange of marketing assets, including but not limited to photos and videos (&apos;Assets&apos;).</p>
                                             </div>
                                             <div className="policy-wrap">
                                                        <h3>2. User Responsibilities</h3>
                                                        <h4>2.1 Content Creators:</h4>
                                                        <ul>
                                                                <li>2.1.1 Creators represent and warrant that any content submitted to the platform is their original work and does not infringe upon any intellectual property rights.</li>
                                                                <li>2.1.2 Creators must adhere to the guidelines and policies provided by AMARI for content submission and usage.</li>
                                                                <li>2.1.3 Creators retain ownership of their content but grant AMARI and Businesses a non-exclusive, royalty-free, transferable license to use the content for marketing purposes.</li>
                                                        </ul>
                                                        <h4>2.2 Businesses:</h4>
                                                         <ul>
                                                                   <li>2.2.1 Businesses agree to use the Assets obtained from the platform solely for their intended marketing purposes within the guidelines provided by AMARI.</li>
                                                                   <li>2.2.2 Businesses shall not use the Assets in any way that may infringe upon the intellectual property rights of Creators or violate any laws or regulations.</li>
                                                         </ul>
                                             </div>
                                             <div className="policy-wrap">
                                                         <h3>3. Access and Limitations</h3>
                                                          <h4>3.1 Content Access:</h4>
                                                          <ul>
                                                                     <li>3.1.1 AMARI provides limited access to Assets per month based on the subscription or service plan chosen by Businesses.</li>
                                                                     <li>3.1.2 AMARI reserves the right to modify or limit access to Assets based on account status, violations of Terms, or other operational considerations.</li>
                                                          </ul>
                                             </div>
                                             <div className="policy-wrap">
                                                        <h3>4. Intellectual Property</h3>
                                                        <h4>4.1 Ownership:</h4>
                                                        <ul>
                                                                <li>4.1.1 Creators retain full ownership rights to their original content uploaded to the platform.</li>
                                                                <li>4.1.2 Businesses acknowledge that the Assets accessed through the platform remain the intellectual property of the respective Creators.</li>
                                                        </ul>
                                             </div>
                                             <div className="policy-wrap">
                                                       <h3>5. Termination and Suspension</h3>
                                                       <h4>5.1 Termination:</h4>
                                                       <ul>
                                                               <li>5.1.1 AMARI reserves the right to terminate or suspend access to the platform for Users found in violation of these Terms or engaged in any unauthorized or inappropriate use of the service.</li>
                                                               
                                                       </ul>
                                             </div>
                                             <div className="policy-wrap">
                                                        <h3>6. Disclaimer of Warranties</h3>
                                                        <h4>6.1 Limitation of Liability:</h4>
                                                        <ul>
                                                                <li>6.1.1 AMARI does not warrant that the platform will be error-free or uninterrupted. Users agree to use the service at their own risk.</li>
                                                                <li>6.1.2 In no event shall AMARI be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in any way connected with the use or inability to use the platform.</li>
                                                        </ul>
                                             </div>
                                             <div className="policy-wrap">
                                                        <h3>7. General</h3>
                                                        <h4>7.1 Modifications:</h4>
                                                        <ul>
                                                                   <li>7.1.1 AMARI reserves the right to modify or update these Terms at any time. Continued use of the platform after changes implies acceptance of the revised Terms.</li>
                                                        </ul>
                                                        <h4>7.2 Governing Law:</h4>
                                                        <ul>
                                                                <li>7.2.1 These Terms shall be governed by and construed in accordance with the laws of the Republic of Kenya.</li>
                                                        </ul>

                                                        <p>By using AMARI, you agree to these Terms. If you have any questions or concerns regarding these Terms, please contact us at hello@amari.co.ke.</p>
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

export default Terms