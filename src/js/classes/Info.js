// Exportamos por defecto la clase Info
export default class Info {
    // Constructor que recibe como parámetro data que contiene información de los campeones que obtenemos desde la API
    constructor(data) {
        this.attack = data.attack;
        this.defense = data.defense;    
        this.magic = data.magic;
        this.difficulty = data.difficulty;
    }
}