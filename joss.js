const generateButton = document.getElementById('generateButton');
const closeModalButton = document.getElementById('closeModalButton');
const zoomableContainer = document.querySelector('.zoomable-container');
const zoomableImage = document.querySelector('.zoomable-image');
const generatedImage = document.getElementById('generatedImage');

// Daftar nama file gambar Anda
const imageFiles = ['a29udG9s.jpg', 'bWVtZWs=.jpg', 'Y2VsZWs=.jpg', 'a2V0ZWs=.jpg', 'c2lsaXQ=.jpg','b3dhbGFo.jpg','YmFiaQ==.jpg']; // Gantilah dengan nama-nama file gambar Anda

generateButton.addEventListener('click', function () {
  // Periksa apakah voucher sudah di-generate sebelumnya
  const hasGeneratedVoucher = sessionStorage.getItem('voucherGenerated');
  
  if (!hasGeneratedVoucher) {
    // Jika belum di-generate, lakukan proses peng-generate-an voucher
    showModal();
    
    // Pilih nama file gambar secara acak
    let randomImage;

    // Loop hingga kita menemukan voucher yang belum pernah digunakan
    do {
      randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];
    } while (isVoucherUsed(randomImage));

    // Atur sumber gambar yang dihasilkan
    generatedImage.src = "apa/" + randomImage; // Sesuaikan dengan struktur folder Anda
    
    // Tandai bahwa voucher telah di-generate
    markVoucherAsUsed(randomImage);

    // Tampilkan voucher kepada pengguna
    sessionStorage.setItem('voucherGenerated', 'true');
  } else {
    // Jika voucher sudah di-generate sebelumnya, tampilkan pesan atau lakukan tindakan lain
    alert('Voucher sudah di-generate sebelumnya.');
  }
});

function isVoucherUsed(voucherName) {
  // Mengambil daftar nama gambar yang telah digenerate dari localStorage
  const usedVouchers = JSON.parse(localStorage.getItem('usedVouchers')) || [];

  // Memeriksa apakah voucherName ada dalam daftar
  return usedVouchers.includes(voucherName);
}

function markVoucherAsUsed(voucherName) {
  // Mengambil daftar nama gambar yang telah digenerate dari localStorage
  const usedVouchers = JSON.parse(localStorage.getItem('usedVouchers')) || [];

  // Menambahkan voucherName ke dalam daftar
  usedVouchers.push(voucherName);

  // Menyimpan daftar nama gambar yang telah digenerate kembali ke localStorage
  localStorage.setItem('usedVouchers', JSON.stringify(usedVouchers));
}

closeModalButton.addEventListener('click', function () {
  closeModal();
});

zoomableContainer.addEventListener('click', function () {
  zoomableImage.classList.toggle('zoomed');
});

function showModal() {
  myModal.classList.remove('hidden');
  myModalBackdrop.classList.remove('hidden');
}

function closeModal() {
  myModal.classList.add('hidden');
  myModalBackdrop.classList.add('hidden');
}
