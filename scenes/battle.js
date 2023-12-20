import { makeDialogBox } from "../utils/ui.js";

export function makeBattle(p) {
  return {
    p,
    dialogBox: makeDialogBox(p, 0, 288),
    states: {
      default: "default",
      introNpc: "intro-npc",
      introNpcPokemon: "intro-npc-pokemon",
      introPlayerPokemon: "intro-player-pokemon",
      playerTurn: "player-turn",
      npcTurn: "npc-turn",
      battleEnd: "battle-end",
    },
    currentState: "default",
    npc: {
      x: 350,
      y: 20,
      spriteRef: null,
    },
    venusaur: {
      finalX: 310,
      x: 600,
      y: 20,
      spriteRef: null,
    },
    blastoise: {
      finalX: 20,
      x: -170,
      y: 128,
      spriteRef: null,
    },
    load() {
      this.battleBackgroundImage = this.p.loadImage(
        "assets/battle-background.png"
      );
      this.npc.spriteRef = this.p.loadImage("assets/GENTLEMAN.png");
      this.venusaur.spriteRef = this.p.loadImage("assets/VENUSAUR.png");
      this.blastoise.spriteRef = this.p.loadImage("assets/BLASTOISE.png");
      this.dialogBox.load();
    },
    setup() {
      this.dialogBox.displayText("Mark the gentleman wants to battle!", () => {
        setTimeout(() => {
          this.currentState = this.states.introNpc;
          this.dialogBox.clearText();
          this.dialogBox.displayText("He sends out a Venusaur!", () => {
            this.currentState = this.states.introNpcPokemon;
            setTimeout(() => {
              this.dialogBox.clearText();
              this.dialogBox.displayText("Go! BLASTOISE !", () => {
                this.currentState = this.states.introPlayerPokemon;
                setTimeout(() => {
                  this.dialogBox.clearText();
                  this.dialogBox.displayText(
                    "What will BLASTOISE do ?",
                    () => {}
                  );
                }, 1000);
              });
            }, 1000);
          });
        }, 2000);
      });
      this.dialogBox.setVisibility(true);
    },
    draw() {
      this.p.clear();
      this.p.background(0);
      this.p.image(this.battleBackgroundImage, 0, 0);
      if (this.currentState === this.states.introNpc) {
        this.npc.x += 0.5 * this.p.deltaTime;
      }

      if (
        this.currentState === this.states.introNpcPokemon &&
        this.venusaur.x >= this.venusaur.finalX
      ) {
        this.venusaur.x -= 0.5 * this.p.deltaTime;
      }

      this.p.image(this.venusaur.spriteRef, this.venusaur.x, this.venusaur.y);

      if (
        this.currentState === this.states.introPlayerPokemon &&
        this.blastoise.x <= this.blastoise.finalX
      ) {
        this.blastoise.x += 0.5 * this.p.deltaTime;
      }

      this.p.image(
        this.blastoise.spriteRef,
        this.blastoise.x,
        this.blastoise.y
      );

      if (
        this.currentState === this.states.default ||
        this.currentState === this.states.introNpc
      )
        this.p.image(this.npc.spriteRef, this.npc.x, this.npc.y);
      this.dialogBox.update();
      this.dialogBox.draw();
    },
  };
}
