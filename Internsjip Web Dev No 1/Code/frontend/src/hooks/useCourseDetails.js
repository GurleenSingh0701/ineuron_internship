import { useQuery } from "react-query"
import axios from "axios"

function useCourseDetails(id) {
    const fetchDetails = (id) =>{
        return axios.get(`http://localhost:9000/CourseDetails/${id}`);
    }
  return (
    useQuery(['courses',id],()=>fetchDetails(id))
  )
}

export default useCourseDetails;