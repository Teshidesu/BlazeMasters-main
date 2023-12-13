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
    shuffle() {
      // Algoritmo para asignar destinatarios de manera aleatoria
      const shuffledParticipants = [...this.participants];
      for (let i = shuffledParticipants.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledParticipants[i], shuffledParticipants[j]] = [shuffledParticipants[j], shuffledParticipants[i]];
      }

      // Asignar destinatarios
      this.results = shuffledParticipants.map((giver, index) => ({
        id: giver.id,
        giver,
        receiver: shuffledParticipants[(index + 1) % shuffledParticipants.length]
      }));
    }
  }
});

app.mount('#app');