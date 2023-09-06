import { useParams } from "react-router";
import { Link } from "react-router-dom";
import useCourseDetails from "../hooks/useCourseDetails";

function CourseDetails() {
  const { id } = useParams();
  const { data } = useCourseDetails(id);
  return (
    <div key={data?.data.id}>
    
       <p>{data?.data.CourseDetails}</p>
        <Link to={`/adminLogin/Courses`}>
          Go back</Link>
    </div>
  );
}

export default CourseDetails;
