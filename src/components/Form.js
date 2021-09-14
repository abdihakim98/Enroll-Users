import React, {useState} from "react";
import axios from 'axios'
import * as yup from 'yup';

export default function Form() {
 
//step 2 create intialstate 

  const initialFormState = {
    name: "",
    email: "",
    password: "",
    terms: "false",
  }

  //step 1 create state

  const [formState, setFormState] = useState(initialFormState)
  const [errors, setErrors] = useState(initialFormState)

// console.log(formState)

//step 3 link top state and form inputs


//  step 4 create 2 functions handlechange and hand submit

  const handleChange = (event) => {

//     // Copy ka samee state-ka kore, kadib waxaad soo jiidataa input-ka ama qaybta aad formka ooga jirto, magaca (name) iyo value

    const inputData = {...formState, 
      
      [event.target.name]: event.target.type === "checkbox" ? event.target.checked :  event.target.value}



    handleValidationChange(event)
    setFormState(inputData)
  }


//   // Handle Submit

  const handleSubmit = (event) => {
    // Controlled Component
 
    event.preventDefault()


    console.log(formState)

    axios.post("https://reqres.in/api/users", formState)
      .then((res) => {
        console.log(res)

        setFormState(initialFormState)
      })
      .catch((err) => console.log(err))

  }

//   // step 5: Form Validation!

//   // Validation waa labo qaybood, qaybta hore waxaan isticmaaleynaa 'yup', qaybta labaadna waa function hubinaayo is badalka formka

  let schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string(),
    terms: yup.boolean().oneOf([false], "Must Accept Terms of Service")
  })


  const handleValidationChange = (event) => {

//     // Habka Yup ay ku ogaaneyso wixii is badalay

    yup
      .reach(schema, event.target.name)
      .validate(event.target.value)
      .then((valid) => {
        setErrors({...errors, [event.target.name]: ""})
      })
      .catch((err) => {
        setErrors({...errors, [event.target.name]: err.errors[0]})
      })
  }

  return (
    <div>
    <form onSubmit={handleSubmit}>
     
      <label htmlFor="name">
        Name
        <input
          id="name"
          type="text"
          name="name"
         // step3 add value each section
          value={formState.name}
          onChange={handleChange}
        />
      {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
      </label>

      <label htmlFor="email">
        Email
        <input
          type="text"
          name="email"
          value={formState.email}
          onChange={handleChange}
        />
         {errors.email.length > 0 ? <p className="error">{errors.email}</p> : null}
      </label>

      <label htmlFor="password">
       Password
        <input
          type="password"
          name="password"
          value={formState.password}
          onChange={handleChange}
        />
         {errors.password.length > 0 ? <p className="error">{errors.password}</p> : null}
      </label>

    
      <label htmlFor="terms" className="terms">
        <input 
          type="checkbox"
          name="terms"
          value={formState.terms}
          onChange={handleChange}
         
        />
         Terms of Service

        {errors.terms.length > 0 ? <p className="error">{errors.terms}</p> : null}
      </label>
     
      <button type="submit">
        Submit
      </button>
    </form>

    
    </div>
  );
}
