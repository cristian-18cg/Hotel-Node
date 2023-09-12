require('colors');
const inquirer = require('inquirer');
const prompt = inquirer.createPromptModule();

const preguntas =[{ //arreglo 
    type:'list',
    name:'opcion',
    message:'Que deseas hacer?',
    choices:[
        {
            value:'1',
            name:`1. Crear reserva`
        },
        {
            value:'2',
            name:`2. Listar reservas`
        },
        {
            value:'3',
            name:`3. Listar reservas activas`
        },
        {
            value:'4',
            name:`4. Activar reservas`
        },
        {
            value:'5',
            name:`5. Completar Aseos`
        },
        {
            value:'6',
            name:`6. Completar desayunos`
        },
        {
            value:'7',
            name:`7. Eliminar reservas`
        },
        {
            value:'0',
            name:`0. Salir`
        }

    ]
    }]



    const inquirerMenu =async()=>{
        console.log("=======================================".red);
        console.log("       Bienvenido Hotel Cristian ".blue);
        console.log("         Seleccione una opción".yellow);
        console.log("=======================================".red);

        let otp ='';
        const opt = await prompt(preguntas).then(data=>{
            otp =data['opcion']
        })
        return otp;

    }

    const pausa = async()=>{
        const question = [
            {
                type:'input',
                name:'enter',
                message:`\nPresione ${'ENTER'.green} para continuar\n`
            }
        ]
        let pau ="";
        console.log('\n');
        await inquirer.prompt(question).then(data =>{
            pau= data['message']
        });
        return pau;
    }


    const leerInput = async(message)=>{
        const question = [
            {
                type:'input',
                name:'desc',
                message,
                validate(value){
                    if(value.length===0){
                        return 'Por favor ingrese un valor';
                    }
                    return true;
                }
            }
        ]
        let leer ="";
        console.log('\n');
        await inquirer.prompt(question).then(data =>{
            leer= data['desc']
        });
        return leer;
    }



    module.exports ={
        inquirerMenu,
        pausa, 
        leerInput
    }