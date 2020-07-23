import React, {useState,useEffect} from 'react'
import { useLocation, useParams, useHistory } from "react-router-dom";
import axios from 'axios'


const initialItem = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: [],
}


const UpdateMovie = props => {
    const location = useLocation();
    const params = useParams();
    const { push } = useHistory();
    const [item, setItem] = useState(initialItem)


  // when the component mounts:
  // populate to form with the item data
  // 1. if we have data at `location.state.item` use that
  // 2. else, make api call to fetch data by the id

  useEffect(() => {
    if (location.state) {
      setItem(location.state);
    } else {
      // make api request for item data
      // "/itemById/:id"
      axios
        .get(`http://localhost:5000/api/movies/${params.id}`)
        .then(res => setItem(res.data))
        .catch(err => console.log(err));
    }
  }, []);



  const changeHandler = e => {
    e.persist();
    let value = e.target.value;
 
    setItem({
        ...item,
        [e.target.name]: value
      });
    
    }

    const handleSubmit = e => {
        e.preventDefault();
        // make a PUT request to edit the item
        axios
          .put(`http://localhost:5000/api/movies/${item.id}`, item)
          .then(res => {
            // res.data ==> full array with updated item
            setItem(res.data);
            push(`/`);
            console.log(res.data)
          })
          .catch(err => console.log(err));
      };


    return(

<div>
<form onSubmit = {handleSubmit}>
    <h2>Update Movie </h2>
<input 
autoComplete="off"
type = "text"
name = "title"
onChange = {changeHandler}
placeholder="title"
value={item.title}
/>

<input 
autoComplete="off"
type = "text"
name = "director"
onChange = {changeHandler}
placeholder="director"
value={item.director}
/>

<input 
autoComplete="off"
type = "metascore"
name = "metascore"
onChange = {changeHandler}
placeholder="metascore"
value={item.metascore}
/>

<input 
autoComplete="off"
type = "stars"
name = "stars"
onChange = {changeHandler}
placeholder="stars"
value={item.stars}
/>

<button>Update</button>


</form>
</div> //Close Div

    )
 

}// Update Form

export default UpdateMovie