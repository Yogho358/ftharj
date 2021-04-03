import React from 'react';

interface coursePart{
    name:string;
    exerciseCount:number;
}

const Total=({courseParts}:{courseParts:coursePart[]})=>{
    return (
        <div>
            <p>
        Number of exercise{" "}
        {courseParts.reduce((carry,part)=>carry+part.exerciseCount,0)}
      </p>
        </div>
    );
};

export default Total;