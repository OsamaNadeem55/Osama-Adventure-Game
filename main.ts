#! /usr/bin/env node

import inquirer from "inquirer";

// ======GAMES VARIABLE========

let enemies:string[] = ["Skeleton","Zombie","Warrior","Assassin"];
let maxEnemyHealth:number = 75;
let enemyAttackDamageToHero :number = 25;

// =======PLAYER VARIABLE=======

let heroHealth:number = 100;
let attackDamageToEnemy:number = 50;
let numHealthPotion: number = 3;
let healthPotionHealAmount:number = 30;
let healthPotionDropChance:number = 50;

// ====== WHILE LOOP CONDITION ======

let gameRunning :boolean = true;

console.log(".......WELLCOME TO DEADZONE.......")

Game:
while (gameRunning){
    let enemyHealth = Math.floor(Math.random()* maxEnemyHealth + 1)
    let enemyIndex = Math.floor(Math.random()* enemies.length)
    let enemy = enemies[enemyIndex]

    console.log(`# ${enemy} has appeared #\n`);

    while (enemyHealth > 0){
        console.log(`your Health ${heroHealth}`);
        console.log(`${enemy} Health: ${enemyHealth}`);

        let options = await inquirer.prompt(
            [
                {
                    name :"answer",
                    type: "list",
                    message:"What would you like to do?",
                    choices:["* Attack","* Take Health Potion","* Run"]
                }
            ]
        )
        if (options.answer === "* Attack"){
            let damageToEnemy = Math.floor(Math.random()* attackDamageToEnemy + 1)
            let damageToHero = Math.floor(Math.random()* enemyAttackDamageToHero + 1)

            enemyHealth -= damageToEnemy
            heroHealth -= damageToHero

            console.log(`you strike the ${enemy} for ${damageToEnemy}`);
            console.log(`${enemy} strike you for ${damageToHero} damage.`);
            if (heroHealth < 1){
                console.log("you have taken too much damage. you are too weak to continue.");
                break;
            }
        }

        else if(options.answer === "* Take Health Potion"){
            if(numHealthPotion > 0){
                heroHealth += healthPotionHealAmount
                numHealthPotion--

                console.log(`you use health potion for ${healthPotionHealAmount}`);
                console.log(`you now have ${heroHealth} health`);
                console.log(`you have ${numHealthPotion} health potions left.`);
            }
            else{
                console.log(`you have no health potions left.Defeat enemy for a chance to get health potion`);
            }
        }
        else if(options.answer === "* Run"){
            console.log(`you run away from ${enemy}`);
            continue Game;
        }
    }
    if(heroHealth < 1){
        console.log(`you are out from battle. you are too weak.`);
        break
    }
    console.log(`${enemy} was defeated!`);
    console.log(`you have ${heroHealth} health.`);

    let randomNumber = Math.floor(Math.random()* 100 + 1)
    if(randomNumber < healthPotionDropChance){
        numHealthPotion++

        console.log(`enemy give you health potion`);
        console.log(`your health is ${heroHealth}`);
        console.log(`your health potion is ${numHealthPotion}`);
    }
    let userOption = await inquirer.prompt(
        [
            {
              name:"answer",
              type:"list",
              message:"What would you like to do now?",
              choices:["* Continue","* Exit"]
            }
        ]
    )
    if(userOption.answer === "* Continue"){
        console.log("Continuing on your adventure");
    }
    else{
        console.log("Exited!! from the Deadzone");
        break;
    }
    console.log("Thank you for playing. \n");
}