// Jalankan kode setelah seluruh halaman HTML dimuat
window.addEventListener('DOMContentLoaded', (event) => {

  // 1. Fitur Welcoming Speech "Hi [Nama]"
  const userNameSpan = document.getElementById('user-name');
  if (userNameSpan) { // Pastikan elemen ada (hanya di index.html)
      // Coba ambil nama dari localStorage jika pernah disimpan
      let visitorName = localStorage.getItem('visitorName');

      if (!visitorName) {
          // Jika belum ada, minta nama pengguna
          visitorName = prompt("Selamat datang! Silakan masukkan nama Anda:");
          if (visitorName === null || visitorName.trim() === "") {
              // Jika pengguna membatalkan atau tidak mengisi, gunakan default
              visitorName = "Tamu";
          } else {
              // Simpan nama ke localStorage untuk kunjungan berikutnya
              localStorage.setItem('visitorName', visitorName);
          }
      }
      // Tampilkan nama di elemen span
      userNameSpan.textContent = visitorName;
  }

  // 2. Fitur Validasi Form "Message Us" & Menampilkan Value
  const messageForm = document.getElementById('message-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');
  const formOutputDiv = document.getElementById('form-output');

  if (messageForm) { // Pastikan form ada (hanya di index.html)
      messageForm.addEventListener('submit', function(event) {
          event.preventDefault(); // Mencegah form mengirim data secara default

          let isValid = true;

          // Reset pesan error sebelumnya
          nameError.textContent = '';
          emailError.textContent = '';
          messageError.textContent = '';
          formOutputDiv.innerHTML = ''; // Kosongkan output sebelumnya

          // Validasi Nama (tidak boleh kosong)
          if (nameInput.value.trim() === '') {
              nameError.textContent = 'Nama tidak boleh kosong.';
              isValid = false;
          }

          // Validasi Email (tidak boleh kosong dan format email dasar)
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Pola regex email sederhana
          if (emailInput.value.trim() === '') {
              emailError.textContent = 'Email tidak boleh kosong.';
              isValid = false;
          } else if (!emailPattern.test(emailInput.value.trim())) {
              emailError.textContent = 'Format email tidak valid.';
              isValid = false;
          }

          // Validasi Pesan (tidak boleh kosong)
          if (messageInput.value.trim() === '') {
              messageError.textContent = 'Pesan tidak boleh kosong.';
              isValid = false;
          }

          // Jika semua valid
          if (isValid) {
              // Tampilkan nilai yang disubmit (sesuai instruksi "show value")
              const submittedName = nameInput.value.trim();
              const submittedEmail = emailInput.value.trim();
              const submittedMessage = messageInput.value.trim();

              formOutputDiv.innerHTML = `
                  <h4>Pesan Terkirim (Simulasi):</h4>
                  <p><strong>Nama:</strong> ${submittedName}</p>
                  <p><strong>Email:</strong> ${submittedEmail}</p>
                  <p><strong>Pesan:</strong> ${submittedMessage}</p>
              `;

              // Anda bisa menambahkan logika pengiriman data ke server di sini (jika diperlukan)
              // Contoh: fetch('/api/messages', { method: 'POST', body: JSON.stringify(...) })

              // Kosongkan form setelah berhasil
              messageForm.reset();

              // Beri notifikasi (opsional)
              alert('Pesan Anda telah "dikirim" (ini hanya simulasi).');

          } else {
               // Jika tidak valid, beri tahu pengguna (opsional, karena error sudah tampil per field)
               // alert('Silakan perbaiki error pada form sebelum mengirim.');
          }
      });
  }

  // 3. Fitur lain bisa ditambahkan di sini jika diperlukan

}); // Akhir dari event listener DOMContentLoaded