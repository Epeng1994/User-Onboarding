import * as yup from 'yup'
import {useState, useEffect} from 'react'
import axios from 'axios'
import styled from 'styled-components'

const WarningP = styled.p`
    color: red;
    font-size: 2vw;
`

const Users = styled.div`
    border: 1px solid blue;
    margin-top:5vw;
`


const schema = yup.object().shape({
    first_name: yup.string().required('Name is required.').min(2, 'You don\'t have at least 2 letters for a first name?'),
    last_name: yup.string().required('Name is required.').min(2, 'You don\'t have at least 2 letters for a last name?'),
    email: yup.string().email().required('Email is required'),
    password: yup.string().min(6, 'Password needs to be at least 6 characters.'),
    TOS: yup.boolean().oneOf([true], 'You must sign away your soul.').required()
})

export default function(){
    const emptyForm = { //define empty form
        first_name:'',
        last_name:'',
        email: '',
        password: '',
        TOS: false,
    }

    const [form, setForm] = useState([]) //static form
    const [entry,setEntry]=useState(emptyForm); //new entries for static form, reflect on input
    const [errors, setErrors] = useState({ //for error logs
        first_name:'',
        last_name:'',
        email: '',
        password: '',
        TOS: '',
    })

    const validate = (name, value) =>{
        yup.reach(schema, name).validate(value)
            .then(()=>{
                setErrors({...errors, [name]: ''})
            })
            .catch(err=>{
                setErrors({...errors, [name]: err.errors[0]})
            })
        
    }

    const onChange = (evt) =>{
        const {name, type, checked, value} = evt.target
        const isCheckbox = type === 'checkbox' ? checked : value
        validate(name, isCheckbox)
        setEntry({...entry, [name]:isCheckbox})
    }
    const onSubmit = (evt) =>{
        evt.preventDefault();
        const newForm = {
            first_name: entry.first_name.trim(),
            last_name: entry.last_name.trim(),
            email: entry.email.trim(),
            password: entry.password.trim(),
            TOS: entry.TOS
        } 
        axios.post('https://reqres.in/api/users',newForm)
            .then(res => {
                console.log('sent')
                setForm([...form, newForm])
                setEntry(emptyForm)
            })
            .catch(err =>{
                console.log('oops')
            })

    }

    return(
        <div>
            <h2>
                Sign up for Meta Things
            </h2>
            <form onSubmit = {onSubmit}>
                <label for='fname'/>First Name
                <input onChange = {onChange} id ='fname' type='text' name ='first_name' value = {entry.first_name}/>
                <WarningP>{errors.first_name}</WarningP>
                <label for='lname'/>Last Name
                <input onChange = {onChange} id ='lname' type='text' name ='last_name' value = {entry.last_name}/>
                <WarningP>{errors.last_name}</WarningP>
                <label for='email'/>Email
                <input onChange = {onChange} id ='email' type='text' name ='email' value = {entry.email}/>
                <WarningP>{errors.email}</WarningP>
                <label for='password'/>Password
                <input onChange = {onChange} id ='password' type='text' name ='password' value = {entry.password}/>
                <WarningP>{errors.password}</WarningP>
                <label for='TOS'/>Terms of Service
                <input onChange = {onChange} id ='TOS' type='checkbox' name ='TOS' checked = {entry.TOS}/>
                <WarningP>{errors.TOS}</WarningP>
                <input type='submit'/>
            </form>
            <Users>Current Users
                {form.map(a=>{
                    return <div>
                                <p>{a.first_name + ' ' + a.last_name} {a.email} {a.password} {a.TOS ? 'True' : 'False'}</p>
                           </div>
                })}
            </Users>
        </div>
    )
}