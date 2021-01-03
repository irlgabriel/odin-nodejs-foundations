import {
  Image
} from './Photo.components';
import { Link } from 'react-router-dom';

const Photo = ({photo}) => {

  return(
    <Link className='w-50' to={`/posts/${photo._id}`}>
      <Image src={photo.image.url} />
    </Link>
  )
}

export default Photo;