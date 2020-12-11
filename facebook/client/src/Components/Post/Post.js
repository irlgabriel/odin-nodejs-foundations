import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import moment from 'moment';
import {
  Form,
  Input,
  Button,
  FormGroup
} from 'reactstrap';
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
  ClickDiv,
  FunctionalItem
} from './Post.components';
import { Comment, CommentForm } from '..'
import { AiFillLike, AiOutlineLike, AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { VscComment } from 'react-icons/vsc';
import autosize from 'autosize';



const Post = ({user, posts, post, setPosts}) => {

  const [content, setContent] = useState(post.content);
  const [edit, setEdit] = useState(false);
  const [comments, setComments] = useState([]);
  const [settingsDropdown, setSettingsDropdown] = useState(false);
  const [commentsDropdown, setCommentsDropdown] = useState(false);

  const editHandler = (e) => {
    e.preventDefault();
    axios.put(`/posts/${post._id}`, {content: content}, {headers: {Authorization: 'bearer ' + JSON.parse(localStorage.getItem('user')).token}})
    .then(res => {
      setPosts(posts.map(post => post._id === res.data._id ? res.data : post));
      setEdit(false);
    })
    .catch(err => console.log(err));
  }


  const deleteHandler = () => {
    window.confirm('Are you sure you want to delete this post? This action cannot be undone!') && 
    axios.delete(`/posts/${post._id}`, {}, {headers: 'bearer ' + {Authorization: JSON.parse(localstorage.getItem('user')).token}})
    .then(res => {
      setPosts(posts.filter(post => post._id !== res.data._id))
      setSettingsDropdown(false);
    })
    .catch(err => console.log(err));
  }

  const likePost = () => {
    const token = JSON.parse(localStorage.getItem('user')).token;
    axios.post(`/posts/${post._id}/like`, {}, {headers: {Authorization: `bearer ${token}`}})
    .then(res => {
      setPosts(posts.map(post => post._id === res.data._id ? res.data : post));
    })
  }

  const  onChangeHandler = (e) => {
    // Reset field height
    e.target.style.height = 'inherit';

    // Get the computed styles for the element
    const computed = window.getComputedStyle(e.target);

    // Calculate the height
    const height = parseInt(computed.getPropertyValue('border-top-width'), 10)
                 + parseInt(computed.getPropertyValue('padding-top'), 10)
                 + e.target.scrollHeight
                 + parseInt(computed.getPropertyValue('padding-bottom'), 10)
                 + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

    e.target.style.height = `${height}px`;
  }

  useEffect(() => {
    // GET Components
    axios.get(`/posts/${post._id}/comments`)
    .then(res => {
      setComments(res.data);
    })
    .catch(err => console.log(err));
  }, [])

  useEffect(() => {
    const textarea = document.querySelector('textarea');
    if(textarea) {
      textarea.style.height = 'inherit';
      const computed = window.getComputedStyle(textarea);
      const height = parseInt(computed.getPropertyValue('border-top-width'), 10)
                  + parseInt(computed.getPropertyValue('padding-top'), 10)
                  + textarea.scrollHeight
                  + parseInt(computed.getPropertyValue('padding-bottom'), 10)
                  + parseInt(computed.getPropertyValue('border-bottom-width'), 10);
      textarea.style.height = height + 'px';
    }
  }, [edit])

  return (
    <PostContainer className='mb-2'>
      <Header className='mb-2'>
        <RoundImage src={post.user.profile_photo}/>
        <FlexContainer>
          <div>
            <h4 className='mb-0'>{post.user.display_name || post.user.first_name + ' ' + post.user.last_name}</h4>
            <p style={{fontSize: '13px'}} className='mb-0 text-muted'>{moment(post.createdAt).fromNow()}</p>
          </div>
          {
            user._id === post.user._id &&
            <RoundedWrapper onClick={() => setSettingsDropdown(!settingsDropdown)}>
              <BsThreeDotsVertical size='24'/>
            </RoundedWrapper>
          }
        </FlexContainer>

        {/** Settings Dropdown  */}
        { settingsDropdown && 
          <RoundedContainer>
            <FunctionalItem onClick={() => {setEdit(true); setSettingsDropdown(false);}}>
              <AiFillEdit color='palegoldenrod' size={32}/>
              &nbsp;Edit Post
            </FunctionalItem>
            <hr className='my-2'/>
            <FunctionalItem onClick={() => deleteHandler()}>
              <AiFillDelete color='red' size={32} />
              &nbsp;Delete Post
            </FunctionalItem>
          </RoundedContainer>
        }
      </Header>
      {
      !edit &&
      <Body>
        <p>{post.content}</p>
        {post.image && <img src='post.image' />}
      </Body>
      }
      {
        edit &&
      <Form onSubmit={(e) => editHandler(e)}>
        <FormGroup>
          <Input type='textarea' onFocus={(e) => onChangeHandler(e)} value={content} onChange={(e) => {setContent(e.target.value); onChangeHandler(e)}} />
        </FormGroup>
        <FormGroup className='d-flex align-items-center'>
          <Button className='ml-auto mr-2' type='submit' color='primary' size='sm'>Edit</Button>
          <Button type='button' onClick={() => setEdit(false)} color='danger' size='sm'>Cancel</Button>
        </FormGroup>
      </Form>
      }
      <Footer>
        <TopFooter>
          <div className='d-flex'>
            <RoundWrapper className='mr-1' bgColor='royalblue'>
              <AiFillLike size={12} fill='white'/>
            </RoundWrapper>
            <p style={{fontSize: '14px'}} className='mb-0'>{post.likes.length}</p>
          </div>
          <ClickDiv onClick={() => setCommentsDropdown(!commentsDropdown)}>
            <p className='mb-0'>{comments.length} Comments</p>
          </ClickDiv>
        </TopFooter>
        <hr className='my-1'/>
        <BottomFooter>
          <FooterItem onClick={() => likePost()}>
            {
              !post.likes.includes(user._id) 
              ? <AiOutlineLike size={20} />
              : <AiFillLike size={20} fill='royalblue'/>
            }
            &nbsp;Like
            </FooterItem>
          <FooterItem onClick={() => setCommentsDropdown(!commentsDropdown)} >
            <VscComment size={20}/>
            &nbsp;Comment
            </FooterItem>
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
          <CommentForm post={post} user={user} setComments={setComments} comments={comments}/>
        </CommentsContainer>
      }
    </PostContainer>
  )
}

export default Post;