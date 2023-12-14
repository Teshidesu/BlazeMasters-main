/**
 * @typedef {{
 *  id: number
 *  giver: Participant
 *  receiver: Participant
 * }} ScretSanta
 * 
 * @typedef {{
 *  id: number
 *  name: string
 * }} Participant
 */

/**
 * @param {number} minInclusive 
 * @param {number} maxInclusive 
 * @returns {number}
 */
function RandomInt(minInclusive, maxInclusive){
  return Math.floor(
    Math.random() * (maxInclusive - minInclusive + 1)
  ) + minInclusive;
}

const app = Vue.createApp({
  data() {
    return {
      participants: [],
      participantsInput: '',
      results: []
    };
  },
  methods: {
    addParticipants() {
      const names = this.participantsInput.split(',').map(name => name.trim());
      names.forEach(name => {
        if (name) {
          this.participants.push({ id: Date.now(), name });
        }
      });
      this.participantsInput = '';
    },
  
    // Algoritmo para asignar destinatarios de manera aleatoria
    shuffle() {
      /**@type {ScretSanta[]} */
      const results = [];
      /**@type {Participant[]} */
      const givers = [...this.participants];
      /**@type {Participant[]} */
      const receivers = [...this.participants];

      for(let i = 0; givers.length > 0; ++i){
        const giver = givers[0];
  
        const holderIndex = receivers.indexOf(giver);
        let giverHolder = null;
        if(holderIndex > -1){
          giverHolder = receivers[holderIndex];
          receivers.splice(holderIndex, 1);
        }
        const receiverIndex = RandomInt(0, receivers.length-1);

        const receiver = receivers[receiverIndex];

        results.push({
          giver,
          receiver,
          id: giver.id
        });

        givers.shift();
        receivers.splice(receiverIndex, 1);
        if(giverHolder != null){
          receivers.push(giverHolder);
        }
      }
      console.log("Hola mundo")

      // Asignar destinatarios
      this.results = results;
    }
  }
});

app.mount('#app');