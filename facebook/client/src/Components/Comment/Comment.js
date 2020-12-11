import moment from 'moment';
import { useState, useEffect } from 'react';
import {
  CommentContainer,
  UserPhoto,
  CommentBody,
  CommentWrapper,
  CommentFooter,
  FooterLink,
  LikesContainer
} from './Comment.components';
import {
  Form, 
  Input,
  Button,
  FormGroup,
} from 'reactstrap';
import {AiFillLike} from 'react-icons/ai';
import { BsArrow90DegDown } from 'react-icons/bs';
import { ReplyForm } from '..';
import axios from 'axios';
import { FcRotateCamera } from 'react-icons/fc';

const Comment = ({comments, comment, setComments, user, post}) => {

  const [showReplyForm, setShowReply] = useState(false);
  const [replies, setReplies] = useState([]);
  const [content, setContent] = useState(comment.content);
  const [showEdit, setEdit] = useState(false);
  const liked = comment.likes.includes(user._id);

  const config = {
    headers: 
    {
      Authorization: 'bearer ' + JSON.parse(localStorage.getItem('user')).token
    }
  }

  const deleteHandler = () => {
    window.confirm('Are you sure you want to delete this comment? This action cannot be undone.') &&
    axios.delete(`/posts/${post._id}/comments/${comment._id}`, config)
    .then(res => {
      console.log(res.data._id, comment._id)
      setComments(comments.filter(comment => comment._id !== res.data._id))
    })
    .catch(err => console.log(err))
  }

  const likeComment = () => {
    axios.post(`/posts/${post._id}/comments/${comment._id}`, {}, config)
    .then(res => {
      setComments(comments.map(comment => comment._id === res.data._id ? res.data : comment));
    })
    .catch(err => console.log(err));
  }

  const editHandler = (e) => {
    e.preventDefault();
    axios.put(`/posts/${post._id}/comments/${comment._id}`, {content}, config)
    .then(res => {
      setComments(comments.map(comment => comment._id === res.data._id ? res.data : comment))
      setEdit(false);
    })
    .catch(err => console.log(err));
  }

  const onChangeHandler = (target) => {
    // Reset field height
    target.style.height = 'inherit';

    // Get the computed styles for the element
    const computed = window.getComputedStyle(target);

    // Calculate the height
    const height = parseInt(computed.getPropertyValue('border-top-width'), 10)
                 + parseInt(computed.getPropertyValue('padding-top'), 10)
                 + target.scrollHeight
                 + parseInt(computed.getPropertyValue('padding-bottom'), 10)
                 + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

    target.style.height = `${height}px`;
  }

  useEffect(() => {
    axios.get(`/posts/${post._id}/comments/${comment._id}`)
    .then(res => {
      setReplies(res.data);
    })
    .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    const textarea = document.querySelector('textarea');
    if (textarea) {
      onChangeHandler(textarea);
    }
  }, [showEdit])

  return (
    <CommentContainer>
      <UserPhoto className='mr-2' src={comment.user.profile_photo} />
      <CommentWrapper className={showEdit ? 'w-100' : ''}>
        <CommentBody>
        <h6 className='mb-0'>{comment.user.display_name || comment.user.first_name + ' ' + comment.user.last_name}</h6>
        {
          !showEdit 
          ? <p className='mb-0'>{comment.content}</p>
          : 
          <Form onSubmit={(e) => editHandler(e)} className='w-100'>
            <FormGroup>
              <Input type='textarea' value={content} onChange={(e) => {setContent(e.target.value); onChangeHandler(e.target)}}/>  
            </FormGroup>
            <FormGroup className='text-right mb-1'>
              <Button color='primary' type='submit' size='sm'>Edit</Button>
            </FormGroup>
          </Form>
        }
        {
          !showEdit && 
          <LikesContainer>
            <AiFillLike fill={liked ? 'royalblue' : ''} size={12}/>
            &nbsp;
            <p style={{fontSize: '12px'}} className='d-inline-block mb-0'>{comment.likes.length}</p>
          </LikesContainer>
        }
        </CommentBody>
        <CommentFooter>
          <FooterLink color={liked ? 'royalblue' : 'black'} onClick={() => likeComment()} bold>
            Like
          </FooterLink>
          <FooterLink bold>
            Comment
          </FooterLink>
          <FooterLink onClick={() => setShowReply(!showReplyForm)}>
            Reply
          </FooterLink>
          {
            user._id === comment.user._id &&
            <FooterLink bold onClick={() => deleteHandler()} color='red'>
              Delete
            </FooterLink>
          }
           {
            user._id === comment.user._id &&
            <FooterLink bold onClick={() => setEdit(!showEdit)} color='khaki'>
              Edit
            </FooterLink>
          }
          <FooterLink color='lightgray'>
            {moment(comment.createdAt).fromNow()}
          </FooterLink>
        </CommentFooter>
      {
        replies.length && !showReplyForm ?
        <div onClick={() => setShowReply(true)} className='pl-3 pt-2 d-flex align-items-center'>
          <BsArrow90DegDown size={24} fill='black' style={{transform: 'rotate(-90deg)'}}/>&nbsp;
          <p className='mb-0 font-weight-bold'>{replies.length} Replies</p>
        </div>
        : ''
      }
      {
        showReplyForm && 
        replies.map(reply => <Comment user={user} setComments={setReplies} comments={replies} comment={reply} post={comment} />)
      }
      {
        showReplyForm && 
        <ReplyForm user={user} post={post} comment={comment} setComments={setComments} replies={replies} setReplies={setReplies} />
      } 
      </CommentWrapper>
    </CommentContainer>
  )
}

export default Comment;