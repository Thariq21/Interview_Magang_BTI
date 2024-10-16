document.querySelector(".hitung").addEventListener("click", function (e) {
  const nilai = document.getElementById("nilai").value.split(",").map(Number);
  const total = parseInt(document.getElementById("total").value);
  hitungKombinasi(nilai, total);
});

function hitungKombinasi(nilai, total) {
  let hasil = "SOAL\n\nArray\n(\n";

  nilai.forEach((n, index) => {
      hasil += `    [Pertanyaan ${index + 1}] => ${n}\n`;
  });
  hasil += ")\n\n";

  hasil += `dengan Nilai Total Soal (T) = ${total} ?\n\n`;
  hasil += "JAWABAN\n\n";

  let kombinasi = [];
  let jumlahKombinasi = 0;

  if (!validasiInput(nilai, total)) return;

  function validasiInput(nilai, total) {
      if (total < 0 || isNaN(total)) {
          alert("Total tidak boleh kurang dari 0 dan tidak boleh kosong!");
          return false;
      }
      if (nilai.length === 0 || nilai.length > 10) {
          alert("Nilai tidak boleh kosong dan tidak boleh lebih dari 10!");
          return false;
      }

      for (let i = 0; i < nilai.length; i++) {
          if (isNaN(nilai[i])) {
              alert("Nilai harus berupa angka!");
              return false;
          }
          if (nilai[i] < 0) {
              alert("Nilai tidak boleh negatif!");
              return false;
          }
      }
      return true;
  }

  function cariKombinasi(arr, target, index, current) {
      if (target === 0) {
          kombinasi.push([...current]);
          jumlahKombinasi++;
          return;
      }

      if (target < 0 || index === arr.length) {
          return;
      }

      current.push(arr[index]);
      cariKombinasi(arr, target - arr[index], index + 1, current);

      current.pop();
      cariKombinasi(arr, target, index + 1, current);
  }

  cariKombinasi(nilai, total, 0, []);

  hasil += `Jumlah semua Kombinasi (K) = ${jumlahKombinasi}\n\n`;
  hasil += "Daftar Kombinasi:\nArray\n(\n";

  kombinasi.forEach((komb, idx) => {
      hasil += `    [${idx}] => Array\n    (\n`;
      komb.forEach((n) => {
          hasil += `        [Pertanyaan ${nilai.indexOf(n) + 1}] => ${n}\n`;
      });
      hasil += "    )\n";
  });

  hasil += ")\n";

  document.getElementById("output").innerHTML = `<pre class="array-output">${hasil}</pre>`;
}
