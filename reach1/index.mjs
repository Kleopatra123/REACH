import{ loadStdlib } from 'reach-sh/stdlib';
import * as backend from './build/index.main.mjs';

const stdlib = loadStdlib('ALGO');
(async() => {
  const startingBalance = stdlib.parseCurrency(10);

  const accAlice = await stdlib.newTestAccount(startingBalance);
  const accBob = await stdlib.newTestAccount(startingBalance); 

  //const fmt = x => stdlib.formatCurrency(x, 4);
  //const getBalance = async(who) => fmt(await stdlib.balanceOf(who));

 const beforeAlice = await getBalance(accAlice);
 const beforeBob = await getBalance(accBob);
 
const ctcAlice = accAlice.contract(backend);
const ctcBob = accBob.attach(backend, ctcAlice.getInfo());

const randGuess = Math.floor(Math.random() * 10);
const OUTCOME = ['ALICE WINS',"BOB WINS", "BOTH LOSE"] 
const Player = (who) => ({
  getGuess: () => {
    const guess = Math.floor(Math.random() * 10);
    console.log(`${who} played ${guess}`);
    return guess;
  },
  seeResult: (outcome)  => {
    console.log(`${who} saw outcome ${OUTCOME[outcome]}`);
  }
})


await promise.all([
  backend.Alice(ctcAlice, {
    ...Player("Alice"),
  }),
  backend.Bob(ctcBob, {
    ...Player("Bob"),
  }),
]);

})();