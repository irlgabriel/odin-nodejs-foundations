import {
  Image,
  Wrapper
} from './Photo.components';

const Photo = ({photo}) => {

  return(
    <Wrapper to={`/posts/${photo._id}`}>
      <Image width='100%' src={photo.image.url} />
    </Wrapper>
  )
}

export default Photo;