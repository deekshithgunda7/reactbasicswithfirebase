import {auth,provider} from '../config/firebase'
import { signInWithPopup } from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
export const Login=()=>{
    const navigate=useNavigate();

    const SignInWithGoogle=async()=>{
        const result=await signInWithPopup(auth,provider)
        navigate('/')
        console.log(result)
    }
    return(
       <div>
       <p>SignIn With Google to Continue</p>
       <button onClick={SignInWithGoogle}>Sign In With Google</button>
       </div>


    );
}