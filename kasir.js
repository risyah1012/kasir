let keranjang = [];

// FORMAT RUPIAH
function rupiah(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// TAMBAH KE KERANJANG
function tambahKeranjang() {
    let data = document.getElementById("menu").value.split("|");
    let nama = data[0];
    let harga = parseInt(data[1]);
    let qty = parseInt(document.getElementById("jumlah").value);

    keranjang.push({ nama, harga, qty });

    tampilKeranjang();
}

// TAMPILKAN TABEL KERANJANG
function tampilKeranjang() {
    let tabel = "";
    keranjang.forEach((item, index) => {
        tabel += `
            <tr>
                <td>${item.nama}</td>
                <td>${item.qty}</td>
                <td>Rp${rupiah(item.harga * item.qty)}</td>
                <td><span class="delete-btn" onclick="hapusItem(${index})">X</span></td>
            </tr>
        `;
    });

    document.getElementById("isiKeranjang").innerHTML = tabel;
}

// HAPUS ITEM
function hapusItem(i) {
    keranjang.splice(i, 1);
    tampilKeranjang();
}

// PROSES PEMBAYARAN
function prosesPembayaran() {
    if (keranjang.length === 0) {
        alert("Keranjang masih kosong!");
        return;
    }

    let metode = document.getElementById("metode").value;
    let total = 0;

    keranjang.forEach(item => {
        total += item.harga * item.qty;
    });

    let biaya = 0;
    let ket = "";

    if (metode === "qris") {
        biaya = 1000;
        total += biaya;
        ket = "QRIS (+Rp1.000)";
    } else if (metode === "ewallet") {
        biaya = -2000;
        total += biaya;
        if (total < 0) total = 0;
        ket = "E-Wallet (-Rp2.000)";
    } else {
        ket = "Cash (Tanpa Admin)";
    }

    // STRUK
    let list = "";
    keranjang.forEach(item => {
        list += `${item.nama} x${item.qty} - Rp${rupiah(item.harga * item.qty)}<br>`;
    });

    document.getElementById("struk").innerHTML = `
        <h3>🧾 Struk Pembayaran</h3>
        <hr>
        ${list}
        <hr>
        <p><b>Metode Pembayaran:</b> ${ket}</p>
        <p><b>Biaya Tambahan:</b> Rp${rupiah(biaya)}</p>
        <h3>Total Bayar: Rp${rupiah(total)}</h3>
    `;

    document.getElementById("struk").classList.remove("hide");
    document.getElementById("btnReset").classList.remove("hide");
}

// RESET
function resetTransaksi() {
    keranjang = [];
    tampilKeranjang();
    document.getElementById("struk").classList.add("hide");
    document.getElementById("btnReset").classList.add("hide");
}
