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
} from './Post.components';
import { AiFillLike } from 'react-icons/ai';

const Post = ({posts, post}) => {

  const [comments, setComments] = useState([])

  useEffect(() => {
    axios.get(`/posts/${post._id}/comments`)
    .then(res => {
      setComments(res.data);
    })
    .catch(err => console.log(err));
  }, [])

  return (
    <PostContainer>
      <Header>
        <RoundImage src={post.user.profile_photo}/>
        <FlexContainer>
          <h4 className='mb-0'>{post.user.display_name || post.user.first_name + ' ' + post.user.last_name}</h4>
          <p className='mb-0 text-muted'>{moment(post.createdAt).fromNow()}</p>
        </FlexContainer>
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
          <p>{comments.length} Comments</p>
        </TopFooter>
        <BottomFooter>
          <FooterItem>Like</FooterItem>
          <FooterItem>Comment</FooterItem>
        </BottomFooter>
      </Footer>
    </PostContainer>
  )
}

export default Post;