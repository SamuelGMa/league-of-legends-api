// Exportamos por defecto la clase Image
export default class Image {
    // Constructor que recibe como parámetro data que contiene información de la imagen de los campeones que obtenemos desde la API
    constructor(data) {
        this.full = data.full;
        this.sprite = data.sprite;
        this.group = data.group;
        this.x = data.x;
        this.y = data.y;
        this.w = data.w;
        this.h = data.h;
    }
}