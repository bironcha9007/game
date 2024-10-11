var loadscene = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function loadscene() {
        Phaser.Scene.call(this, { key: 'loadscene', active: false });
        this.configs = []; // Inicializa configs aquí
    },

    preload: function () {
        const charpath = "assets/char/";
        const fxpath = "assets/effects/";
        const characters = ['ryu', 'ken', 'akuma', 'chun', 'blanka', 'iori', 'terry'];
        const effects = [
            'dizzies', 
            'fire_ice_shock', 
            'fireballs', 
            'ground', 
            'hitsparks', 
            'misc', 
            'shadow', 
            'superart'
        ];

        // Cargar multiatlas de personajes
        characters.forEach(character => {
            this.load.multiatlas(character, `${charpath}${character}/${character}.json`, `${charpath}${character}`);
        });

        // Cargar configuraciones de personajes
        characters.forEach((character, index) => {
            this.load.script(`p${index + 1}-config`, `config/char/${character}.js`);
        });

        // Cargar configuración de efectos
        this.load.script('fx-config', 'config/effects/effect.js');

        // Cargar imágenes
        this.loadImages(characters);
        this.loadEffects(fxpath, effects);
    },

    loadImages(characters) {
        characters.forEach(character => {
            this.load.image(`${character}Big`, `assets/char/${character}/${character}-big.png`);
            this.load.image(`${character}Win`, `assets/char/${character}/${character}-win.png`);
        });

        // Cargar imágenes adicionales
        this.load.image('base', 'assets/stages/ground.png');
        this.load.image('white_spark', 'assets/particles/white.png');
    },

    loadEffects(fxpath, effects) {
        effects.forEach(effect => {
            this.load.multiatlas(effect, `${fxpath}${effect}/${effect}.json`, `${fxpath}${effect}`);
        });
    },

    create: function() {
        const { p1: selectedP1, p2: selectedP2 } = window.selectedCharacters;

        // Asignar las configuraciones de los personajes seleccionados
        this.configs.push(window[selectedP1]); 
        window[selectedP1].id = 'p1';

        this.configs.push(window[selectedP2]);
        window[selectedP2].id = 'p2';

        // Limpiar los datos de configuración
        this.configs.push(effects);

        // Inicializar datos de la escena
        const data = { result: { round: 1, p1wins: 0, p2wins: 0 } };
        
        // Iniciar las escenas
        this.scene.start('mainscene');
        this.scene.start('hudscene', data);
    }
});

export default loadscene;
