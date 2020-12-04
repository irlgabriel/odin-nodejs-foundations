import moment from 'moment';
import { 
  Preview,
  SectionFlex,
  Section
} from "./PostPreview.components";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const PostPreview = ({_id, author, title, content, createdAt}) => {
  return (
    <Preview>
      <SectionFlex>
        <FaUserCircle />
        <p className='mb-0'>{author.email}</p>
        <p className='mb-0'>&nbsp;{moment(createdAt).fromNow()}</p>
      </SectionFlex>
      <Section>
        <Link to={`/posts/${_id}`}>
          <h3>{title.length > 30 ? title.slice(0, 30) + '...' : title}</h3>
        </Link>
        <p>{content.length > 150 ? content.slice(0, 150) + '...' : content}</p>
      </Section>
    </Preview>
  )
}

export default PostPreview;