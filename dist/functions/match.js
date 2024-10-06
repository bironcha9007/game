import Healthbar from '../models/healthbar';

var Match = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
        function Match(scene, data) {
            Phaser.Scene.call(this, { key: 'Match' });
            this.scene = scene;
            this.result = data.result;
            this.raceTo = 2;
            this.round = this.result.round;
            this.ended = false;
            this.endCause = null;
            this.player1 = this.scene.player1;
            this.player2 = this.scene.player2;
            
            this.player1.wins = this.result.p1wins;
            this.player2.wins = this.result.p2wins;
            this.p1stun_cfg = { delay: 3000, repeat: 99, args: ['p1'], callback: this.decreaseStun, callbackScope: this};
            this.p2stun_cfg = { delay: 3000, repeat: 99, args: ['p2'], callback: this.decreaseStun, callbackScope: this};
            this.p1stuntimer = this.scene.time.addEvent(this.p1stun_cfg);
            this.p2stuntimer = this.scene.time.addEvent(this.p2stun_cfg);
            this.setHud();
            this.setListeners();
           
        },
    setHud: function() {
        this.p1health = new Healthbar(this.scene, {id: 'p1', x: 50, y: 80, width: 300, height: 15, flipped: true});
        this.p2health = new Healthbar(this.scene, {id: 'p2', x: 450, y: 80, width: 300, height: 15});
    
        // Ajustar el porcentaje de salud inicial del jugador 2
  

        this.p1stun = new Healthbar(this.scene, {id: 'p1', x: 200, y: 110, width: 150, height: 8, showDamage : false, autoDecrease: true, flipped: true});
        this.p2stun = new Healthbar(this.scene, {id: 'p2', x: 450, y: 110, width: 150, height: 8, showDamage : false, autoDecrease: true });
        this.p1power = new Healthbar(this.scene, {id: 'p1', x: 50, y: 555, width: 300, height: 10, showDamage : false, flipped: true});
        this.p2power = new Healthbar(this.scene, {id: 'p2', x: 450, y: 555, width: 300, height: 10, showDamage : false });
        this.p1stun.setPercent(0);
        this.p2stun.setPercent(0);
        this.p1power.setPercent(0);
        this.p2power.setPercent(0);
        
        this.p1name = this.createText({ x: 70, y: 120, text: this.player1.config.name.toUpperCase(), scrollFactor: 0, fontSize: 20, font: 'Arial', shadow: '', color: '#fff', stroke: '#000', strokeWidth: 4, origin: 0.5, visible: true, align: 'left' });
        this.p2name = this.createText({ x: 730, y: 120, text: this.player2.config.name.toUpperCase(), scrollFactor: 0, fontSize: 20, font: 'Arial', shadow: '', color: '#fff', stroke: '#000', strokeWidth: 4, origin: 0.5, visible: true, align: 'right' });
        this.p1w1mark = this.createText({ x: 345, y: 65, text: '.', scrollFactor: 0, fontSize: 18, font: 'Arial', shadow: '', color: '#ff0000', stroke: '#ccc', strokeWidth: 7, origin: 0.8, visible: true });
        this.p2w1mark = this.createText({ x: 465, y: 65, text: '.', scrollFactor: 0, fontSize: 18, font: 'Arial', shadow: '', color: '#ff0000', stroke: '#ccc', strokeWidth: 7, origin: 0.8, visible: true });
        this.p1w2mark = this.createText({ x: 315, y: 65, text: '.', scrollFactor: 0, fontSize: 18, font: 'Arial', shadow: '', color: '#ff0000', stroke: '#ccc', strokeWidth: 7, origin: 0.8, visible: true });
        this.p2w2mark = this.createText({ x: 495, y: 65, text: '.', scrollFactor: 0, fontSize: 18, font: 'Arial', shadow: '', color: '#ff0000', stroke: '#ccc', strokeWidth: 7, origin: 0.8, visible: true });
        this.setMarks();

        this.time = this.createText({ x: 400, y: 100, text: 50, scrollFactor: 0, fontSize: 65, font: 'Arial', shadow: '', color: '#EDD161', stroke: '#3D1300', strokeWidth: 8, origin: 0.5, visible: true });
        this.info = this.createText({ x: 400, y: 250, text: '', scrollFactor: 0, fontSize: 95, font: 'Arial', shadow: '', color: '#EDD161', stroke: '#3D1300', strokeWidth: 8, origin: 0.5, align: 'center', visible: true });
        this.timer = this.scene.time.addEvent({ delay: 1000, repeat: 50, paused: true });
        this.pretimer = this.scene.time.addEvent({ delay: 500, repeat: 6, paused: true });
        this.posttimer = this.scene.time.addEvent({ delay: 500, repeat: 6, paused: true });
        this.random = 2;
        this.randtimer = this.scene.time.addEvent({delay: 1000, repeat: 99, callback: function () {this.random = Phaser.Math.Between(1, 3)}, callbackScope: this});
    },
    setListeners: function() {
        this.player1.hitbox.on('p1-hitboxHit', this.setOnHit, this);
        this.player1.hitbox.on('p1-hitboxBlock', this.setOnBlock, this);
        this.player1.fireball.on('p1-hitboxHit', this.setOnHit, this);
        this.player1.fireball.on('p1-hitboxBlock', this.setOnBlock, this);
        
        this.player2.hitbox.on('p2-hitboxHit', this.setOnHit, this);
        this.player2.hitbox.on('p2-hitboxBlock', this.setOnBlock, this);
        this.player2.fireball.on('p2-hitboxHit', this.setOnHit, this);
        this.player2.fireball.on('p2-hitboxBlock', this.setOnBlock, this);
    },
    setMarks: function() {
        if (this.player1.wins == 1) this.p1w1mark.setText('V').setVisible(true);
        if (this.player1.wins == 2) this.p1w2mark.setText('V').setVisible(true);
        if (this.player2.wins == 1) this.p2w1mark.setText('V').setVisible(true);
        if (this.player2.wins == 2) this.p2w2mark.setText('V').setVisible(true);
    },
    setOnHit: function(id, config) {
        var opponent = id === 'p1' ? this.player2 : this.player1;
    
        // Obtener la animación de recibir golpe
        var hitAnim = this.scene.anims.get(opponent.id + '-hit' + config.atklvl);
        var frames = hitAnim.frames.length;
        var lastframe = hitAnim.getLastFrame();
    
        // Añadir frames adicionales para cada golpe recibido
        for (var i = 0; i < config.onHit; i++) {
            hitAnim.addFrame({ key: lastframe.textureKey, frame: lastframe.textureFrame });
            opponent.container.x += config.push / config.onHit;
        }
    

        // Calcular y aplicar el daño
        var damage = config.damage * config.onHit;
        opponent.health -= damage;
    
        // Asegurarse de que la salud no sea menor que 0
        if (opponent.health < 0) {
            opponent.health = 0;
        }
        this.updateHealth(opponent, opponent.health);
        this.updateStun(opponent, config);
        this.updatePower(opponent, config);
    
        // Pausar y resetear el temporizador de stun
        this[opponent.id + 'stun'].stuntimer.paused = true;
        this[opponent.id + 'stuntimer'].reset(this[opponent.id + 'stun_cfg']);
    
        // Eliminar los frames adicionales después de la animación
        hitAnim.once('resetFrame', function() {
            for (var i = 0; i < config.onHit; i++) {
                hitAnim.removeFrameAt(frames);
            }
        }, this);
// animacion de hit en stance el oponente y el jugador
        opponent.thit(config);
    },
    
    
    
    setOnBlock: function(id, config) {
        // Determinar el oponente y el jugador
        const isPlayer1 = id === 'p1';
        const opponent = isPlayer1 ? this.player2 : this.player1;
        const player = isPlayer1 ? this.player1 : this.player2;
    
        // Configuración de la animación de bloqueo
        const blockAnimKey = `${opponent.id}-block${config.atklvl}`;
        const blockAnim = this.scene.anims.get(blockAnimKey);
        const blockCfg = opponent.getConfig('mov', `block${config.atklvl}`);
        const { noFrames } = blockCfg;
        const lastFrame = blockAnim.getLastFrame();
    
        // Añadir los frames a la animación de bloqueo
        for (let i = 0; i < config.onBlk; i++) {
            blockAnim.addFrame({ key: lastFrame.textureKey, frame: lastFrame.textureFrame });
    
            // Ajustar la posición del oponente
            const pushAmount = config.push / config.onBlk;
            opponent.container.x += (player.xInd === 1 ? pushAmount : -pushAmount);
        }
    
        // Configurar la eliminación de los frames añadidos
        blockAnim.once('resetFrame', () => {
            for (let i = 0; i < config.onBlk; i++) {
                blockAnim.removeFrameAt(noFrames);
            }
        }, this);
    
        // Actualizar la energía y manejar el bloqueo
        this.updatePower(opponent, config);
        opponent.tblock(config);
    },
    decreaseStun: function(id) {
        this[id + 'stun'].stuntimer.paused = true;
    },
    createText: function(config) {
        return this.scene.add.text(config.x, config.y)
            .setText(config.text).setScrollFactor(config.scrollFactor)
            .setFontSize(config.fontSize).setFontFamily(config.font)
            .setShadow(config.shadow).setColor(config.color)
            .setStroke(config.stroke, config.strokeWidth).setOrigin(config.origin)
            .setAlign(config.align).setVisible(config.visible);
    },
    start: function() {
        // Limpiar todos los listeners de input antes de comenzar la pelea
        this.scene.input.removeAllListeners();
    
        // Resetear el estado del joystick
        if (this.player1.control && this.player1.control.resetJoystick) {
            this.player1.control.resetJoystick(); // Llama al método de reinicio del joystick
        }
        if (this.player1.control && this.player1.control.resetControls) {
            this.player1.control.resetControls(); // Llama al método de reinicio del joystick
        }
        this.pretimer.paused = false;
        this.player1.control.lock(true);
    
        document.getElementById('controls').style.display = 'block';
        document.getElementById('joystick').style.display = 'block';
    
        if (this.pretimer.repeatCount == 5) {
            this.info.setText('ROUND ' + this.round);
        } else if (this.pretimer.repeatCount == 1) {
            this.info.setText("FIGHT!");
        } else if (this.pretimer.repeatCount == 0) {
            this.info.setVisible(false);
            this.player1.control.lock(false);
    
            this.timer.paused = false;
            this.time.text = this.timer.repeatCount;
            this.time.text < 10 ? this.time.setColor('#E53941').setText('0' + this.time.text) : null;
        }
    
        if (this.timer.repeatCount == 0) {
            this.endCause = 'TIME OVER';
            this.setResult();
            this.end();
        }
    },
    
    end: function() {
        this.ended = true;
        this.timer.paused = true;
    
        // Bloquear los controles de ambos jugadores
        this.player1.control.lock(true);
        this.player2.control.lock(true);
    
        this.posttimer.paused = false;
    
        // Ocultar controles y joystick al finalizar la ronda
        document.getElementById('controls').style.display = 'none';
        document.getElementById('joystick').style.display = 'none';
    
        var winner = this.result.draw ? "DRAW GAME" : this.result.winner.config.name + " WINS!";
        
        if (this.posttimer.repeatCount == 10) {
            this.info.setText(this.endCause).setVisible(true);
            if (!this.result.draw) this.result.winner.tstance();
        } else if (this.posttimer.repeatCount == 6) {
            this.info.setText(winner.toUpperCase()).setVisible(true);
            this.setMarks();
        } else if (this.posttimer.repeatCount == 3) {
            if (!this.result.draw) {
                this.result.winner.health == 1000 ? this.info.setText("PERFECT!").setVisible(true) : null;
            }
        } else if (this.posttimer.repeatCount == 0) {
            this.info.setVisible(false);
    
            // Condición para determinar si se alcanzaron las dos victorias necesarias
            if (this.result.p1wins == this.raceTo || this.result.p2wins == this.raceTo) {
                this.scene.scene.start('resultscene', { result: this.result });
            } else if (this.result.draw && (this.result.p1wins == this.raceTo && this.result.p2wins == this.raceTo)) {
                this.scene.scene.start('loadscene');
            } else {
                this.result.round = this.round + 1;
                this.scene.scene.start('mainscene');
                this.scene.scene.start('hudscene', { result: this.result });
            }
        }
    },
    
    isTouchDevice: function() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    },
    setResult: function() {
        this.result.draw = false;
    
        // Condición para Player 1 gana
        if (this.player1.health > this.player2.health) {
            this.result.winner = this.player1;
            this.result.p1wins += 1;
            this.player1.wins += 1;
    
        // Condición para Player 2 gana
        } else if (this.player2.health > this.player1.health) {
            this.result.winner = this.player2;
            this.result.p2wins += 1;
            this.player2.wins += 1;
    
        // Condición para empate
        } else {
            this.result.draw = true;
        }
    },
    
    updateHealth: function(player, value) {

        
     // Actualizar barra de salud y color según el valor de la salud
     if (value <= 1000) {
        this[player.id + 'health'].setColor(0xffab51); // red (critical)
        this[player.id + 'health'].setPercent(value);
    }
        // Actualizar barra de salud y color según el valor de la salud
        if (value <= 880) {
            this[player.id + 'health'].setColor(0xffab51); // red (critical)
            this[player.id + 'health'].setPercent(value);
        }
    
        if (value <= 500) {
            this[player.id + 'health'].setColor(0xff0000, 0xfc5353); // red (critical)
            this[player.id + 'health'].setPercent(value);
        }
        
        if (value <= 180) {
            this[player.id + 'health'].setColor(0xffab51, 0xfc5353); // red (critical)
            this[player.id + 'health'].setPercent(value);
        }
        if (value <= 10) {
            this[player.id + 'health'].setColor(0xffab51, 0xfc5353); // red (critical)
            this[player.id + 'health'].setPercent(value);
        }
        if (value <= 0) {
            
            // Bloquear controles cuando la salud llegue a 0
            this.endCause = 'K.O!!!';
            this[player.id + 'health'].setPercent(0);
            this.player1.control.lock(true);
            this.player2.control.lock(true);
            this.setResult();
            this.end();
            
        }
    },
    updateStun: function(player, config) {
        player.setStun(config.stun);
        var stun = player.getStun();
        if (stun > 0) {
            this[player.id + 'stun'].setColor(0xffab51, ); // orange
            this[player.id + 'stun'].setPercent(stun);
        }
    },
    updatePower: function(player, config) {
        player.setPower(config.stun);
        var power = player.getPower();
        if (power > 0) {
            this[player.id + 'power'].setColor(0x9dbff9, 0x5391fc); // blue
            this[player.id + 'power'].setPercent(power);
        }
    }
});

export default Match;
