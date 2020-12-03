import { Post } from "../../Components";


const Index = ({posts, currentUser, setPosts}) => {
  return(
    <div>
      {
        posts.map(post => 
          <Post {...post} currentUser={currentUser}/>
        )
      }
    </div>
  )
}

export default Index;