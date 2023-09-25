import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import {Post as IPost} from './main'
import { auth, db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect ,useState} from 'react';
interface Props{
    post:IPost
}
interface Like{
    userId:string;
    likeId:string;
}

export const Post = (props:Props)=>{
   const {post}=props
   const [user]=useAuthState(auth);
   const [likes,setLikes]=useState<Like[] | null>(null);
   const likesRef = collection(db,"likes");
   const likesDoc=query(likesRef,where("postId","==",post.id));

   const getLikes=async()=>{
    const data=await getDocs(likesDoc);
    setLikes(data.docs.map((doc)=>({userId:doc.data().userId,likeId:doc.id})))
   }

   const hasUserLiked=likes?.find((like)=>like.userId === user?.uid)

   useEffect(()=>{
    getLikes();
   },[])

   const addLike = async() =>{
    try{
       const newDoc=await addDoc(likesRef,{
        userId:user?.uid,
        postId:post.id
       });
       if(user){
        setLikes((prev)=>prev?[...prev,{userId:user.uid,likeId:newDoc.id}]:[{userId:user.uid,likeId:newDoc.id}]);
       }
    }
    catch(err){
        console.log(err)
    }
   }
   const removeLike = async() =>{
    try{
       const liketoDeleteQuery = query(likesRef,where("postId","==",post.id),where("userId","==",user?.uid))
       const liketoDeleteData=await getDocs(liketoDeleteQuery);
       const likeId=liketoDeleteData.docs[0].id
       const likeToDelete=doc(db,"likes",likeId);
       await deleteDoc(likeToDelete);
       if(user){
        setLikes((prev)=>prev && prev.filter((like)=>like.likeId !== likeId));
       }
    }
    catch(err){
        console.log(err)
    }
   }
   return <div>
    <div className='title'>
      <h1>{post.title}</h1>
    </div>
    <div className='body'>
      <h1>{post.description}</h1>
    </div>
    <div className='footer'>
      <h1>@{post.username}</h1>
      <button onClick={hasUserLiked?removeLike:addLike}>{hasUserLiked?<>&#128078;</>:<>&#128077;</>}</button>
      {likes&& <p>likes:{likes?.length}</p>}
    </div>
   </div>
};