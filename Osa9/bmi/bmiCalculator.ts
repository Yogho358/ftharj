interface bmiValues{
    height:number;
    weight:number;
}

const parseArguments=(args:Array<string>):bmiValues=>{
    if(args.length<4) throw new Error('Not enough arguments');
    if(args.length>4) throw new Error('Too many arguments');

    if(!isNaN(Number(args[2]))&&!isNaN(Number(args[3]))){
        return{
            height:Number(args[2]),
            weight:Number(args[3])
        };
    }else{
        throw new Error('provided arguments were not numbers');
    }
};

const calculateBmi=(values:bmiValues):string=>{
    const height=values.height;
    const weight=values.weight;
    const bmi=weight/((height/100)*(height/100));

    if(bmi<15){
        return 'Very severely underweigh';
    }else if(bmi<16){
        return 'Severely underweight';
    }else if(bmi<18.5){
        return 'Underweight';
    }else if(bmi<25){
        return 'Normal (healthy weight)';
    }else if(bmi<30){
        return 'Overweight';
    }else if(bmi<35){
        return 'Obese Class I (Moderately obese)';
    }else if(bmi<40){
        return 'Obese Class II (Severely obese)';
    }else return 'Obese Class III (Very severely obese)';
};

try{
    const {height,weight}=parseArguments(process.argv);
    const values={height,weight};
    console.log(calculateBmi(values));
}catch (e){
    if(e instanceof Error){
    console.log('Error: ', e.message);
    }
}

export default calculateBmi;