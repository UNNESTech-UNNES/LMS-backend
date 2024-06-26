"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { v4: uuid } = await import("uuid");
    const { getQuizIdByTitle } = await import("../../libs/seed.js");

    const quiz1 = await getQuizIdByTitle("Quiz Pengenalan Algoritma");
    const quiz2 = await getQuizIdByTitle("Quiz Struktur Data");
    const quiz3 = await getQuizIdByTitle("Quiz Algoritma dalam Pemrograman");
    const quiz4 = await getQuizIdByTitle("Penilaian Algoritma Pemrograman dan Struktur Data");

    const dataSample = [
      {
        id: uuid(),
        quiz_id: quiz1,
        label: "Soal 1",
        question: "Apa itu algoritma?",
        options: ["Urutan langkah-langkah untuk menyelesaikan masalah", "Urutan langkah-langkah untuk membuat program", "Urutan langkah-langkah untuk membuat website", "Urutan langkah-langkah untuk membuat aplikasi"],
        correct_option: "Urutan langkah-langkah untuk menyelesaikan masalah",
        summary: "Algoritma adalah urutan langkah-langkah untuk menyelesaikan masalah",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid(),
        quiz_id: quiz1,
        label: "Soal 2",
        question: "Apa yang dimaksud dengan pseudocode?",
        options: ["Bahasa pemrograman", "Bahasa alami yang digunakan untuk mendeskripsikan algoritma", "Bahasa alami yang digunakan untuk mendeskripsikan program", "Bahasa alami yang digunakan untuk mendeskripsikan website"],
        correct_option: "Bahasa alami yang digunakan untuk mendeskripsikan algoritma",
        summary: "Pseudocode adalah bahasa alami yang digunakan untuk mendeskripsikan algoritma",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid(),
        quiz_id: quiz2,
        label: "Soal 1",
        question: "Apa itu struktur data?",
        options: ["Data yang disimpan dalam komputer", "Data yang disimpan dalam program", "Data yang disimpan dalam website", "Data yang disimpan dalam aplikasi"],
        correct_option: "Data yang disimpan dalam komputer",
        summary: "Struktur data adalah data yang disimpan dalam komputer",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid(),
        quiz_id: quiz2,
        label: "Soal 2",
        question: "Apa yang dimaksud dengan linked list?",
        options: [
          "Struktur data yang terdiri dari node yang saling terhubung",
          "Struktur data yang terdiri dari node yang tidak saling terhubung",
          "Struktur data yang terdiri dari node yang terhubung secara acak",
          "Struktur data yang terdiri dari node yang terhubung secara berurutan",
        ],
        correct_option: "Struktur data yang terdiri dari node yang saling terhubung",
        summary: "Linked list adalah struktur data yang terdiri dari node yang saling terhubung",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid(),
        quiz_id: quiz3,
        label: "Soal 1",
        question: "Apa itu algoritma dalam pemrograman?",
        options: ["Urutan langkah-langkah untuk menyelesaikan masalah", "Urutan langkah-langkah untuk membuat program", "Urutan langkah-langkah untuk membuat website", "Urutan langkah-langkah untuk membuat aplikasi"],
        correct_option: "Urutan langkah-langkah untuk membuat program",
        summary: "Algoritma dalam pemrograman adalah urutan langkah-langkah untuk membuat program",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid(),
        quiz_id: quiz3,
        label: "Soal 2",
        question: "Apa yang dimaksud dengan flowchart?",
        options: [
          "Diagram yang digunakan untuk mendeskripsikan algoritma",
          "Diagram yang digunakan untuk mendeskripsikan program",
          "Diagram yang digunakan untuk mendeskripsikan website",
          "Diagram yang digunakan untuk mendeskripsikan aplikasi",
        ],
        correct_option: "Diagram yang digunakan untuk mendeskripsikan algoritma",
        summary: "Flowchart adalah diagram yang digunakan untuk mendeskripsikan algoritma",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid(),
        quiz_id: quiz4,
        label: "Soal 1",
        question: "Apa itu algoritma dalam pemrograman?",
        options: ["Urutan langkah-langkah untuk menyelesaikan masalah", "Urutan langkah-langkah untuk membuat program", "Urutan langkah-langkah untuk membuat website", "Urutan langkah-langkah untuk membuat aplikasi"],
        correct_option: "Urutan langkah-langkah untuk membuat program",
        summary: "Algoritma dalam pemrograman adalah urutan langkah-langkah untuk membuat program",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid(),
        quiz_id: quiz4,
        label: "Soal 2",
        question: "Apa yang dimaksud dengan flowchart?",
        options: [
          "Diagram yang digunakan untuk mendeskripsikan algoritma",
          "Diagram yang digunakan untuk mendeskripsikan program",
          "Diagram yang digunakan untuk mendeskripsikan website",
          "Diagram yang digunakan untuk mendeskripsikan aplikasi",
        ],
        correct_option: "Diagram yang digunakan untuk mendeskripsikan algoritma",
        summary: "Flowchart adalah diagram yang digunakan untuk mendeskripsikan algoritma",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid(),
        quiz_id: quiz4,
        label: "Soal 3",
        question: "Sebutkan 3 jenis struktur data!",
        options: ["Array, linked list, stack", "Array, linked list, queue", "Array, linked list, tree", "Array, linked list, graph"],
        correct_option: "Array, linked list, stack",
        summary: "Jenis struktur data yang ada adalah array, linked list, dan stack",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid(),
        quiz_id: quiz4,
        label: "Soal 4",
        question: "Apa perbedaan stack dan queue?",
        options: [
          "Stack adalah struktur data yang menggunakan prinsip LIFO, sedangkan queue adalah struktur data yang menggunakan prinsip FIFO",
          "Stack adalah struktur data yang menggunakan prinsip FIFO, sedangkan queue adalah struktur data yang menggunakan prinsip LIFO",
          "Stack adalah struktur data yang menggunakan prinsip LIFO, sedangkan queue adalah struktur data yang menggunakan prinsip LIFO",
          "Stack adalah struktur data yang menggunakan prinsip FIFO, sedangkan queue adalah struktur data yang menggunakan prinsip FIFO",
        ],
        correct_option: "Stack adalah struktur data yang menggunakan prinsip LIFO, sedangkan queue adalah struktur data yang menggunakan prinsip FIFO",
        summary: "Perbedaan stack dan queue adalah stack menggunakan prinsip LIFO (Last In First Out), sedangkan queue menggunakan prinsip FIFO (First In First Out)",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid(),
        quiz_id: quiz4,
        label: "Soal 5",
        question: "Apa itu binary tree?",
        options: [
          "Struktur data yang terdiri dari node yang saling terhubung",
          "Struktur data yang terdiri dari node yang tidak saling terhubung",
          "Struktur data yang terdiri dari node yang terhubung secara acak",
          "Struktur data yang terdiri dari node yang terhubung secara berurutan",
        ],
        correct_option: "Struktur data yang terdiri dari node yang terhubung secara berurutan",
        summary: "Binary tree adalah struktur data yang terdiri dari node yang terhubung secara berurutan",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid(),
        quiz_id: quiz4,
        label: "Soal 6",
        question: "Berikut ini adalah contoh dari struktur data yang terdiri dari node yang saling terhubung, kecuali...",
        options: ["Linked list", "Stack", "Queue", "Tree"],
        correct_option: "Tree",
        summary: "Tree bukanlah contoh dari struktur data yang terdiri dari node yang saling terhubung",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid(),
        quiz_id: quiz4,
        label: "Soal 7",
        question: "Manakah kode program berikut yang menerapkan rekursif?",
        options: [
          "function factorial(n) { return n === 0 ? 1 : n * factorial(n - 1); }",
          "function factorial(n) { return n === 0 ? 1 : n * factorial(n + 1); }",
          "function factorial(n) { return n === 0 ? 1 : n * factorial(n); }",
          "function factorial(n) { return n === 0 ? 1 : n * factorial(n); }",
        ],
        correct_option: "function factorial(n) { return n === 0 ? 1 : n * factorial(n - 1); }",
        summary: "Kode program pertama adalah kode program yang menerapkan rekursif",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid(),
        quiz_id: quiz4,
        label: "Soal 8",
        question: `Perhatikan kode program berikut!
        
        function fibonacci(n) {
          if (n <= 1) return n;
          return fibonacci(n - 1) + fibonacci(n - 2);
        }
        
        Berapakah hasil dari fibonacci(5)?`,
        options: ["5", "8", "13", "21"],
        correct_option: "5",
        summary: "Hasil dari fibonacci(5) adalah 5",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid(),
        quiz_id: quiz4,
        label: "Soal 9",
        question: `Perhatikan kode program berikut!
        
        function gcd(a, b) {
          if (b === 0) return a;
          return gcd(b, a % b);
        }
        
        Berapakah hasil dari gcd(24, 36)?`,
        options: ["12", "24", "36", "48"],
        correct_option: "12",
        summary: "Hasil dari gcd(24, 36) adalah 12",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid(),
        quiz_id: quiz4,
        label: "Soal 10",
        question: `Perhatikan kode program berikut!
        
        function power(base, exponent) {
          if (exponent === 0) return 1;
          return base * power(base, exponent - 1);
        }
        
        Berapakah hasil dari power(2, 3)?`,
        options: ["6", "8", "16", "32"],
        correct_option: "8",
        summary: "Hasil dari power(2, 3) adalah 8",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert("Quiz_questions", dataSample, {});
  },

  async down(queryInterface, Sequelize) {
    // @ts-ignore
    await queryInterface.bulkDelete("Quiz_questions", null, {});
  },
};
