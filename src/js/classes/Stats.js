// Exportamos por defecto la clase Stats
export default class Stats {
    // Constructor que recibe como parámetro data que contiene las estadísticas de los campeones que obtenemos desde la API
    constructor(data) {
        this.hp = data.hp;
        this.hpperlevel = data.hpperlevel;
        this.mp = data.mp;
        this.mpperlevel = data.mpperlevel;
        this.movespeed = data.movespeed;
        this.armor = data.armor;
        this.armorperlevel = data.armorperlevel;
        this.spellblock = data.spellblock;
        this.spellblockperlevel = data.spellblockperlevel;
        this.attackrange = data.attackrange;
        this.hpregen = data.hpregen;
        this.hpregenperlevel = data.hpregenperlevel;
        this.mpregen = data.mpregen;
        this.mpregenperlevel = data.mpregenperlevel;
        this.crit = data.crit;
        this.critperlevel = data.critperlevel;
        this.attackdamage = data.attackdamage;
        this.attackdamageperlevel = data.attackdamageperlevel;
        this.attackspeedperlevel = data.attackspeedperlevel;
        this.attackspeed = data.attackspeed;
    }
}