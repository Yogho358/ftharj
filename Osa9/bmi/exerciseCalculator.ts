
interface Result {
    periodLength:number;
    trainingDays:number;
    success:boolean;
    rating:number;
    ratingDescription:string;
    target:number;
    average:number;
}

interface TargetAndDays{
    target:number;
    days:Array<number>;
}

const nan=new Error('args are not numbers');

const parseArgs=(args:Array<string>):TargetAndDays=>{
    
    if(args.length<4)throw new Error('not enough arguments');
    let target;
    if(!isNaN(Number(args[2]))){
        target=Number(args[2]);
    }else{throw nan;}
    const slicedArgs=args.slice(3);
    const days=Array<number>();

    slicedArgs.forEach(e=>{
        const x=Number(e);

        if(isNaN(x)){
            console.log("nan");
            throw nan;
        }
        days.push(x);
    });

    return{
        target:target,
        days:days
    };

};

export const calculateExercises=(target:number, args:Array<number>):Result=>{
    const periodLength=args.length;

    let sum=0;
    let days=0;
    args.forEach(e => {
        if(e>0){
            days++;
            sum=sum+e;
        }
    });

    const trainingDays=days;
    const average=sum/periodLength;
    const success=average>=target;
    let rating=1;
    let ratingDescription;
    if(average<target/2){
        rating=1;
        ratingDescription='terrible';
    }else if(average<target){
        rating=2;
        ratingDescription='ok';
    }else{
        rating=3;
        ratingDescription='great';
    }

    return{
        periodLength:periodLength,
        trainingDays:trainingDays,
        success:success,
        rating:rating,
        ratingDescription:ratingDescription,
        target:target,
        average:average
    };

};

try{
    const{target,days}=parseArgs(process.argv);
    console.log(calculateExercises(target,days));
}catch (e) {
    if(e instanceof Error){
    console.log('Error: ',e.message);
    }
}