class Boat {

    constructor (x, y, largura, altura, posB) {
        
        this.body = Bodies.rectangle(x, y, largura, altura);

        this.largura = largura ;
        this.altura = altura;
        this.image = loadImage("../assets/boat.png");
        World.add(world, this.body);
        this.posB = posB;

    
    }
    display () {
        var pos = this.body.position;
        push ();
            imageMode(CENTER);
            image(this.image, pos.x, pos.y, this.largura, this.altura);
        pop ();
    }
    remove (S) {
       setTimeout (() => {
            World.remove(world,boats[S].body);
            delete boats[S]; 
       },2000 );
       
    }
}
