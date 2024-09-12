// app.component.ts
import { DeclareFunctionStmt } from '@angular/compiler';
import { Component, ViewChild, ElementRef, inject } from '@angular/core';
import Tesseract from 'tesseract.js';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  selectedImage: string | ArrayBuffer | null | undefined = null;
  ocrResult: string = '';
  list: string[] = [];

  script = '';

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  triggerFileInput() {
    this.fileInput.nativeElement.click(); // Dispara o clique no input escondido
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.selectedImage = e.target?.result; // Carrega a imagem selecionada
      };
      reader.readAsDataURL(file);

      // Processar a imagem com o Tesseract.js
      this.runTesseract(file);
    }
  }

  onPaste(event: ClipboardEvent): void {
    const clipboardItems = event.clipboardData?.items;

    if (clipboardItems) {
      // Converte o DataTransferItemList em um array
      const itemsArray = Array.from(clipboardItems);

      // Percorre os itens da área de transferência
      for (let item of itemsArray) {
        if (item.type.startsWith('image/')) {
          // Se for uma imagem, lê o arquivo
          const file = item.getAsFile();

          if (file) {
            const reader = new FileReader();
            
            // Quando a leitura estiver completa, define o src da imagem
            reader.onload = (e: any) => {
              this.selectedImage = e.target.result;
            };

            // Lê a imagem como URL
            reader.readAsDataURL(file);

            this.runTesseract(file);
          }
        }
      }}
    }

  runTesseract(file: File) {
    Tesseract.recognize(
      file,
      'eng', // idioma
      {
        logger: (info: any) => console.log(info), // Logs de progresso
      }
    )
      .then((result: { data: { text: string } }) => {
        this.ocrResult = result.data.text.replace(/\b[Aa\n]\s+/g, '');
        this.ocrResult = this.ocrResult.replace(/[^a-zA-Z0-9\s]/g, '');
        this.ocrResult = this.ocrResult.replace(/\n+/g, '');
        this.ocrResult = this.ocrResult.replace(/\s+/g, ' ');

        this.list = this.ocrResult.split(' ');

        this.script = getScript(
          new Player(
            this.list[2],
            this.list[4],
            this.list[6],
            this.list[8],
            this.list[10],
            this.list[12],
            this.list[14],
            this.list[17],
            this.list[19],
            this.list[21],
            this.list[24],
            this.list[26],
            this.list[29],
            this.list[32],
            this.list[34],
            this.list[36],
            this.list[38],
            this.list[40],
            this.list[42],
            this.list[44],
            this.list[47],
            this.list[49],
            this.list[51],
            this.list[53],
            this.list[55],
            this.list[58],
            this.list[60],
            this.list[62],
            this.list[64]
          )
        );
      })
      .catch((error: any) => {
        console.error('Erro no OCR:', error);
      });
  }

  downloadTxtFile(): void {
    const blob = new Blob([this.script], { type: 'text/plain' });

    // Cria um link de download
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'arquivo.ahk';  // Nome do arquivo
    document.body.appendChild(a);
    a.click();
    
    // Remove o link após o download
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }


  copiarTexto(): void {
    navigator.clipboard.writeText(this.script).then(() => {
      console.log('Texto copiado para a área de transferência com sucesso!');
    }).catch(err => {
      console.error('Falha ao copiar o texto: ', err);
    });
  }
}

function getScript(player: Player): string {
  return `^1::{
  SendText "${player.crossing}"
  SendText "\`t"
  SendText "${player.finishing}"
  SendText "\`t"
  SendText "${player.headingAcc}"
  SendText "\`t"
  SendText "${player.shortPass}"
  SendText "\`t"
  SendText "${player.volleys}"
  SendText "\`t"
  SendText "${player.dribbling}"
  SendText "\`t"
  SendText "${player.curve}"
  SendText "\`t"
  SendText "${player.fkAcc}"
  SendText "\`t"
  SendText "${player.longPass}"
  SendText "\`t"
  SendText "${player.ballControl}"
  SendText "\`t"
  SendText "${player.acceleration}"
  SendText "\`t"
  SendText "${player.sprintSpeed}"
  SendText "\`t"
  SendText "${player.agility}"
  SendText "\`t"
  SendText "${player.reactions}"
  SendText "\`t"
  SendText "${player.balance}"
  SendText "\`t"
  SendText "${player.shotPower}"
  SendText "\`t"
  SendText "${player.jumping}"
  SendText "\`t"
  SendText "${player.stamina}"
  SendText "\`t"
  SendText "${player.strength}"
  SendText "\`t"
  SendText "${player.longShots}"
  SendText "\`t"
  SendText "${player.aggression}"
  SendText "\`t"
  SendText "${player.interceptions}"
  SendText "\`t"
  SendText "${player.attPosition}"
  SendText "\`t"
  SendText "${player.vision}"
  SendText "\`t"
  SendText "${player.penalties}"
  SendText "\`t"
  SendText "${player.composure}"
  SendText "\`t"
  SendText "${player.defAware}"
  SendText "\`t"
  SendText "${player.standTackle}"
  SendText "\`t"
  SendText "${player.slideTackle}"
  SendText "\`t"
}`;
}

class Player {
  sprintSpeed: number;
  finishing: number;
  vision: number;
  agility: number;
  interceptions: number;
  jumping: number;
  acceleration: number;
  attPosition: number;
  crossing: number;
  balance: number;
  headingAcc: number;
  stamina: number;
  shotPower: number;
  fkAcc: number;
  reactions: number;
  defAware: number;
  strength: number;
  longShots: number;
  longPass: number;
  composure: number;
  standTackle: number;
  aggression: number;
  penalties: number;
  shortPass: number;
  ballControl: number;
  slideTackle: number;
  volleys: number;
  curve: number;
  dribbling: number;

  constructor(
    sprintSpeed: string,
    finishing: string,
    vision: string,
    agility: string,
    interceptions: string,
    jumping: string,
    acceleration: string,
    attPosition: string,
    crossing: string,
    balance: string,
    headingAcc: string,
    stamina: string,
    shotPower: string,
    fkAcc: string,
    reactions: string,
    defAware: string,
    strength: string,
    longShots: string,
    longPass: string,
    composure: string,
    standTackle: string,
    aggression: string,
    penalties: string,
    shortPass: string,
    ballControl: string,
    slideTackle: string,
    volleys: string,
    curve: string,
    dribbling: string
  ) {
    this.sprintSpeed = parseInt(sprintSpeed);
    this.finishing = parseInt(finishing);
    this.vision = parseInt(vision);
    this.agility = parseInt(agility);
    this.interceptions = parseInt(interceptions);
    this.jumping = parseInt(jumping);
    this.acceleration = parseInt(acceleration);
    this.attPosition = parseInt(attPosition);
    this.crossing = parseInt(crossing);
    this.balance = parseInt(balance);
    this.headingAcc = parseInt(headingAcc);
    this.stamina = parseInt(stamina);
    this.shotPower = parseInt(shotPower);
    this.fkAcc = parseInt(fkAcc);
    this.reactions = parseInt(reactions);
    this.defAware = parseInt(defAware);
    this.strength = parseInt(strength);
    this.longShots = parseInt(longShots);
    this.longPass = parseInt(longPass);
    this.composure = parseInt(composure);
    this.standTackle = parseInt(standTackle);
    this.aggression = parseInt(aggression);
    this.penalties = parseInt(penalties);
    this.shortPass = parseInt(shortPass);
    this.ballControl = parseInt(ballControl);
    this.slideTackle = parseInt(slideTackle);
    this.volleys = parseInt(volleys);
    this.curve = parseInt(curve);
    this.dribbling = parseInt(dribbling);
  }
}
