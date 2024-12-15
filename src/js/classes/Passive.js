import Image from "./Image";

export default class Passive {
    // Constructor que recibe como parámetro data que contiene los datos de la pasiva de los campeones que obtenemos desde la API
    constructor(data) {
        this.name = data.name;
        this.description = data.description;
        this.image = new Image(data.image);
    }
}