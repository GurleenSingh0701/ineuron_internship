import { useQuery } from "react-query"
import axios from "axios"

function useCourseDetails(id) {
    const fetchDetails = (id) =>{
        return axios.get(`http://localhost:5000/Quiz/${id}`);
    }
  return (
    useQuery(['courses',id],()=>fetchDetails(id))
  )
}

export default useCourseDetails;