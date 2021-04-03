import express from 'express';
import bmiCalculator from './bmiCalculator';
import {calculateExercises} from './exerciseCalculator';

const app=express();

app.use(express.json());

app.get('/hello',(_req,res)=>{
    res.send('Hello Full Stack!');
});

app.get('/bmi',(req,res)=>{
    const weight=Number(req.query.weight);
    const height=Number(req.query.height);
    if(!isNaN(weight)&&!isNaN(height)){
        const bmi=bmiCalculator({height,weight});

        res.send({
            weight:weight,
            height:height,
            bmi:bmi
        });
    }else{
        res.status(400).json({error: "malformatted parameters"});
    }
});

app.post('/exercises',(req,res)=>{
    try{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body=req.body;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const daily_exercises:Array<number>=req.body.daily_exercises;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const target:number=body.target;
    console.log(target)
    if(!target||!daily_exercises||daily_exercises.length!==7){
        res.status(400).json({error:"parameters missing"});
    }

    
    const nan=new Error('args are not numbers');
    if(isNaN(target)){
        throw nan;
    }
    daily_exercises.forEach(e=>{
        const x=Number(e);

        if(isNaN(x)){
            console.log("nan");
            throw nan;
        }
 
    });

    const args:number[]=daily_exercises;
    const result=calculateExercises(target,args);

    res.json(result);

    } catch(e){
        if(e instanceof Error){
            res.send(e.message);
        }
    }

});

const PORT=3003;

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
});