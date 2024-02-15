// const array = [];


// function timestable(multiplier){
//     let rowOfNumbers = 0;

//     for(let countX = 1; countX <= multiplier; countX++){
//         for(let count = 1; count <= multiplier; count++){
//            rowOfNumbers += count * countX + " ";
//         }
//         rowOfNumbers += "\n";
//         console.log(rowOfNumbers)
//     }
// }

// timestable(10);

// //Create a Fibonacci Sequence
// const result = totalNumbers => {
//     //Each the number is added
//     let n1 = 0, n2= 1, next;


//     //Put it in to an array
//     for(let i = 1; i <= totalNumbers; i++){
//         console.log(n1);
//         next = n1 + n2;
//         n1 = n2;
//         n2 = next;
//     }

// }

// result(40);


const jonas = {
    firstName: 'Jonas',
    lastName: 'John',
    birthYear: 1991,
    job: 'teacher',
    friends: ['Kate','Leah','Korn'],
    hasDriverLicence: false,

    getSummary: function(){
        let summary = ""
        let driverLicenceString = "" 

        this.age = 2023 - this.birthYear
        if(this.hasDriverLicence === true){
            driverLicenceString = "and he has a driver's licence";
        }else {
            driverLicenceString = "and he does not have a driver's licence";
        }

        summary = `${this.firstName} is a ${this.age}-year old teacher, ${driverLicenceString}`

        return summary;
    }
}

const summaryString = jonas.getSummary();
console.log(summaryString);