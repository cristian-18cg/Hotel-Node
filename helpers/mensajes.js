require('colors');
const mostrarMenu = ()=>{
    return new Promise(resolve=>{
        console.clear();
        console.log("=======================================".red);
        console.log("         Seleccione una opción".yellow);
        console.log("=======================================".red);
        console.log(`${'1.'.blue}${' Crear tareas'.yellow}`);
        console.log(`${'2.'.blue}${' Listar tareas'.yellow}`);
        console.log(`${'3.'.blue}${' Listar tareas completadas'.yellow}`);
        console.log(`${'4.'.blue}${' Listar tareas pendientes '.yellow}`);
        console.log(`${'5.'.blue}${' Completar tarea(s)'.yellow}`);
        console.log(`${'6.'.blue}${' Borrar tareas'.yellow}`);
        console.log(`${'6.'.blue}${' Borrar tareas'.yellow}`);
        console.log(`${'0.'.blue}${' Salir\n'.yellow}`);
        
        const readline =require('readline').createInterface({
            input:process.stdin,
            output:process.stdout
        })
        readline.question('Elija una opción: ',(opt)=>{
            readline.close();
            resolve(opt);
        })
    })
}


module.exports ={
    mostrarMenu,
}