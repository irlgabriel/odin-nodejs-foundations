import { useState } from 'react';
import {
  PostContainer,
  RoundImage,
  Header,
  FlexContainer,
  Body,
  Footer
} from './Post.components';

const Post = ({posts, post}) => {
  return (
    <PostContainer>
      <Header>
        <RoundImage src=''/>
        <FlexContainer>
          <h4>User title</h4>
          <p className='text-muted'>createdAt</p>
          </FlexContainer>
        <Body>
          <p>Content</p>
          {/**post.image && <img src='post.image' /> */}
        </Body>
        <Footer>

        </Footer>
      </Header>
    </PostContainer>
  )
}

export default Post;