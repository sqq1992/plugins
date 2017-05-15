

function t1(a){

    try{
        a.push('a');
    }catch(e){
        console.log(e);
    }

    console.log("我是天才");

}

t1(20);