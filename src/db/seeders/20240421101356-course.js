"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { v4: uuid } = await import("uuid");
    const { getAdminUserId, isTableHasRecords, getCategoryIdByName, generateRandomCourse } = await import("../../libs/seed.js");

    if (await isTableHasRecords("Courses", queryInterface)) return;

    const userAdminId = await getAdminUserId();

    const courses = [
      {
        id: uuid(),
        name: "Computational Thinking",
        price: 0,
        premium: false,
        image: "https://images.unsplash.com/photo-1556740739-887f6717d7e4",
        author_id: userAdminId,
        // instructor_id: [instructorId, secondInstructorId],
        course_category_id: await getCategoryIdByName("Algorithm and Data Structure"),
        description: `Computational Thinking adalah kemampuan untuk memecahkan masalah, sistematis, dan logis. Kemampuan ini sangat penting dalam dunia teknologi, karena dengan computational thinking, kita dapat memecahkan masalah dengan cara yang lebih efisien.

        Bersama mentor terpercaya, kita akan mempelajari computational thinking dari dasar hingga mahir. Mentor akan memberikan berbagai contoh kasus yang sering ditemui dalam dunia nyata dan bagaimana cara memecahkannya dengan computational thinking.

        Kelas ini sangat cocok untuk Anda yang ingin memahami apa itu computational thinking dan bagaimana cara menerapkannya dalam kehidupan sehari-hari. Tidak hanya ditujukan untuk programmer, kelas ini sangat cocok untuk Anda yang ingin meningkatkan kemampuan berpikir logis dan sistematis.

        Yuk segera daftar dan kami tunggu di kelas ya!`,
        target_audience: ["Anda yang ingin memahami poin penting computational thinking", "Anda yang ingin latihan membangun computational thinking", "Anda yang ingin mengembangkan Startup"],
      },
      {
        id: uuid(),
        name: "Pemrograman Dasar dengan C++",
        price: 0,
        premium: false,
        image: "https://images.unsplash.com/photo-1556740739-887f6717d7e4",
        author_id: userAdminId,
        // instructor_id: [instructorId],
        course_category_id: await getCategoryIdByName("Algorithm and Data Structure"),
        description: `Pemrograman Dasar dengan C++ adalah kelas yang akan membimbing Anda memahami dasar-dasar pemrograman menggunakan bahasa pemrograman C++. Bahasa
        pemrograman C++ adalah bahasa pemrograman yang sangat
        populer dan banyak digunakan dalam dunia teknologi.

        Bersama mentor terpercaya, kita akan mempelajari pemrograman dasar dengan C++ dari dasar hingga mahir. Mentor akan memberikan berbagai contoh kasus yang sering ditemui dalam dunia nyata dan bagaimana cara memecahkannya dengan C++.

        Kelas ini sangat cocok untuk Anda yang ingin memahami apa itu pemrograman dasar dengan C++ dan bagaimana cara menerapkannya dalam kehidupan sehari-hari. Tidak hanya ditujukan untuk programmer, kelas ini sangat cocok untuk Anda yang ingin meningkatkan kemampuan berpikir logis dan sistematis.

        Yuk segera daftar dan kami tunggu di kelas ya!`,
        target_audience: ["Anda yang ingin memahami poin penting pemrograman dasar dengan C++", "Anda yang ingin latihan membangun pemrograman dasar dengan C++", "Anda yang ingin mengembangkan Startup"],
      },
      {
        id: uuid(),
        name: "Struktur Data dan Algoritma",
        price: 0,
        premium: false,
        image: "https://images.unsplash.com/photo-1556740739-887f6717d7e4",
        author_id: userAdminId,
        // instructor_id: [instructorId],
        course_category_id: await getCategoryIdByName("Algorithm and Data Structure"),
        description: `Struktur Data dan Algoritma adalah kelas yang akan membimbing Anda memahami dasar-dasar struktur data dan algoritma. Struktur data dan algoritma adalah dasar dari ilmu komputer yang sangat penting untuk dipahami.

        Bersama mentor terpercaya, kita akan mempelajari struktur data dan algoritma dari dasar hingga mahir. Mentor akan memberikan berbagai contoh kasus yang sering ditemui dalam dunia nyata dan bagaimana cara memecahkannya dengan struktur data dan algoritma.

        Kelas ini sangat cocok untuk Anda yang ingin memahami apa itu struktur data dan algoritma dan bagaimana cara menerapkannya dalam kehidupan sehari-hari. Tidak hanya ditujukan untuk programmer, kelas ini sangat cocok untuk Anda yang ingin meningkatkan kemampuan berpikir logis dan sistematis.

        Yuk segera daftar dan kami tunggu di kelas ya!`,
        target_audience: ["Anda yang ingin memahami poin penting struktur data dan algoritma", "Anda yang ingin latihan membangun struktur data dan algoritma", "Anda yang ingin mengembangkan Startup"],
      },
      {
        id: uuid(),
        name: "Pengenalan Sistem Informasi",
        price: 0,
        premium: false,
        image: "https://images.unsplash.com/photo-1556740739-887f6717d7e4",
        author_id: userAdminId,
        // instructor_id: [secondInstructorId],
        course_category_id: await getCategoryIdByName("Sistem Informasi Manajemen"),
        description: `Pengenalan Sistem Informasi adalah kelas yang akan membimbing Anda memahami dasar-dasar sistem informasi. Sistem informasi adalah sistem yang digunakan untuk mengelola informasi dalam suatu organisasi.

        Bersama mentor terpercaya, kita akan mempelajari pengenalan sistem informasi dari dasar hingga mahir. Mentor akan memberikan berbagai contoh kasus yang sering ditemui dalam dunia nyata dan bagaimana cara memecahkannya dengan sistem informasi.

        Kelas ini sangat cocok untuk Anda yang ingin memahami apa itu sistem informasi dan bagaimana cara menerapkannya dalam kehidupan sehari-hari. Tidak hanya ditujukan untuk programmer, kelas ini sangat cocok untuk Anda yang ingin meningkatkan kemampuan berpikir logis dan sistematis.

        Yuk segera daftar dan kami tunggu di kelas ya!`,
        target_audience: ["Anda yang ingin memahami poin penting sistem informasi", "Anda yang ingin latihan membangun sistem informasi", "Anda yang ingin mengembangkan Startup"],
      },
      {
        id: uuid(),
        name: "Merancang Arsitektur Sistem Informasi",
        price: 0,
        premium: false,
        image: "https://images.unsplash.com/photo-1556740739-887f6717d7e4",
        author_id: userAdminId,
        // instructor_id: [secondInstructorId],
        course_category_id: await getCategoryIdByName("Sistem Informasi Manajemen"),
        description: `Merancang Arsitektur Sistem Informasi adalah kelas yang akan membimbing Anda memahami dasar-dasar arsitektur sistem informasi. Arsitektur sistem informasi adalah arsitektur yang digunakan untuk mengelola informasi dalam suatu organisasi.

        Bersama mentor terpercaya, kita akan mempelajari merancang arsitektur sistem informasi dari dasar hingga mahir. Mentor akan memberikan berbagai contoh kasus yang sering ditemui dalam dunia nyata dan bagaimana cara memecahkannya dengan arsitektur sistem informasi.

        Kelas ini sangat cocok untuk Anda yang ingin memahami apa itu arsitektur sistem informasi dan bagaimana cara menerapkannya dalam kehidupan sehari-hari. Tidak hanya ditujukan untuk programmer, kelas ini sangat cocok untuk Anda yang ingin meningkatkan kemampuan berpikir logis dan sistematis.

        Yuk segera daftar dan kami tunggu di kelas ya!`,
        target_audience: ["Anda yang ingin memahami poin penting arsitektur sistem informasi", "Anda yang ingin latihan membangun arsitektur sistem informasi", "Anda yang ingin mengembangkan Startup"],
      },
      {
        id: uuid(),
        name: "Sistem Informasi Manajemen dalam Industri",
        price: 0,
        premium: false,
        image: "https://images.unsplash.com/photo-1556740739-887f6717d7e4",
        author_id: userAdminId,
        // instructor_id: [secondInstructorId],
        course_category_id: await getCategoryIdByName("Sistem Informasi Manajemen"),
        description: `Sistem Informasi Manajemen dalam Industri adalah kelas yang akan membimbing Anda memahami dasar-dasar

        sistem informasi manajemen dalam industri. Sistem informasi manajemen adalah sistem yang digunakan untuk mengelola informasi dalam suatu organisasi.

        Bersama mentor terpercaya, kita akan mempelajari sistem informasi manajemen dalam industri dari dasar hingga mahir. Mentor akan memberikan berbagai contoh kasus yang sering ditemui dalam dunia nyata dan bagaimana cara memecahkannya dengan sistem informasi manajemen dalam industri.

        Kelas ini sangat cocok untuk Anda yang ingin memahami apa itu sistem informasi manajemen dalam industri dan bagaimana cara menerapkannya dalam kehidupan sehari-hari. Tidak hanya ditujukan untuk programmer, kelas ini sangat cocok untuk Anda yang ingin meningkatkan kemampuan berpikir logis dan sistematis.

        Yuk segera daftar dan kami tunggu di kelas ya!`,
        target_audience: ["Anda yang ingin memahami poin penting sistem informasi manajemen dalam industri", "Anda yang ingin latihan membangun sistem informasi manajemen dalam industri", "Anda yang ingin mengembangkan Startup"],
      },
      {
        id: uuid(),
        name: "Pengenalan Machine Learning",
        price: 0,
        premium: false,
        image: "https://images.unsplash.com/photo-1556740739-887f6717d7e4",
        author_id: userAdminId,
        // instructor_id: [instructorId, secondInstructorId],
        course_category_id: await getCategoryIdByName("Machine Learning"),
        description: `Pengenalan Machine Learning adalah kelas yang akan membimbing Anda memahami dasar-dasar machine learning. Machine learning adalah cabang dari kecerdasan buatan yang memungkinkan komputer untuk belajar tanpa diprogram secara eksplisit.

        Bersama mentor terpercaya, kita akan mempelajari pengenalan machine learning dari dasar hingga mahir. Mentor akan memberikan berbagai contoh kasus yang sering ditemui dalam dunia nyata dan bagaimana cara memecahkannya dengan machine learning.

        Kelas ini sangat cocok untuk Anda yang ingin memahami apa itu machine learning dan bagaimana cara menerapkannya dalam kehidupan sehari-hari. Tidak hanya ditujukan untuk programmer, kelas ini sangat cocok untuk Anda yang ingin meningkatkan kemampuan berpikir logis dan sistematis.

        Yuk segera daftar dan kami tunggu di kelas ya!`,
        target_audience: ["Anda yang ingin memahami poin penting machine learning", "Anda yang ingin latihan membangun machine learning", "Anda yang ingin mengembangkan Startup"],
      },
      {
        id: uuid(),
        name: "Pemrograman Python untuk Machine Learning",
        price: 0,
        premium: false,
        image: "https://images.unsplash.com/photo-1556740739-887f6717d7e4",
        author_id: userAdminId,
        // instructor_id: [instructorId, secondInstructorId],
        course_category_id: await getCategoryIdByName("Machine Learning"),
        description: `Pemrograman Python untuk Machine Learning adalah kelas yang akan membimbing Anda memahami dasar-dasar pemrograman python untuk machine learning. Python adalah bahasa pemrograman yang sangat populer dan banyak digunakan dalam dunia teknologi.

        Bersama mentor terpercaya, kita akan mempelajari pemrograman python untuk machine learning dari dasar hingga mahir. Mentor akan memberikan berbagai contoh kasus yang sering ditemui dalam dunia nyata dan bagaimana cara memecahkannya dengan python untuk machine learning.
        
        Kelas ini sangat cocok untuk Anda yang ingin memahami apa itu pemrograman python untuk machine learning dan bagaimana cara menerapkannya dalam kehidupan sehari-hari. Tidak hanya ditujukan untuk programmer, kelas ini sangat cocok untuk Anda yang ingin meningkatkan kemampuan berpikir logis dan sistematis.

        Yuk segera daftar dan kami tunggu di kelas ya!`,
        target_audience: ["Anda yang ingin memahami poin penting pemrograman python untuk machine learning", "Anda yang ingin latihan membangun pemrograman python untuk machine learning", "Anda yang ingin mengembangkan Startup"],
      },
      {
        id: uuid(),
        name: "Machine Learning dengan TensorFlow",
        price: 0,
        premium: false,
        image: "https://images.unsplash.com/photo-1556740739-887f6717d7e4",
        author_id: userAdminId,
        // instructor_id: [instructorId, secondInstructorId],
        course_category_id: await getCategoryIdByName("Machine Learning"),
        description: `Machine Learning dengan TensorFlow adalah kelas yang akan membimbing Anda memahami dasar-dasar machine learning dengan tensorflow. TensorFlow adalah library machine learning open-source yang dikembangkan oleh Google.

        Bersama mentor terpercaya, kita akan mempelajari machine learning dengan tensorflow dari dasar hingga mahir. Mentor akan memberikan berbagai contoh kasus yang sering ditemui dalam dunia nyata dan bagaimana cara memecahkannya dengan machine learning dengan tensorflow.

        Kelas ini sangat cocok untuk Anda yang ingin memahami apa itu machine learning dengan tensorflow dan bagaimana cara menerapkannya dalam kehidupan sehari-hari. Tidak hanya ditujukan untuk programmer, kelas ini sangat cocok untuk Anda yang ingin meningkatkan kemampuan berpikir logis dan sistematis.

        Yuk segera daftar dan kami tunggu di kelas ya!`,
        target_audience: ["Anda yang ingin memahami poin penting machine learning dengan tensorflow", "Anda yang ingin latihan membangun machine learning dengan tensorflow", "Anda yang ingin mengembangkan Startup"],
      },
      {
        id: uuid(),
        name: "Statistika Dasar",
        price: 0,
        premium: false,
        image: "https://images.unsplash.com/photo-1556740739-887f6717d7e4",
        author_id: userAdminId,
        // instructor_id: [instructorId],
        course_category_id: await getCategoryIdByName("Statistics"),
        description: `Statistika Dasar adalah kelas yang akan membimbing Anda memahami dasar-dasar statistika. Statistika adalah ilmu yang mempelajari cara pengumpulan, analisis, interpretasi, dan penyajian data.

        Bersama mentor terpercaya, kita akan mempelajari statistika dasar dari dasar hingga mahir. Mentor akan memberikan berbagai contoh kasus yang sering ditemui dalam dunia nyata dan bagaimana cara memecahkannya dengan statistika.

        Kelas ini sangat cocok untuk Anda yang ingin memahami apa itu statistika dan bagaimana cara menerapkannya dalam kehidupan sehari-hari. Tidak hanya ditujukan untuk programmer, kelas ini sangat cocok untuk Anda yang ingin meningkatkan kemampuan berpikir logis dan sistematis.

        Yuk segera daftar dan kami tunggu di kelas ya!`,
        target_audience: ["Anda yang ingin memahami poin penting statistika", "Anda yang ingin latihan membangun statistika", "Anda yang ingin mengembangkan Startup"],
      },
      {
        id: uuid(),
        name: "Statistika Inferensial",
        price: 0,
        premium: false,
        image: "https://images.unsplash.com/photo-1556740739-887f6717d7e4",
        author_id: userAdminId,
        // instructor_id: [secondInstructorId],
        course_category_id: await getCategoryIdByName("Statistics"),
        description: `Statistika Inferensial adalah kelas yang akan membimbing Anda memahami dasar-dasar statistika inferensial. Statistika inferensial adalah cabang dari statistika yang mempelajari cara melakukan generalisasi dari sampel ke populasi.

        Bersama mentor terpercaya, kita akan mempelajari statistika inferensial dari dasar hingga mahir. Mentor akan memberikan berbagai contoh kasus yang sering ditemui dalam dunia nyata dan bagaimana cara memecahkannya dengan statistika inferensial.

        Kelas ini sangat cocok untuk Anda yang ingin memahami apa itu statistika inferensial dan bagaimana cara menerapkannya dalam kehidupan sehari-hari. Tidak hanya ditujukan untuk programmer, kelas ini sangat cocok untuk Anda yang ingin meningkatkan kemampuan berpikir logis dan sistematis.

        Yuk segera daftar dan kami tunggu di kelas ya!`,
        target_audience: ["Anda yang ingin memahami poin penting statistika inferensial", "Anda yang ingin latihan membangun statistika inferensial", "Anda yang ingin mengembangkan Startup"],
      },
      {
        id: uuid(),
        name: "Statistika Deskriptif",
        price: 0,
        premium: false,
        image: "https://images.unsplash.com/photo-1556740739-887f6717d7e4",
        author_id: userAdminId,
        // instructor_id: [instructorId],
        course_category_id: await getCategoryIdByName("Statistics"),
        description: `Statistika Deskriptif adalah kelas yang akan membimbing Anda memahami dasar-dasar statistika deskriptif. Statistika deskriptif adalah cabang dari statistika yang mempelajari cara menggambarkan data.

        Bersama mentor terpercaya, kita akan mempelajari statistika deskriptif dari dasar hingga mahir. Mentor akan memberikan berbagai contoh kasus yang sering ditemui dalam dunia nyata dan bagaimana cara memecahkannya dengan statistika deskriptif.

        Kelas ini sangat cocok untuk Anda yang ingin memahami apa itu statistika deskriptif dan bagaimana cara menerapkannya dalam kehidupan sehari-hari. Tidak hanya ditujukan untuk programmer, kelas ini sangat cocok untuk Anda yang ingin meningkatkan kemampuan berpikir logis dan sistematis.

        Yuk segera daftar dan kami tunggu di kelas ya!`,
        target_audience: ["Anda yang ingin memahami poin penting statistika deskriptif", "Anda yang ingin latihan membangun statistika deskriptif", "Anda yang ingin mengembangkan Startup"],
      },
      {
        id: uuid(),
        name: "Statistika Probabilitas",
        price: 0,
        premium: false,
        image: "https://images.unsplash.com/photo-1556740739-887f6717d7e4",
        author_id: userAdminId,
        // instructor_id: [secondInstructorId],
        course_category_id: await getCategoryIdByName("Statistics"),
        description: `Statistika Probabilitas adalah kelas yang akan membimbing Anda memahami dasar-dasar statistika probabilitas. Statistika probabilitas adalah cabang dari statistika yang mempelajari cara menghitung peluang suatu kejadian.

        Bersama mentor terpercaya, kita akan mempelajari statistika probabilitas dari dasar hingga mahir. Mentor akan memberikan berbagai contoh kasus yang sering ditemui dalam dunia nyata dan bagaimana cara memecahkannya dengan statistika probabilitas.

        Kelas ini sangat cocok untuk Anda yang ingin memahami apa itu statistika probabilitas dan bagaimana cara menerapkannya dalam kehidupan sehari-hari. Tidak hanya ditujukan untuk programmer, kelas ini sangat cocok untuk Anda yang ingin meningkatkan kemampuan berpikir logis dan sistematis.

        Yuk segera daftar dan kami tunggu di kelas ya!`,
        target_audience: ["Anda yang ingin memahami poin penting statistika probabilitas", "Anda yang ingin latihan membangun statistika probabilitas", "Anda yang ingin mengembangkan Startup"],
      },
      {
        id: uuid(),
        name: "Pengenalan Web Development dengan HTML dan CSS",
        price: 0,
        premium: false,
        image: "https://images.unsplash.com/photo-1556740739-887f6717d7e4",
        author_id: userAdminId,
        // instructor_id: [instructorId],
        course_category_id: await getCategoryIdByName("Web Development"),
        description: `Pengenalan Web Development dengan HTML dan CSS adalah kelas yang akan membimbing Anda memahami dasar-dasar web development dengan HTML dan CSS. HTML dan CSS adalah bahasa pemrograman yang digunakan untuk membuat halaman web.

        Bersama mentor terpercaya, kita akan mempelajari pengenalan web development dengan HTML dan CSS dari dasar hingga mahir. Mentor akan memberikan berbagai contoh kasus yang sering ditemui dalam dunia nyata dan bagaimana cara memecahkannya dengan HTML dan CSS.

        Kelas ini sangat cocok untuk Anda yang ingin memahami apa itu web development dengan HTML dan CSS dan bagaimana cara menerapkannya dalam kehidupan sehari-hari. Tidak hanya ditujukan untuk programmer, kelas ini sangat cocok untuk Anda yang ingin meningkatkan kemampuan berpikir logis dan sistematis.

        Yuk segera daftar dan kami tunggu di kelas ya!`,
        target_audience: ["Anda yang ingin memahami poin penting web development dengan HTML dan CSS", "Anda yang ingin latihan membangun web development dengan HTML dan CSS", "Anda yang ingin mengembangkan Startup"],
      },
      {
        id: uuid(),
        name: "Pemrograman Web dengan JavaScript",
        price: 0,
        premium: false,
        image: "https://images.unsplash.com/photo-1556740739-887f6717d7e4",
        author_id: userAdminId,
        // instructor_id: [instructorId],
        course_category_id: await getCategoryIdByName("Web Development"),
        description: `Pemrograman Web dengan JavaScript adalah kelas yang akan membimbing Anda memahami dasar-dasar pemrograman web dengan JavaScript. JavaScript adalah bahasa pemrograman yang digunakan untuk membuat halaman web menjadi
        interaktif.

        Bersama mentor terpercaya, kita akan mempelajari pemrograman web dengan JavaScript dari dasar hingga mahir. Mentor akan memberikan berbagai contoh kasus yang sering ditemui dalam dunia nyata dan bagaimana cara memecahkannya dengan JavaScript.

        Kelas ini sangat cocok untuk Anda yang ingin memahami apa itu pemrograman web dengan JavaScript dan bagaimana cara menerapkannya dalam kehidupan sehari-hari. Tidak hanya ditujukan untuk programmer, kelas ini sangat cocok untuk Anda yang ingin meningkatkan kemampuan berpikir logis dan sistematis.

        Yuk segera daftar dan kami tunggu di kelas ya!`,
        target_audience: ["Anda yang ingin memahami poin penting pemrograman web dengan JavaScript", "Anda yang ingin latihan membangun pemrograman web dengan JavaScript", "Anda yang ingin mengembangkan Startup"],
      },
      {
        id: uuid(),
        name: "Pemrograman Web dengan React",
        price: 0,
        premium: false,
        image: "https://images.unsplash.com/photo-1556740739-887f6717d7e4",
        author_id: userAdminId,
        // instructor_id: [instructorId],
        course_category_id: await getCategoryIdByName("Web Development"),
        description: `Pemrograman Web dengan React adalah kelas yang akan membimbing Anda memahami dasar-dasar pemrograman web dengan React. React adalah library JavaScript yang digunakan untuk membuat antarmuka pengguna.

        Bersama mentor terpercaya, kita akan mempelajari pemrograman web dengan React dari dasar hingga mahir. Mentor akan memberikan berbagai contoh kasus yang sering ditemui dalam dunia nyata dan bagaimana cara memecahkannya dengan React.

        Kelas ini sangat cocok untuk Anda yang ingin memahami apa itu pemrograman web dengan React dan bagaimana cara menerapkannya dalam kehidupan sehari-hari. Tidak hanya ditujukan untuk programmer, kelas ini sangat cocok untuk Anda yang ingin meningkatkan kemampuan berpikir logis dan sistematis.

        Yuk segera daftar dan kami tunggu di kelas ya!`,
        target_audience: ["Anda yang ingin memahami poin penting pemrograman web dengan React", "Anda yang ingin latihan membangun pemrograman web dengan React", "Anda yang ingin mengembangkan Startup"],
      },
      {
        id: uuid(),
        name: "Pemrograman Web dengan Node.js",
        price: 0,
        premium: false,
        image: "https://images.unsplash.com/photo-1556740739-887f6717d7e4",
        author_id: userAdminId,
        // instructor_id: [instructorId],
        course_category_id: await getCategoryIdByName("Web Development"),
        description: `Pemrograman Web dengan Node.js adalah kelas yang akan membimbing Anda memahami dasar-dasar pemrograman web dengan Node.js. Node.js adalah runtime JavaScript yang digunakan untuk membuat aplikasi web.

        Bersama mentor terpercaya, kita akan mempelajari pemrograman web dengan Node.js dari dasar hingga mahir. Mentor akan memberikan berbagai contoh kasus yang sering ditemui dalam dunia nyata dan bagaimana cara memecahkannya dengan Node.js.

        Kelas ini sangat cocok untuk Anda yang ingin memahami apa itu pemrograman web dengan Node.js dan bagaimana cara menerapkannya dalam kehidupan sehari-hari. Tidak hanya ditujukan untuk programmer, kelas ini sangat cocok untuk Anda yang ingin meningkatkan kemampuan berpikir logis dan sistematis.

        Yuk segera daftar dan kami tunggu di kelas ya!`,
        target_audience: ["Anda yang ingin memahami poin penting pemrograman web dengan Node.js", "Anda yang ingin latihan membangun pemrograman web dengan Node.js", "Anda yang ingin mengembangkan Startup"],
      },
      {
        id: uuid(),
        name: "Studi Kasus: Membuat Aplikasi Pemesanan Tiket Kereta Api",
        price: 0,
        premium: false,
        image: "https://images.unsplash.com/photo-1556740739-887f6717d7e4",
        author_id: userAdminId,
        // instructor_id: [instructorId],
        course_category_id: await getCategoryIdByName("Web Development"),
        description: `Studi Kasus: Membuat Aplikasi Pemesanan Tiket Kereta Api adalah kelas yang akan membimbing Anda memahami dasar-dasar membuat aplikasi pemesanan tiket kereta api. Aplikasi ini akan dibuat menggunakan Express.js dan React.

        Bersama mentor terpercaya, kita akan mempelajari studi kasus membuat aplikasi pemesanan tiket kereta api dari dasar hingga mahir. Mentor akan memberikan berbagai contoh kasus yang sering ditemui dalam dunia nyata dan bagaimana cara memecahkannya dengan Express.js dan React.

        Kelas ini sangat cocok untuk Anda yang ingin memahami apa itu studi kasus membuat aplikasi pemesanan tiket kereta api dan bagaimana cara menerapkannya dalam kehidupan sehari-hari. Tidak hanya ditujukan untuk programmer, kelas ini sangat cocok untuk Anda yang ingin meningkatkan kemampuan berpikir logis dan sistematis.

        Yuk segera daftar dan kami tunggu di kelas ya!`,
        target_audience: [
          "Anda yang ingin memahami poin penting studi kasus membuat aplikasi pemesanan tiket kereta api",
          "Anda yang ingin latihan membangun studi kasus membuat aplikasi pemesanan tiket kereta api",
          "Anda yang ingin mengembangkan Startup",
        ],
      },
      {
        id: uuid(),
        name: "Pengenalan Cybersecurity",
        price: 0,
        premium: false,
        image: "https://images.unsplash.com/photo-1556740739-887f6717d7e4",
        author_id: userAdminId,
        // instructor_id: [instructorId, secondInstructorId],
        course_category_id: await getCategoryIdByName("Cybersecurity"),
        description: `Pengenalan Cybersecurity adalah kelas yang akan membimbing Anda memahami dasar-dasar cybersecurity. Cybersecurity adalah praktik melindungi sistem, jaringan, dan program dari serangan digital.

        Bersama mentor terpercaya, kita akan mempelajari pengenalan cybersecurity dari dasar hingga mahir. Mentor akan memberikan berbagai contoh kasus yang sering ditemui dalam dunia nyata dan bagaimana cara memecahkannya dengan cybersecurity.

        Kelas ini sangat cocok untuk Anda yang ingin memahami apa itu cybersecurity dan bagaimana cara menerapkannya dalam kehidupan sehari-hari. Tidak hanya ditujukan untuk programmer, kelas ini sangat cocok untuk Anda yang ingin meningkatkan kemampuan berpikir logis dan sistematis.

        Yuk segera daftar dan kami tunggu di kelas ya!`,
        target_audience: ["Anda yang ingin memahami poin penting cybersecurity", "Anda yang ingin latihan membangun cybersecurity", "Anda yang ingin mengembangkan Startup"],
      },
      {
        id: uuid(),
        name: "Pengenalan Kriptografi",
        price: 0,
        premium: false,
        image: "https://images.unsplash.com/photo-1556740739-887f6717d7e4",
        author_id: userAdminId,
        // instructor_id: [instructorId, secondInstructorId],
        course_category_id: await getCategoryIdByName("Cybersecurity"),
        description: `Pengenalan Kriptografi adalah kelas yang akan membimbing Anda memahami dasar-dasar kriptografi. Kriptografi adalah ilmu dan seni melindungi informasi dengan mengubahnya menjadi bentuk yang tidak dapat dibaca.

        Bersama mentor terpercaya, kita akan mempelajari pengenalan kriptografi dari dasar hingga mahir. Mentor akan memberikan berbagai contoh kasus yang sering ditemui dalam dunia nyata dan bagaimana cara memecahkannya dengan kriptografi.

        Kelas ini sangat cocok untuk Anda yang ingin memahami apa itu kriptografi dan bagaimana cara menerapkannya dalam kehidupan sehari-hari. Tidak hanya ditujukan untuk programmer, kelas ini sangat cocok untuk Anda yang ingin meningkatkan kemampuan berpikir logis dan sistematis.

        Yuk segera daftar dan kami tunggu di kelas ya!`,
        target_audience: ["Anda yang ingin memahami poin penting kriptografi", "Anda yang ingin latihan membangun kriptografi", "Anda yang ingin mengembangkan Startup"],
      },
      {
        id: uuid(),
        name: "Pengenalan Ethical Hacking",
        price: 0,
        premium: false,
        image: "https://images.unsplash.com/photo-1556740739-887f6717d7e4",
        author_id: userAdminId,
        // instructor_id: [instructorId, secondInstructorId],
        course_category_id: await getCategoryIdByName("Cybersecurity"),
        description: `Pengenalan Ethical Hacking adalah kelas yang akan membimbing Anda memahami dasar-dasar ethical hacking. Ethical hacking adalah praktik mencari kelemahan dalam sistem komputer dan jaringan untuk melindungi mereka dari serangan.

        Bersama mentor terpercaya, kita akan mempelajari pengenalan ethical hacking dari dasar hingga mahir. Mentor akan memberikan berbagai contoh kasus yang sering ditemui dalam dunia nyata dan bagaimana cara memecahkannya dengan ethical hacking.

        Kelas ini sangat cocok untuk Anda yang ingin memahami apa itu ethical hacking dan bagaimana cara menerapkannya dalam kehidupan sehari-hari. Tidak hanya ditujukan untuk programmer, kelas ini sangat cocok untuk Anda yang ingin meningkatkan kemampuan berpikir logis dan sistematis.

        Yuk segera daftar dan kami tunggu di kelas ya!`,
        target_audience: ["Anda yang ingin memahami poin penting ethical hacking", "Anda yang ingin latihan membangun ethical hacking", "Anda yang ingin mengembangkan Startup"],
      },
      {
        id: uuid(),
        name: "Pengenalan Digital Forensics",
        price: 0,
        premium: false,
        image: "https://images.unsplash.com/photo-1556740739-887f6717d7e4",
        author_id: userAdminId,
        // instructor_id: [instructorId, secondInstructorId],
        course_category_id: await getCategoryIdByName("Cybersecurity"),
        description: `Pengenalan Digital Forensics adalah kelas yang akan membimbing Anda memahami dasar-dasar digital forensics. Digital forensics adalah proses mengumpulkan, menganalisis, dan menyajikan bukti digital yang dapat digunakan dalam penyelidikan hukum.

        Bersama mentor terpercaya, kita akan mempelajari pengenalan digital forensics dari dasar hingga mahir. Mentor akan memberikan berbagai contoh kasus yang sering ditemui dalam dunia nyata dan bagaimana cara memecahkannya dengan digital forensics.

        Kelas ini sangat cocok untuk Anda yang ingin memahami apa itu digital forensics dan bagaimana cara menerapkannya dalam kehidupan sehari-hari. Tidak hanya ditujukan untuk programmer, kelas ini sangat cocok untuk Anda yang ingin meningkatkan kemampuan berpikir logis dan sistematis.

        Yuk segera daftar dan kami tunggu di kelas ya!`,
        target_audience: ["Anda yang ingin memahami poin penting digital forensics", "Anda yang ingin latihan membangun digital forensics", "Anda yang ingin mengembangkan Startup"],
      },
      {
        id: uuid(),
        name: "Penetration Testing",
        price: 0,
        premium: false,
        image: "https://images.unsplash.com/photo-1556740739-887f6717d7e4",
        author_id: userAdminId,
        // instructor_id: [instructorId, secondInstructorId],
        course_category_id: await getCategoryIdByName("Cybersecurity"),
        description: `Penetration Testing adalah kelas yang akan membimbing Anda memahami dasar-dasar penetration testing. Penetration testing adalah proses mengidentifikasi kelemahan dalam sistem komputer dan jaringan.

        Bersama mentor terpercaya, kita akan mempelajari penetration testing dari dasar hingga mahir. Mentor akan memberikan berbagai contoh kasus yang sering ditemui dalam dunia nyata dan bagaimana cara memecahkannya dengan penetration testing.

        Kelas ini sangat cocok untuk Anda yang ingin memahami apa itu penetration testing dan bagaimana cara menerapkannya dalam kehidupan sehari-hari. Tidak hanya ditujukan untuk programmer, kelas ini sangat cocok untuk Anda yang ingin meningkatkan kemampuan berpikir logis dan sistematis.

        Yuk segera daftar dan kami tunggu di kelas ya!`,
        target_audience: ["Anda yang ingin memahami poin penting penetration testing", "Anda yang ingin latihan membangun penetration testing", "Anda yang ingin mengembangkan Startup"],
      },
      {
        id: uuid(),
        name: "Keamanan Jaringan",
        price: 0,
        premium: false,
        image: "https://images.unsplash.com/photo-1556740739-887f6717d7e4",
        author_id: userAdminId,
        // instructor_id: [instructorId, secondInstructorId],
        course_category_id: await getCategoryIdByName("Cybersecurity"),
        description: `Keamanan Jaringan adalah kelas yang akan membimbing Anda memahami dasar-dasar keamanan jaringan. Keamanan jaringan adalah proses melindungi sistem komputer dan jaringan dari serangan digital.

        Bersama mentor terpercaya, kita akan mempelajari keamanan jaringan dari dasar hingga mahir. Mentor akan memberikan berbagai contoh kasus yang sering ditemui dalam dunia nyata dan bagaimana cara memecahkannya dengan keamanan jaringan.

        Kelas ini sangat cocok untuk Anda yang ingin memahami apa itu keamanan jaringan dan bagaimana cara menerapkannya dalam kehidupan sehari-hari. Tidak hanya ditujukan untuk programmer, kelas ini sangat cocok untuk Anda yang ingin meningkatkan kemampuan berpikir logis dan sistematis.

        Yuk segera daftar dan kami tunggu di kelas ya!`,
        target_audience: ["Anda yang ingin memahami poin penting keamanan jaringan", "Anda yang ingin latihan membangun keamanan jaringan", "Anda yang ingin mengembangkan Startup"],
      },
    ];

    const seedCourses = courses.map((category) => ({
      ...generateRandomCourse(),
      ...category,
    }));

    return queryInterface.bulkInsert("Courses", seedCourses, {});
  },

  async down(queryInterface, Sequelize) {
    // @ts-ignore
    return queryInterface.bulkDelete("Courses", null, {});
  },
};
