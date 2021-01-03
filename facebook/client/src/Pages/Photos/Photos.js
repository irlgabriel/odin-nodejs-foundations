import { useEffect, useState } from 'react';
import axios from 'axios';
import { Photo } from '../../Components';
import {
  PhotosContainer,
  PhotoWrapper,
} from "./Photos.components";
import {
  Container
} from "reactstrap";

const Photos = ({ user, photos }) => {

  console.log('photos rendered')

  return (
    <Container fluid className='w-100 p-0 mt-2'>
      <PhotosContainer>
        {
          !photos.length && 
          <p>No photos Available</p>
        }
        {photos.map(photo => 
          <Photo key={photo._id} photo={photo}></Photo>
        )}
      </PhotosContainer>
    </Container>
  )
}

export default Photos;