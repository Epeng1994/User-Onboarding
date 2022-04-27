import styled from "styled-components"


const UsersDiv = styled.div`
    border: 1px solid blue;
    margin-top:5vw;
    border-radius: 15px;
    position: relative;
`

const UserRow = styled.div`
    display: flex;
    justify-content: space-evenly;
    border: 1px solid white;
    border-radius: 5px
`


export default function Users(props){
    return(
        <UsersDiv>
            <h4>Current Users</h4>
                {props.form.map(a=>{
                    return <UserRow>
                                <div>Name: {a.first_name + ' ' + a.last_name}</div>
                                <div>Email: {a.email} </div>
                                <div>Password: {a.password}</div>
                                <div>Signed: {a.TOS ? 'True' : 'False'}</div>
                                <div>Role: {a.role}</div>
                           </UserRow>
                })}
        </UsersDiv>
    )
}