export default class Skin {
    // Constructor que recibe como parámetro data que contiene los datos de los campeones que obtenemos desde la API
    constructor(data) {
        this.id = data.id;
        this.num = data.num;    
        this.name = data.name;
        this.chromas = data.chromas;
    }
}