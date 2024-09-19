var mov = [
    { name: 'stance', frame: { start: 2593, end: 2602, frameRate: 12, repeat: -1 } },
    { name: 'walkf', frame: { start: 2604, end: 2618, frameRate: 12, repeat: -1 }, speed: 150 },
    { name: 'walkb', frame: { start: 2620, end: 2632, frameRate: 12, repeat: -1 }, speed: 100 },
    { name: 'jump', frame: { start: 2656, end: 2667, frameRate: 10, repeat: 0 }, speedY: 320 },
    { name: 'jumpf', frame: { start: 2923, end: 2930, frameRate: 8, repeat: -1 }, speedX: 150, speedY: 320 },
    { name: 'jumpb', frame: { start: 2923, end: 2930, frameRate: 10, repeat: -1 }, speedX: 150, speedY: 320 },
    { name: 'dashf', frame: { start: 2704, end: 2709, frameRate: 12, repeat: 0 }, speed: 220, fx: { name: 'ground-dust', x: -80, y: 5 } },
    { name: 'dashb', frame: { start: 2709, end: 2715, frameRate: 12, repeat: 0 }, speed: 160, fx: { name: 'ground-dust', x: -80, y: 5 } },
    { name: 'crouch', frame: { start: 2640, end: 2643, frameRate: 6, repeat: -1 }, speed: 0, hurtbox: { x: 0, y: 20, width: 40, height: 60 } },
    { name: 'blockh', frame: { start: 2682, end: 2690, frameRate: 18, repeat: 0 }, speed: 0, noFrames: 9 },
    { name: 'hith', frame: { start: 2780, end: 2781, frameRate: 18, repeat: 0 }, speed: 0 },
]
var atk = [
    { name: 'slp', frame: { start: 2944, end: 2948, frameRate: 18, repeat: 0 }, speed: 0, hitbox: { fx: { name: 'hitsparks-small', x: -50, y: -20 }, start: 1, active: 2, hits: [3], x: 50, y: -20, width: 50, height: 20, damage: 20, stun: 10, onBlk: 2, onHit: 4, push: 15, atklvl: 'h' } },
    { name: 'smp', frame: { start: 2949, end: 2955, frameRate: 14, repeat: 0 }, speed: 0, hitbox: { fx: { name: 'hitsparks-small', x: -50, y: -20 }, start: 2, active: 3, hits: [5], x: 50, y: -20, width: 60, height: 20, damage: 25, stun: 15, onBlk: 1, onHit: 6, push: 15, atklvl: 'h' } },
    { name: 'shp', frame: { start: 2956, end: 2966, frameRate: 14, repeat: 0 }, speed: 0, hitbox: { fx: { name: 'hitsparks-fireball', x: -50, y: -20 }, start: 3, active: 4, hits: [5], x: 50, y: -30, width: 60, height: 20, damage: 30, stun: 20, onBlk: 1, onHit: 8, push: 10, atklvl: 'h' } },
    { name: 'slk', frame: { start: 3040, end: 3046, frameRate: 18, repeat: 0 }, speed: 0, hitbox: { fx: { name: 'hitsparks-small', x: 20, y: 0 }, start: 1, active: 2, hits: [3], x: 50, y: 25, width: 60, height: 20, damage: 20, stun: 10, onBlk: 1, onHit: 4, push: 10, atklvl: 'h' } },
    { name: 'smk', frame: { start: 3016, end: 3022, frameRate: 12, repeat: 0 }, speed: 0, hitbox: { fx: { name: 'hitsparks-small', x: 20, y: 0 }, start: 3, active: 2, hits: [5], x: 60, y: 0, width: 70, height: 20, damage: 25, stun: 15, onBlk: 1, onHit: 4, push: 10, atklvl: 'h' } },
    { name: 'shk', frame: { start: 3024, end: 3036, frameRate: 16, repeat: 0 }, speed: 0, hitbox: { fx: { name: 'hitsparks-fireball', x: 20, y: -30 }, start: 3, active: 5, hits: [6], x: 50, y: -25, width: 80, height: 30, damage: 30, stun: 20, onBlk: 4, onHit: 10, push: 5, atklvl: 'h' } },
    { name: 'clp', frame: { start: 2944, end: 2948, frameRate: 18, repeat: 0 }, speed: 0, hitbox: { fx: { name: 'hitsparks-small', x: 20, y: -20 }, start: 1, active: 2, hits: [3], x: 50, y: -20, width: 50, height: 20, damage: 20, stun: 10, onBlk: 2, onHit: 4, push: 15, atklvl: 'h' } },
    { name: 'cmp', frame: { start: 2949, end: 2955, frameRate: 14, repeat: 0 }, speed: 0, hitbox: { fx: { name: 'hitsparks-small', x: 20, y: -20 }, start: 2, active: 3, hits: [5], x: 50, y: -20, width: 60, height: 20, damage: 25, stun: 15, onBlk: 1, onHit: 6, push: 15, atklvl: 'h' } },
    { name: 'chp', frame: { start: 2956, end: 2966, frameRate: 14, repeat: 0 }, speed: 0, hitbox: { fx: { name: 'hitsparks-fireball', x: 20, y: -20 }, start: 2, active: 4, hits: [3], x: 50, y: -30, width: 60, height: 20, damage: 30, stun: 20, onBlk: 1, onHit: 8, push: 10, atklvl: 'h' } },
    { name: 'clk', frame: { start: 3040, end: 3046, frameRate: 18, repeat: 0}, speed: 0, hitbox: { fx: { name: 'hitsparks-small', x: 20, y: 0 }, start: 1, active: 2, hits: [3], x: 50, y: 25, width: 60, height: 20, damage: 20, stun: 10, onBlk: 1, onHit: 4, push: 10, atklvl: 'h' } },
    { name: 'cmk', frame: { start: 3016, end: 3022, frameRate: 12, repeat: 0 }, speed: 0, hitbox: { fx: { name: 'hitsparks-small', x: 20, y: 0 }, start: 3, active: 2, hits: [5], x: 60, y: 0, width: 70, height: 20, damage: 25, stun: 15, onBlk: 1, onHit: 4, push: 10, atklvl: 'h' } },
    { name: 'chk', frame: { start: 3024, end: 3036, frameRate: 16, repeat: 0 }, speed: 0, hitbox: { fx: { name: 'hitsparks-fireball', x: 20, y: -30 }, start: 3, active: 5, hits: [6], x: 50, y: -25, width: 80, height: 30, damage: 30, stun: 20, onBlk: 4, onHit: 10, push: 5, atklvl: 'h' } },
    { name: 'jlp', frame: { start: 3152, end: 3158, frameRate: 10, repeat: 0 }, speed: 100, hitbox: { fx: { name: 'hitsparks-small', x: 20, y: -20 }, start: 1, active: 2, hits: [3], x: 50, y: -20, width: 50, height: 20, damage: 20, stun: 10, onBlk: 2, onHit: 4, push: 15, atklvl: 'h' } },
    { name: 'jmp', frame: { start: 3182, end: 3189, frameRate: 10, repeat: 0 }, speed: 100, hitbox: { fx: { name: 'hitsparks-small', x: 20, y: -20 }, start: 2, active: 3, hits: [5], x: 50, y: -30, width: 60, height: 20, damage: 25, stun: 15, onBlk: 1, onHit: 6, push: 15, atklvl: 'h' } },
    { name: 'jhp', frame: { start: 3169, end: 3175, frameRate: 10, repeat: 0 }, speed: 100, hitbox: { fx: { name: 'hitsparks-fireball', x: 20, y: -20 }, start: 2, active: 4, hits: [5], x: 50, y: 0, width: 60, height: 30, damage: 30, stun: 20, onBlk: 1, onHit: 8, push: 10, atklvl: 'h' } },
    { name: 'jlk', frame: { start: 3040, end: 3046, frameRate: 18, repeat: 0 }, speed: 0, hitbox: { fx: { name: 'hitsparks-small', x: 20, y: 0 }, start: 1, active: 2, hits: [3], x: 50, y: 25, width: 60, height: 20, damage: 20, stun: 10, onBlk: 1, onHit: 4, push: 10, atklvl: 'h' } },
    { name: 'jmk', frame: { start: 3016, end: 3022, frameRate: 12, repeat: 0 }, speed: 0, hitbox: { fx: { name: 'hitsparks-small', x: 20, y: 0 }, start: 3, active: 2, hits: [5], x: 60, y: 0, width: 70, height: 20, damage: 25, stun: 15, onBlk: 1, onHit: 4, push: 10, atklvl: 'h' } },
    { name: 'jhk', frame: { start: 3024, end: 3036, frameRate: 16, repeat: 0 }, speed: 0, hitbox: { fx: { name: 'hitsparks-fireball', x: 20, y: -30 }, start: 3, active: 5, hits: [6], x: 50, y: -25, width: 80, height: 30, damage: 30, stun: 20, onBlk: 4, onHit: 10, push: 5, atklvl: 'h' } },
]
var cricarts = [
    { name: 'ca1', frame: { start: 3427, end: 3434, frameRate: 12, repeat: 5 }, fx: { name: 'ground-dust', x: -80, y: 5 }, speed: 0, hitbox: { fx: { name: 'hitsparks-fireball', x: 20, y: -30 }, start: 3, active: 5, hits: [6], x: 50, y: -25, width: 80, height: 30, damage: 35, stun: 20, onBlk: 4, onHit: 10, push: 5, atklvl: 'h' } },
]
var projectiles = [
    { name: 'lfbf', fx: { name: 'hitsparks-fireball', x: 80, y: 0 }, speed: 220, x: 55, y: -15, texture: 'fireballs-white', hitbox: { hits: [5], damage: 35, stun: 50, onBlk: 1, onHit: 4, push: 5, atklvl: 'h' } },
    { name: 'mfbf', fx: { name: 'hitsparks-fireball', x: 80, y: 0 }, speed: 260, x: 55, y: -15, texture: 'fireballs-white', hitbox: { hits: [5], damage: 35, stun: 50, onBlk: 2, onHit: 4, push: 10, atklvl: 'h' } },
    { name: 'hfbf', fx: { name: 'hitsparks-fireball', x: 80, y: 0 }, speed: 300, x: 55, y: -15, texture: 'fireballs-white', hitbox: { hits: [5], damage: 35, stun: 50, onBlk: 4, onHit: 4, push: 12, atklvl: 'h' } }
]
var spmoves = [
    { name: 'lfbf', speed: 0, fx: { name: 'ground-dust', x: -80, y: 5 }, frame: { start: 3264, end: 3275, frameRate: 18, repeat: 0 }, output: projectiles.filter(function(a){ return a.name == 'lfbf'})},
    { name: 'mfbf', speed: 0, fx: { name: 'ground-dust', x: -80, y: 5 }, frame: { start: 3264, end: 3275, frameRate: 14, repeat: 0 }, output: projectiles.filter(function(a){ return a.name == 'mfbf'})},
    { name: 'hfbf', speed: 0, fx: { name: 'ground-dust', x: -80, y: 5 }, frame: { start: 3264, end: 3275, frameRate: 12, repeat: 0 }, output: projectiles.filter(function(a){ return a.name == 'hfbf'})},
    { name: 'ltatf', speed: 100, fx: { name: 'ground-dust', x: -80, y: 5 }, frame: { start: 3292, end: 3306, frameRate: 18, repeat: 0 }, hitbox: { fx: { name: 'hitsparks-small', x: 0, y: 0 }, start: 3, active: 2, hits: [5], x: 60, y: 0, width: 70, height: 20, damage: 35, stun: 15, onBlk: 1, onHit: 4, push: 5, atklvl: 'h' } },
    { name: 'mtatf', speed: 200, fx: { name: 'ground-dust', x: -80, y: 5 }, frame: { start: 3292, end: 3306, frameRate: 14, repeat: 0 }, hitbox: { fx: { name: 'hitsparks-small', x: 0, y: 0 }, start: 4, active: 4, hits: [6,7], x: 60, y: 0, width: 70, height: 20, damage: 35, stun: 15, onBlk: 1, onHit: 4, push: 5, atklvl: 'h' } },
    { name: 'htatf', speed: 300, fx: { name: 'ground-dust', x: -80, y: 5 }, frame: { start: 3292, end: 3306, frameRate: 10, repeat: 0 }, hitbox: { fx: { name: 'hitsparks-small', x: 0, y: 0 }, start: 5, active: 6, hits: [7,8,9], x: 60, y: 0, width: 70, height: 20, damage: 35, stun: 15, onBlk: 1, onHit: 4, push: 5, atklvl: 'h' } },
    { name: 'ldpf', speed: 5, height: 200, fx: { name: 'ground-dust', x: -80, y: 5 }, frame: { start: 3278, end: 3291, frameRate: 20, repeat: 0 }, hitbox: { fx: { name: 'hitsparks-small', x: -40, y: -20 }, start: 3, active: 3, hits: [5], x: 20, y: -20, width: 55, height: 60, damage: 35, stun: 15, onBlk: 1, onHit: 4, push: 5, atklvl: 'h' } },
    { name: 'mdpf', speed: 10, height: 260, fx: { name: 'ground-dust', x: -80, y: 5 }, frame: { start: 3278, end: 3291, frameRate: 16, repeat: 0 }, hitbox: { fx: { name: 'hitsparks-small', x: -20, y: -20 }, start: 4, active: 4, hits: [5], x: 20, y: -20, width: 50, height: 70, damage: 35, stun: 15, onBlk: 1, onHit: 4, push: 5, atklvl: 'h' } },
    { name: 'hdpf', speed: 15, height: 320, fx: { name: 'ground-dust', x: -80, y: 5 }, frame: { start: 3278, end: 3291, frameRate: 12, repeat: 0 }, hitbox: { fx: { name: 'hitsparks-small', x: -20, y: -20 }, start: 5, active: 6, hits: [5,7], x: 20, y: -20, width: 55, height: 80, damage: 35, stun: 15, onBlk: 1, onHit: 4, push: 5, atklvl: 'h' } },
]

var ryu = {
    id: 'p1', name: 'ryu', fullname: 'Ryu Hoshi',
    width: 50, height: 100, health: 1000, stun: 200, power: 200, weight: 80, mov, atk, spmoves, cricarts,
    hurtbox: { x: 0, y: 0, width: 40, height: 100,
    comment: 'Prove yourself' }
}