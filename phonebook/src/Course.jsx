import React from 'react'



const Header = ({name}) =>{

    return(

        
        <h1>{name}</h1>
    )

}

const Content = ({ parts }) => {
    const partContent = parts.map(e =>
        <Part
            key={ e.id }
            part = { e }
        />
    );

    return(
        <ul>
            { partContent }
        </ul>
    )
  };

  const Part = ({ part }) => {
    return(
        <li>
            { part.name } { part.exercises }
        </li>
    )
}



  const Total = ({ parts }) =>{

    const total =  parts.reduce((a, b) => {
        return { exercises: a.exercises + b.exercises }
    });

    return(
        <p>Total:{total.exercises}</p>
    )

  }


const  Course = ({course}) => {
  return (
    <div>
        
        <Header name={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
        
        
        
    </div>
  )
}


export default Course