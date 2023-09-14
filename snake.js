const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

document.addEventListener("keydown", tusHareketleri);

let canvasHeight = canvas.clientHeight;
let canvasWidth = canvas.clientWidth;
let x = 10;
let y = 10;
let hareketX = 0;
let hareketY = 0;
let elmaX = 5;
let elmaY = 5;
let konum = 20;
let boyut = 18;
let muzX = 16;
let muzY = 6;
let karpuzX = 4;
let karpuzY = 15;
let mantarX = Math.floor(Math.random() * konum);
let mantarY = Math.floor(Math.random() * konum);
let yilanUzunlugu = 3;
let yilanParcalari = [];
let skor = 0;
let hiz = 7;
let can = 3;
const elmaResmi = new Image();
elmaResmi.src = "elma.png";
const muzResmi = new Image();
muzResmi.src = "muz.png";
const karpuzResmi = new Image();
karpuzResmi.src =  "karpuz.png";
const mantarResmi = new Image();
mantarResmi.src = "mantar.png";

const yilanKuyrukSVG = `
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
<!-- Yılanın kuyruğu -->
<circle cx="50" cy="55" r="45" style="fill:orange;stroke:green;stroke-width:20;" />
</svg>
`;
const yilanKuyrukResmi = new Image();
yilanKuyrukResmi.src = 'data:image/svg+xml,' + encodeURIComponent(yilanKuyrukSVG);
let yilanBasSVG = `
    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
    <!-- Yılanın vücudu -->
  
    <circle cx="50" cy="15" r="75" style="fill:blue;stroke:black;stroke-width:5;" />


    <!-- Gözler -->
    <circle cx="30" cy="30" r="5" style="fill:white;" />
    <circle cx="70" cy="30" r="5" style="fill:white;" />

    <!-- Göz mercekleri -->
    <circle cx="30" cy="30" r="2.5" style="fill:white;" />
    <circle cx="70" cy="30" r="2.5" style="fill:white;" />

    <!-- Ağız -->
    <path d="M 30 70 Q 50 90 70 70" stroke="pink" stroke-width="5" fill="none" />
    </svg>
`;
let yilanBasResmi = new Image();
yilanBasResmi.src = 'data:image/svg+xml,' + encodeURIComponent(yilanBasSVG);

class YilanParcasi {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

function oyunuCiz() {
    ekraniTemizle();
    yilaniCiz();
    elmayiCiz();
    muzuCiz(); 
    karpuzuCiz(); 
    mantariCiz(); 
    yilanHareketiniGuncelle();
    elmaninKonumunuGuncelle();
    muzunKonumunuGuncelle(); 
    karpuzunKonumunuGuncelle();
    skoruCiz();
    hiziCiz();
    canCiz();
    const sonuc = oyunBittiMi();

    if (sonuc)
        return;

    setTimeout(oyunuCiz, 1000 / hiz);
}

function ekraniTemizle() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}

function yilaniCiz() {
    ctx.fillStyle = "green";
    for (let i of yilanParcalari) {

        ctx.drawImage(yilanKuyrukResmi, i.x * konum, i.y * konum, boyut, boyut);
        ctx.drawImage(muzResmi, muzX * konum, muzY * konum, boyut, boyut); 
    
    }

    yilanParcalari.push(new YilanParcasi(x, y));

    if (yilanParcalari.length > yilanUzunlugu) {
        yilanParcalari.shift();
    }

    ctx.fillStyle = "white";
    ctx.drawImage(yilanBasResmi, x * konum, y * konum, boyut, boyut);
}
function muzuCiz() {
    ctx.drawImage(muzResmi, muzX * konum, muzY * konum, boyut, boyut);
}

function mantariCiz() {
    ctx.drawImage(mantarResmi, mantarX * konum, mantarY * konum, boyut, boyut);
}


function karpuzuCiz() {
    ctx.drawImage(karpuzResmi, karpuzX * konum, karpuzY * konum, boyut, boyut);
}

function elmayiCiz() {
    ctx.fillStyle = "red";
    ctx.drawImage(elmaResmi, elmaX * konum, elmaY * konum, boyut, boyut);
}

function tusHareketleri(e) {
    switch (e.keyCode) {
        case 37: //sol
            if (hareketX === 1) return;
            hareketX = -1;
            hareketY = 0;


            break;
        case 38: //yukarı
            if (hareketY === 1) return;
            hareketY = -1;
            hareketX = 0;
            break;
        case 39: //sağ
            if (hareketX === -1) return;
            hareketX = 1;
            hareketY = 0;
            break;
        case 40: //aşağı
            if (hareketY === -1) return;
            hareketY = 1;
            hareketX = 0;
            break;
    }

}

function yilanHareketiniGuncelle() {
    let sonucX = x + hareketX;
    let sonucY = y + hareketY;

    if (sonucY < 0) {
        sonucY = 19
    } else if (sonucY > 19) {
        sonucY = 0
    }

    if (sonucX < 0) {
        sonucX = 19
    } else if (sonucX > 19) {
        sonucX = 0;
    }

    x = sonucX;
    y = sonucY;
}

function karpuzunKonumunuGuncelle() {
    if (x === karpuzX && y === karpuzY) {
        karpuzX = Math.floor(Math.random() * konum);
        karpuzY = Math.floor(Math.random() * konum);

        let karpuzKonumuMusaitMi = false;
        while (!karpuzKonumuMusaitMi) {
            karpuzKonumuMusaitMi = true;
            for (let parca of yilanParcalari) {
                if (parca.x === karpuzX && parca.y === karpuzY) {
                    karpuzX = Math.floor(Math.random() * konum);
                    karpuzY = Math.floor(Math.random() * konum);
                    karpuzKonumuMusaitMi = false;

                }
            }
        }

        yilanUzunlugu++;
        skor += 10;

        if (yilanUzunlugu % 3 === 0) {
            hiz += 1;
        }
    }
}

function muzunKonumunuGuncelle() {
    if (x === muzX && y === muzY) {
        muzX = Math.floor(Math.random() * konum);
        muzY = Math.floor(Math.random() * konum);

        let muzKonumuMusaitMi = false;
        while (!muzKonumuMusaitMi) {
            muzKonumuMusaitMi = true;
            for (let parca of yilanParcalari) {
                if (parca.x === muzX && parca.y === muzY) {
                    muzX = Math.floor(Math.random() * konum);
                    muzY = Math.floor(Math.random() * konum);
                    muzKonumuMusaitMi = false;
                }
            }
        }

        yilanUzunlugu++;
        skor += 10;

        if (yilanUzunlugu % 3 === 0) {
            hiz += 1;
        }
    }
}


function elmaninKonumunuGuncelle() {
    if (x === elmaX && y === elmaY) {
        elmaX = Math.floor(Math.random() * konum);
        elmaY = Math.floor(Math.random() * konum);
    }


    if (x === muzX && y === muzY) {
        muzX = Math.floor(Math.random() * konum);
        muzY = Math.floor(Math.random() * konum);

        let muzKonumuMusaitMi = false;
        while (!muzKonumuMusaitMi) {
            muzKonumuMusaitMi = true;
            for (let parca of yilanParcalari) {
                if (parca.x === muzX && parca.y === muzY) {
                    muzX = Math.floor(Math.random() * konum);
                    muzY = Math.floor(Math.random() * konum);
                    muzKonumuMusaitMi = false;

                }
            }
        }

        yilanUzunlugu++;
        skor += 10;

        if (yilanUzunlugu % 3 === 0) {
            hiz += 1;
        }
    }
}

function skoruCiz() {
    ctx.fillStyle = "white";
    ctx.font = "15px verdena";
    ctx.fillText(`Skor: ${skor}`, canvasWidth - 60, 25);
}

function hiziCiz() {
    ctx.fillStyle = "white";
    ctx.font = "15px verdena";
    ctx.fillText(`Hız: ${hiz}`, canvasWidth - 108, 25);
}

function canCiz() {
    ctx.fillStyle = "white";
    ctx.font = "15px verdena";
    ctx.fillText(`Can: ${can}`, canvasWidth - 160, 25)
}

function mantariYediMi() {
    if (x === mantarX && y === mantarY) {
        can--;
        if (can === 0) {
            return true; // Oyun bitti
        }
        // Yeni mantar konumunu belirle
        mantarX = Math.floor(Math.random() * konum);
        mantarY = Math.floor(Math.random() * konum);
    }
    return false; // Oyun devam ediyor
}


function oyunBittiMi() {
    let oyunBitti = false;
    if (hareketX === 0 && hareketY === 0) return;

    for (let index in yilanParcalari) {
        let parca = yilanParcalari[index]
        if (parca.x === x && parca.y === y) {
            can--;
            if (can === 0) {
                oyunBitti = true;
                break;
            }

            yilanParcalari.splice(0, index);
            yilanUzunlugu = yilanParcalari.length;
            skor = yilanUzunlugu * 10;
            hiz -= 3;
            break;
        }
    }

    if (x === mantarX && y === mantarY) {
        oyunBitti = mantariYediMi();
    }

    if (oyunBitti) {
        ctx.fillStyle = "white";
        ctx.font = "50px verdena";
        ctx.fillText(`Game Over!`, canvasWidth / 4.5, canvasHeight / 2);
    }

    return oyunBitti;
}



function yeniOyun() {
    mantarX = Math.floor(Math.random() * konum);
    mantarY = Math.floor(Math.random() * konum);
    document.location.reload();
}
oyunuCiz();
