import { useState } from 'react';
import { GrDiamond } from 'react-icons/gr';
import {
  Container,
  Form,
  Input,
  Button,
  FormGroup
} from 'reactstrap'
import {
  TransparentBackground
} from './ImageForm.components'

const ImageForm = ({setImageForm, user, setUser}) => {

  const onSubmitHandler = (e) => {
    e.preventDefault();

  }

  return (
    <TransparentBackground className='d-flex justify-content-center align-items-center'>
      <Form onSubmit={(e) => onSubmitHandler(e)} style={{background: 'white', borderRadius: '10px'}} className='p-3 w-50 mx-auto' border>
        <FormGroup className='text-center'>
          <Input type='file' name='image' />
        </FormGroup>
        <FormGroup className='d-flex justify-content-end'>
          <Button className='mr-2' type='submit' color='secondary'>Submit</Button>
          <Button type='button' color='danger' onClick={() => (setImageForm(false))}>Cancel</Button>
        </FormGroup>
      </Form>
    </TransparentBackground>
  )
}

export default ImageForm;