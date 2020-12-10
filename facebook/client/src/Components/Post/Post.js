import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import {
  PostContainer,
  RoundImage,
  Header,
  FlexContainer,
  Body,
  Footer,
  TopFooter,
  BottomFooter,
  RoundWrapper,
  FooterItem,
  RoundedContainer,
  RoundedWrapper,
  CommentsContainer,
} from './Post.components';
import { Comment, CommentForm } from '..'
import { AiFillLike } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';


const Post = ({user, posts, post}) => {

  const [comments, setComments] = useState([])
  const [settingsDropdown, setSettingsDropdown] = useState(false);
  const [commentsDropdown, setCommentsDropdown] = useState(false);


  useEffect(() => {
    axios.get(`/posts/${post._id}/comments`)
    .then(res => {
      setComments(res.data);
    })
    .catch(err => console.log(err));
  }, [])

  return (
    <PostContainer>
      <Header className='mb-2'>
        <RoundImage src={post.user.profile_photo}/>
        <FlexContainer>
          <div>
            <h4 className='mb-0'>{post.user.display_name || post.user.first_name + ' ' + post.user.last_name}</h4>
            <p style={{fontSize: '13px'}} className='mb-0 text-muted'>{moment(post.createdAt).fromNow()}</p>
          </div>
          <RoundedWrapper onClick={() => setSettingsDropdown(!settingsDropdown)}>
            <BsThreeDotsVertical size='24'/>
          </RoundedWrapper>
        </FlexContainer>

        {/** Settings Dropdown  */}
        { settingsDropdown && 
          <RoundedContainer>
            asdsadsa
          </RoundedContainer>
        }
      </Header>

      <Body>
        <p>{post.content}</p>
        {post.image && <img src='post.image' />}
      </Body>
      <Footer>
        <TopFooter>
          <div className='d-flex'>
            <RoundWrapper className='mr-1' bgColor='royalblue'>
              <AiFillLike size={12} fill='white'/>
            </RoundWrapper>
            <p style={{fontSize: '14px'}} className='mb-0'>{post.likes.length}</p>
          </div>
          <p className='mb-0'>{comments.length} Comments</p>
        </TopFooter>
        <hr className='my-1'/>
        <BottomFooter>
          <FooterItem>Like</FooterItem>
          <FooterItem onClick={() => setCommentsDropdown(!commentsDropdown)} >Comment</FooterItem>
        </BottomFooter>
      </Footer>

      {/** Comment dropdown */}
      {
        commentsDropdown &&
        <CommentsContainer>
          <hr className='my-1'/>
          {
            comments.map(comment => 
              <Comment key={comment._id} user={user} comment={comment} setComments={setComments}/>
            )
          }
          <CommentForm user={user} setComments={setComments} comments={comments}/>
        </CommentsContainer>
      }
    </PostContainer>
  )
}

export default Post;