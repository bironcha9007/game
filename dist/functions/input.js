import Phaser from 'phaser';

class VirtualJoystick {
    constructor(scene, player) {
        this.scene = scene;
        this.player = player;

        // Si ya existen joystickBase o joystickHandle, los destruimos
        

        // Reiniciar propiedades
        this.joystickBase = null;
        this.joystickHandle = null;
        this.maxDistance = 20;
        this.isDragging = false;

        // Inicializar las propiedades de dirección del joystick
        this.leftPressed = false;
        this.rightPressed = false;
        this.upPressed = false;
        this.downPressed = false;

        // Crear un nuevo contenedor para el joystick
        this.joystickBase = this.scene.add.circle(280, 280, 30, 0x6666ff).setScrollFactor(0);
        this.joystickBase.setAlpha(0.1);
        this.joystickHandle = this.scene.add.circle(280, 280, 20, 0xff0000).setScrollFactor(0);
        this.joystickBase.setDepth(99); 
        this.joystickHandle.setAlpha(0.1); // Ajustar la opacidad
        this.joystickHandle.setDepth(100); // Asegura que esté por encima

        this.init(); // Iniciar los eventos del joystick
    }

    init() {
        // Manejadores de eventos para el joystick
        this.scene.input.on('pointerdown', (pointer) => {
            this.isDragging = true;
            this.moveHandle(pointer);
        });

        this.scene.input.on('pointermove', (pointer) => {
            if (this.isDragging) {
                this.moveHandle(pointer);
            }
        });

        this.scene.input.on('pointerup', () => {
            this.isDragging = false;
            this.resetJoystick();
            
        });
    }

    moveHandle(pointer) {
        if (this.player.id === 'p1') { 
            const distX = pointer.x - this.joystickBase.x;
            const distY = pointer.y - this.joystickBase.y;
            const angle = Math.atan2(distY, distX);

            // Calcular la distancia desde el centro del joystick
            const distance = Math.min(this.maxDistance, Math.sqrt(distX * distX + distY * distY));

            // Mover el joystick dentro de los límites de `maxDistance`
            this.joystickHandle.x = this.joystickBase.x + distance * Math.cos(angle);
            this.joystickHandle.y = this.joystickBase.y + distance * Math.sin(angle);

            // Resetear las direcciones antes de reasignarlas
            this.leftPressed = false;
            this.rightPressed = false;
            this.upPressed = false;
            this.downPressed = false;

            let angleDeg = Phaser.Math.RadToDeg(angle);
            if (angleDeg < 0) {
                angleDeg += 360; // Convertir ángulo negativo en positivo
            }

            // Actualizar el movimiento del jugador según la dirección del joystick
            if (angleDeg >= 0 && angleDeg < 45) {
                this.player.twalk(this.player.f);  // Caminar hacia la derecha
                if (this.player.state === 'crouch') this.player.tstance();
                this.rightPressed = true;
            }
            else if (angleDeg >= 160 && angleDeg < 210) {
                this.player.twalk(this.player.b);  // Caminar hacia la izquierda
                if (this.player.state === 'crouch') this.player.tstance();
                this.leftPressed = true;
            }
            else if (angleDeg >= 250 && angleDeg < 290) {
                this.player.tjump('');  // Saltar hacia atrás
                
                this.upPressed = true;
            } 
            else if (angleDeg >= 200 && angleDeg < 230) {
                this.leftPressed = true;
                this.upPressed = true;
                this.player.tjump('b'); // Saltar hacia atrás
            }
            else if (angleDeg >= 295 && angleDeg < 330) {
                this.rightPressed = true;
                this.upPressed = true;
                this.player.tjump('f'); // Saltar hacia adelante
            }
            else if (angleDeg >= 80 && angleDeg < 130) {
                this.player.tcrouch('');  // Agacharse
                this.downPressed = true;
            }
        }
    }

    resetJoystick() {
        
        // Restablecer la posición del mango del joystick
        this.joystickHandle.x = this.joystickBase.x;
        this.joystickHandle.y = this.joystickBase.y;
        this.player.tstance();
        // Resetear la postura del jugador


        // Resetear las direcciones cuando se suelta el joystick
        this.leftPressed = false;
        this.rightPressed = false;
        this.upPressed = false;
        this.downPressed = false;
    }
}

class TouchButtons {
    constructor(scene, player) {
        this.scene = scene;
        this.player = player;

        if (this.player.id === 'p1') {
            this.lpButton = document.getElementById('lp');
            this.lkButton = document.getElementById('lk');
            this.mpButton = document.getElementById('mp');
            this.mkButton = document.getElementById('mk');
            this.hpButton = document.getElementById('hp');
            this.hkButton = document.getElementById('hk');

            this.currentAttackType = null; // Guardar el tipo de ataque actual
            this.attackInterval = null; // Guardar el intervalo de repetición

            this.addTouchListeners();
            this.resetControls();
        }
    }

    addTouchListeners() {
        // Listener para Light Punch
        this.lpButton.addEventListener('pointerdown', () => this.startAttack('lp'));
        this.lpButton.addEventListener('pointerup', () => this.stopAttack());

        // Listener para Light Kick
        this.lkButton.addEventListener('pointerdown', () => this.startAttack('lk'));
        this.lkButton.addEventListener('pointerup', () => this.stopAttack());

        // Listener para Medium Punch
        this.mpButton.addEventListener('pointerdown', () => this.startAttack('mp'));
        this.mpButton.addEventListener('pointerup', () => this.stopAttack());

        // Listener para Medium Kick
        this.mkButton.addEventListener('pointerdown', () => this.startAttack('mk'));
        this.mkButton.addEventListener('pointerup', () => this.stopAttack());

        // Listener para High Punch
        this.hpButton.addEventListener('pointerdown', () => this.startAttack('hp'));
        this.hpButton.addEventListener('pointerup', () => this.stopAttack());

        // Listener para High Kick
        this.hkButton.addEventListener('pointerdown', () => this.startAttack('hk'));
        this.hkButton.addEventListener('pointerup', () => this.stopAttack());
    }

    startAttack(type) {
        // Ejecuta el ataque inmediatamente al presionar
        this.executeAttack(type);

        // Si un ataque diferente está en curso, detén el ataque anterior
        if (this.currentAttackType && this.currentAttackType !== type) {
            this.stopAttack();
        }

        this.currentAttackType = type; // Guarda el ataque actual

        // Repetir el ataque a intervalos mientras se mantiene presionado
        this.attackInterval = setInterval(() => {
            this.executeAttack(type);
        }, 100); // Ajusta el tiempo según sea necesario
    }

    executeAttack(type) {
        const state = this.player.state;

        if (state === 'crouch') {
            // Ataques agachados
            this.player.tcrattk(`c${type}`);
        } else if (state === 'stance' || state === 'walk') {
            // Ataques de pie
            this.player.tattk(`s${type}`);
        } else {
            // Ataques saltando
            this.player.tjattk(`j${type}`);
        }
    }

    stopAttack() {
        // Detener el ataque repetido
        if (this.attackInterval) {
            clearInterval(this.attackInterval);
            this.attackInterval = null;
        }

        this.currentAttackType = null; // Reinicia el tipo de ataque actual

  
    }

    resetControls() {
        // Resetear todos los botonesw
        this.currentAttackType = null;
        this.attackInterval = null;
        this.lpButton = false;
        this.lkButton = false;
        this.mpButton = false;
        this.mkButton = false;
        this.hpButton = false;
        this.hkButton = false;
    }
}
var Input = new Phaser.Class({
    initialize: function Input(scene, player) {
        this.player = player;
        this.scene = scene;
        this.setupKeys();
        this.joystick = new VirtualJoystick(scene, player);
        this.touchButtons = new TouchButtons(scene, player);
        
    },

    lock: function (state) {
        this.scene.input.keyboard.enabled = !state;
    },
    

    resetAllControls() {
        this.resetJoystick(); // Llama a la función de reinicio del joystick
        this.resetControls(); // Llama a la función de reinicio de controles
    },

    setupKeys: function () {
        if (this.player.id === 'p1') {
            // Configuración de teclas para el jugador p1
            this.u = this.scene.input.keyboard.addKey('W');
            this.d = this.scene.input.keyboard.addKey('S');
            this.l = this.scene.input.keyboard.addKey('A');
            this.r = this.scene.input.keyboard.addKey('D');
            this.lp = this.scene.input.keyboard.addKey('E');
            this.mp = this.scene.input.keyboard.addKey('R');
            this.hp = this.scene.input.keyboard.addKey('T');
            this.lk = this.scene.input.keyboard.addKey('F');
            this.mk = this.scene.input.keyboard.addKey('G');
            this.hk = this.scene.input.keyboard.addKey('Y');

            this.dashf = this.scene.input.keyboard.createCombo('DD', { resetOnMatch: true });
            this.dashb = this.scene.input.keyboard.createCombo('AA', { resetOnMatch: true });
            this.dshof = this.scene.input.keyboard.createCombo('DDSD', { resetOnMatch: true });
            this.dshob = this.scene.input.keyboard.createCombo('AASA', { resetOnMatch: true });

            // Dragon Punch
            this.ldpf = this.scene.input.keyboard.createCombo('DSDE', { resetOnMatch: true });
            this.mdpf = this.scene.input.keyboard.createCombo('DSDR', { resetOnMatch: true });
            this.hdpf = this.scene.input.keyboard.createCombo('DSDT', { resetOnMatch: true });
            this.ldpb = this.scene.input.keyboard.createCombo('ASAE', { resetOnMatch: true });
            this.mdpb = this.scene.input.keyboard.createCombo('ASAR', { resetOnMatch: true });
            this.hdpb = this.scene.input.keyboard.createCombo('ASAT', { resetOnMatch: true });

            // Fireball
            this.lfbf = this.scene.input.keyboard.createCombo('SDE', { resetOnMatch: true });
            this.mfbf = this.scene.input.keyboard.createCombo('SDR', { resetOnMatch: true });
            this.hfbf = this.scene.input.keyboard.createCombo('SDT', { resetOnMatch: true });
            this.lfbb = this.scene.input.keyboard.createCombo('SAE', { resetOnMatch: true });
            this.mfbb = this.scene.input.keyboard.createCombo('SAR', { resetOnMatch: true });
            this.hfbb = this.scene.input.keyboard.createCombo('SAT', { resetOnMatch: true });

            // Tatsus
            this.ltatf = this.scene.input.keyboard.createCombo('SAF', { resetOnMatch: true });
            this.mtatf = this.scene.input.keyboard.createCombo('SAG', { resetOnMatch: true });
            this.htatf = this.scene.input.keyboard.createCombo('SAY', { resetOnMatch: true });
            this.ltatb = this.scene.input.keyboard.createCombo('SDF', { resetOnMatch: true });
            this.mtatb = this.scene.input.keyboard.createCombo('SDG', { resetOnMatch: true });
            this.htatb = this.scene.input.keyboard.createCombo('SDY', { resetOnMatch: true });

            // Critical Arts
            this.caf = this.scene.input.keyboard.createCombo('QQ', { resetOnMatch: true });
            this.cab = this.scene.input.keyboard.createCombo('QQ', { resetOnMatch: true });
        } else if (this.player.id === 'p2') {
            // Configuración de teclas para el jugador p2
            this.u = this.scene.input.keyboard.addKey('I');
            this.d = this.scene.input.keyboard.addKey('K');
            this.l = this.scene.input.keyboard.addKey('J');
            this.r = this.scene.input.keyboard.addKey('L');
            this.lp = this.scene.input.keyboard.addKey('M');
            this.mp = this.scene.input.keyboard.addKey('N');
            this.hp = this.scene.input.keyboard.addKey('B');
            this.lk = this.scene.input.keyboard.addKey('V');
            this.mk = this.scene.input.keyboard.addKey('C');
            this.hk = this.scene.input.keyboard.addKey('Z');


            this.dashf = this.scene.input.keyboard.createCombo('LL', { resetOnMatch: true });
            this.dashb = this.scene.input.keyboard.createCombo('JJ', { resetOnMatch: true });
            this.dshof = this.scene.input.keyboard.createCombo('LLKL', { resetOnMatch: true });
            this.dshob = this.scene.input.keyboard.createCombo('JJKJ', { resetOnMatch: true });

            // Dragon Punch
            this.ldpf = this.scene.input.keyboard.createCombo('LKLM', { resetOnMatch: true });
            this.mdpf = this.scene.input.keyboard.createCombo('LKLN', { resetOnMatch: true });
            this.hdpf = this.scene.input.keyboard.createCombo('LKLB', { resetOnMatch: true });
            this.ldpb = this.scene.input.keyboard.createCombo('JKJM', { resetOnMatch: true });
            this.mdpb = this.scene.input.keyboard.createCombo('JKJN', { resetOnMatch: true });
            this.hdpb = this.scene.input.keyboard.createCombo('JKJB', { resetOnMatch: true });

            // Fireball
            this.lfbf = this.scene.input.keyboard.createCombo('KLM', { resetOnMatch: true });
            this.mfbf = this.scene.input.keyboard.createCombo('KLN', { resetOnMatch: true });
            this.hfbf = this.scene.input.keyboard.createCombo('KLB', { resetOnMatch: true });
            this.lfbb = this.scene.input.keyboard.createCombo('KJM', { resetOnMatch: true });
            this.mfbb = this.scene.input.keyboard.createCombo('KJN', { resetOnMatch: true });
            this.hfbb = this.scene.input.keyboard.createCombo('KJB', { resetOnMatch: true });

            // Tatsus
            this.ltatf = this.scene.input.keyboard.createCombo('KJV', { resetOnMatch: true });
            this.mtatf = this.scene.input.keyboard.createCombo('KJC', { resetOnMatch: true });
            this.htatf = this.scene.input.keyboard.createCombo('KJZ', { resetOnMatch: true });
            this.ltatb = this.scene.input.keyboard.createCombo('KLV', { resetOnMatch: true });
            this.mtatb = this.scene.input.keyboard.createCombo('KLC', { resetOnMatch: true });
            this.htatb = this.scene.input.keyboard.createCombo('KLZ', { resetOnMatch: true });

            // Critical Arts
            this.caf = this.scene.input.keyboard.createCombo('XX', { resetOnMatch: true });
            this.cab = this.scene.input.keyboard.createCombo('XX', { resetOnMatch: true });
        }

        // Configuración de combos para ambos jugadores
        // Dash

    },
    controlPlayer: function () {
        this.invertControls();
        this.controlDirection();
        this.controlAttack();
        this.controlInputs();

    },
    invertControls: function () {
        var object = this.player.container;
        var target = this.player.id === 'p1' ? this.scene.player2.container : this.scene.player1.container;
        var xdif = object.x - target.x;
        this.player.xInd = xdif > 0 ? -1 : 1;
    

    },
    controlDirection: function () {
        var state = this.player.state;
        var moves = ['attk', 'spattk', 'crattk', 'tjattk', 'twalk'];
    
        // Verificar si el joystick o las teclas no están siendo usados y el jugador está en el suelo
        if (!this.joystick.isDragging && !this.r.isDown && !this.l.isDown && !this.u.isDown && !this.d.isDown && this.player.container.body.onFloor()) {
            if (!moves.includes(state)) {
                this.player.tstance(); // Cambiar a estado normal
            }
        }
    
        // Saltar hacia adelante o hacia atrás (teclas o joystick)
        if ((this.r.isDown && this.u.isDown) || (this.joystick.rightPressed && this.joystick.upPressed)) {
            if (!moves.includes(state)) {
                this.player.tjump(this.player.f); // Salto hacia adelante
            }
        } else if ((this.l.isDown && this.u.isDown) || (this.joystick.leftPressed && this.joystick.upPressed)) {
            if (!moves.includes(state)) {
                this.player.tjump(this.player.b); // Salto hacia atrás
            }
        }
    
        // Control de agacharse (teclas o joystick)
        else if (this.d.isDown || this.joystick.downPressed) {
            if (!moves.includes(state)) {
                this.player.tcrouch(''); // Agacharse
            }
        }
    
        // Control para detenerse de agacharse si se mueve hacia otra dirección (right, left, up)
        else if ((this.joystick.upPressed) || (this.joystick.rightPressed) || (this.joystick.leftPressed)) {
            if (state === 'crouch') {
                this.player.tstance(); // Volver a estado de pie si estaba agachado
            }
        }
    
        // Control de caminar hacia la derecha (teclas o joystick)
        else if (this.r.isDown || this.joystick.rightPressed) {
            if (!moves.includes(state)) {
                this.player.twalk(this.player.f); // Caminar hacia adelante
            }
        }
    
        // Control de caminar hacia la izquierda (teclas o joystick)
        else if (this.l.isDown || this.joystick.leftPressed) {
            if (!moves.includes(state)) {
                this.player.twalk(this.player.b); // Caminar hacia atrás
            }
        }
    
        // Control de salto (teclas o joystick)
        else if (this.u.isDown || this.joystick.upPressed) {
            if (!moves.includes(state)) {
                this.player.tjump(''); // Salto vertical
            }
        }
    }
    ,
    controlAttack: function () {
        var state = this.player.state;
        var moves = ['attk', 'spattk', 'crattk', 'tjattk'];
    
        // Verificar si no se están presionando botones de ataque o de dirección
       
    
        // Ataques agachados
        if (state === 'crouch') {
            if (this.lp.isDown || this.touchButtons.lpButton) {
                this.player.tcrattk('clp');
                
            } else if (this.lk.isDown || this.touchButtons.lkButton) {
                this.player.tcrattk('clk');
            } else if (this.mp.isDown || this.touchButtons.mpButton) {
                this.player.tcrattk('cmp');
            } else if (this.mk.isDown || this.touchButtons.mkButton) {
                this.player.tcrattk('cmk');
            } else if (this.hp.isDown || this.touchButtons.hpButton) {
                this.player.tcrattk('chp');
            } else if (this.hk.isDown || this.touchButtons.hkButton) {
                this.player.tcrattk('chk');
            }
        } 
        // Ataques de pie
        else if (state === 'stance' ||state === 'walk') {
            if (this.lp.isDown || this.touchButtons.lpButton) {
                this.player.tattk('slp');
            } else if (this.lk.isDown || this.touchButtons.lkButton) {
                this.player.tattk('slk');
            } else if (this.mp.isDown || this.touchButtons.mpButton) {
                this.player.tattk('smp');
            } else if (this.mk.isDown || this.touchButtons.mkButton) {
                this.player.tattk('smk');
            } else if (this.hp.isDown || this.touchButtons.hpButton) {
                this.player.tattk('shp');
            } else if (this.hk.isDown || this.touchButtons.hkButton) {
                this.player.tattk('shk');
            }
        } 
        // Ataques en salto
        else {
            if (this.lp.isDown || this.touchButtons.lpButton) {
                this.player.tjattk('jlp');
            } else if (this.lk.isDown || this.touchButtons.lkButton) {
                this.player.tjattk('jlk');
            } else if (this.mp.isDown || this.touchButtons.mpButton) {
                this.player.tjattk('jmp');
            } else if (this.mk.isDown || this.touchButtons.mkButton) {
                this.player.tjattk('jmk');
            } else if (this.hp.isDown || this.touchButtons.hpButton) {
                this.player.tjattk('jhp');
            } else if (this.hk.isDown || this.touchButtons.hkButton) {
                this.player.tjattk('jhk');
            }
        }
    },
    
    controlInputs: function () {
        this.scene.input.keyboard.on('keycombomatch', function (event) {
            if (this['dash' + this.player.f].matched) {
                this.player.tdash('f');
            }
            if (this['dash' + this.player.b].matched) {
                this.player.tdash('b');
            }
            if (this['lfb' + this.player.f].matched) {
                this.player.tspattk('fbf', 'l');
            }
            if (this['mfb' + this.player.f].matched) {
                this.player.tspattk('fbf', 'm');
            }
            if (this['hfb' + this.player.f].matched) {
                this.player.tspattk('fbf', 'h');
            }
            if (this['ltat' + this.player.f].matched) {
                this.player.tspattk('tatf', 'l');
            }
            if (this['mtat' + this.player.f].matched) {
                this.player.tspattk('tatf', 'm');
            }
            if (this['htat' + this.player.f].matched) {
                this.player.tspattk('tatf', 'h');
            }
            if (this['ldp' + this.player.f].matched) {
                this.player.tspattk('dpf', 'l');
            }
            if (this['mdp' + this.player.f].matched) {
                this.player.tspattk('dpf', 'm');
            }
            if (this['hdp' + this.player.f].matched) {
                this.player.tspattk('dpf', 'h');
            }
            if (this['ca' + this.player.f].matched) {
                this.player.tfrattk('ca1');
            }
            if (this.joystick.upPressed) {
                if (this.joystick.rightPressed) {
                    this.player.tjump(this.player.f); // Saltar hacia adelante
                } else if (this.joystick.leftPressed) {
                    this.player.tjump(this.player.b); // Saltar hacia atrás
                }
            }
        }, this);
    }
    
});
export { Input, VirtualJoystick, TouchButtons };
export default Input;
