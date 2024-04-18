import { Link } from "react-router-dom"
import errorImage from "../assets/error-server.jpg"
import { useSelector } from "react-redux"
const ErrorCrashPage = () => {
    const { profile } = useSelector(state => state.profile);
  return (
    <div className="error-crash-page">
             <div className="error-crash-body">
                        <img src={errorImage} alt="" />
                        <h2>OOPs! An Error Occured.</h2>
                        <p>Something happened. We apologize for the inconvenience caused. The error has been logged and we are working hard and fast to solve it as soon as possible. Thank you for your patience.</p>
                        <Link to={`/creator/${profile.username !== 'null' ? profile.username : profile._id}/`}>Go Back To Dashboard</Link>
             </div>
    </div>
  )
}

export default ErrorCrashPage