// 1. Bilangan Cacah Logic
function hitungCacah() {
    let a = parseFloat(document.getElementById('cacah1').value);
    let b = parseFloat(document.getElementById('cacah2').value);
    let op = document.getElementById('cacahOp').value;
    let resContainer = document.getElementById('hasilCacah');

    if (isNaN(a) || isNaN(b)) {
        resContainer.innerHTML = "Harap masukkan angka yang valid!";
        return;
    }

    let hasil = 0;
    if (op === '+') hasil = a + b;
    else if (op === '-') hasil = a - b;
    else if (op === '*') hasil = a * b;
    else if (op === '/') {
        if (b === 0) {
            resContainer.innerHTML = "Kesalahan: Pembagian dengan nol!";
            return;
        }
        hasil = a / b;
    }
    resContainer.innerHTML = `Hasil: ${a}${op === '*' ? '×' : op === '/' ? '÷' : op} ${b} = <strong>${hasil}</strong>`;
}

// 2. FPB & KPK Logic
function fpb(a, b) {
    return b === 0 ? a : fpb(b, a % b);
}

function kpk(a, b) {
    return (a * b) / fpb(a, b);
}

function hitungFPBKPK() {
    let a = parseInt(document.getElementById('valA').value);
    let b = parseInt(document.getElementById('valB').value);
    let resContainer = document.getElementById('hasilFpbKpk');

    if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) {
        resContainer.innerHTML = "Masukkan bilangan bulat positif yang valid!";
        return;
    }

    let hasilFpb = fpb(a, b);
    let hasilKpk = kpk(a, b);

    resContainer.innerHTML = `FPB dari ${a} dan${b} adalah <strong>${hasilFpb}</strong> <br> KPK dari${a} dan ${b} adalah <strong>${hasilKpk}</strong>`;
}

// 3. Pecahan Logic
function hitungPecahan() {
    let p1 = parseInt(document.getElementById('p1').value);
    let p2 = parseInt(document.getElementById('p2').value);
    let p3 = parseInt(document.getElementById('p3').value);
    let p4 = parseInt(document.getElementById('p4').value);
    let resContainer = document.getElementById('hasilPecahan');

    if (isNaN(p1) || isNaN(p2) || isNaN(p3) || isNaN(p4) || p2 === 0 || p4 === 0) {
        resContainer.innerHTML = "Penyebut tidak boleh nol dan semua field harus diisi!";
        return;
    }

    // Penjumlahan pecahan: (p1/p2) + (p3/p4) = (p1*p4 + p3*p2) / (p2*p4)
    let pembilangBaru = (p1 * p4) + (p3 * p2);
    let penyebutBaru = p2 * p4;

    // Menyederhanakan pecahan
    let pembagiFpb = fpb(Math.abs(pembilangBaru), penyebutBaru);
    let pembilangSederhana = pembilangBaru / pembagiFpb;
    let penyebutSederhana = penyebutBaru / pembagiFpb;

    resContainer.innerHTML = `Hasil: <sup>${pembilangBaru}</sup>/<sub>${penyebutBaru}</sub> disederhanakan menjadi <strong><sup>${pembilangSederhana}</sup>/<sub>${penyebutSederhana}</sub></strong>`;
}

// 4. Rumus Luas & Keliling Bangun Datar
const shapeCalculatorEl = document.getElementById('shapeCalculator');

function pilihBangun(jenis) {
    // Ubah status tombol aktif
    document.querySelectorAll('.shape-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    if (jenis === 'persegi') {
        shapeCalculatorEl.innerHTML = `
            <h3>Kalkulator Persegi</h3>
            <p>Rumus: Luas = s × s | Keliling = 4 × s</p>
            <div class="input-group">
                <input type="number" id="sisiPersegi" placeholder="Sisi (s)">
                <button onclick="hitungPersegi()">Hitung</button>
            </div>
            <div class="result" id="hasilPersegi">Hasil: -</div>
        `;
    } else if (jenis === 'panjang') {
        shapeCalculatorEl.innerHTML = `
            <h3>Kalkulator Persegi Panjang</h3>
            <p>Rumus: Luas = p × l | Keliling = 2 × (p + l)</p>
            <div class="input-group">
                <input type="number" id="panjangPP" placeholder="Panjang (p)">
                <input type="number" id="lebarPP" placeholder="Lebar (l)">
                <button onclick="hitungPP()">Hitung</button>
            </div>
            <div class="result" id="hasilPP">Hasil: -</div>
        `;
    } else if (jenis === 'segitiga') {
        shapeCalculatorEl.innerHTML = `
            <h3>Kalkulator Segitiga (Siku-siku/Umum)</h3>
            <p>Rumus Luas = ½ × alas × tinggi</p>
            <div class="input-group">
                <input type="number" id="alasSegitiga" placeholder="Alas">
                <input type="number" id="tinggiSegitiga" placeholder="Tinggi">
                <button onclick="hitungSegitiga()">Hitung Luas</button>
            </div>
            <div class="result" id="hasilSegitiga">Hasil: -</div>
        `;
    } else if (jenis === 'lingkaran') {
        shapeCalculatorEl.innerHTML = `
            <h3>Kalkulator Lingkaran</h3>
            <p>Rumus: Luas = π × r² | Keliling = 2 × π × r</p>
            <div class="input-group">
                <input type="number" id="jariJari" placeholder="Jari-jari (r)">
                <button onclick="hitungLingkaran()">Hitung</button>
            </div>
            <div class="result" id="hasilLingkaran">Hasil: -</div>
        `;
    }
}

// Inisialisasi default saat pertama kali buka
pilihBangun('persegi');

function hitungPersegi() {
    let s = parseFloat(document.getElementById('sisiPersegi').value);
    if (isNaN(s)) return;
    let luas = s * s;
    let keliling = 4 * s;
    document.getElementById('hasilPersegi').innerHTML = `Luas = ${luas} \vert{} Keliling =${keliling}`;
}

function hitungPP() {
    let p = parseFloat(document.getElementById('panjangPP').value);
    let l = parseFloat(document.getElementById('lebarPP').value);
    if (isNaN(p) || isNaN(l)) return;
    let luas = p * l;
    let keliling = 2 * (p + l);
    document.getElementById('hasilPP').innerHTML = `Luas = ${luas} \vert{} Keliling =${keliling}`;
}

function hitungSegitiga() {
    let a = parseFloat(document.getElementById('alasSegitiga').value);
    let t = parseFloat(document.getElementById('tinggiSegitiga').value);
    if (isNaN(a) || isNaN(t)) return;
    let luas = 0.5 * a * t;
    document.getElementById('hasilSegitiga').innerHTML = `Luas = ${luas}`;
}

function hitungLingkaran() {
    let r = parseFloat(document.getElementById('jariJari').value);
    if (isNaN(r)) return;
    let phi = r % 7 === 0 ? 22 / 7 : 3.14;
    let luas = phi * r * r;
    let keliling = 2 * phi * r;
    document.getElementById('hasilLingkaran').innerHTML = `Luas = ${luas.toFixed(2)} \vert{} Keliling =${keliling.toFixed(2)}`;
}
