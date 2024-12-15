// Exportamos por defecto la clase Champion
export default class Spell {
    // Constructor que recibe como parámetro data que contiene los datos de un hechizo de los campeones que obtenemos desde la API
    constructor(data) {
        this.id = data.id;
        this.name = data.name;    
        this.description = data.description;
        this.tooltip = data.tooltip;
        this.image = new Image(data.image);       
    }
}