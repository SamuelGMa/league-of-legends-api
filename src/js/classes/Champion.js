import Image from "./Image";
import Skin from "./Skin";
import Info from "./Info";
import Stats from "./Stats";
import Passive from "./Passive";

// Exportamos por defecto la clase Champion
export default class Champion {

    // Constructor que recibe como parámetro data que contiene los datos de los campeones que obtenemos desde la API
    constructor(data) {
        this.id = data.id;
        this.key = data.key;
        this.name = data.name;    
        this.title = data.title;
        this.image = new Image(data.image);
        this.skins = data.skins.map(skinData => new Skin(skinData));
        this.lore = data.lore;
        this.blurb = data.blurb;       
        this.allyTips = data.allytips;
        this.enemyTips = data.enemytips;
        this.info = new Info(data.info);
        this.tags = data.tags;
        this.partype = data.partype;
        this.stats = new Stats(data.stats);
        this.passive = new Passive(data.passive);
    }
}

