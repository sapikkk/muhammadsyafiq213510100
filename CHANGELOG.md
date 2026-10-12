# 1.0.0 (2026-10-12)


### Bug Fixes

* **admin:** komponen Textarea dan copy halaman laporan panen ([c23cc1f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/c23cc1fb1baa211cc9e32ad80085fb9807d7f13b))
* **audit:** typecheck audit-nav spec (Array.from Set) ([11efb1d](https://github.com/sapikkk/muhammadsyafiq213510100/commit/11efb1d757805db8402e9d5e8bdfc20d96c7021f))
* **client:** cegah Prisma masuk bundle browser (v1.28.1) ([#125](https://github.com/sapikkk/muhammadsyafiq213510100/issues/125)) ([042e0af](https://github.com/sapikkk/muhammadsyafiq213510100/commit/042e0af6007388abddcc675d800b126fb48a7966))
* declare composer config in prisma.config.ts ([4cae52a](https://github.com/sapikkk/muhammadsyafiq213510100/commit/4cae52aaedd90872d125d9e5b9c8d93282d71067))
* **e2e:** T5.1 via API phase + daftar HP; E2E_DEMO_SIKLUS_ID di CI ([717b4de](https://github.com/sapikkk/muhammadsyafiq213510100/commit/717b4defb0ee2b26f4e4a6b6acd24556b8509ce2))
* **notifikasi:** inbox unread di atas, redirect aman, refresh badge ([1375f0c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/1375f0cfc9be6c64d8735f6bfa019b43126f1f52))
* **routing:** halaman baru SO/jurnal dan aksi siklus petani ([b7f874d](https://github.com/sapikkk/muhammadsyafiq213510100/commit/b7f874dd8fe12a43b9f40d04b7f674afbf50b703))
* **seed:** jalankan seed-akun.js langsung untuk set isSystem ([ebaed7d](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ebaed7d62ef86a47ff317dca80d7fc9857566f8b))
* **sprint-5:** reset batch demo seed + perbaiki e2e T5.1/T5.3 ([b4e6f09](https://github.com/sapikkk/muhammadsyafiq213510100/commit/b4e6f095eb3b8613165c88500c7cee0047d91159))
* **ui:** panduan hanya lewat tombol, tanpa popup otomatis ([535738f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/535738fb5d5c40899339a5991025ee20b5c5375d))
* **ui:** pulihkan tab lama saat chunk JS 404 setelah deploy ([6a45c4f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/6a45c4f5ad256a91dd1d8e58d7d6b0396286e89b))
* **ui:** sidebar Owner — satu item aktif, tanpa blok hitam ([a7b9427](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a7b9427f28fd24efd3145d469220cbf2e0c75dee))
* **ux:** sejajarkan Panduan dengan header halaman dan spacing gap-6 ([eba0131](https://github.com/sapikkk/muhammadsyafiq213510100/commit/eba01316c07ca28a0e100d3376a0410074a692fc))
* **v2-G.1:** wire KPI hidroponik on owner dashboard ([#110](https://github.com/sapikkk/muhammadsyafiq213510100/issues/110)) ([307f1e4](https://github.com/sapikkk/muhammadsyafiq213510100/commit/307f1e4a6c8b56c7de0e4e505c8fa809ad88f6ac))


### Features

* add admin-approved password reset (US1.5) ([0385ca3](https://github.com/sapikkk/muhammadsyafiq213510100/commit/0385ca31657a8e41b052b8fadc88c5724de0810a))
* add chart of accounts with tree UI, soft delete, and /api/accounts (US2.1) ([e248df5](https://github.com/sapikkk/muhammadsyafiq213510100/commit/e248df5d3f7fe5cfb9a103f6cc48810407bc7f5c))
* add double-entry journal with approval and balance updates (US2.2) ([5ab66ca](https://github.com/sapikkk/muhammadsyafiq213510100/commit/5ab66caf63aae2dba97c75d0461ce7ffe89a2541))
* add global loading, error, 404, and 403 states (US1.8) ([4390127](https://github.com/sapikkk/muhammadsyafiq213510100/commit/43901275e0b3a9862deafd88f70d6798fba1c1db))
* add settings page with profile, password, and role matrix (US1.7) ([c58c907](https://github.com/sapikkk/muhammadsyafiq213510100/commit/c58c9079c9db6e7fad6521a9c7e9e75886feea14))
* add the ERD schema and role login ([ced6fac](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ced6fac72ff80364adb27881f382c9cd86462bac))
* **audit:** DataTable search, inventaris/varietas, API contract ([e3a8d58](https://github.com/sapikkk/muhammadsyafiq213510100/commit/e3a8d58be12fed0601c1c1ad63869035650af484))
* **audit:** jurnal DataTable, transactions API, e2e, CI build ([ec8b386](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ec8b386c64b6c0656cb40d575c5ebaac2393c3d5))
* **audit:** mobile shell, API contract, toasts, pelanggan table ([0bdd46b](https://github.com/sapikkk/muhammadsyafiq213510100/commit/0bdd46bc2f5fcf87c8c9bc8329d38df6e371942b))
* **audit:** PHASE 1 dev-only RBAC bypass ([687971d](https://github.com/sapikkk/muhammadsyafiq213510100/commit/687971dd9553401b32484c9a673bf1a877b17539))
* **audit:** riwayat perubahan pelanggan, inventaris, petani, user, pack ([78a5ca2](https://github.com/sapikkk/muhammadsyafiq213510100/commit/78a5ca296fe1603039923cc394e83139a883ea1a))
* **audit:** runbook, fixes, toaster, pengaturan shell ([ceeb8d3](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ceeb8d3030681f048745a1459d56e223679a9f11))
* **audit:** SessionShell, segment errors, DataTable pilot ([f2e9a52](https://github.com/sapikkk/muhammadsyafiq213510100/commit/f2e9a52b93e60a6f58d8fe6533226afcf8379f05))
* **flow:** active pack Tingkat B — detail, Sheet buat/pakai (Fase 6) ([f77780c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/f77780c748d8653690708f59f88899945032bc17))
* **flow:** akun Tingkat B — Sheet Tambah/Ubah, Dialog nonaktifkan ([a6912ce](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a6912cef4a26fd0f4aefd9dd49583017c17d6f85))
* **flow:** fondasi UI Sheet, FormSheet, ConfirmDialog, RowActions (Fase 1) ([a8cd0e0](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a8cd0e0d343ef5a61cc5667b4d8566c3b5bf1a96))
* **flow:** infrastruktur Tingkat B — Sheet tambah, Dialog status kolam ([951eb0b](https://github.com/sapikkk/muhammadsyafiq213510100/commit/951eb0b6fa9183b9ef4b5769d5519ebe4511289e))
* **flow:** inventaris Tingkat B — detail, Sheet tambah/pergerakan (Fase 5) ([739b419](https://github.com/sapikkk/muhammadsyafiq213510100/commit/739b4199bfddbefd98992009904295ec940b3a1b))
* **flow:** penjualan Tingkat C — daftar, /baru, /[id] aksi per status ([fa27406](https://github.com/sapikkk/muhammadsyafiq213510100/commit/fa27406dca0861928a04db8e1aea42a3586fdabe))
* **flow:** pilot pelanggan Tingkat A — Sheet Tambah/Ubah (Fase 2) ([921261c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/921261cdaa70d77b8450314d7e199a1fbb676cd9))
* **flow:** siklus Tingkat C, inventaris Ubah/Nonaktifkan, banned-ui fix ([bbfa342](https://github.com/sapikkk/muhammadsyafiq213510100/commit/bbfa34226cc127843970c15790bc2a716807d97d))
* **flow:** Tingkat A — kolom aktif pelanggan, petani master, user ([21b461e](https://github.com/sapikkk/muhammadsyafiq213510100/commit/21b461e0bd17a2dbc1a44de1d5d2be34f3f87467))
* **flow:** Tingkat A petani master + owner pengguna (Fase 3) ([8014e9e](https://github.com/sapikkk/muhammadsyafiq213510100/commit/8014e9e4cacea1eabed1e52075e26329cb527332))
* **flow:** varietas Tingkat B — detail, Sheet, status Dialog (Fase 4) ([cf4babb](https://github.com/sapikkk/muhammadsyafiq213510100/commit/cf4babbd8f4c8be0b70760ceb5bcd8392d6d6a7d))
* **home:** dashboard progress GitHub Project + tooling deploy Vercel ([4c9cf2d](https://github.com/sapikkk/muhammadsyafiq213510100/commit/4c9cf2d86bf80b4f71cbb359de2640b598f0a820)), closes [#1](https://github.com/sapikkk/muhammadsyafiq213510100/issues/1)
* **hpp:** US2.3 override + plastik + jurnal 5300 ([#68](https://github.com/sapikkk/muhammadsyafiq213510100/issues/68)) ([e80ba6e](https://github.com/sapikkk/muhammadsyafiq213510100/commit/e80ba6e0ae41bb9117a93a35c839e47ef0d6db8d))
* **hpp:** US2.3 override, plastik, jurnal susut abnormal (US2.5) ([6e7cf1c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/6e7cf1cc8f6656affde69bbb796b05071709a743))
* **laporan:** US6.3 ekspor jurnal xlsx dan L/R + neraca PDF ([3015228](https://github.com/sapikkk/muhammadsyafiq213510100/commit/30152286ab5fa308baa2211b5d2721b0c9034586))
* **laporan:** US6.5 arus kas Owner dengan filter periode dan PDF ([6cae9f8](https://github.com/sapikkk/muhammadsyafiq213510100/commit/6cae9f8a861e4794eecedd818de9ed9217ae09b4))
* let admin register petani accounts (US1.6) ([16208c0](https://github.com/sapikkk/muhammadsyafiq213510100/commit/16208c056ef7c06f889b22eb9231bea7f93fc773))
* **notifikasi:** pusat notifikasi RBAC, deep link, dan README dokumentasi ([920404c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/920404c1e2f0feb070e3fdbf7ca8a85b670e8cfb))
* **notifikasi:** toast mengambang dan deep link antar peran ([97bb182](https://github.com/sapikkk/muhammadsyafiq213510100/commit/97bb182795bce07c76d0858201af3531d64beb46))
* **owner:** US1.9 kelola user dan US2.6 COA/jurnal/prive ([634d48f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/634d48f1b56930d870fb3beabbe4f8de78c109fc))
* **owner:** US6.1 KPI dan grafik pendapatan vs beban ([f8072db](https://github.com/sapikkk/muhammadsyafiq213510100/commit/f8072db80f2aef3f3887a26a7a5c21ed6e538d84))
* **owner:** US6.1 KPI dashboard ([#73](https://github.com/sapikkk/muhammadsyafiq213510100/issues/73)) ([c1db931](https://github.com/sapikkk/muhammadsyafiq213510100/commit/c1db9311d413a10d65a239895077a05ba6ab6441))
* **owner:** US6.2 pie biaya + drill-down ([#74](https://github.com/sapikkk/muhammadsyafiq213510100/issues/74)) ([6487af2](https://github.com/sapikkk/muhammadsyafiq213510100/commit/6487af2a43eead4cfb11e4ba2ac331eadf132b90))
* **owner:** US6.2 pie breakdown biaya dan drill-down jurnal ([083e70b](https://github.com/sapikkk/muhammadsyafiq213510100/commit/083e70ba852481229e69263fdd5a0769c743a308))
* **owner:** US6.4 evaluasi margin, BEP, dan kapasitas idle ([6b56567](https://github.com/sapikkk/muhammadsyafiq213510100/commit/6b56567bcfdc68907e88b35794a4c864a2d48145))
* **penjualan:** EPIC-5 US5.1–5.5 ([#72](https://github.com/sapikkk/muhammadsyafiq213510100/issues/72)) ([564c85f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/564c85f7124c296b5a6442d749dd01245438fee9))
* **penjualan:** US5.1 pelanggan + sales order ([#69](https://github.com/sapikkk/muhammadsyafiq213510100/issues/69)) ([ccd11b9](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ccd11b9084d00b4d71b2ff5a853e4b166fc43034))
* **penjualan:** US5.1 pelanggan + sales order DRAFT (US5.2 konfirmasi stok) ([b331878](https://github.com/sapikkk/muhammadsyafiq213510100/commit/b331878c15051b672b361eb2aaf25f8988eb430e))
* **penjualan:** US5.3 pengiriman SO dan US5.4 jurnal PENDING saat DELIVERED ([17e7312](https://github.com/sapikkk/muhammadsyafiq213510100/commit/17e731208459d71280cf79bf162469228831312e))
* **penjualan:** US5.5 invoice, batal SO, dan biaya packing ([2ff62ce](https://github.com/sapikkk/muhammadsyafiq213510100/commit/2ff62ce7271de1a1621de6466fa0ce7eba9857b9))
* **petani:** bantuan rockwool/benih dan seed varietas pasar ([a5bfdda](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a5bfdda5b8fcb051fd9662f34abf5f07b4896a55))
* **produksi:** US3.5 kegagalan + US2.5 susut ([#66](https://github.com/sapikkk/muhammadsyafiq213510100/issues/66)) ([90f8cdb](https://github.com/sapikkk/muhammadsyafiq213510100/commit/90f8cdbda2d2496001f1eca086b9e939fd9ba8ed))
* **produksi:** US3.5 log kegagalan dan US2.5 klasifikasi susut ([92f7199](https://github.com/sapikkk/muhammadsyafiq213510100/commit/92f71992b1d5c081614872a7fccee447c053f389))
* **produksi:** US3.6 timeline + US3.7 dashboard petani ([#67](https://github.com/sapikkk/muhammadsyafiq213510100/issues/67)) ([2f0df12](https://github.com/sapikkk/muhammadsyafiq213510100/commit/2f0df120966cc0d62d833f841f4ccca30d1ddc6b))
* **produksi:** US3.6 timeline/tambal/monitor dan US3.7 dashboard petani ([4d91f9a](https://github.com/sapikkk/muhammadsyafiq213510100/commit/4d91f9af2b557bd8ab91e290f6b6b2287d3d7051))
* record the Architecture spec and scaffold aplikasi Kokonus Farm ([ed3863b](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ed3863b6e26a2b3482bc800531d8a1e4e4f751e7))
* scaffold Kokonus Farm composer app ([5d88193](https://github.com/sapikkk/muhammadsyafiq213510100/commit/5d88193469d5e08bdc4b087119dc0cd2be80e48e))
* **sprint-5:** selesaikan T5.5–T5.9 — deploy doc, pelatihan, perbaiki e2e ([5c1e54f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/5c1e54fef5c0bbd83aca124997b537b573301c39))
* **sprint-5:** T5.1–T5.4 usability, seed demo, audit jurnal, e2e ([3cb30ef](https://github.com/sapikkk/muhammadsyafiq213510100/commit/3cb30efdf9187838aa19b869167a2d6e9cb007ca))
* **ui:** dashboard owner menampilkan data lewat tabel, bukan Card ([3930bac](https://github.com/sapikkk/muhammadsyafiq213510100/commit/3930bac556c8491ded75a219fb09496b4f9002a8))
* **ui:** DataTable owner keuangan, DetailLayout jurnal, filter seragam ([4c817b1](https://github.com/sapikkk/muhammadsyafiq213510100/commit/4c817b176c09cbe3f5b60bdcba0705c706352e40))
* **ui:** redesign layout to sidebar dashboard with shadcn zinc theme ([33aab71](https://github.com/sapikkk/muhammadsyafiq213510100/commit/33aab7104d9d7bedbb9408e18b8342d4835a54a1))
* **ui:** selaraskan jurnal, harvest review, invoice ke DetailLayout/Crud ([07057aa](https://github.com/sapikkk/muhammadsyafiq213510100/commit/07057aa589913ac8379ef23442331f9b2774278a))
* **ui:** sheet detail lebar, coachmark alur, sidebar collapse ([66e1a22](https://github.com/sapikkk/muhammadsyafiq213510100/commit/66e1a22e18558c90451565e46ea6b565d16ace67))
* **ui:** sidebar layout per peran dan US3.3 laporan panen ([e0d2fdd](https://github.com/sapikkk/muhammadsyafiq213510100/commit/e0d2fdd43f8cc76e38f37cacd75b26eaeaa3c44f))
* **ui:** teks layar Indonesia sederhana dan label status ([2fdb912](https://github.com/sapikkk/muhammadsyafiq213510100/commit/2fdb9122ce2587dcc821f086e66b04896910eacd))
* **US2.3:** implementasi approve/reject harvest report dan otomatisasi HPP serta jurnal persediaan ([9164601](https://github.com/sapikkk/muhammadsyafiq213510100/commit/916460183590e27843379a23753d683efb140e35))
* **us2.4:** form biaya langsung dan overhead periode ([7070025](https://github.com/sapikkk/muhammadsyafiq213510100/commit/70700253a0e98b0fb493f2811213987ca925bd9f))
* **us3.1:** mulai siklus semai dengan kode batch dan active pack ([4adb38c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/4adb38c55dd059af527771600f7594e4b8cb4407))
* **us3.2:** pindah fase produksi dengan log dan konfirmasi ([ad7a763](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ad7a76381d115148f24dd56a8e1a8da4e5d46b34))
* **us3.3:** laporan panen Petani dan perbaikan form siklus ([aae8d9f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/aae8d9fdfc376d6fd689bffbd02a162cb8e9fc67)), closes [#61](https://github.com/sapikkk/muhammadsyafiq213510100/issues/61)
* **us3.4:** master varietas dan parameter asumsi ([0b42ad3](https://github.com/sapikkk/muhammadsyafiq213510100/commit/0b42ad37c890a3f3c8e398067447b719d77274e6))
* **us4.1:** stok inventaris dan log pergerakan IN/OUT/ADJUST ([eccc22b](https://github.com/sapikkk/muhammadsyafiq213510100/commit/eccc22b17ca82c1857ba621ff74d8eb347660e9f))
* **us4.2:** active pack biaya per unit dan status habis ([deca235](https://github.com/sapikkk/muhammadsyafiq213510100/commit/deca2359c3331bad742a9eb18c6c35675d344432))
* **us4.3:** alert stok minimum via API dan halaman stok rendah ([a75ed77](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a75ed7736fee8a7e40a04daf76fad401a4360045))
* **us4.3:** alias GET /api/inventory/alerts ke /alert ([108885e](https://github.com/sapikkk/muhammadsyafiq213510100/commit/108885e066e03a914d3600b1fbf10f49cbd3ed0d))
* **us4.4:** master lahan, greenhouse, dan kolam ([401433b](https://github.com/sapikkk/muhammadsyafiq213510100/commit/401433b9a20ac1d030eb4fa845cacf5d7c2bf0e2))
* **us4.5:** master petani ERD dan navigasi sidebar ([38ddaab](https://github.com/sapikkk/muhammadsyafiq213510100/commit/38ddaab3a7d69d4268bc650f0cb056267e916e16))
* **ux:** flow nav, cache & tables v1.28.0 ([#122](https://github.com/sapikkk/muhammadsyafiq213510100/issues/122)) ([#123](https://github.com/sapikkk/muhammadsyafiq213510100/issues/123)) ([a48f999](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a48f999967907fae8209fd237912e46ba2faaf4e))
* **ux:** Panduan seragam di semua halaman operasi dan utilitas ([c991dbe](https://github.com/sapikkk/muhammadsyafiq213510100/commit/c991dbec77228fca3e3c2bfcc048cb5b3866382b))
* **ux:** sidebar epik Owner 1.0–7.0 dan coachmark UAT per halaman ([af32623](https://github.com/sapikkk/muhammadsyafiq213510100/commit/af326236ac1638c994fd8edaaf40ce6844be016a))
* **v2-A.1:** Akun.is_system + guard COA standar ([#95](https://github.com/sapikkk/muhammadsyafiq213510100/issues/95)) ([cd619a0](https://github.com/sapikkk/muhammadsyafiq213510100/commit/cd619a02829dd32f7fcbd0c6c4b59cf02d076386))
* **v2-A.3:** jurnal panen Dr 1350 Cr WIP ([#114](https://github.com/sapikkk/muhammadsyafiq213510100/issues/114)) ([740869c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/740869ca5353358f760c72e392af123f1ace55b1))
* **v2-A.4:** kas split 1100/1110 ([#116](https://github.com/sapikkk/muhammadsyafiq213510100/issues/116)) ([085768c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/085768c51c22c6d05bcfca4564ba2a2830d15a6d))
* **v2-B.1:** abort siklus gagal total ([#96](https://github.com/sapikkk/muhammadsyafiq213510100/issues/96)) ([8160c06](https://github.com/sapikkk/muhammadsyafiq213510100/commit/8160c06450b4276e16b9d64aebca6723a36d8482))
* **v2-C.1:** kapasitas lubang pack + semai proporsional ([#97](https://github.com/sapikkk/muhammadsyafiq213510100/issues/97)) ([da42fde](https://github.com/sapikkk/muhammadsyafiq213510100/commit/da42fdeec4310bd19ccee45042586c7b3fa7e76d))
* **v2-D.1:** SO lubang terpakai + hpp_order ([#98](https://github.com/sapikkk/muhammadsyafiq213510100/issues/98)) ([0e84814](https://github.com/sapikkk/muhammadsyafiq213510100/commit/0e848141e1d2c246257b87d6bf79d913eea2c3a8))
* **v2-E.1:** sales order DP schema and uang muka posting ([#108](https://github.com/sapikkk/muhammadsyafiq213510100/issues/108)) ([c93d43f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/c93d43fd5e5542d61a6048ec00c32a1d300687ba))
* **v2-F.2:** Smart Jurnal 9 tipe ([#117](https://github.com/sapikkk/muhammadsyafiq213510100/issues/117)) ([a15e486](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a15e486ec8de2f425ba75a43e847e4f808a03499))
* **v2-F.3:** Smart Jurnal +5 tipe v1.25.0 ([#119](https://github.com/sapikkk/muhammadsyafiq213510100/issues/119)) ([386377f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/386377fa78466ac9ccd0d4cde0e0b5841ce3269e)), closes [#92](https://github.com/sapikkk/muhammadsyafiq213510100/issues/92)
* **v2-F/G/H:** Smart Jurnal, KPI Owner, period lock ([#109](https://github.com/sapikkk/muhammadsyafiq213510100/issues/109)) ([c216e6f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/c216e6f232c3626591cdce358d8f12ab1977c446))
* **v2-H.2:** penyusutan otomatis + closeout docs v1.24.0 ([#118](https://github.com/sapikkk/muhammadsyafiq213510100/issues/118)) ([ebb2b27](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ebb2b27cc4f6f156e317b67953f60c94d134bbc6))
* **v2:** closeout epic [#87](https://github.com/sapikkk/muhammadsyafiq213510100/issues/87)–[#94](https://github.com/sapikkk/muhammadsyafiq213510100/issues/94) v1.26.0 ([#120](https://github.com/sapikkk/muhammadsyafiq213510100/issues/120)) ([0b4ac2a](https://github.com/sapikkk/muhammadsyafiq213510100/commit/0b4ac2a8f4cd97b5c9994db8b459aaac3e784014))

# 1.0.0 (2026-10-12)


### Bug Fixes

* **admin:** komponen Textarea dan copy halaman laporan panen ([c23cc1f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/c23cc1fb1baa211cc9e32ad80085fb9807d7f13b))
* **audit:** typecheck audit-nav spec (Array.from Set) ([11efb1d](https://github.com/sapikkk/muhammadsyafiq213510100/commit/11efb1d757805db8402e9d5e8bdfc20d96c7021f))
* **client:** cegah Prisma masuk bundle browser (v1.28.1) ([#125](https://github.com/sapikkk/muhammadsyafiq213510100/issues/125)) ([042e0af](https://github.com/sapikkk/muhammadsyafiq213510100/commit/042e0af6007388abddcc675d800b126fb48a7966))
* declare composer config in prisma.config.ts ([4cae52a](https://github.com/sapikkk/muhammadsyafiq213510100/commit/4cae52aaedd90872d125d9e5b9c8d93282d71067))
* **e2e:** T5.1 via API phase + daftar HP; E2E_DEMO_SIKLUS_ID di CI ([717b4de](https://github.com/sapikkk/muhammadsyafiq213510100/commit/717b4defb0ee2b26f4e4a6b6acd24556b8509ce2))
* **notifikasi:** inbox unread di atas, redirect aman, refresh badge ([1375f0c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/1375f0cfc9be6c64d8735f6bfa019b43126f1f52))
* **routing:** halaman baru SO/jurnal dan aksi siklus petani ([b7f874d](https://github.com/sapikkk/muhammadsyafiq213510100/commit/b7f874dd8fe12a43b9f40d04b7f674afbf50b703))
* **seed:** jalankan seed-akun.js langsung untuk set isSystem ([ebaed7d](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ebaed7d62ef86a47ff317dca80d7fc9857566f8b))
* **sprint-5:** reset batch demo seed + perbaiki e2e T5.1/T5.3 ([b4e6f09](https://github.com/sapikkk/muhammadsyafiq213510100/commit/b4e6f095eb3b8613165c88500c7cee0047d91159))
* **ui:** panduan hanya lewat tombol, tanpa popup otomatis ([535738f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/535738fb5d5c40899339a5991025ee20b5c5375d))
* **ui:** pulihkan tab lama saat chunk JS 404 setelah deploy ([6a45c4f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/6a45c4f5ad256a91dd1d8e58d7d6b0396286e89b))
* **ui:** sidebar Owner — satu item aktif, tanpa blok hitam ([a7b9427](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a7b9427f28fd24efd3145d469220cbf2e0c75dee))
* **ux:** sejajarkan Panduan dengan header halaman dan spacing gap-6 ([eba0131](https://github.com/sapikkk/muhammadsyafiq213510100/commit/eba01316c07ca28a0e100d3376a0410074a692fc))
* **v2-G.1:** wire KPI hidroponik on owner dashboard ([#110](https://github.com/sapikkk/muhammadsyafiq213510100/issues/110)) ([307f1e4](https://github.com/sapikkk/muhammadsyafiq213510100/commit/307f1e4a6c8b56c7de0e4e505c8fa809ad88f6ac))


### Features

* add admin-approved password reset (US1.5) ([0385ca3](https://github.com/sapikkk/muhammadsyafiq213510100/commit/0385ca31657a8e41b052b8fadc88c5724de0810a))
* add chart of accounts with tree UI, soft delete, and /api/accounts (US2.1) ([e248df5](https://github.com/sapikkk/muhammadsyafiq213510100/commit/e248df5d3f7fe5cfb9a103f6cc48810407bc7f5c))
* add double-entry journal with approval and balance updates (US2.2) ([5ab66ca](https://github.com/sapikkk/muhammadsyafiq213510100/commit/5ab66caf63aae2dba97c75d0461ce7ffe89a2541))
* add global loading, error, 404, and 403 states (US1.8) ([4390127](https://github.com/sapikkk/muhammadsyafiq213510100/commit/43901275e0b3a9862deafd88f70d6798fba1c1db))
* add settings page with profile, password, and role matrix (US1.7) ([c58c907](https://github.com/sapikkk/muhammadsyafiq213510100/commit/c58c9079c9db6e7fad6521a9c7e9e75886feea14))
* add the ERD schema and role login ([ced6fac](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ced6fac72ff80364adb27881f382c9cd86462bac))
* **audit:** DataTable search, inventaris/varietas, API contract ([e3a8d58](https://github.com/sapikkk/muhammadsyafiq213510100/commit/e3a8d58be12fed0601c1c1ad63869035650af484))
* **audit:** jurnal DataTable, transactions API, e2e, CI build ([ec8b386](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ec8b386c64b6c0656cb40d575c5ebaac2393c3d5))
* **audit:** mobile shell, API contract, toasts, pelanggan table ([0bdd46b](https://github.com/sapikkk/muhammadsyafiq213510100/commit/0bdd46bc2f5fcf87c8c9bc8329d38df6e371942b))
* **audit:** PHASE 1 dev-only RBAC bypass ([687971d](https://github.com/sapikkk/muhammadsyafiq213510100/commit/687971dd9553401b32484c9a673bf1a877b17539))
* **audit:** riwayat perubahan pelanggan, inventaris, petani, user, pack ([78a5ca2](https://github.com/sapikkk/muhammadsyafiq213510100/commit/78a5ca296fe1603039923cc394e83139a883ea1a))
* **audit:** runbook, fixes, toaster, pengaturan shell ([ceeb8d3](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ceeb8d3030681f048745a1459d56e223679a9f11))
* **audit:** SessionShell, segment errors, DataTable pilot ([f2e9a52](https://github.com/sapikkk/muhammadsyafiq213510100/commit/f2e9a52b93e60a6f58d8fe6533226afcf8379f05))
* **flow:** active pack Tingkat B — detail, Sheet buat/pakai (Fase 6) ([f77780c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/f77780c748d8653690708f59f88899945032bc17))
* **flow:** akun Tingkat B — Sheet Tambah/Ubah, Dialog nonaktifkan ([a6912ce](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a6912cef4a26fd0f4aefd9dd49583017c17d6f85))
* **flow:** fondasi UI Sheet, FormSheet, ConfirmDialog, RowActions (Fase 1) ([a8cd0e0](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a8cd0e0d343ef5a61cc5667b4d8566c3b5bf1a96))
* **flow:** infrastruktur Tingkat B — Sheet tambah, Dialog status kolam ([951eb0b](https://github.com/sapikkk/muhammadsyafiq213510100/commit/951eb0b6fa9183b9ef4b5769d5519ebe4511289e))
* **flow:** inventaris Tingkat B — detail, Sheet tambah/pergerakan (Fase 5) ([739b419](https://github.com/sapikkk/muhammadsyafiq213510100/commit/739b4199bfddbefd98992009904295ec940b3a1b))
* **flow:** penjualan Tingkat C — daftar, /baru, /[id] aksi per status ([fa27406](https://github.com/sapikkk/muhammadsyafiq213510100/commit/fa27406dca0861928a04db8e1aea42a3586fdabe))
* **flow:** pilot pelanggan Tingkat A — Sheet Tambah/Ubah (Fase 2) ([921261c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/921261cdaa70d77b8450314d7e199a1fbb676cd9))
* **flow:** siklus Tingkat C, inventaris Ubah/Nonaktifkan, banned-ui fix ([bbfa342](https://github.com/sapikkk/muhammadsyafiq213510100/commit/bbfa34226cc127843970c15790bc2a716807d97d))
* **flow:** Tingkat A — kolom aktif pelanggan, petani master, user ([21b461e](https://github.com/sapikkk/muhammadsyafiq213510100/commit/21b461e0bd17a2dbc1a44de1d5d2be34f3f87467))
* **flow:** Tingkat A petani master + owner pengguna (Fase 3) ([8014e9e](https://github.com/sapikkk/muhammadsyafiq213510100/commit/8014e9e4cacea1eabed1e52075e26329cb527332))
* **flow:** varietas Tingkat B — detail, Sheet, status Dialog (Fase 4) ([cf4babb](https://github.com/sapikkk/muhammadsyafiq213510100/commit/cf4babbd8f4c8be0b70760ceb5bcd8392d6d6a7d))
* **home:** dashboard progress GitHub Project + tooling deploy Vercel ([4c9cf2d](https://github.com/sapikkk/muhammadsyafiq213510100/commit/4c9cf2d86bf80b4f71cbb359de2640b598f0a820)), closes [#1](https://github.com/sapikkk/muhammadsyafiq213510100/issues/1)
* **hpp:** US2.3 override + plastik + jurnal 5300 ([#68](https://github.com/sapikkk/muhammadsyafiq213510100/issues/68)) ([e80ba6e](https://github.com/sapikkk/muhammadsyafiq213510100/commit/e80ba6e0ae41bb9117a93a35c839e47ef0d6db8d))
* **hpp:** US2.3 override, plastik, jurnal susut abnormal (US2.5) ([6e7cf1c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/6e7cf1cc8f6656affde69bbb796b05071709a743))
* **laporan:** US6.3 ekspor jurnal xlsx dan L/R + neraca PDF ([3015228](https://github.com/sapikkk/muhammadsyafiq213510100/commit/30152286ab5fa308baa2211b5d2721b0c9034586))
* **laporan:** US6.5 arus kas Owner dengan filter periode dan PDF ([6cae9f8](https://github.com/sapikkk/muhammadsyafiq213510100/commit/6cae9f8a861e4794eecedd818de9ed9217ae09b4))
* let admin register petani accounts (US1.6) ([16208c0](https://github.com/sapikkk/muhammadsyafiq213510100/commit/16208c056ef7c06f889b22eb9231bea7f93fc773))
* **notifikasi:** pusat notifikasi RBAC, deep link, dan README dokumentasi ([920404c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/920404c1e2f0feb070e3fdbf7ca8a85b670e8cfb))
* **notifikasi:** toast mengambang dan deep link antar peran ([97bb182](https://github.com/sapikkk/muhammadsyafiq213510100/commit/97bb182795bce07c76d0858201af3531d64beb46))
* **owner:** US1.9 kelola user dan US2.6 COA/jurnal/prive ([634d48f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/634d48f1b56930d870fb3beabbe4f8de78c109fc))
* **owner:** US6.1 KPI dan grafik pendapatan vs beban ([f8072db](https://github.com/sapikkk/muhammadsyafiq213510100/commit/f8072db80f2aef3f3887a26a7a5c21ed6e538d84))
* **owner:** US6.1 KPI dashboard ([#73](https://github.com/sapikkk/muhammadsyafiq213510100/issues/73)) ([c1db931](https://github.com/sapikkk/muhammadsyafiq213510100/commit/c1db9311d413a10d65a239895077a05ba6ab6441))
* **owner:** US6.2 pie biaya + drill-down ([#74](https://github.com/sapikkk/muhammadsyafiq213510100/issues/74)) ([6487af2](https://github.com/sapikkk/muhammadsyafiq213510100/commit/6487af2a43eead4cfb11e4ba2ac331eadf132b90))
* **owner:** US6.2 pie breakdown biaya dan drill-down jurnal ([083e70b](https://github.com/sapikkk/muhammadsyafiq213510100/commit/083e70ba852481229e69263fdd5a0769c743a308))
* **owner:** US6.4 evaluasi margin, BEP, dan kapasitas idle ([6b56567](https://github.com/sapikkk/muhammadsyafiq213510100/commit/6b56567bcfdc68907e88b35794a4c864a2d48145))
* **penjualan:** EPIC-5 US5.1–5.5 ([#72](https://github.com/sapikkk/muhammadsyafiq213510100/issues/72)) ([564c85f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/564c85f7124c296b5a6442d749dd01245438fee9))
* **penjualan:** US5.1 pelanggan + sales order ([#69](https://github.com/sapikkk/muhammadsyafiq213510100/issues/69)) ([ccd11b9](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ccd11b9084d00b4d71b2ff5a853e4b166fc43034))
* **penjualan:** US5.1 pelanggan + sales order DRAFT (US5.2 konfirmasi stok) ([b331878](https://github.com/sapikkk/muhammadsyafiq213510100/commit/b331878c15051b672b361eb2aaf25f8988eb430e))
* **penjualan:** US5.3 pengiriman SO dan US5.4 jurnal PENDING saat DELIVERED ([17e7312](https://github.com/sapikkk/muhammadsyafiq213510100/commit/17e731208459d71280cf79bf162469228831312e))
* **penjualan:** US5.5 invoice, batal SO, dan biaya packing ([2ff62ce](https://github.com/sapikkk/muhammadsyafiq213510100/commit/2ff62ce7271de1a1621de6466fa0ce7eba9857b9))
* **petani:** bantuan rockwool/benih dan seed varietas pasar ([a5bfdda](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a5bfdda5b8fcb051fd9662f34abf5f07b4896a55))
* **produksi:** US3.5 kegagalan + US2.5 susut ([#66](https://github.com/sapikkk/muhammadsyafiq213510100/issues/66)) ([90f8cdb](https://github.com/sapikkk/muhammadsyafiq213510100/commit/90f8cdbda2d2496001f1eca086b9e939fd9ba8ed))
* **produksi:** US3.5 log kegagalan dan US2.5 klasifikasi susut ([92f7199](https://github.com/sapikkk/muhammadsyafiq213510100/commit/92f71992b1d5c081614872a7fccee447c053f389))
* **produksi:** US3.6 timeline + US3.7 dashboard petani ([#67](https://github.com/sapikkk/muhammadsyafiq213510100/issues/67)) ([2f0df12](https://github.com/sapikkk/muhammadsyafiq213510100/commit/2f0df120966cc0d62d833f841f4ccca30d1ddc6b))
* **produksi:** US3.6 timeline/tambal/monitor dan US3.7 dashboard petani ([4d91f9a](https://github.com/sapikkk/muhammadsyafiq213510100/commit/4d91f9af2b557bd8ab91e290f6b6b2287d3d7051))
* record the Architecture spec and scaffold aplikasi Kokonus Farm ([ed3863b](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ed3863b6e26a2b3482bc800531d8a1e4e4f751e7))
* scaffold Kokonus Farm composer app ([5d88193](https://github.com/sapikkk/muhammadsyafiq213510100/commit/5d88193469d5e08bdc4b087119dc0cd2be80e48e))
* **sprint-5:** selesaikan T5.5–T5.9 — deploy doc, pelatihan, perbaiki e2e ([5c1e54f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/5c1e54fef5c0bbd83aca124997b537b573301c39))
* **sprint-5:** T5.1–T5.4 usability, seed demo, audit jurnal, e2e ([3cb30ef](https://github.com/sapikkk/muhammadsyafiq213510100/commit/3cb30efdf9187838aa19b869167a2d6e9cb007ca))
* **ui:** dashboard owner menampilkan data lewat tabel, bukan Card ([3930bac](https://github.com/sapikkk/muhammadsyafiq213510100/commit/3930bac556c8491ded75a219fb09496b4f9002a8))
* **ui:** DataTable owner keuangan, DetailLayout jurnal, filter seragam ([4c817b1](https://github.com/sapikkk/muhammadsyafiq213510100/commit/4c817b176c09cbe3f5b60bdcba0705c706352e40))
* **ui:** redesign layout to sidebar dashboard with shadcn zinc theme ([33aab71](https://github.com/sapikkk/muhammadsyafiq213510100/commit/33aab7104d9d7bedbb9408e18b8342d4835a54a1))
* **ui:** selaraskan jurnal, harvest review, invoice ke DetailLayout/Crud ([07057aa](https://github.com/sapikkk/muhammadsyafiq213510100/commit/07057aa589913ac8379ef23442331f9b2774278a))
* **ui:** sheet detail lebar, coachmark alur, sidebar collapse ([66e1a22](https://github.com/sapikkk/muhammadsyafiq213510100/commit/66e1a22e18558c90451565e46ea6b565d16ace67))
* **ui:** sidebar layout per peran dan US3.3 laporan panen ([e0d2fdd](https://github.com/sapikkk/muhammadsyafiq213510100/commit/e0d2fdd43f8cc76e38f37cacd75b26eaeaa3c44f))
* **ui:** teks layar Indonesia sederhana dan label status ([2fdb912](https://github.com/sapikkk/muhammadsyafiq213510100/commit/2fdb9122ce2587dcc821f086e66b04896910eacd))
* **US2.3:** implementasi approve/reject harvest report dan otomatisasi HPP serta jurnal persediaan ([9164601](https://github.com/sapikkk/muhammadsyafiq213510100/commit/916460183590e27843379a23753d683efb140e35))
* **us2.4:** form biaya langsung dan overhead periode ([7070025](https://github.com/sapikkk/muhammadsyafiq213510100/commit/70700253a0e98b0fb493f2811213987ca925bd9f))
* **us3.1:** mulai siklus semai dengan kode batch dan active pack ([4adb38c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/4adb38c55dd059af527771600f7594e4b8cb4407))
* **us3.2:** pindah fase produksi dengan log dan konfirmasi ([ad7a763](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ad7a76381d115148f24dd56a8e1a8da4e5d46b34))
* **us3.3:** laporan panen Petani dan perbaikan form siklus ([aae8d9f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/aae8d9fdfc376d6fd689bffbd02a162cb8e9fc67)), closes [#61](https://github.com/sapikkk/muhammadsyafiq213510100/issues/61)
* **us3.4:** master varietas dan parameter asumsi ([0b42ad3](https://github.com/sapikkk/muhammadsyafiq213510100/commit/0b42ad37c890a3f3c8e398067447b719d77274e6))
* **us4.1:** stok inventaris dan log pergerakan IN/OUT/ADJUST ([eccc22b](https://github.com/sapikkk/muhammadsyafiq213510100/commit/eccc22b17ca82c1857ba621ff74d8eb347660e9f))
* **us4.2:** active pack biaya per unit dan status habis ([deca235](https://github.com/sapikkk/muhammadsyafiq213510100/commit/deca2359c3331bad742a9eb18c6c35675d344432))
* **us4.3:** alert stok minimum via API dan halaman stok rendah ([a75ed77](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a75ed7736fee8a7e40a04daf76fad401a4360045))
* **us4.3:** alias GET /api/inventory/alerts ke /alert ([108885e](https://github.com/sapikkk/muhammadsyafiq213510100/commit/108885e066e03a914d3600b1fbf10f49cbd3ed0d))
* **us4.4:** master lahan, greenhouse, dan kolam ([401433b](https://github.com/sapikkk/muhammadsyafiq213510100/commit/401433b9a20ac1d030eb4fa845cacf5d7c2bf0e2))
* **us4.5:** master petani ERD dan navigasi sidebar ([38ddaab](https://github.com/sapikkk/muhammadsyafiq213510100/commit/38ddaab3a7d69d4268bc650f0cb056267e916e16))
* **ux:** flow nav, cache & tables v1.28.0 ([#122](https://github.com/sapikkk/muhammadsyafiq213510100/issues/122)) ([#123](https://github.com/sapikkk/muhammadsyafiq213510100/issues/123)) ([a48f999](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a48f999967907fae8209fd237912e46ba2faaf4e))
* **ux:** Panduan seragam di semua halaman operasi dan utilitas ([c991dbe](https://github.com/sapikkk/muhammadsyafiq213510100/commit/c991dbec77228fca3e3c2bfcc048cb5b3866382b))
* **ux:** sidebar epik Owner 1.0–7.0 dan coachmark UAT per halaman ([af32623](https://github.com/sapikkk/muhammadsyafiq213510100/commit/af326236ac1638c994fd8edaaf40ce6844be016a))
* **v2-A.1:** Akun.is_system + guard COA standar ([#95](https://github.com/sapikkk/muhammadsyafiq213510100/issues/95)) ([cd619a0](https://github.com/sapikkk/muhammadsyafiq213510100/commit/cd619a02829dd32f7fcbd0c6c4b59cf02d076386))
* **v2-A.3:** jurnal panen Dr 1350 Cr WIP ([#114](https://github.com/sapikkk/muhammadsyafiq213510100/issues/114)) ([740869c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/740869ca5353358f760c72e392af123f1ace55b1))
* **v2-A.4:** kas split 1100/1110 ([#116](https://github.com/sapikkk/muhammadsyafiq213510100/issues/116)) ([085768c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/085768c51c22c6d05bcfca4564ba2a2830d15a6d))
* **v2-B.1:** abort siklus gagal total ([#96](https://github.com/sapikkk/muhammadsyafiq213510100/issues/96)) ([8160c06](https://github.com/sapikkk/muhammadsyafiq213510100/commit/8160c06450b4276e16b9d64aebca6723a36d8482))
* **v2-C.1:** kapasitas lubang pack + semai proporsional ([#97](https://github.com/sapikkk/muhammadsyafiq213510100/issues/97)) ([da42fde](https://github.com/sapikkk/muhammadsyafiq213510100/commit/da42fdeec4310bd19ccee45042586c7b3fa7e76d))
* **v2-D.1:** SO lubang terpakai + hpp_order ([#98](https://github.com/sapikkk/muhammadsyafiq213510100/issues/98)) ([0e84814](https://github.com/sapikkk/muhammadsyafiq213510100/commit/0e848141e1d2c246257b87d6bf79d913eea2c3a8))
* **v2-E.1:** sales order DP schema and uang muka posting ([#108](https://github.com/sapikkk/muhammadsyafiq213510100/issues/108)) ([c93d43f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/c93d43fd5e5542d61a6048ec00c32a1d300687ba))
* **v2-F.2:** Smart Jurnal 9 tipe ([#117](https://github.com/sapikkk/muhammadsyafiq213510100/issues/117)) ([a15e486](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a15e486ec8de2f425ba75a43e847e4f808a03499))
* **v2-F.3:** Smart Jurnal +5 tipe v1.25.0 ([#119](https://github.com/sapikkk/muhammadsyafiq213510100/issues/119)) ([386377f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/386377fa78466ac9ccd0d4cde0e0b5841ce3269e)), closes [#92](https://github.com/sapikkk/muhammadsyafiq213510100/issues/92)
* **v2-F/G/H:** Smart Jurnal, KPI Owner, period lock ([#109](https://github.com/sapikkk/muhammadsyafiq213510100/issues/109)) ([c216e6f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/c216e6f232c3626591cdce358d8f12ab1977c446))
* **v2-H.2:** penyusutan otomatis + closeout docs v1.24.0 ([#118](https://github.com/sapikkk/muhammadsyafiq213510100/issues/118)) ([ebb2b27](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ebb2b27cc4f6f156e317b67953f60c94d134bbc6))
* **v2:** closeout epic [#87](https://github.com/sapikkk/muhammadsyafiq213510100/issues/87)–[#94](https://github.com/sapikkk/muhammadsyafiq213510100/issues/94) v1.26.0 ([#120](https://github.com/sapikkk/muhammadsyafiq213510100/issues/120)) ([0b4ac2a](https://github.com/sapikkk/muhammadsyafiq213510100/commit/0b4ac2a8f4cd97b5c9994db8b459aaac3e784014))

# 1.0.0 (2026-10-12)


### Bug Fixes

* **admin:** komponen Textarea dan copy halaman laporan panen ([c23cc1f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/c23cc1fb1baa211cc9e32ad80085fb9807d7f13b))
* **audit:** typecheck audit-nav spec (Array.from Set) ([11efb1d](https://github.com/sapikkk/muhammadsyafiq213510100/commit/11efb1d757805db8402e9d5e8bdfc20d96c7021f))
* **client:** cegah Prisma masuk bundle browser (v1.28.1) ([#125](https://github.com/sapikkk/muhammadsyafiq213510100/issues/125)) ([042e0af](https://github.com/sapikkk/muhammadsyafiq213510100/commit/042e0af6007388abddcc675d800b126fb48a7966))
* declare composer config in prisma.config.ts ([4cae52a](https://github.com/sapikkk/muhammadsyafiq213510100/commit/4cae52aaedd90872d125d9e5b9c8d93282d71067))
* **e2e:** T5.1 via API phase + daftar HP; E2E_DEMO_SIKLUS_ID di CI ([717b4de](https://github.com/sapikkk/muhammadsyafiq213510100/commit/717b4defb0ee2b26f4e4a6b6acd24556b8509ce2))
* **notifikasi:** inbox unread di atas, redirect aman, refresh badge ([1375f0c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/1375f0cfc9be6c64d8735f6bfa019b43126f1f52))
* **routing:** halaman baru SO/jurnal dan aksi siklus petani ([b7f874d](https://github.com/sapikkk/muhammadsyafiq213510100/commit/b7f874dd8fe12a43b9f40d04b7f674afbf50b703))
* **seed:** jalankan seed-akun.js langsung untuk set isSystem ([ebaed7d](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ebaed7d62ef86a47ff317dca80d7fc9857566f8b))
* **sprint-5:** reset batch demo seed + perbaiki e2e T5.1/T5.3 ([b4e6f09](https://github.com/sapikkk/muhammadsyafiq213510100/commit/b4e6f095eb3b8613165c88500c7cee0047d91159))
* **ui:** pulihkan tab lama saat chunk JS 404 setelah deploy ([6a45c4f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/6a45c4f5ad256a91dd1d8e58d7d6b0396286e89b))
* **ui:** sidebar Owner — satu item aktif, tanpa blok hitam ([a7b9427](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a7b9427f28fd24efd3145d469220cbf2e0c75dee))
* **ux:** sejajarkan Panduan dengan header halaman dan spacing gap-6 ([eba0131](https://github.com/sapikkk/muhammadsyafiq213510100/commit/eba01316c07ca28a0e100d3376a0410074a692fc))
* **v2-G.1:** wire KPI hidroponik on owner dashboard ([#110](https://github.com/sapikkk/muhammadsyafiq213510100/issues/110)) ([307f1e4](https://github.com/sapikkk/muhammadsyafiq213510100/commit/307f1e4a6c8b56c7de0e4e505c8fa809ad88f6ac))


### Features

* add admin-approved password reset (US1.5) ([0385ca3](https://github.com/sapikkk/muhammadsyafiq213510100/commit/0385ca31657a8e41b052b8fadc88c5724de0810a))
* add chart of accounts with tree UI, soft delete, and /api/accounts (US2.1) ([e248df5](https://github.com/sapikkk/muhammadsyafiq213510100/commit/e248df5d3f7fe5cfb9a103f6cc48810407bc7f5c))
* add double-entry journal with approval and balance updates (US2.2) ([5ab66ca](https://github.com/sapikkk/muhammadsyafiq213510100/commit/5ab66caf63aae2dba97c75d0461ce7ffe89a2541))
* add global loading, error, 404, and 403 states (US1.8) ([4390127](https://github.com/sapikkk/muhammadsyafiq213510100/commit/43901275e0b3a9862deafd88f70d6798fba1c1db))
* add settings page with profile, password, and role matrix (US1.7) ([c58c907](https://github.com/sapikkk/muhammadsyafiq213510100/commit/c58c9079c9db6e7fad6521a9c7e9e75886feea14))
* add the ERD schema and role login ([ced6fac](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ced6fac72ff80364adb27881f382c9cd86462bac))
* **audit:** DataTable search, inventaris/varietas, API contract ([e3a8d58](https://github.com/sapikkk/muhammadsyafiq213510100/commit/e3a8d58be12fed0601c1c1ad63869035650af484))
* **audit:** jurnal DataTable, transactions API, e2e, CI build ([ec8b386](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ec8b386c64b6c0656cb40d575c5ebaac2393c3d5))
* **audit:** mobile shell, API contract, toasts, pelanggan table ([0bdd46b](https://github.com/sapikkk/muhammadsyafiq213510100/commit/0bdd46bc2f5fcf87c8c9bc8329d38df6e371942b))
* **audit:** PHASE 1 dev-only RBAC bypass ([687971d](https://github.com/sapikkk/muhammadsyafiq213510100/commit/687971dd9553401b32484c9a673bf1a877b17539))
* **audit:** riwayat perubahan pelanggan, inventaris, petani, user, pack ([78a5ca2](https://github.com/sapikkk/muhammadsyafiq213510100/commit/78a5ca296fe1603039923cc394e83139a883ea1a))
* **audit:** runbook, fixes, toaster, pengaturan shell ([ceeb8d3](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ceeb8d3030681f048745a1459d56e223679a9f11))
* **audit:** SessionShell, segment errors, DataTable pilot ([f2e9a52](https://github.com/sapikkk/muhammadsyafiq213510100/commit/f2e9a52b93e60a6f58d8fe6533226afcf8379f05))
* **flow:** active pack Tingkat B — detail, Sheet buat/pakai (Fase 6) ([f77780c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/f77780c748d8653690708f59f88899945032bc17))
* **flow:** akun Tingkat B — Sheet Tambah/Ubah, Dialog nonaktifkan ([a6912ce](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a6912cef4a26fd0f4aefd9dd49583017c17d6f85))
* **flow:** fondasi UI Sheet, FormSheet, ConfirmDialog, RowActions (Fase 1) ([a8cd0e0](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a8cd0e0d343ef5a61cc5667b4d8566c3b5bf1a96))
* **flow:** infrastruktur Tingkat B — Sheet tambah, Dialog status kolam ([951eb0b](https://github.com/sapikkk/muhammadsyafiq213510100/commit/951eb0b6fa9183b9ef4b5769d5519ebe4511289e))
* **flow:** inventaris Tingkat B — detail, Sheet tambah/pergerakan (Fase 5) ([739b419](https://github.com/sapikkk/muhammadsyafiq213510100/commit/739b4199bfddbefd98992009904295ec940b3a1b))
* **flow:** penjualan Tingkat C — daftar, /baru, /[id] aksi per status ([fa27406](https://github.com/sapikkk/muhammadsyafiq213510100/commit/fa27406dca0861928a04db8e1aea42a3586fdabe))
* **flow:** pilot pelanggan Tingkat A — Sheet Tambah/Ubah (Fase 2) ([921261c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/921261cdaa70d77b8450314d7e199a1fbb676cd9))
* **flow:** siklus Tingkat C, inventaris Ubah/Nonaktifkan, banned-ui fix ([bbfa342](https://github.com/sapikkk/muhammadsyafiq213510100/commit/bbfa34226cc127843970c15790bc2a716807d97d))
* **flow:** Tingkat A — kolom aktif pelanggan, petani master, user ([21b461e](https://github.com/sapikkk/muhammadsyafiq213510100/commit/21b461e0bd17a2dbc1a44de1d5d2be34f3f87467))
* **flow:** Tingkat A petani master + owner pengguna (Fase 3) ([8014e9e](https://github.com/sapikkk/muhammadsyafiq213510100/commit/8014e9e4cacea1eabed1e52075e26329cb527332))
* **flow:** varietas Tingkat B — detail, Sheet, status Dialog (Fase 4) ([cf4babb](https://github.com/sapikkk/muhammadsyafiq213510100/commit/cf4babbd8f4c8be0b70760ceb5bcd8392d6d6a7d))
* **home:** dashboard progress GitHub Project + tooling deploy Vercel ([4c9cf2d](https://github.com/sapikkk/muhammadsyafiq213510100/commit/4c9cf2d86bf80b4f71cbb359de2640b598f0a820)), closes [#1](https://github.com/sapikkk/muhammadsyafiq213510100/issues/1)
* **hpp:** US2.3 override + plastik + jurnal 5300 ([#68](https://github.com/sapikkk/muhammadsyafiq213510100/issues/68)) ([e80ba6e](https://github.com/sapikkk/muhammadsyafiq213510100/commit/e80ba6e0ae41bb9117a93a35c839e47ef0d6db8d))
* **hpp:** US2.3 override, plastik, jurnal susut abnormal (US2.5) ([6e7cf1c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/6e7cf1cc8f6656affde69bbb796b05071709a743))
* **laporan:** US6.3 ekspor jurnal xlsx dan L/R + neraca PDF ([3015228](https://github.com/sapikkk/muhammadsyafiq213510100/commit/30152286ab5fa308baa2211b5d2721b0c9034586))
* **laporan:** US6.5 arus kas Owner dengan filter periode dan PDF ([6cae9f8](https://github.com/sapikkk/muhammadsyafiq213510100/commit/6cae9f8a861e4794eecedd818de9ed9217ae09b4))
* let admin register petani accounts (US1.6) ([16208c0](https://github.com/sapikkk/muhammadsyafiq213510100/commit/16208c056ef7c06f889b22eb9231bea7f93fc773))
* **notifikasi:** pusat notifikasi RBAC, deep link, dan README dokumentasi ([920404c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/920404c1e2f0feb070e3fdbf7ca8a85b670e8cfb))
* **notifikasi:** toast mengambang dan deep link antar peran ([97bb182](https://github.com/sapikkk/muhammadsyafiq213510100/commit/97bb182795bce07c76d0858201af3531d64beb46))
* **owner:** US1.9 kelola user dan US2.6 COA/jurnal/prive ([634d48f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/634d48f1b56930d870fb3beabbe4f8de78c109fc))
* **owner:** US6.1 KPI dan grafik pendapatan vs beban ([f8072db](https://github.com/sapikkk/muhammadsyafiq213510100/commit/f8072db80f2aef3f3887a26a7a5c21ed6e538d84))
* **owner:** US6.1 KPI dashboard ([#73](https://github.com/sapikkk/muhammadsyafiq213510100/issues/73)) ([c1db931](https://github.com/sapikkk/muhammadsyafiq213510100/commit/c1db9311d413a10d65a239895077a05ba6ab6441))
* **owner:** US6.2 pie biaya + drill-down ([#74](https://github.com/sapikkk/muhammadsyafiq213510100/issues/74)) ([6487af2](https://github.com/sapikkk/muhammadsyafiq213510100/commit/6487af2a43eead4cfb11e4ba2ac331eadf132b90))
* **owner:** US6.2 pie breakdown biaya dan drill-down jurnal ([083e70b](https://github.com/sapikkk/muhammadsyafiq213510100/commit/083e70ba852481229e69263fdd5a0769c743a308))
* **owner:** US6.4 evaluasi margin, BEP, dan kapasitas idle ([6b56567](https://github.com/sapikkk/muhammadsyafiq213510100/commit/6b56567bcfdc68907e88b35794a4c864a2d48145))
* **penjualan:** EPIC-5 US5.1–5.5 ([#72](https://github.com/sapikkk/muhammadsyafiq213510100/issues/72)) ([564c85f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/564c85f7124c296b5a6442d749dd01245438fee9))
* **penjualan:** US5.1 pelanggan + sales order ([#69](https://github.com/sapikkk/muhammadsyafiq213510100/issues/69)) ([ccd11b9](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ccd11b9084d00b4d71b2ff5a853e4b166fc43034))
* **penjualan:** US5.1 pelanggan + sales order DRAFT (US5.2 konfirmasi stok) ([b331878](https://github.com/sapikkk/muhammadsyafiq213510100/commit/b331878c15051b672b361eb2aaf25f8988eb430e))
* **penjualan:** US5.3 pengiriman SO dan US5.4 jurnal PENDING saat DELIVERED ([17e7312](https://github.com/sapikkk/muhammadsyafiq213510100/commit/17e731208459d71280cf79bf162469228831312e))
* **penjualan:** US5.5 invoice, batal SO, dan biaya packing ([2ff62ce](https://github.com/sapikkk/muhammadsyafiq213510100/commit/2ff62ce7271de1a1621de6466fa0ce7eba9857b9))
* **petani:** bantuan rockwool/benih dan seed varietas pasar ([a5bfdda](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a5bfdda5b8fcb051fd9662f34abf5f07b4896a55))
* **produksi:** US3.5 kegagalan + US2.5 susut ([#66](https://github.com/sapikkk/muhammadsyafiq213510100/issues/66)) ([90f8cdb](https://github.com/sapikkk/muhammadsyafiq213510100/commit/90f8cdbda2d2496001f1eca086b9e939fd9ba8ed))
* **produksi:** US3.5 log kegagalan dan US2.5 klasifikasi susut ([92f7199](https://github.com/sapikkk/muhammadsyafiq213510100/commit/92f71992b1d5c081614872a7fccee447c053f389))
* **produksi:** US3.6 timeline + US3.7 dashboard petani ([#67](https://github.com/sapikkk/muhammadsyafiq213510100/issues/67)) ([2f0df12](https://github.com/sapikkk/muhammadsyafiq213510100/commit/2f0df120966cc0d62d833f841f4ccca30d1ddc6b))
* **produksi:** US3.6 timeline/tambal/monitor dan US3.7 dashboard petani ([4d91f9a](https://github.com/sapikkk/muhammadsyafiq213510100/commit/4d91f9af2b557bd8ab91e290f6b6b2287d3d7051))
* record the Architecture spec and scaffold aplikasi Kokonus Farm ([ed3863b](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ed3863b6e26a2b3482bc800531d8a1e4e4f751e7))
* scaffold Kokonus Farm composer app ([5d88193](https://github.com/sapikkk/muhammadsyafiq213510100/commit/5d88193469d5e08bdc4b087119dc0cd2be80e48e))
* **sprint-5:** selesaikan T5.5–T5.9 — deploy doc, pelatihan, perbaiki e2e ([5c1e54f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/5c1e54fef5c0bbd83aca124997b537b573301c39))
* **sprint-5:** T5.1–T5.4 usability, seed demo, audit jurnal, e2e ([3cb30ef](https://github.com/sapikkk/muhammadsyafiq213510100/commit/3cb30efdf9187838aa19b869167a2d6e9cb007ca))
* **ui:** dashboard owner menampilkan data lewat tabel, bukan Card ([3930bac](https://github.com/sapikkk/muhammadsyafiq213510100/commit/3930bac556c8491ded75a219fb09496b4f9002a8))
* **ui:** DataTable owner keuangan, DetailLayout jurnal, filter seragam ([4c817b1](https://github.com/sapikkk/muhammadsyafiq213510100/commit/4c817b176c09cbe3f5b60bdcba0705c706352e40))
* **ui:** redesign layout to sidebar dashboard with shadcn zinc theme ([33aab71](https://github.com/sapikkk/muhammadsyafiq213510100/commit/33aab7104d9d7bedbb9408e18b8342d4835a54a1))
* **ui:** selaraskan jurnal, harvest review, invoice ke DetailLayout/Crud ([07057aa](https://github.com/sapikkk/muhammadsyafiq213510100/commit/07057aa589913ac8379ef23442331f9b2774278a))
* **ui:** sheet detail lebar, coachmark alur, sidebar collapse ([66e1a22](https://github.com/sapikkk/muhammadsyafiq213510100/commit/66e1a22e18558c90451565e46ea6b565d16ace67))
* **ui:** sidebar layout per peran dan US3.3 laporan panen ([e0d2fdd](https://github.com/sapikkk/muhammadsyafiq213510100/commit/e0d2fdd43f8cc76e38f37cacd75b26eaeaa3c44f))
* **ui:** teks layar Indonesia sederhana dan label status ([2fdb912](https://github.com/sapikkk/muhammadsyafiq213510100/commit/2fdb9122ce2587dcc821f086e66b04896910eacd))
* **US2.3:** implementasi approve/reject harvest report dan otomatisasi HPP serta jurnal persediaan ([9164601](https://github.com/sapikkk/muhammadsyafiq213510100/commit/916460183590e27843379a23753d683efb140e35))
* **us2.4:** form biaya langsung dan overhead periode ([7070025](https://github.com/sapikkk/muhammadsyafiq213510100/commit/70700253a0e98b0fb493f2811213987ca925bd9f))
* **us3.1:** mulai siklus semai dengan kode batch dan active pack ([4adb38c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/4adb38c55dd059af527771600f7594e4b8cb4407))
* **us3.2:** pindah fase produksi dengan log dan konfirmasi ([ad7a763](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ad7a76381d115148f24dd56a8e1a8da4e5d46b34))
* **us3.3:** laporan panen Petani dan perbaikan form siklus ([aae8d9f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/aae8d9fdfc376d6fd689bffbd02a162cb8e9fc67)), closes [#61](https://github.com/sapikkk/muhammadsyafiq213510100/issues/61)
* **us3.4:** master varietas dan parameter asumsi ([0b42ad3](https://github.com/sapikkk/muhammadsyafiq213510100/commit/0b42ad37c890a3f3c8e398067447b719d77274e6))
* **us4.1:** stok inventaris dan log pergerakan IN/OUT/ADJUST ([eccc22b](https://github.com/sapikkk/muhammadsyafiq213510100/commit/eccc22b17ca82c1857ba621ff74d8eb347660e9f))
* **us4.2:** active pack biaya per unit dan status habis ([deca235](https://github.com/sapikkk/muhammadsyafiq213510100/commit/deca2359c3331bad742a9eb18c6c35675d344432))
* **us4.3:** alert stok minimum via API dan halaman stok rendah ([a75ed77](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a75ed7736fee8a7e40a04daf76fad401a4360045))
* **us4.3:** alias GET /api/inventory/alerts ke /alert ([108885e](https://github.com/sapikkk/muhammadsyafiq213510100/commit/108885e066e03a914d3600b1fbf10f49cbd3ed0d))
* **us4.4:** master lahan, greenhouse, dan kolam ([401433b](https://github.com/sapikkk/muhammadsyafiq213510100/commit/401433b9a20ac1d030eb4fa845cacf5d7c2bf0e2))
* **us4.5:** master petani ERD dan navigasi sidebar ([38ddaab](https://github.com/sapikkk/muhammadsyafiq213510100/commit/38ddaab3a7d69d4268bc650f0cb056267e916e16))
* **ux:** flow nav, cache & tables v1.28.0 ([#122](https://github.com/sapikkk/muhammadsyafiq213510100/issues/122)) ([#123](https://github.com/sapikkk/muhammadsyafiq213510100/issues/123)) ([a48f999](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a48f999967907fae8209fd237912e46ba2faaf4e))
* **ux:** Panduan seragam di semua halaman operasi dan utilitas ([c991dbe](https://github.com/sapikkk/muhammadsyafiq213510100/commit/c991dbec77228fca3e3c2bfcc048cb5b3866382b))
* **ux:** sidebar epik Owner 1.0–7.0 dan coachmark UAT per halaman ([af32623](https://github.com/sapikkk/muhammadsyafiq213510100/commit/af326236ac1638c994fd8edaaf40ce6844be016a))
* **v2-A.1:** Akun.is_system + guard COA standar ([#95](https://github.com/sapikkk/muhammadsyafiq213510100/issues/95)) ([cd619a0](https://github.com/sapikkk/muhammadsyafiq213510100/commit/cd619a02829dd32f7fcbd0c6c4b59cf02d076386))
* **v2-A.3:** jurnal panen Dr 1350 Cr WIP ([#114](https://github.com/sapikkk/muhammadsyafiq213510100/issues/114)) ([740869c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/740869ca5353358f760c72e392af123f1ace55b1))
* **v2-A.4:** kas split 1100/1110 ([#116](https://github.com/sapikkk/muhammadsyafiq213510100/issues/116)) ([085768c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/085768c51c22c6d05bcfca4564ba2a2830d15a6d))
* **v2-B.1:** abort siklus gagal total ([#96](https://github.com/sapikkk/muhammadsyafiq213510100/issues/96)) ([8160c06](https://github.com/sapikkk/muhammadsyafiq213510100/commit/8160c06450b4276e16b9d64aebca6723a36d8482))
* **v2-C.1:** kapasitas lubang pack + semai proporsional ([#97](https://github.com/sapikkk/muhammadsyafiq213510100/issues/97)) ([da42fde](https://github.com/sapikkk/muhammadsyafiq213510100/commit/da42fdeec4310bd19ccee45042586c7b3fa7e76d))
* **v2-D.1:** SO lubang terpakai + hpp_order ([#98](https://github.com/sapikkk/muhammadsyafiq213510100/issues/98)) ([0e84814](https://github.com/sapikkk/muhammadsyafiq213510100/commit/0e848141e1d2c246257b87d6bf79d913eea2c3a8))
* **v2-E.1:** sales order DP schema and uang muka posting ([#108](https://github.com/sapikkk/muhammadsyafiq213510100/issues/108)) ([c93d43f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/c93d43fd5e5542d61a6048ec00c32a1d300687ba))
* **v2-F.2:** Smart Jurnal 9 tipe ([#117](https://github.com/sapikkk/muhammadsyafiq213510100/issues/117)) ([a15e486](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a15e486ec8de2f425ba75a43e847e4f808a03499))
* **v2-F.3:** Smart Jurnal +5 tipe v1.25.0 ([#119](https://github.com/sapikkk/muhammadsyafiq213510100/issues/119)) ([386377f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/386377fa78466ac9ccd0d4cde0e0b5841ce3269e)), closes [#92](https://github.com/sapikkk/muhammadsyafiq213510100/issues/92)
* **v2-F/G/H:** Smart Jurnal, KPI Owner, period lock ([#109](https://github.com/sapikkk/muhammadsyafiq213510100/issues/109)) ([c216e6f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/c216e6f232c3626591cdce358d8f12ab1977c446))
* **v2-H.2:** penyusutan otomatis + closeout docs v1.24.0 ([#118](https://github.com/sapikkk/muhammadsyafiq213510100/issues/118)) ([ebb2b27](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ebb2b27cc4f6f156e317b67953f60c94d134bbc6))
* **v2:** closeout epic [#87](https://github.com/sapikkk/muhammadsyafiq213510100/issues/87)–[#94](https://github.com/sapikkk/muhammadsyafiq213510100/issues/94) v1.26.0 ([#120](https://github.com/sapikkk/muhammadsyafiq213510100/issues/120)) ([0b4ac2a](https://github.com/sapikkk/muhammadsyafiq213510100/commit/0b4ac2a8f4cd97b5c9994db8b459aaac3e784014))

# 1.0.0 (2026-10-12)


### Bug Fixes

* **admin:** komponen Textarea dan copy halaman laporan panen ([c23cc1f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/c23cc1fb1baa211cc9e32ad80085fb9807d7f13b))
* **audit:** typecheck audit-nav spec (Array.from Set) ([11efb1d](https://github.com/sapikkk/muhammadsyafiq213510100/commit/11efb1d757805db8402e9d5e8bdfc20d96c7021f))
* **client:** cegah Prisma masuk bundle browser (v1.28.1) ([#125](https://github.com/sapikkk/muhammadsyafiq213510100/issues/125)) ([042e0af](https://github.com/sapikkk/muhammadsyafiq213510100/commit/042e0af6007388abddcc675d800b126fb48a7966))
* declare composer config in prisma.config.ts ([4cae52a](https://github.com/sapikkk/muhammadsyafiq213510100/commit/4cae52aaedd90872d125d9e5b9c8d93282d71067))
* **e2e:** T5.1 via API phase + daftar HP; E2E_DEMO_SIKLUS_ID di CI ([717b4de](https://github.com/sapikkk/muhammadsyafiq213510100/commit/717b4defb0ee2b26f4e4a6b6acd24556b8509ce2))
* **notifikasi:** inbox unread di atas, redirect aman, refresh badge ([1375f0c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/1375f0cfc9be6c64d8735f6bfa019b43126f1f52))
* **routing:** halaman baru SO/jurnal dan aksi siklus petani ([b7f874d](https://github.com/sapikkk/muhammadsyafiq213510100/commit/b7f874dd8fe12a43b9f40d04b7f674afbf50b703))
* **seed:** jalankan seed-akun.js langsung untuk set isSystem ([ebaed7d](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ebaed7d62ef86a47ff317dca80d7fc9857566f8b))
* **sprint-5:** reset batch demo seed + perbaiki e2e T5.1/T5.3 ([b4e6f09](https://github.com/sapikkk/muhammadsyafiq213510100/commit/b4e6f095eb3b8613165c88500c7cee0047d91159))
* **ui:** pulihkan tab lama saat chunk JS 404 setelah deploy ([6a45c4f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/6a45c4f5ad256a91dd1d8e58d7d6b0396286e89b))
* **ux:** sejajarkan Panduan dengan header halaman dan spacing gap-6 ([eba0131](https://github.com/sapikkk/muhammadsyafiq213510100/commit/eba01316c07ca28a0e100d3376a0410074a692fc))
* **v2-G.1:** wire KPI hidroponik on owner dashboard ([#110](https://github.com/sapikkk/muhammadsyafiq213510100/issues/110)) ([307f1e4](https://github.com/sapikkk/muhammadsyafiq213510100/commit/307f1e4a6c8b56c7de0e4e505c8fa809ad88f6ac))


### Features

* add admin-approved password reset (US1.5) ([0385ca3](https://github.com/sapikkk/muhammadsyafiq213510100/commit/0385ca31657a8e41b052b8fadc88c5724de0810a))
* add chart of accounts with tree UI, soft delete, and /api/accounts (US2.1) ([e248df5](https://github.com/sapikkk/muhammadsyafiq213510100/commit/e248df5d3f7fe5cfb9a103f6cc48810407bc7f5c))
* add double-entry journal with approval and balance updates (US2.2) ([5ab66ca](https://github.com/sapikkk/muhammadsyafiq213510100/commit/5ab66caf63aae2dba97c75d0461ce7ffe89a2541))
* add global loading, error, 404, and 403 states (US1.8) ([4390127](https://github.com/sapikkk/muhammadsyafiq213510100/commit/43901275e0b3a9862deafd88f70d6798fba1c1db))
* add settings page with profile, password, and role matrix (US1.7) ([c58c907](https://github.com/sapikkk/muhammadsyafiq213510100/commit/c58c9079c9db6e7fad6521a9c7e9e75886feea14))
* add the ERD schema and role login ([ced6fac](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ced6fac72ff80364adb27881f382c9cd86462bac))
* **audit:** DataTable search, inventaris/varietas, API contract ([e3a8d58](https://github.com/sapikkk/muhammadsyafiq213510100/commit/e3a8d58be12fed0601c1c1ad63869035650af484))
* **audit:** jurnal DataTable, transactions API, e2e, CI build ([ec8b386](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ec8b386c64b6c0656cb40d575c5ebaac2393c3d5))
* **audit:** mobile shell, API contract, toasts, pelanggan table ([0bdd46b](https://github.com/sapikkk/muhammadsyafiq213510100/commit/0bdd46bc2f5fcf87c8c9bc8329d38df6e371942b))
* **audit:** PHASE 1 dev-only RBAC bypass ([687971d](https://github.com/sapikkk/muhammadsyafiq213510100/commit/687971dd9553401b32484c9a673bf1a877b17539))
* **audit:** riwayat perubahan pelanggan, inventaris, petani, user, pack ([78a5ca2](https://github.com/sapikkk/muhammadsyafiq213510100/commit/78a5ca296fe1603039923cc394e83139a883ea1a))
* **audit:** runbook, fixes, toaster, pengaturan shell ([ceeb8d3](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ceeb8d3030681f048745a1459d56e223679a9f11))
* **audit:** SessionShell, segment errors, DataTable pilot ([f2e9a52](https://github.com/sapikkk/muhammadsyafiq213510100/commit/f2e9a52b93e60a6f58d8fe6533226afcf8379f05))
* **flow:** active pack Tingkat B — detail, Sheet buat/pakai (Fase 6) ([f77780c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/f77780c748d8653690708f59f88899945032bc17))
* **flow:** akun Tingkat B — Sheet Tambah/Ubah, Dialog nonaktifkan ([a6912ce](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a6912cef4a26fd0f4aefd9dd49583017c17d6f85))
* **flow:** fondasi UI Sheet, FormSheet, ConfirmDialog, RowActions (Fase 1) ([a8cd0e0](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a8cd0e0d343ef5a61cc5667b4d8566c3b5bf1a96))
* **flow:** infrastruktur Tingkat B — Sheet tambah, Dialog status kolam ([951eb0b](https://github.com/sapikkk/muhammadsyafiq213510100/commit/951eb0b6fa9183b9ef4b5769d5519ebe4511289e))
* **flow:** inventaris Tingkat B — detail, Sheet tambah/pergerakan (Fase 5) ([739b419](https://github.com/sapikkk/muhammadsyafiq213510100/commit/739b4199bfddbefd98992009904295ec940b3a1b))
* **flow:** penjualan Tingkat C — daftar, /baru, /[id] aksi per status ([fa27406](https://github.com/sapikkk/muhammadsyafiq213510100/commit/fa27406dca0861928a04db8e1aea42a3586fdabe))
* **flow:** pilot pelanggan Tingkat A — Sheet Tambah/Ubah (Fase 2) ([921261c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/921261cdaa70d77b8450314d7e199a1fbb676cd9))
* **flow:** siklus Tingkat C, inventaris Ubah/Nonaktifkan, banned-ui fix ([bbfa342](https://github.com/sapikkk/muhammadsyafiq213510100/commit/bbfa34226cc127843970c15790bc2a716807d97d))
* **flow:** Tingkat A — kolom aktif pelanggan, petani master, user ([21b461e](https://github.com/sapikkk/muhammadsyafiq213510100/commit/21b461e0bd17a2dbc1a44de1d5d2be34f3f87467))
* **flow:** Tingkat A petani master + owner pengguna (Fase 3) ([8014e9e](https://github.com/sapikkk/muhammadsyafiq213510100/commit/8014e9e4cacea1eabed1e52075e26329cb527332))
* **flow:** varietas Tingkat B — detail, Sheet, status Dialog (Fase 4) ([cf4babb](https://github.com/sapikkk/muhammadsyafiq213510100/commit/cf4babbd8f4c8be0b70760ceb5bcd8392d6d6a7d))
* **home:** dashboard progress GitHub Project + tooling deploy Vercel ([4c9cf2d](https://github.com/sapikkk/muhammadsyafiq213510100/commit/4c9cf2d86bf80b4f71cbb359de2640b598f0a820)), closes [#1](https://github.com/sapikkk/muhammadsyafiq213510100/issues/1)
* **hpp:** US2.3 override + plastik + jurnal 5300 ([#68](https://github.com/sapikkk/muhammadsyafiq213510100/issues/68)) ([e80ba6e](https://github.com/sapikkk/muhammadsyafiq213510100/commit/e80ba6e0ae41bb9117a93a35c839e47ef0d6db8d))
* **hpp:** US2.3 override, plastik, jurnal susut abnormal (US2.5) ([6e7cf1c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/6e7cf1cc8f6656affde69bbb796b05071709a743))
* **laporan:** US6.3 ekspor jurnal xlsx dan L/R + neraca PDF ([3015228](https://github.com/sapikkk/muhammadsyafiq213510100/commit/30152286ab5fa308baa2211b5d2721b0c9034586))
* **laporan:** US6.5 arus kas Owner dengan filter periode dan PDF ([6cae9f8](https://github.com/sapikkk/muhammadsyafiq213510100/commit/6cae9f8a861e4794eecedd818de9ed9217ae09b4))
* let admin register petani accounts (US1.6) ([16208c0](https://github.com/sapikkk/muhammadsyafiq213510100/commit/16208c056ef7c06f889b22eb9231bea7f93fc773))
* **notifikasi:** pusat notifikasi RBAC, deep link, dan README dokumentasi ([920404c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/920404c1e2f0feb070e3fdbf7ca8a85b670e8cfb))
* **notifikasi:** toast mengambang dan deep link antar peran ([97bb182](https://github.com/sapikkk/muhammadsyafiq213510100/commit/97bb182795bce07c76d0858201af3531d64beb46))
* **owner:** US1.9 kelola user dan US2.6 COA/jurnal/prive ([634d48f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/634d48f1b56930d870fb3beabbe4f8de78c109fc))
* **owner:** US6.1 KPI dan grafik pendapatan vs beban ([f8072db](https://github.com/sapikkk/muhammadsyafiq213510100/commit/f8072db80f2aef3f3887a26a7a5c21ed6e538d84))
* **owner:** US6.1 KPI dashboard ([#73](https://github.com/sapikkk/muhammadsyafiq213510100/issues/73)) ([c1db931](https://github.com/sapikkk/muhammadsyafiq213510100/commit/c1db9311d413a10d65a239895077a05ba6ab6441))
* **owner:** US6.2 pie biaya + drill-down ([#74](https://github.com/sapikkk/muhammadsyafiq213510100/issues/74)) ([6487af2](https://github.com/sapikkk/muhammadsyafiq213510100/commit/6487af2a43eead4cfb11e4ba2ac331eadf132b90))
* **owner:** US6.2 pie breakdown biaya dan drill-down jurnal ([083e70b](https://github.com/sapikkk/muhammadsyafiq213510100/commit/083e70ba852481229e69263fdd5a0769c743a308))
* **owner:** US6.4 evaluasi margin, BEP, dan kapasitas idle ([6b56567](https://github.com/sapikkk/muhammadsyafiq213510100/commit/6b56567bcfdc68907e88b35794a4c864a2d48145))
* **penjualan:** EPIC-5 US5.1–5.5 ([#72](https://github.com/sapikkk/muhammadsyafiq213510100/issues/72)) ([564c85f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/564c85f7124c296b5a6442d749dd01245438fee9))
* **penjualan:** US5.1 pelanggan + sales order ([#69](https://github.com/sapikkk/muhammadsyafiq213510100/issues/69)) ([ccd11b9](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ccd11b9084d00b4d71b2ff5a853e4b166fc43034))
* **penjualan:** US5.1 pelanggan + sales order DRAFT (US5.2 konfirmasi stok) ([b331878](https://github.com/sapikkk/muhammadsyafiq213510100/commit/b331878c15051b672b361eb2aaf25f8988eb430e))
* **penjualan:** US5.3 pengiriman SO dan US5.4 jurnal PENDING saat DELIVERED ([17e7312](https://github.com/sapikkk/muhammadsyafiq213510100/commit/17e731208459d71280cf79bf162469228831312e))
* **penjualan:** US5.5 invoice, batal SO, dan biaya packing ([2ff62ce](https://github.com/sapikkk/muhammadsyafiq213510100/commit/2ff62ce7271de1a1621de6466fa0ce7eba9857b9))
* **petani:** bantuan rockwool/benih dan seed varietas pasar ([a5bfdda](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a5bfdda5b8fcb051fd9662f34abf5f07b4896a55))
* **produksi:** US3.5 kegagalan + US2.5 susut ([#66](https://github.com/sapikkk/muhammadsyafiq213510100/issues/66)) ([90f8cdb](https://github.com/sapikkk/muhammadsyafiq213510100/commit/90f8cdbda2d2496001f1eca086b9e939fd9ba8ed))
* **produksi:** US3.5 log kegagalan dan US2.5 klasifikasi susut ([92f7199](https://github.com/sapikkk/muhammadsyafiq213510100/commit/92f71992b1d5c081614872a7fccee447c053f389))
* **produksi:** US3.6 timeline + US3.7 dashboard petani ([#67](https://github.com/sapikkk/muhammadsyafiq213510100/issues/67)) ([2f0df12](https://github.com/sapikkk/muhammadsyafiq213510100/commit/2f0df120966cc0d62d833f841f4ccca30d1ddc6b))
* **produksi:** US3.6 timeline/tambal/monitor dan US3.7 dashboard petani ([4d91f9a](https://github.com/sapikkk/muhammadsyafiq213510100/commit/4d91f9af2b557bd8ab91e290f6b6b2287d3d7051))
* record the Architecture spec and scaffold aplikasi Kokonus Farm ([ed3863b](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ed3863b6e26a2b3482bc800531d8a1e4e4f751e7))
* scaffold Kokonus Farm composer app ([5d88193](https://github.com/sapikkk/muhammadsyafiq213510100/commit/5d88193469d5e08bdc4b087119dc0cd2be80e48e))
* **sprint-5:** selesaikan T5.5–T5.9 — deploy doc, pelatihan, perbaiki e2e ([5c1e54f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/5c1e54fef5c0bbd83aca124997b537b573301c39))
* **sprint-5:** T5.1–T5.4 usability, seed demo, audit jurnal, e2e ([3cb30ef](https://github.com/sapikkk/muhammadsyafiq213510100/commit/3cb30efdf9187838aa19b869167a2d6e9cb007ca))
* **ui:** dashboard owner menampilkan data lewat tabel, bukan Card ([3930bac](https://github.com/sapikkk/muhammadsyafiq213510100/commit/3930bac556c8491ded75a219fb09496b4f9002a8))
* **ui:** DataTable owner keuangan, DetailLayout jurnal, filter seragam ([4c817b1](https://github.com/sapikkk/muhammadsyafiq213510100/commit/4c817b176c09cbe3f5b60bdcba0705c706352e40))
* **ui:** redesign layout to sidebar dashboard with shadcn zinc theme ([33aab71](https://github.com/sapikkk/muhammadsyafiq213510100/commit/33aab7104d9d7bedbb9408e18b8342d4835a54a1))
* **ui:** selaraskan jurnal, harvest review, invoice ke DetailLayout/Crud ([07057aa](https://github.com/sapikkk/muhammadsyafiq213510100/commit/07057aa589913ac8379ef23442331f9b2774278a))
* **ui:** sheet detail lebar, coachmark alur, sidebar collapse ([66e1a22](https://github.com/sapikkk/muhammadsyafiq213510100/commit/66e1a22e18558c90451565e46ea6b565d16ace67))
* **ui:** sidebar layout per peran dan US3.3 laporan panen ([e0d2fdd](https://github.com/sapikkk/muhammadsyafiq213510100/commit/e0d2fdd43f8cc76e38f37cacd75b26eaeaa3c44f))
* **ui:** teks layar Indonesia sederhana dan label status ([2fdb912](https://github.com/sapikkk/muhammadsyafiq213510100/commit/2fdb9122ce2587dcc821f086e66b04896910eacd))
* **US2.3:** implementasi approve/reject harvest report dan otomatisasi HPP serta jurnal persediaan ([9164601](https://github.com/sapikkk/muhammadsyafiq213510100/commit/916460183590e27843379a23753d683efb140e35))
* **us2.4:** form biaya langsung dan overhead periode ([7070025](https://github.com/sapikkk/muhammadsyafiq213510100/commit/70700253a0e98b0fb493f2811213987ca925bd9f))
* **us3.1:** mulai siklus semai dengan kode batch dan active pack ([4adb38c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/4adb38c55dd059af527771600f7594e4b8cb4407))
* **us3.2:** pindah fase produksi dengan log dan konfirmasi ([ad7a763](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ad7a76381d115148f24dd56a8e1a8da4e5d46b34))
* **us3.3:** laporan panen Petani dan perbaikan form siklus ([aae8d9f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/aae8d9fdfc376d6fd689bffbd02a162cb8e9fc67)), closes [#61](https://github.com/sapikkk/muhammadsyafiq213510100/issues/61)
* **us3.4:** master varietas dan parameter asumsi ([0b42ad3](https://github.com/sapikkk/muhammadsyafiq213510100/commit/0b42ad37c890a3f3c8e398067447b719d77274e6))
* **us4.1:** stok inventaris dan log pergerakan IN/OUT/ADJUST ([eccc22b](https://github.com/sapikkk/muhammadsyafiq213510100/commit/eccc22b17ca82c1857ba621ff74d8eb347660e9f))
* **us4.2:** active pack biaya per unit dan status habis ([deca235](https://github.com/sapikkk/muhammadsyafiq213510100/commit/deca2359c3331bad742a9eb18c6c35675d344432))
* **us4.3:** alert stok minimum via API dan halaman stok rendah ([a75ed77](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a75ed7736fee8a7e40a04daf76fad401a4360045))
* **us4.3:** alias GET /api/inventory/alerts ke /alert ([108885e](https://github.com/sapikkk/muhammadsyafiq213510100/commit/108885e066e03a914d3600b1fbf10f49cbd3ed0d))
* **us4.4:** master lahan, greenhouse, dan kolam ([401433b](https://github.com/sapikkk/muhammadsyafiq213510100/commit/401433b9a20ac1d030eb4fa845cacf5d7c2bf0e2))
* **us4.5:** master petani ERD dan navigasi sidebar ([38ddaab](https://github.com/sapikkk/muhammadsyafiq213510100/commit/38ddaab3a7d69d4268bc650f0cb056267e916e16))
* **ux:** flow nav, cache & tables v1.28.0 ([#122](https://github.com/sapikkk/muhammadsyafiq213510100/issues/122)) ([#123](https://github.com/sapikkk/muhammadsyafiq213510100/issues/123)) ([a48f999](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a48f999967907fae8209fd237912e46ba2faaf4e))
* **ux:** Panduan seragam di semua halaman operasi dan utilitas ([c991dbe](https://github.com/sapikkk/muhammadsyafiq213510100/commit/c991dbec77228fca3e3c2bfcc048cb5b3866382b))
* **ux:** sidebar epik Owner 1.0–7.0 dan coachmark UAT per halaman ([af32623](https://github.com/sapikkk/muhammadsyafiq213510100/commit/af326236ac1638c994fd8edaaf40ce6844be016a))
* **v2-A.1:** Akun.is_system + guard COA standar ([#95](https://github.com/sapikkk/muhammadsyafiq213510100/issues/95)) ([cd619a0](https://github.com/sapikkk/muhammadsyafiq213510100/commit/cd619a02829dd32f7fcbd0c6c4b59cf02d076386))
* **v2-A.3:** jurnal panen Dr 1350 Cr WIP ([#114](https://github.com/sapikkk/muhammadsyafiq213510100/issues/114)) ([740869c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/740869ca5353358f760c72e392af123f1ace55b1))
* **v2-A.4:** kas split 1100/1110 ([#116](https://github.com/sapikkk/muhammadsyafiq213510100/issues/116)) ([085768c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/085768c51c22c6d05bcfca4564ba2a2830d15a6d))
* **v2-B.1:** abort siklus gagal total ([#96](https://github.com/sapikkk/muhammadsyafiq213510100/issues/96)) ([8160c06](https://github.com/sapikkk/muhammadsyafiq213510100/commit/8160c06450b4276e16b9d64aebca6723a36d8482))
* **v2-C.1:** kapasitas lubang pack + semai proporsional ([#97](https://github.com/sapikkk/muhammadsyafiq213510100/issues/97)) ([da42fde](https://github.com/sapikkk/muhammadsyafiq213510100/commit/da42fdeec4310bd19ccee45042586c7b3fa7e76d))
* **v2-D.1:** SO lubang terpakai + hpp_order ([#98](https://github.com/sapikkk/muhammadsyafiq213510100/issues/98)) ([0e84814](https://github.com/sapikkk/muhammadsyafiq213510100/commit/0e848141e1d2c246257b87d6bf79d913eea2c3a8))
* **v2-E.1:** sales order DP schema and uang muka posting ([#108](https://github.com/sapikkk/muhammadsyafiq213510100/issues/108)) ([c93d43f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/c93d43fd5e5542d61a6048ec00c32a1d300687ba))
* **v2-F.2:** Smart Jurnal 9 tipe ([#117](https://github.com/sapikkk/muhammadsyafiq213510100/issues/117)) ([a15e486](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a15e486ec8de2f425ba75a43e847e4f808a03499))
* **v2-F.3:** Smart Jurnal +5 tipe v1.25.0 ([#119](https://github.com/sapikkk/muhammadsyafiq213510100/issues/119)) ([386377f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/386377fa78466ac9ccd0d4cde0e0b5841ce3269e)), closes [#92](https://github.com/sapikkk/muhammadsyafiq213510100/issues/92)
* **v2-F/G/H:** Smart Jurnal, KPI Owner, period lock ([#109](https://github.com/sapikkk/muhammadsyafiq213510100/issues/109)) ([c216e6f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/c216e6f232c3626591cdce358d8f12ab1977c446))
* **v2-H.2:** penyusutan otomatis + closeout docs v1.24.0 ([#118](https://github.com/sapikkk/muhammadsyafiq213510100/issues/118)) ([ebb2b27](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ebb2b27cc4f6f156e317b67953f60c94d134bbc6))
* **v2:** closeout epic [#87](https://github.com/sapikkk/muhammadsyafiq213510100/issues/87)–[#94](https://github.com/sapikkk/muhammadsyafiq213510100/issues/94) v1.26.0 ([#120](https://github.com/sapikkk/muhammadsyafiq213510100/issues/120)) ([0b4ac2a](https://github.com/sapikkk/muhammadsyafiq213510100/commit/0b4ac2a8f4cd97b5c9994db8b459aaac3e784014))

# 1.0.0 (2026-10-12)


### Bug Fixes

* **admin:** komponen Textarea dan copy halaman laporan panen ([c23cc1f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/c23cc1fb1baa211cc9e32ad80085fb9807d7f13b))
* **audit:** typecheck audit-nav spec (Array.from Set) ([11efb1d](https://github.com/sapikkk/muhammadsyafiq213510100/commit/11efb1d757805db8402e9d5e8bdfc20d96c7021f))
* **client:** cegah Prisma masuk bundle browser (v1.28.1) ([#125](https://github.com/sapikkk/muhammadsyafiq213510100/issues/125)) ([042e0af](https://github.com/sapikkk/muhammadsyafiq213510100/commit/042e0af6007388abddcc675d800b126fb48a7966))
* declare composer config in prisma.config.ts ([4cae52a](https://github.com/sapikkk/muhammadsyafiq213510100/commit/4cae52aaedd90872d125d9e5b9c8d93282d71067))
* **e2e:** T5.1 via API phase + daftar HP; E2E_DEMO_SIKLUS_ID di CI ([717b4de](https://github.com/sapikkk/muhammadsyafiq213510100/commit/717b4defb0ee2b26f4e4a6b6acd24556b8509ce2))
* **notifikasi:** inbox unread di atas, redirect aman, refresh badge ([1375f0c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/1375f0cfc9be6c64d8735f6bfa019b43126f1f52))
* **seed:** jalankan seed-akun.js langsung untuk set isSystem ([ebaed7d](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ebaed7d62ef86a47ff317dca80d7fc9857566f8b))
* **sprint-5:** reset batch demo seed + perbaiki e2e T5.1/T5.3 ([b4e6f09](https://github.com/sapikkk/muhammadsyafiq213510100/commit/b4e6f095eb3b8613165c88500c7cee0047d91159))
* **ui:** pulihkan tab lama saat chunk JS 404 setelah deploy ([6a45c4f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/6a45c4f5ad256a91dd1d8e58d7d6b0396286e89b))
* **ux:** sejajarkan Panduan dengan header halaman dan spacing gap-6 ([eba0131](https://github.com/sapikkk/muhammadsyafiq213510100/commit/eba01316c07ca28a0e100d3376a0410074a692fc))
* **v2-G.1:** wire KPI hidroponik on owner dashboard ([#110](https://github.com/sapikkk/muhammadsyafiq213510100/issues/110)) ([307f1e4](https://github.com/sapikkk/muhammadsyafiq213510100/commit/307f1e4a6c8b56c7de0e4e505c8fa809ad88f6ac))


### Features

* add admin-approved password reset (US1.5) ([0385ca3](https://github.com/sapikkk/muhammadsyafiq213510100/commit/0385ca31657a8e41b052b8fadc88c5724de0810a))
* add chart of accounts with tree UI, soft delete, and /api/accounts (US2.1) ([e248df5](https://github.com/sapikkk/muhammadsyafiq213510100/commit/e248df5d3f7fe5cfb9a103f6cc48810407bc7f5c))
* add double-entry journal with approval and balance updates (US2.2) ([5ab66ca](https://github.com/sapikkk/muhammadsyafiq213510100/commit/5ab66caf63aae2dba97c75d0461ce7ffe89a2541))
* add global loading, error, 404, and 403 states (US1.8) ([4390127](https://github.com/sapikkk/muhammadsyafiq213510100/commit/43901275e0b3a9862deafd88f70d6798fba1c1db))
* add settings page with profile, password, and role matrix (US1.7) ([c58c907](https://github.com/sapikkk/muhammadsyafiq213510100/commit/c58c9079c9db6e7fad6521a9c7e9e75886feea14))
* add the ERD schema and role login ([ced6fac](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ced6fac72ff80364adb27881f382c9cd86462bac))
* **audit:** DataTable search, inventaris/varietas, API contract ([e3a8d58](https://github.com/sapikkk/muhammadsyafiq213510100/commit/e3a8d58be12fed0601c1c1ad63869035650af484))
* **audit:** jurnal DataTable, transactions API, e2e, CI build ([ec8b386](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ec8b386c64b6c0656cb40d575c5ebaac2393c3d5))
* **audit:** mobile shell, API contract, toasts, pelanggan table ([0bdd46b](https://github.com/sapikkk/muhammadsyafiq213510100/commit/0bdd46bc2f5fcf87c8c9bc8329d38df6e371942b))
* **audit:** PHASE 1 dev-only RBAC bypass ([687971d](https://github.com/sapikkk/muhammadsyafiq213510100/commit/687971dd9553401b32484c9a673bf1a877b17539))
* **audit:** riwayat perubahan pelanggan, inventaris, petani, user, pack ([78a5ca2](https://github.com/sapikkk/muhammadsyafiq213510100/commit/78a5ca296fe1603039923cc394e83139a883ea1a))
* **audit:** runbook, fixes, toaster, pengaturan shell ([ceeb8d3](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ceeb8d3030681f048745a1459d56e223679a9f11))
* **audit:** SessionShell, segment errors, DataTable pilot ([f2e9a52](https://github.com/sapikkk/muhammadsyafiq213510100/commit/f2e9a52b93e60a6f58d8fe6533226afcf8379f05))
* **flow:** active pack Tingkat B — detail, Sheet buat/pakai (Fase 6) ([f77780c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/f77780c748d8653690708f59f88899945032bc17))
* **flow:** akun Tingkat B — Sheet Tambah/Ubah, Dialog nonaktifkan ([a6912ce](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a6912cef4a26fd0f4aefd9dd49583017c17d6f85))
* **flow:** fondasi UI Sheet, FormSheet, ConfirmDialog, RowActions (Fase 1) ([a8cd0e0](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a8cd0e0d343ef5a61cc5667b4d8566c3b5bf1a96))
* **flow:** infrastruktur Tingkat B — Sheet tambah, Dialog status kolam ([951eb0b](https://github.com/sapikkk/muhammadsyafiq213510100/commit/951eb0b6fa9183b9ef4b5769d5519ebe4511289e))
* **flow:** inventaris Tingkat B — detail, Sheet tambah/pergerakan (Fase 5) ([739b419](https://github.com/sapikkk/muhammadsyafiq213510100/commit/739b4199bfddbefd98992009904295ec940b3a1b))
* **flow:** penjualan Tingkat C — daftar, /baru, /[id] aksi per status ([fa27406](https://github.com/sapikkk/muhammadsyafiq213510100/commit/fa27406dca0861928a04db8e1aea42a3586fdabe))
* **flow:** pilot pelanggan Tingkat A — Sheet Tambah/Ubah (Fase 2) ([921261c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/921261cdaa70d77b8450314d7e199a1fbb676cd9))
* **flow:** siklus Tingkat C, inventaris Ubah/Nonaktifkan, banned-ui fix ([bbfa342](https://github.com/sapikkk/muhammadsyafiq213510100/commit/bbfa34226cc127843970c15790bc2a716807d97d))
* **flow:** Tingkat A — kolom aktif pelanggan, petani master, user ([21b461e](https://github.com/sapikkk/muhammadsyafiq213510100/commit/21b461e0bd17a2dbc1a44de1d5d2be34f3f87467))
* **flow:** Tingkat A petani master + owner pengguna (Fase 3) ([8014e9e](https://github.com/sapikkk/muhammadsyafiq213510100/commit/8014e9e4cacea1eabed1e52075e26329cb527332))
* **flow:** varietas Tingkat B — detail, Sheet, status Dialog (Fase 4) ([cf4babb](https://github.com/sapikkk/muhammadsyafiq213510100/commit/cf4babbd8f4c8be0b70760ceb5bcd8392d6d6a7d))
* **home:** dashboard progress GitHub Project + tooling deploy Vercel ([4c9cf2d](https://github.com/sapikkk/muhammadsyafiq213510100/commit/4c9cf2d86bf80b4f71cbb359de2640b598f0a820)), closes [#1](https://github.com/sapikkk/muhammadsyafiq213510100/issues/1)
* **hpp:** US2.3 override + plastik + jurnal 5300 ([#68](https://github.com/sapikkk/muhammadsyafiq213510100/issues/68)) ([e80ba6e](https://github.com/sapikkk/muhammadsyafiq213510100/commit/e80ba6e0ae41bb9117a93a35c839e47ef0d6db8d))
* **hpp:** US2.3 override, plastik, jurnal susut abnormal (US2.5) ([6e7cf1c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/6e7cf1cc8f6656affde69bbb796b05071709a743))
* **laporan:** US6.3 ekspor jurnal xlsx dan L/R + neraca PDF ([3015228](https://github.com/sapikkk/muhammadsyafiq213510100/commit/30152286ab5fa308baa2211b5d2721b0c9034586))
* **laporan:** US6.5 arus kas Owner dengan filter periode dan PDF ([6cae9f8](https://github.com/sapikkk/muhammadsyafiq213510100/commit/6cae9f8a861e4794eecedd818de9ed9217ae09b4))
* let admin register petani accounts (US1.6) ([16208c0](https://github.com/sapikkk/muhammadsyafiq213510100/commit/16208c056ef7c06f889b22eb9231bea7f93fc773))
* **notifikasi:** pusat notifikasi RBAC, deep link, dan README dokumentasi ([920404c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/920404c1e2f0feb070e3fdbf7ca8a85b670e8cfb))
* **notifikasi:** toast mengambang dan deep link antar peran ([97bb182](https://github.com/sapikkk/muhammadsyafiq213510100/commit/97bb182795bce07c76d0858201af3531d64beb46))
* **owner:** US1.9 kelola user dan US2.6 COA/jurnal/prive ([634d48f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/634d48f1b56930d870fb3beabbe4f8de78c109fc))
* **owner:** US6.1 KPI dan grafik pendapatan vs beban ([f8072db](https://github.com/sapikkk/muhammadsyafiq213510100/commit/f8072db80f2aef3f3887a26a7a5c21ed6e538d84))
* **owner:** US6.1 KPI dashboard ([#73](https://github.com/sapikkk/muhammadsyafiq213510100/issues/73)) ([c1db931](https://github.com/sapikkk/muhammadsyafiq213510100/commit/c1db9311d413a10d65a239895077a05ba6ab6441))
* **owner:** US6.2 pie biaya + drill-down ([#74](https://github.com/sapikkk/muhammadsyafiq213510100/issues/74)) ([6487af2](https://github.com/sapikkk/muhammadsyafiq213510100/commit/6487af2a43eead4cfb11e4ba2ac331eadf132b90))
* **owner:** US6.2 pie breakdown biaya dan drill-down jurnal ([083e70b](https://github.com/sapikkk/muhammadsyafiq213510100/commit/083e70ba852481229e69263fdd5a0769c743a308))
* **owner:** US6.4 evaluasi margin, BEP, dan kapasitas idle ([6b56567](https://github.com/sapikkk/muhammadsyafiq213510100/commit/6b56567bcfdc68907e88b35794a4c864a2d48145))
* **penjualan:** EPIC-5 US5.1–5.5 ([#72](https://github.com/sapikkk/muhammadsyafiq213510100/issues/72)) ([564c85f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/564c85f7124c296b5a6442d749dd01245438fee9))
* **penjualan:** US5.1 pelanggan + sales order ([#69](https://github.com/sapikkk/muhammadsyafiq213510100/issues/69)) ([ccd11b9](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ccd11b9084d00b4d71b2ff5a853e4b166fc43034))
* **penjualan:** US5.1 pelanggan + sales order DRAFT (US5.2 konfirmasi stok) ([b331878](https://github.com/sapikkk/muhammadsyafiq213510100/commit/b331878c15051b672b361eb2aaf25f8988eb430e))
* **penjualan:** US5.3 pengiriman SO dan US5.4 jurnal PENDING saat DELIVERED ([17e7312](https://github.com/sapikkk/muhammadsyafiq213510100/commit/17e731208459d71280cf79bf162469228831312e))
* **penjualan:** US5.5 invoice, batal SO, dan biaya packing ([2ff62ce](https://github.com/sapikkk/muhammadsyafiq213510100/commit/2ff62ce7271de1a1621de6466fa0ce7eba9857b9))
* **petani:** bantuan rockwool/benih dan seed varietas pasar ([a5bfdda](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a5bfdda5b8fcb051fd9662f34abf5f07b4896a55))
* **produksi:** US3.5 kegagalan + US2.5 susut ([#66](https://github.com/sapikkk/muhammadsyafiq213510100/issues/66)) ([90f8cdb](https://github.com/sapikkk/muhammadsyafiq213510100/commit/90f8cdbda2d2496001f1eca086b9e939fd9ba8ed))
* **produksi:** US3.5 log kegagalan dan US2.5 klasifikasi susut ([92f7199](https://github.com/sapikkk/muhammadsyafiq213510100/commit/92f71992b1d5c081614872a7fccee447c053f389))
* **produksi:** US3.6 timeline + US3.7 dashboard petani ([#67](https://github.com/sapikkk/muhammadsyafiq213510100/issues/67)) ([2f0df12](https://github.com/sapikkk/muhammadsyafiq213510100/commit/2f0df120966cc0d62d833f841f4ccca30d1ddc6b))
* **produksi:** US3.6 timeline/tambal/monitor dan US3.7 dashboard petani ([4d91f9a](https://github.com/sapikkk/muhammadsyafiq213510100/commit/4d91f9af2b557bd8ab91e290f6b6b2287d3d7051))
* record the Architecture spec and scaffold aplikasi Kokonus Farm ([ed3863b](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ed3863b6e26a2b3482bc800531d8a1e4e4f751e7))
* scaffold Kokonus Farm composer app ([5d88193](https://github.com/sapikkk/muhammadsyafiq213510100/commit/5d88193469d5e08bdc4b087119dc0cd2be80e48e))
* **sprint-5:** selesaikan T5.5–T5.9 — deploy doc, pelatihan, perbaiki e2e ([5c1e54f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/5c1e54fef5c0bbd83aca124997b537b573301c39))
* **sprint-5:** T5.1–T5.4 usability, seed demo, audit jurnal, e2e ([3cb30ef](https://github.com/sapikkk/muhammadsyafiq213510100/commit/3cb30efdf9187838aa19b869167a2d6e9cb007ca))
* **ui:** dashboard owner menampilkan data lewat tabel, bukan Card ([3930bac](https://github.com/sapikkk/muhammadsyafiq213510100/commit/3930bac556c8491ded75a219fb09496b4f9002a8))
* **ui:** DataTable owner keuangan, DetailLayout jurnal, filter seragam ([4c817b1](https://github.com/sapikkk/muhammadsyafiq213510100/commit/4c817b176c09cbe3f5b60bdcba0705c706352e40))
* **ui:** redesign layout to sidebar dashboard with shadcn zinc theme ([33aab71](https://github.com/sapikkk/muhammadsyafiq213510100/commit/33aab7104d9d7bedbb9408e18b8342d4835a54a1))
* **ui:** selaraskan jurnal, harvest review, invoice ke DetailLayout/Crud ([07057aa](https://github.com/sapikkk/muhammadsyafiq213510100/commit/07057aa589913ac8379ef23442331f9b2774278a))
* **ui:** sheet detail lebar, coachmark alur, sidebar collapse ([66e1a22](https://github.com/sapikkk/muhammadsyafiq213510100/commit/66e1a22e18558c90451565e46ea6b565d16ace67))
* **ui:** sidebar layout per peran dan US3.3 laporan panen ([e0d2fdd](https://github.com/sapikkk/muhammadsyafiq213510100/commit/e0d2fdd43f8cc76e38f37cacd75b26eaeaa3c44f))
* **ui:** teks layar Indonesia sederhana dan label status ([2fdb912](https://github.com/sapikkk/muhammadsyafiq213510100/commit/2fdb9122ce2587dcc821f086e66b04896910eacd))
* **US2.3:** implementasi approve/reject harvest report dan otomatisasi HPP serta jurnal persediaan ([9164601](https://github.com/sapikkk/muhammadsyafiq213510100/commit/916460183590e27843379a23753d683efb140e35))
* **us2.4:** form biaya langsung dan overhead periode ([7070025](https://github.com/sapikkk/muhammadsyafiq213510100/commit/70700253a0e98b0fb493f2811213987ca925bd9f))
* **us3.1:** mulai siklus semai dengan kode batch dan active pack ([4adb38c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/4adb38c55dd059af527771600f7594e4b8cb4407))
* **us3.2:** pindah fase produksi dengan log dan konfirmasi ([ad7a763](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ad7a76381d115148f24dd56a8e1a8da4e5d46b34))
* **us3.3:** laporan panen Petani dan perbaikan form siklus ([aae8d9f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/aae8d9fdfc376d6fd689bffbd02a162cb8e9fc67)), closes [#61](https://github.com/sapikkk/muhammadsyafiq213510100/issues/61)
* **us3.4:** master varietas dan parameter asumsi ([0b42ad3](https://github.com/sapikkk/muhammadsyafiq213510100/commit/0b42ad37c890a3f3c8e398067447b719d77274e6))
* **us4.1:** stok inventaris dan log pergerakan IN/OUT/ADJUST ([eccc22b](https://github.com/sapikkk/muhammadsyafiq213510100/commit/eccc22b17ca82c1857ba621ff74d8eb347660e9f))
* **us4.2:** active pack biaya per unit dan status habis ([deca235](https://github.com/sapikkk/muhammadsyafiq213510100/commit/deca2359c3331bad742a9eb18c6c35675d344432))
* **us4.3:** alert stok minimum via API dan halaman stok rendah ([a75ed77](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a75ed7736fee8a7e40a04daf76fad401a4360045))
* **us4.3:** alias GET /api/inventory/alerts ke /alert ([108885e](https://github.com/sapikkk/muhammadsyafiq213510100/commit/108885e066e03a914d3600b1fbf10f49cbd3ed0d))
* **us4.4:** master lahan, greenhouse, dan kolam ([401433b](https://github.com/sapikkk/muhammadsyafiq213510100/commit/401433b9a20ac1d030eb4fa845cacf5d7c2bf0e2))
* **us4.5:** master petani ERD dan navigasi sidebar ([38ddaab](https://github.com/sapikkk/muhammadsyafiq213510100/commit/38ddaab3a7d69d4268bc650f0cb056267e916e16))
* **ux:** flow nav, cache & tables v1.28.0 ([#122](https://github.com/sapikkk/muhammadsyafiq213510100/issues/122)) ([#123](https://github.com/sapikkk/muhammadsyafiq213510100/issues/123)) ([a48f999](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a48f999967907fae8209fd237912e46ba2faaf4e))
* **ux:** Panduan seragam di semua halaman operasi dan utilitas ([c991dbe](https://github.com/sapikkk/muhammadsyafiq213510100/commit/c991dbec77228fca3e3c2bfcc048cb5b3866382b))
* **ux:** sidebar epik Owner 1.0–7.0 dan coachmark UAT per halaman ([af32623](https://github.com/sapikkk/muhammadsyafiq213510100/commit/af326236ac1638c994fd8edaaf40ce6844be016a))
* **v2-A.1:** Akun.is_system + guard COA standar ([#95](https://github.com/sapikkk/muhammadsyafiq213510100/issues/95)) ([cd619a0](https://github.com/sapikkk/muhammadsyafiq213510100/commit/cd619a02829dd32f7fcbd0c6c4b59cf02d076386))
* **v2-A.3:** jurnal panen Dr 1350 Cr WIP ([#114](https://github.com/sapikkk/muhammadsyafiq213510100/issues/114)) ([740869c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/740869ca5353358f760c72e392af123f1ace55b1))
* **v2-A.4:** kas split 1100/1110 ([#116](https://github.com/sapikkk/muhammadsyafiq213510100/issues/116)) ([085768c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/085768c51c22c6d05bcfca4564ba2a2830d15a6d))
* **v2-B.1:** abort siklus gagal total ([#96](https://github.com/sapikkk/muhammadsyafiq213510100/issues/96)) ([8160c06](https://github.com/sapikkk/muhammadsyafiq213510100/commit/8160c06450b4276e16b9d64aebca6723a36d8482))
* **v2-C.1:** kapasitas lubang pack + semai proporsional ([#97](https://github.com/sapikkk/muhammadsyafiq213510100/issues/97)) ([da42fde](https://github.com/sapikkk/muhammadsyafiq213510100/commit/da42fdeec4310bd19ccee45042586c7b3fa7e76d))
* **v2-D.1:** SO lubang terpakai + hpp_order ([#98](https://github.com/sapikkk/muhammadsyafiq213510100/issues/98)) ([0e84814](https://github.com/sapikkk/muhammadsyafiq213510100/commit/0e848141e1d2c246257b87d6bf79d913eea2c3a8))
* **v2-E.1:** sales order DP schema and uang muka posting ([#108](https://github.com/sapikkk/muhammadsyafiq213510100/issues/108)) ([c93d43f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/c93d43fd5e5542d61a6048ec00c32a1d300687ba))
* **v2-F.2:** Smart Jurnal 9 tipe ([#117](https://github.com/sapikkk/muhammadsyafiq213510100/issues/117)) ([a15e486](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a15e486ec8de2f425ba75a43e847e4f808a03499))
* **v2-F.3:** Smart Jurnal +5 tipe v1.25.0 ([#119](https://github.com/sapikkk/muhammadsyafiq213510100/issues/119)) ([386377f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/386377fa78466ac9ccd0d4cde0e0b5841ce3269e)), closes [#92](https://github.com/sapikkk/muhammadsyafiq213510100/issues/92)
* **v2-F/G/H:** Smart Jurnal, KPI Owner, period lock ([#109](https://github.com/sapikkk/muhammadsyafiq213510100/issues/109)) ([c216e6f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/c216e6f232c3626591cdce358d8f12ab1977c446))
* **v2-H.2:** penyusutan otomatis + closeout docs v1.24.0 ([#118](https://github.com/sapikkk/muhammadsyafiq213510100/issues/118)) ([ebb2b27](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ebb2b27cc4f6f156e317b67953f60c94d134bbc6))
* **v2:** closeout epic [#87](https://github.com/sapikkk/muhammadsyafiq213510100/issues/87)–[#94](https://github.com/sapikkk/muhammadsyafiq213510100/issues/94) v1.26.0 ([#120](https://github.com/sapikkk/muhammadsyafiq213510100/issues/120)) ([0b4ac2a](https://github.com/sapikkk/muhammadsyafiq213510100/commit/0b4ac2a8f4cd97b5c9994db8b459aaac3e784014))

# 1.0.0 (2026-10-12)


### Bug Fixes

* **admin:** komponen Textarea dan copy halaman laporan panen ([c23cc1f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/c23cc1fb1baa211cc9e32ad80085fb9807d7f13b))
* **audit:** typecheck audit-nav spec (Array.from Set) ([11efb1d](https://github.com/sapikkk/muhammadsyafiq213510100/commit/11efb1d757805db8402e9d5e8bdfc20d96c7021f))
* **client:** cegah Prisma masuk bundle browser (v1.28.1) ([#125](https://github.com/sapikkk/muhammadsyafiq213510100/issues/125)) ([042e0af](https://github.com/sapikkk/muhammadsyafiq213510100/commit/042e0af6007388abddcc675d800b126fb48a7966))
* declare composer config in prisma.config.ts ([4cae52a](https://github.com/sapikkk/muhammadsyafiq213510100/commit/4cae52aaedd90872d125d9e5b9c8d93282d71067))
* **e2e:** T5.1 via API phase + daftar HP; E2E_DEMO_SIKLUS_ID di CI ([717b4de](https://github.com/sapikkk/muhammadsyafiq213510100/commit/717b4defb0ee2b26f4e4a6b6acd24556b8509ce2))
* **notifikasi:** inbox unread di atas, redirect aman, refresh badge ([1375f0c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/1375f0cfc9be6c64d8735f6bfa019b43126f1f52))
* **seed:** jalankan seed-akun.js langsung untuk set isSystem ([ebaed7d](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ebaed7d62ef86a47ff317dca80d7fc9857566f8b))
* **sprint-5:** reset batch demo seed + perbaiki e2e T5.1/T5.3 ([b4e6f09](https://github.com/sapikkk/muhammadsyafiq213510100/commit/b4e6f095eb3b8613165c88500c7cee0047d91159))
* **ui:** pulihkan tab lama saat chunk JS 404 setelah deploy ([6a45c4f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/6a45c4f5ad256a91dd1d8e58d7d6b0396286e89b))
* **ux:** sejajarkan Panduan dengan header halaman dan spacing gap-6 ([eba0131](https://github.com/sapikkk/muhammadsyafiq213510100/commit/eba01316c07ca28a0e100d3376a0410074a692fc))
* **v2-G.1:** wire KPI hidroponik on owner dashboard ([#110](https://github.com/sapikkk/muhammadsyafiq213510100/issues/110)) ([307f1e4](https://github.com/sapikkk/muhammadsyafiq213510100/commit/307f1e4a6c8b56c7de0e4e505c8fa809ad88f6ac))


### Features

* add admin-approved password reset (US1.5) ([0385ca3](https://github.com/sapikkk/muhammadsyafiq213510100/commit/0385ca31657a8e41b052b8fadc88c5724de0810a))
* add chart of accounts with tree UI, soft delete, and /api/accounts (US2.1) ([e248df5](https://github.com/sapikkk/muhammadsyafiq213510100/commit/e248df5d3f7fe5cfb9a103f6cc48810407bc7f5c))
* add double-entry journal with approval and balance updates (US2.2) ([5ab66ca](https://github.com/sapikkk/muhammadsyafiq213510100/commit/5ab66caf63aae2dba97c75d0461ce7ffe89a2541))
* add global loading, error, 404, and 403 states (US1.8) ([4390127](https://github.com/sapikkk/muhammadsyafiq213510100/commit/43901275e0b3a9862deafd88f70d6798fba1c1db))
* add settings page with profile, password, and role matrix (US1.7) ([c58c907](https://github.com/sapikkk/muhammadsyafiq213510100/commit/c58c9079c9db6e7fad6521a9c7e9e75886feea14))
* add the ERD schema and role login ([ced6fac](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ced6fac72ff80364adb27881f382c9cd86462bac))
* **audit:** DataTable search, inventaris/varietas, API contract ([e3a8d58](https://github.com/sapikkk/muhammadsyafiq213510100/commit/e3a8d58be12fed0601c1c1ad63869035650af484))
* **audit:** jurnal DataTable, transactions API, e2e, CI build ([ec8b386](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ec8b386c64b6c0656cb40d575c5ebaac2393c3d5))
* **audit:** mobile shell, API contract, toasts, pelanggan table ([0bdd46b](https://github.com/sapikkk/muhammadsyafiq213510100/commit/0bdd46bc2f5fcf87c8c9bc8329d38df6e371942b))
* **audit:** PHASE 1 dev-only RBAC bypass ([687971d](https://github.com/sapikkk/muhammadsyafiq213510100/commit/687971dd9553401b32484c9a673bf1a877b17539))
* **audit:** riwayat perubahan pelanggan, inventaris, petani, user, pack ([78a5ca2](https://github.com/sapikkk/muhammadsyafiq213510100/commit/78a5ca296fe1603039923cc394e83139a883ea1a))
* **audit:** runbook, fixes, toaster, pengaturan shell ([ceeb8d3](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ceeb8d3030681f048745a1459d56e223679a9f11))
* **audit:** SessionShell, segment errors, DataTable pilot ([f2e9a52](https://github.com/sapikkk/muhammadsyafiq213510100/commit/f2e9a52b93e60a6f58d8fe6533226afcf8379f05))
* **flow:** active pack Tingkat B — detail, Sheet buat/pakai (Fase 6) ([f77780c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/f77780c748d8653690708f59f88899945032bc17))
* **flow:** akun Tingkat B — Sheet Tambah/Ubah, Dialog nonaktifkan ([a6912ce](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a6912cef4a26fd0f4aefd9dd49583017c17d6f85))
* **flow:** fondasi UI Sheet, FormSheet, ConfirmDialog, RowActions (Fase 1) ([a8cd0e0](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a8cd0e0d343ef5a61cc5667b4d8566c3b5bf1a96))
* **flow:** infrastruktur Tingkat B — Sheet tambah, Dialog status kolam ([951eb0b](https://github.com/sapikkk/muhammadsyafiq213510100/commit/951eb0b6fa9183b9ef4b5769d5519ebe4511289e))
* **flow:** inventaris Tingkat B — detail, Sheet tambah/pergerakan (Fase 5) ([739b419](https://github.com/sapikkk/muhammadsyafiq213510100/commit/739b4199bfddbefd98992009904295ec940b3a1b))
* **flow:** penjualan Tingkat C — daftar, /baru, /[id] aksi per status ([fa27406](https://github.com/sapikkk/muhammadsyafiq213510100/commit/fa27406dca0861928a04db8e1aea42a3586fdabe))
* **flow:** pilot pelanggan Tingkat A — Sheet Tambah/Ubah (Fase 2) ([921261c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/921261cdaa70d77b8450314d7e199a1fbb676cd9))
* **flow:** siklus Tingkat C, inventaris Ubah/Nonaktifkan, banned-ui fix ([bbfa342](https://github.com/sapikkk/muhammadsyafiq213510100/commit/bbfa34226cc127843970c15790bc2a716807d97d))
* **flow:** Tingkat A — kolom aktif pelanggan, petani master, user ([21b461e](https://github.com/sapikkk/muhammadsyafiq213510100/commit/21b461e0bd17a2dbc1a44de1d5d2be34f3f87467))
* **flow:** Tingkat A petani master + owner pengguna (Fase 3) ([8014e9e](https://github.com/sapikkk/muhammadsyafiq213510100/commit/8014e9e4cacea1eabed1e52075e26329cb527332))
* **flow:** varietas Tingkat B — detail, Sheet, status Dialog (Fase 4) ([cf4babb](https://github.com/sapikkk/muhammadsyafiq213510100/commit/cf4babbd8f4c8be0b70760ceb5bcd8392d6d6a7d))
* **home:** dashboard progress GitHub Project + tooling deploy Vercel ([4c9cf2d](https://github.com/sapikkk/muhammadsyafiq213510100/commit/4c9cf2d86bf80b4f71cbb359de2640b598f0a820)), closes [#1](https://github.com/sapikkk/muhammadsyafiq213510100/issues/1)
* **hpp:** US2.3 override + plastik + jurnal 5300 ([#68](https://github.com/sapikkk/muhammadsyafiq213510100/issues/68)) ([e80ba6e](https://github.com/sapikkk/muhammadsyafiq213510100/commit/e80ba6e0ae41bb9117a93a35c839e47ef0d6db8d))
* **hpp:** US2.3 override, plastik, jurnal susut abnormal (US2.5) ([6e7cf1c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/6e7cf1cc8f6656affde69bbb796b05071709a743))
* **laporan:** US6.3 ekspor jurnal xlsx dan L/R + neraca PDF ([3015228](https://github.com/sapikkk/muhammadsyafiq213510100/commit/30152286ab5fa308baa2211b5d2721b0c9034586))
* **laporan:** US6.5 arus kas Owner dengan filter periode dan PDF ([6cae9f8](https://github.com/sapikkk/muhammadsyafiq213510100/commit/6cae9f8a861e4794eecedd818de9ed9217ae09b4))
* let admin register petani accounts (US1.6) ([16208c0](https://github.com/sapikkk/muhammadsyafiq213510100/commit/16208c056ef7c06f889b22eb9231bea7f93fc773))
* **notifikasi:** pusat notifikasi RBAC, deep link, dan README dokumentasi ([920404c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/920404c1e2f0feb070e3fdbf7ca8a85b670e8cfb))
* **owner:** US1.9 kelola user dan US2.6 COA/jurnal/prive ([634d48f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/634d48f1b56930d870fb3beabbe4f8de78c109fc))
* **owner:** US6.1 KPI dan grafik pendapatan vs beban ([f8072db](https://github.com/sapikkk/muhammadsyafiq213510100/commit/f8072db80f2aef3f3887a26a7a5c21ed6e538d84))
* **owner:** US6.1 KPI dashboard ([#73](https://github.com/sapikkk/muhammadsyafiq213510100/issues/73)) ([c1db931](https://github.com/sapikkk/muhammadsyafiq213510100/commit/c1db9311d413a10d65a239895077a05ba6ab6441))
* **owner:** US6.2 pie biaya + drill-down ([#74](https://github.com/sapikkk/muhammadsyafiq213510100/issues/74)) ([6487af2](https://github.com/sapikkk/muhammadsyafiq213510100/commit/6487af2a43eead4cfb11e4ba2ac331eadf132b90))
* **owner:** US6.2 pie breakdown biaya dan drill-down jurnal ([083e70b](https://github.com/sapikkk/muhammadsyafiq213510100/commit/083e70ba852481229e69263fdd5a0769c743a308))
* **owner:** US6.4 evaluasi margin, BEP, dan kapasitas idle ([6b56567](https://github.com/sapikkk/muhammadsyafiq213510100/commit/6b56567bcfdc68907e88b35794a4c864a2d48145))
* **penjualan:** EPIC-5 US5.1–5.5 ([#72](https://github.com/sapikkk/muhammadsyafiq213510100/issues/72)) ([564c85f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/564c85f7124c296b5a6442d749dd01245438fee9))
* **penjualan:** US5.1 pelanggan + sales order ([#69](https://github.com/sapikkk/muhammadsyafiq213510100/issues/69)) ([ccd11b9](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ccd11b9084d00b4d71b2ff5a853e4b166fc43034))
* **penjualan:** US5.1 pelanggan + sales order DRAFT (US5.2 konfirmasi stok) ([b331878](https://github.com/sapikkk/muhammadsyafiq213510100/commit/b331878c15051b672b361eb2aaf25f8988eb430e))
* **penjualan:** US5.3 pengiriman SO dan US5.4 jurnal PENDING saat DELIVERED ([17e7312](https://github.com/sapikkk/muhammadsyafiq213510100/commit/17e731208459d71280cf79bf162469228831312e))
* **penjualan:** US5.5 invoice, batal SO, dan biaya packing ([2ff62ce](https://github.com/sapikkk/muhammadsyafiq213510100/commit/2ff62ce7271de1a1621de6466fa0ce7eba9857b9))
* **petani:** bantuan rockwool/benih dan seed varietas pasar ([a5bfdda](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a5bfdda5b8fcb051fd9662f34abf5f07b4896a55))
* **produksi:** US3.5 kegagalan + US2.5 susut ([#66](https://github.com/sapikkk/muhammadsyafiq213510100/issues/66)) ([90f8cdb](https://github.com/sapikkk/muhammadsyafiq213510100/commit/90f8cdbda2d2496001f1eca086b9e939fd9ba8ed))
* **produksi:** US3.5 log kegagalan dan US2.5 klasifikasi susut ([92f7199](https://github.com/sapikkk/muhammadsyafiq213510100/commit/92f71992b1d5c081614872a7fccee447c053f389))
* **produksi:** US3.6 timeline + US3.7 dashboard petani ([#67](https://github.com/sapikkk/muhammadsyafiq213510100/issues/67)) ([2f0df12](https://github.com/sapikkk/muhammadsyafiq213510100/commit/2f0df120966cc0d62d833f841f4ccca30d1ddc6b))
* **produksi:** US3.6 timeline/tambal/monitor dan US3.7 dashboard petani ([4d91f9a](https://github.com/sapikkk/muhammadsyafiq213510100/commit/4d91f9af2b557bd8ab91e290f6b6b2287d3d7051))
* record the Architecture spec and scaffold aplikasi Kokonus Farm ([ed3863b](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ed3863b6e26a2b3482bc800531d8a1e4e4f751e7))
* scaffold Kokonus Farm composer app ([5d88193](https://github.com/sapikkk/muhammadsyafiq213510100/commit/5d88193469d5e08bdc4b087119dc0cd2be80e48e))
* **sprint-5:** selesaikan T5.5–T5.9 — deploy doc, pelatihan, perbaiki e2e ([5c1e54f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/5c1e54fef5c0bbd83aca124997b537b573301c39))
* **sprint-5:** T5.1–T5.4 usability, seed demo, audit jurnal, e2e ([3cb30ef](https://github.com/sapikkk/muhammadsyafiq213510100/commit/3cb30efdf9187838aa19b869167a2d6e9cb007ca))
* **ui:** dashboard owner menampilkan data lewat tabel, bukan Card ([3930bac](https://github.com/sapikkk/muhammadsyafiq213510100/commit/3930bac556c8491ded75a219fb09496b4f9002a8))
* **ui:** DataTable owner keuangan, DetailLayout jurnal, filter seragam ([4c817b1](https://github.com/sapikkk/muhammadsyafiq213510100/commit/4c817b176c09cbe3f5b60bdcba0705c706352e40))
* **ui:** redesign layout to sidebar dashboard with shadcn zinc theme ([33aab71](https://github.com/sapikkk/muhammadsyafiq213510100/commit/33aab7104d9d7bedbb9408e18b8342d4835a54a1))
* **ui:** selaraskan jurnal, harvest review, invoice ke DetailLayout/Crud ([07057aa](https://github.com/sapikkk/muhammadsyafiq213510100/commit/07057aa589913ac8379ef23442331f9b2774278a))
* **ui:** sheet detail lebar, coachmark alur, sidebar collapse ([66e1a22](https://github.com/sapikkk/muhammadsyafiq213510100/commit/66e1a22e18558c90451565e46ea6b565d16ace67))
* **ui:** sidebar layout per peran dan US3.3 laporan panen ([e0d2fdd](https://github.com/sapikkk/muhammadsyafiq213510100/commit/e0d2fdd43f8cc76e38f37cacd75b26eaeaa3c44f))
* **ui:** teks layar Indonesia sederhana dan label status ([2fdb912](https://github.com/sapikkk/muhammadsyafiq213510100/commit/2fdb9122ce2587dcc821f086e66b04896910eacd))
* **US2.3:** implementasi approve/reject harvest report dan otomatisasi HPP serta jurnal persediaan ([9164601](https://github.com/sapikkk/muhammadsyafiq213510100/commit/916460183590e27843379a23753d683efb140e35))
* **us2.4:** form biaya langsung dan overhead periode ([7070025](https://github.com/sapikkk/muhammadsyafiq213510100/commit/70700253a0e98b0fb493f2811213987ca925bd9f))
* **us3.1:** mulai siklus semai dengan kode batch dan active pack ([4adb38c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/4adb38c55dd059af527771600f7594e4b8cb4407))
* **us3.2:** pindah fase produksi dengan log dan konfirmasi ([ad7a763](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ad7a76381d115148f24dd56a8e1a8da4e5d46b34))
* **us3.3:** laporan panen Petani dan perbaikan form siklus ([aae8d9f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/aae8d9fdfc376d6fd689bffbd02a162cb8e9fc67)), closes [#61](https://github.com/sapikkk/muhammadsyafiq213510100/issues/61)
* **us3.4:** master varietas dan parameter asumsi ([0b42ad3](https://github.com/sapikkk/muhammadsyafiq213510100/commit/0b42ad37c890a3f3c8e398067447b719d77274e6))
* **us4.1:** stok inventaris dan log pergerakan IN/OUT/ADJUST ([eccc22b](https://github.com/sapikkk/muhammadsyafiq213510100/commit/eccc22b17ca82c1857ba621ff74d8eb347660e9f))
* **us4.2:** active pack biaya per unit dan status habis ([deca235](https://github.com/sapikkk/muhammadsyafiq213510100/commit/deca2359c3331bad742a9eb18c6c35675d344432))
* **us4.3:** alert stok minimum via API dan halaman stok rendah ([a75ed77](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a75ed7736fee8a7e40a04daf76fad401a4360045))
* **us4.3:** alias GET /api/inventory/alerts ke /alert ([108885e](https://github.com/sapikkk/muhammadsyafiq213510100/commit/108885e066e03a914d3600b1fbf10f49cbd3ed0d))
* **us4.4:** master lahan, greenhouse, dan kolam ([401433b](https://github.com/sapikkk/muhammadsyafiq213510100/commit/401433b9a20ac1d030eb4fa845cacf5d7c2bf0e2))
* **us4.5:** master petani ERD dan navigasi sidebar ([38ddaab](https://github.com/sapikkk/muhammadsyafiq213510100/commit/38ddaab3a7d69d4268bc650f0cb056267e916e16))
* **ux:** flow nav, cache & tables v1.28.0 ([#122](https://github.com/sapikkk/muhammadsyafiq213510100/issues/122)) ([#123](https://github.com/sapikkk/muhammadsyafiq213510100/issues/123)) ([a48f999](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a48f999967907fae8209fd237912e46ba2faaf4e))
* **ux:** Panduan seragam di semua halaman operasi dan utilitas ([c991dbe](https://github.com/sapikkk/muhammadsyafiq213510100/commit/c991dbec77228fca3e3c2bfcc048cb5b3866382b))
* **ux:** sidebar epik Owner 1.0–7.0 dan coachmark UAT per halaman ([af32623](https://github.com/sapikkk/muhammadsyafiq213510100/commit/af326236ac1638c994fd8edaaf40ce6844be016a))
* **v2-A.1:** Akun.is_system + guard COA standar ([#95](https://github.com/sapikkk/muhammadsyafiq213510100/issues/95)) ([cd619a0](https://github.com/sapikkk/muhammadsyafiq213510100/commit/cd619a02829dd32f7fcbd0c6c4b59cf02d076386))
* **v2-A.3:** jurnal panen Dr 1350 Cr WIP ([#114](https://github.com/sapikkk/muhammadsyafiq213510100/issues/114)) ([740869c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/740869ca5353358f760c72e392af123f1ace55b1))
* **v2-A.4:** kas split 1100/1110 ([#116](https://github.com/sapikkk/muhammadsyafiq213510100/issues/116)) ([085768c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/085768c51c22c6d05bcfca4564ba2a2830d15a6d))
* **v2-B.1:** abort siklus gagal total ([#96](https://github.com/sapikkk/muhammadsyafiq213510100/issues/96)) ([8160c06](https://github.com/sapikkk/muhammadsyafiq213510100/commit/8160c06450b4276e16b9d64aebca6723a36d8482))
* **v2-C.1:** kapasitas lubang pack + semai proporsional ([#97](https://github.com/sapikkk/muhammadsyafiq213510100/issues/97)) ([da42fde](https://github.com/sapikkk/muhammadsyafiq213510100/commit/da42fdeec4310bd19ccee45042586c7b3fa7e76d))
* **v2-D.1:** SO lubang terpakai + hpp_order ([#98](https://github.com/sapikkk/muhammadsyafiq213510100/issues/98)) ([0e84814](https://github.com/sapikkk/muhammadsyafiq213510100/commit/0e848141e1d2c246257b87d6bf79d913eea2c3a8))
* **v2-E.1:** sales order DP schema and uang muka posting ([#108](https://github.com/sapikkk/muhammadsyafiq213510100/issues/108)) ([c93d43f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/c93d43fd5e5542d61a6048ec00c32a1d300687ba))
* **v2-F.2:** Smart Jurnal 9 tipe ([#117](https://github.com/sapikkk/muhammadsyafiq213510100/issues/117)) ([a15e486](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a15e486ec8de2f425ba75a43e847e4f808a03499))
* **v2-F.3:** Smart Jurnal +5 tipe v1.25.0 ([#119](https://github.com/sapikkk/muhammadsyafiq213510100/issues/119)) ([386377f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/386377fa78466ac9ccd0d4cde0e0b5841ce3269e)), closes [#92](https://github.com/sapikkk/muhammadsyafiq213510100/issues/92)
* **v2-F/G/H:** Smart Jurnal, KPI Owner, period lock ([#109](https://github.com/sapikkk/muhammadsyafiq213510100/issues/109)) ([c216e6f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/c216e6f232c3626591cdce358d8f12ab1977c446))
* **v2-H.2:** penyusutan otomatis + closeout docs v1.24.0 ([#118](https://github.com/sapikkk/muhammadsyafiq213510100/issues/118)) ([ebb2b27](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ebb2b27cc4f6f156e317b67953f60c94d134bbc6))
* **v2:** closeout epic [#87](https://github.com/sapikkk/muhammadsyafiq213510100/issues/87)–[#94](https://github.com/sapikkk/muhammadsyafiq213510100/issues/94) v1.26.0 ([#120](https://github.com/sapikkk/muhammadsyafiq213510100/issues/120)) ([0b4ac2a](https://github.com/sapikkk/muhammadsyafiq213510100/commit/0b4ac2a8f4cd97b5c9994db8b459aaac3e784014))

# 1.0.0 (2026-10-12)


### Bug Fixes

* **admin:** komponen Textarea dan copy halaman laporan panen ([c23cc1f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/c23cc1fb1baa211cc9e32ad80085fb9807d7f13b))
* **audit:** typecheck audit-nav spec (Array.from Set) ([11efb1d](https://github.com/sapikkk/muhammadsyafiq213510100/commit/11efb1d757805db8402e9d5e8bdfc20d96c7021f))
* **client:** cegah Prisma masuk bundle browser (v1.28.1) ([#125](https://github.com/sapikkk/muhammadsyafiq213510100/issues/125)) ([042e0af](https://github.com/sapikkk/muhammadsyafiq213510100/commit/042e0af6007388abddcc675d800b126fb48a7966))
* declare composer config in prisma.config.ts ([4cae52a](https://github.com/sapikkk/muhammadsyafiq213510100/commit/4cae52aaedd90872d125d9e5b9c8d93282d71067))
* **e2e:** T5.1 via API phase + daftar HP; E2E_DEMO_SIKLUS_ID di CI ([717b4de](https://github.com/sapikkk/muhammadsyafiq213510100/commit/717b4defb0ee2b26f4e4a6b6acd24556b8509ce2))
* **notifikasi:** inbox unread di atas, redirect aman, refresh badge ([1375f0c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/1375f0cfc9be6c64d8735f6bfa019b43126f1f52))
* **seed:** jalankan seed-akun.js langsung untuk set isSystem ([ebaed7d](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ebaed7d62ef86a47ff317dca80d7fc9857566f8b))
* **sprint-5:** reset batch demo seed + perbaiki e2e T5.1/T5.3 ([b4e6f09](https://github.com/sapikkk/muhammadsyafiq213510100/commit/b4e6f095eb3b8613165c88500c7cee0047d91159))
* **ui:** pulihkan tab lama saat chunk JS 404 setelah deploy ([6a45c4f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/6a45c4f5ad256a91dd1d8e58d7d6b0396286e89b))
* **ux:** sejajarkan Panduan dengan header halaman dan spacing gap-6 ([eba0131](https://github.com/sapikkk/muhammadsyafiq213510100/commit/eba01316c07ca28a0e100d3376a0410074a692fc))
* **v2-G.1:** wire KPI hidroponik on owner dashboard ([#110](https://github.com/sapikkk/muhammadsyafiq213510100/issues/110)) ([307f1e4](https://github.com/sapikkk/muhammadsyafiq213510100/commit/307f1e4a6c8b56c7de0e4e505c8fa809ad88f6ac))


### Features

* add admin-approved password reset (US1.5) ([0385ca3](https://github.com/sapikkk/muhammadsyafiq213510100/commit/0385ca31657a8e41b052b8fadc88c5724de0810a))
* add chart of accounts with tree UI, soft delete, and /api/accounts (US2.1) ([e248df5](https://github.com/sapikkk/muhammadsyafiq213510100/commit/e248df5d3f7fe5cfb9a103f6cc48810407bc7f5c))
* add double-entry journal with approval and balance updates (US2.2) ([5ab66ca](https://github.com/sapikkk/muhammadsyafiq213510100/commit/5ab66caf63aae2dba97c75d0461ce7ffe89a2541))
* add global loading, error, 404, and 403 states (US1.8) ([4390127](https://github.com/sapikkk/muhammadsyafiq213510100/commit/43901275e0b3a9862deafd88f70d6798fba1c1db))
* add settings page with profile, password, and role matrix (US1.7) ([c58c907](https://github.com/sapikkk/muhammadsyafiq213510100/commit/c58c9079c9db6e7fad6521a9c7e9e75886feea14))
* add the ERD schema and role login ([ced6fac](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ced6fac72ff80364adb27881f382c9cd86462bac))
* **audit:** DataTable search, inventaris/varietas, API contract ([e3a8d58](https://github.com/sapikkk/muhammadsyafiq213510100/commit/e3a8d58be12fed0601c1c1ad63869035650af484))
* **audit:** jurnal DataTable, transactions API, e2e, CI build ([ec8b386](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ec8b386c64b6c0656cb40d575c5ebaac2393c3d5))
* **audit:** mobile shell, API contract, toasts, pelanggan table ([0bdd46b](https://github.com/sapikkk/muhammadsyafiq213510100/commit/0bdd46bc2f5fcf87c8c9bc8329d38df6e371942b))
* **audit:** PHASE 1 dev-only RBAC bypass ([687971d](https://github.com/sapikkk/muhammadsyafiq213510100/commit/687971dd9553401b32484c9a673bf1a877b17539))
* **audit:** riwayat perubahan pelanggan, inventaris, petani, user, pack ([78a5ca2](https://github.com/sapikkk/muhammadsyafiq213510100/commit/78a5ca296fe1603039923cc394e83139a883ea1a))
* **audit:** runbook, fixes, toaster, pengaturan shell ([ceeb8d3](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ceeb8d3030681f048745a1459d56e223679a9f11))
* **audit:** SessionShell, segment errors, DataTable pilot ([f2e9a52](https://github.com/sapikkk/muhammadsyafiq213510100/commit/f2e9a52b93e60a6f58d8fe6533226afcf8379f05))
* **flow:** active pack Tingkat B — detail, Sheet buat/pakai (Fase 6) ([f77780c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/f77780c748d8653690708f59f88899945032bc17))
* **flow:** akun Tingkat B — Sheet Tambah/Ubah, Dialog nonaktifkan ([a6912ce](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a6912cef4a26fd0f4aefd9dd49583017c17d6f85))
* **flow:** fondasi UI Sheet, FormSheet, ConfirmDialog, RowActions (Fase 1) ([a8cd0e0](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a8cd0e0d343ef5a61cc5667b4d8566c3b5bf1a96))
* **flow:** infrastruktur Tingkat B — Sheet tambah, Dialog status kolam ([951eb0b](https://github.com/sapikkk/muhammadsyafiq213510100/commit/951eb0b6fa9183b9ef4b5769d5519ebe4511289e))
* **flow:** inventaris Tingkat B — detail, Sheet tambah/pergerakan (Fase 5) ([739b419](https://github.com/sapikkk/muhammadsyafiq213510100/commit/739b4199bfddbefd98992009904295ec940b3a1b))
* **flow:** penjualan Tingkat C — daftar, /baru, /[id] aksi per status ([fa27406](https://github.com/sapikkk/muhammadsyafiq213510100/commit/fa27406dca0861928a04db8e1aea42a3586fdabe))
* **flow:** pilot pelanggan Tingkat A — Sheet Tambah/Ubah (Fase 2) ([921261c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/921261cdaa70d77b8450314d7e199a1fbb676cd9))
* **flow:** siklus Tingkat C, inventaris Ubah/Nonaktifkan, banned-ui fix ([bbfa342](https://github.com/sapikkk/muhammadsyafiq213510100/commit/bbfa34226cc127843970c15790bc2a716807d97d))
* **flow:** Tingkat A — kolom aktif pelanggan, petani master, user ([21b461e](https://github.com/sapikkk/muhammadsyafiq213510100/commit/21b461e0bd17a2dbc1a44de1d5d2be34f3f87467))
* **flow:** Tingkat A petani master + owner pengguna (Fase 3) ([8014e9e](https://github.com/sapikkk/muhammadsyafiq213510100/commit/8014e9e4cacea1eabed1e52075e26329cb527332))
* **flow:** varietas Tingkat B — detail, Sheet, status Dialog (Fase 4) ([cf4babb](https://github.com/sapikkk/muhammadsyafiq213510100/commit/cf4babbd8f4c8be0b70760ceb5bcd8392d6d6a7d))
* **home:** dashboard progress GitHub Project + tooling deploy Vercel ([4c9cf2d](https://github.com/sapikkk/muhammadsyafiq213510100/commit/4c9cf2d86bf80b4f71cbb359de2640b598f0a820)), closes [#1](https://github.com/sapikkk/muhammadsyafiq213510100/issues/1)
* **hpp:** US2.3 override + plastik + jurnal 5300 ([#68](https://github.com/sapikkk/muhammadsyafiq213510100/issues/68)) ([e80ba6e](https://github.com/sapikkk/muhammadsyafiq213510100/commit/e80ba6e0ae41bb9117a93a35c839e47ef0d6db8d))
* **hpp:** US2.3 override, plastik, jurnal susut abnormal (US2.5) ([6e7cf1c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/6e7cf1cc8f6656affde69bbb796b05071709a743))
* **laporan:** US6.3 ekspor jurnal xlsx dan L/R + neraca PDF ([3015228](https://github.com/sapikkk/muhammadsyafiq213510100/commit/30152286ab5fa308baa2211b5d2721b0c9034586))
* **laporan:** US6.5 arus kas Owner dengan filter periode dan PDF ([6cae9f8](https://github.com/sapikkk/muhammadsyafiq213510100/commit/6cae9f8a861e4794eecedd818de9ed9217ae09b4))
* let admin register petani accounts (US1.6) ([16208c0](https://github.com/sapikkk/muhammadsyafiq213510100/commit/16208c056ef7c06f889b22eb9231bea7f93fc773))
* **notifikasi:** pusat notifikasi RBAC, deep link, dan README dokumentasi ([920404c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/920404c1e2f0feb070e3fdbf7ca8a85b670e8cfb))
* **owner:** US1.9 kelola user dan US2.6 COA/jurnal/prive ([634d48f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/634d48f1b56930d870fb3beabbe4f8de78c109fc))
* **owner:** US6.1 KPI dan grafik pendapatan vs beban ([f8072db](https://github.com/sapikkk/muhammadsyafiq213510100/commit/f8072db80f2aef3f3887a26a7a5c21ed6e538d84))
* **owner:** US6.1 KPI dashboard ([#73](https://github.com/sapikkk/muhammadsyafiq213510100/issues/73)) ([c1db931](https://github.com/sapikkk/muhammadsyafiq213510100/commit/c1db9311d413a10d65a239895077a05ba6ab6441))
* **owner:** US6.2 pie biaya + drill-down ([#74](https://github.com/sapikkk/muhammadsyafiq213510100/issues/74)) ([6487af2](https://github.com/sapikkk/muhammadsyafiq213510100/commit/6487af2a43eead4cfb11e4ba2ac331eadf132b90))
* **owner:** US6.2 pie breakdown biaya dan drill-down jurnal ([083e70b](https://github.com/sapikkk/muhammadsyafiq213510100/commit/083e70ba852481229e69263fdd5a0769c743a308))
* **owner:** US6.4 evaluasi margin, BEP, dan kapasitas idle ([6b56567](https://github.com/sapikkk/muhammadsyafiq213510100/commit/6b56567bcfdc68907e88b35794a4c864a2d48145))
* **penjualan:** EPIC-5 US5.1–5.5 ([#72](https://github.com/sapikkk/muhammadsyafiq213510100/issues/72)) ([564c85f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/564c85f7124c296b5a6442d749dd01245438fee9))
* **penjualan:** US5.1 pelanggan + sales order ([#69](https://github.com/sapikkk/muhammadsyafiq213510100/issues/69)) ([ccd11b9](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ccd11b9084d00b4d71b2ff5a853e4b166fc43034))
* **penjualan:** US5.1 pelanggan + sales order DRAFT (US5.2 konfirmasi stok) ([b331878](https://github.com/sapikkk/muhammadsyafiq213510100/commit/b331878c15051b672b361eb2aaf25f8988eb430e))
* **penjualan:** US5.3 pengiriman SO dan US5.4 jurnal PENDING saat DELIVERED ([17e7312](https://github.com/sapikkk/muhammadsyafiq213510100/commit/17e731208459d71280cf79bf162469228831312e))
* **penjualan:** US5.5 invoice, batal SO, dan biaya packing ([2ff62ce](https://github.com/sapikkk/muhammadsyafiq213510100/commit/2ff62ce7271de1a1621de6466fa0ce7eba9857b9))
* **petani:** bantuan rockwool/benih dan seed varietas pasar ([a5bfdda](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a5bfdda5b8fcb051fd9662f34abf5f07b4896a55))
* **produksi:** US3.5 kegagalan + US2.5 susut ([#66](https://github.com/sapikkk/muhammadsyafiq213510100/issues/66)) ([90f8cdb](https://github.com/sapikkk/muhammadsyafiq213510100/commit/90f8cdbda2d2496001f1eca086b9e939fd9ba8ed))
* **produksi:** US3.5 log kegagalan dan US2.5 klasifikasi susut ([92f7199](https://github.com/sapikkk/muhammadsyafiq213510100/commit/92f71992b1d5c081614872a7fccee447c053f389))
* **produksi:** US3.6 timeline + US3.7 dashboard petani ([#67](https://github.com/sapikkk/muhammadsyafiq213510100/issues/67)) ([2f0df12](https://github.com/sapikkk/muhammadsyafiq213510100/commit/2f0df120966cc0d62d833f841f4ccca30d1ddc6b))
* **produksi:** US3.6 timeline/tambal/monitor dan US3.7 dashboard petani ([4d91f9a](https://github.com/sapikkk/muhammadsyafiq213510100/commit/4d91f9af2b557bd8ab91e290f6b6b2287d3d7051))
* record the Architecture spec and scaffold aplikasi Kokonus Farm ([ed3863b](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ed3863b6e26a2b3482bc800531d8a1e4e4f751e7))
* scaffold Kokonus Farm composer app ([5d88193](https://github.com/sapikkk/muhammadsyafiq213510100/commit/5d88193469d5e08bdc4b087119dc0cd2be80e48e))
* **sprint-5:** selesaikan T5.5–T5.9 — deploy doc, pelatihan, perbaiki e2e ([5c1e54f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/5c1e54fef5c0bbd83aca124997b537b573301c39))
* **sprint-5:** T5.1–T5.4 usability, seed demo, audit jurnal, e2e ([3cb30ef](https://github.com/sapikkk/muhammadsyafiq213510100/commit/3cb30efdf9187838aa19b869167a2d6e9cb007ca))
* **ui:** dashboard owner menampilkan data lewat tabel, bukan Card ([3930bac](https://github.com/sapikkk/muhammadsyafiq213510100/commit/3930bac556c8491ded75a219fb09496b4f9002a8))
* **ui:** DataTable owner keuangan, DetailLayout jurnal, filter seragam ([4c817b1](https://github.com/sapikkk/muhammadsyafiq213510100/commit/4c817b176c09cbe3f5b60bdcba0705c706352e40))
* **ui:** redesign layout to sidebar dashboard with shadcn zinc theme ([33aab71](https://github.com/sapikkk/muhammadsyafiq213510100/commit/33aab7104d9d7bedbb9408e18b8342d4835a54a1))
* **ui:** selaraskan jurnal, harvest review, invoice ke DetailLayout/Crud ([07057aa](https://github.com/sapikkk/muhammadsyafiq213510100/commit/07057aa589913ac8379ef23442331f9b2774278a))
* **ui:** sheet detail lebar, coachmark alur, sidebar collapse ([66e1a22](https://github.com/sapikkk/muhammadsyafiq213510100/commit/66e1a22e18558c90451565e46ea6b565d16ace67))
* **ui:** sidebar layout per peran dan US3.3 laporan panen ([e0d2fdd](https://github.com/sapikkk/muhammadsyafiq213510100/commit/e0d2fdd43f8cc76e38f37cacd75b26eaeaa3c44f))
* **US2.3:** implementasi approve/reject harvest report dan otomatisasi HPP serta jurnal persediaan ([9164601](https://github.com/sapikkk/muhammadsyafiq213510100/commit/916460183590e27843379a23753d683efb140e35))
* **us2.4:** form biaya langsung dan overhead periode ([7070025](https://github.com/sapikkk/muhammadsyafiq213510100/commit/70700253a0e98b0fb493f2811213987ca925bd9f))
* **us3.1:** mulai siklus semai dengan kode batch dan active pack ([4adb38c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/4adb38c55dd059af527771600f7594e4b8cb4407))
* **us3.2:** pindah fase produksi dengan log dan konfirmasi ([ad7a763](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ad7a76381d115148f24dd56a8e1a8da4e5d46b34))
* **us3.3:** laporan panen Petani dan perbaikan form siklus ([aae8d9f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/aae8d9fdfc376d6fd689bffbd02a162cb8e9fc67)), closes [#61](https://github.com/sapikkk/muhammadsyafiq213510100/issues/61)
* **us3.4:** master varietas dan parameter asumsi ([0b42ad3](https://github.com/sapikkk/muhammadsyafiq213510100/commit/0b42ad37c890a3f3c8e398067447b719d77274e6))
* **us4.1:** stok inventaris dan log pergerakan IN/OUT/ADJUST ([eccc22b](https://github.com/sapikkk/muhammadsyafiq213510100/commit/eccc22b17ca82c1857ba621ff74d8eb347660e9f))
* **us4.2:** active pack biaya per unit dan status habis ([deca235](https://github.com/sapikkk/muhammadsyafiq213510100/commit/deca2359c3331bad742a9eb18c6c35675d344432))
* **us4.3:** alert stok minimum via API dan halaman stok rendah ([a75ed77](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a75ed7736fee8a7e40a04daf76fad401a4360045))
* **us4.3:** alias GET /api/inventory/alerts ke /alert ([108885e](https://github.com/sapikkk/muhammadsyafiq213510100/commit/108885e066e03a914d3600b1fbf10f49cbd3ed0d))
* **us4.4:** master lahan, greenhouse, dan kolam ([401433b](https://github.com/sapikkk/muhammadsyafiq213510100/commit/401433b9a20ac1d030eb4fa845cacf5d7c2bf0e2))
* **us4.5:** master petani ERD dan navigasi sidebar ([38ddaab](https://github.com/sapikkk/muhammadsyafiq213510100/commit/38ddaab3a7d69d4268bc650f0cb056267e916e16))
* **ux:** flow nav, cache & tables v1.28.0 ([#122](https://github.com/sapikkk/muhammadsyafiq213510100/issues/122)) ([#123](https://github.com/sapikkk/muhammadsyafiq213510100/issues/123)) ([a48f999](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a48f999967907fae8209fd237912e46ba2faaf4e))
* **ux:** Panduan seragam di semua halaman operasi dan utilitas ([c991dbe](https://github.com/sapikkk/muhammadsyafiq213510100/commit/c991dbec77228fca3e3c2bfcc048cb5b3866382b))
* **ux:** sidebar epik Owner 1.0–7.0 dan coachmark UAT per halaman ([af32623](https://github.com/sapikkk/muhammadsyafiq213510100/commit/af326236ac1638c994fd8edaaf40ce6844be016a))
* **v2-A.1:** Akun.is_system + guard COA standar ([#95](https://github.com/sapikkk/muhammadsyafiq213510100/issues/95)) ([cd619a0](https://github.com/sapikkk/muhammadsyafiq213510100/commit/cd619a02829dd32f7fcbd0c6c4b59cf02d076386))
* **v2-A.3:** jurnal panen Dr 1350 Cr WIP ([#114](https://github.com/sapikkk/muhammadsyafiq213510100/issues/114)) ([740869c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/740869ca5353358f760c72e392af123f1ace55b1))
* **v2-A.4:** kas split 1100/1110 ([#116](https://github.com/sapikkk/muhammadsyafiq213510100/issues/116)) ([085768c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/085768c51c22c6d05bcfca4564ba2a2830d15a6d))
* **v2-B.1:** abort siklus gagal total ([#96](https://github.com/sapikkk/muhammadsyafiq213510100/issues/96)) ([8160c06](https://github.com/sapikkk/muhammadsyafiq213510100/commit/8160c06450b4276e16b9d64aebca6723a36d8482))
* **v2-C.1:** kapasitas lubang pack + semai proporsional ([#97](https://github.com/sapikkk/muhammadsyafiq213510100/issues/97)) ([da42fde](https://github.com/sapikkk/muhammadsyafiq213510100/commit/da42fdeec4310bd19ccee45042586c7b3fa7e76d))
* **v2-D.1:** SO lubang terpakai + hpp_order ([#98](https://github.com/sapikkk/muhammadsyafiq213510100/issues/98)) ([0e84814](https://github.com/sapikkk/muhammadsyafiq213510100/commit/0e848141e1d2c246257b87d6bf79d913eea2c3a8))
* **v2-E.1:** sales order DP schema and uang muka posting ([#108](https://github.com/sapikkk/muhammadsyafiq213510100/issues/108)) ([c93d43f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/c93d43fd5e5542d61a6048ec00c32a1d300687ba))
* **v2-F.2:** Smart Jurnal 9 tipe ([#117](https://github.com/sapikkk/muhammadsyafiq213510100/issues/117)) ([a15e486](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a15e486ec8de2f425ba75a43e847e4f808a03499))
* **v2-F.3:** Smart Jurnal +5 tipe v1.25.0 ([#119](https://github.com/sapikkk/muhammadsyafiq213510100/issues/119)) ([386377f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/386377fa78466ac9ccd0d4cde0e0b5841ce3269e)), closes [#92](https://github.com/sapikkk/muhammadsyafiq213510100/issues/92)
* **v2-F/G/H:** Smart Jurnal, KPI Owner, period lock ([#109](https://github.com/sapikkk/muhammadsyafiq213510100/issues/109)) ([c216e6f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/c216e6f232c3626591cdce358d8f12ab1977c446))
* **v2-H.2:** penyusutan otomatis + closeout docs v1.24.0 ([#118](https://github.com/sapikkk/muhammadsyafiq213510100/issues/118)) ([ebb2b27](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ebb2b27cc4f6f156e317b67953f60c94d134bbc6))
* **v2:** closeout epic [#87](https://github.com/sapikkk/muhammadsyafiq213510100/issues/87)–[#94](https://github.com/sapikkk/muhammadsyafiq213510100/issues/94) v1.26.0 ([#120](https://github.com/sapikkk/muhammadsyafiq213510100/issues/120)) ([0b4ac2a](https://github.com/sapikkk/muhammadsyafiq213510100/commit/0b4ac2a8f4cd97b5c9994db8b459aaac3e784014))

# 1.0.0 (2026-10-12)


### Bug Fixes

* **admin:** komponen Textarea dan copy halaman laporan panen ([fcf3810](https://github.com/sapikkk/muhammadsyafiq213510100/commit/fcf38108309820524f745c41880d11495dfc9ac3))
* **audit:** typecheck audit-nav spec (Array.from Set) ([e680ccd](https://github.com/sapikkk/muhammadsyafiq213510100/commit/e680ccd3f2e5b97c19019d5016ddef27611de9e1))
* **client:** cegah Prisma masuk bundle browser (v1.28.1) ([#125](https://github.com/sapikkk/muhammadsyafiq213510100/issues/125)) ([07333f5](https://github.com/sapikkk/muhammadsyafiq213510100/commit/07333f5cd65dc199bb5b82d7c51912326ec3736a))
* declare composer config in prisma.config.ts ([4cae52a](https://github.com/sapikkk/muhammadsyafiq213510100/commit/4cae52aaedd90872d125d9e5b9c8d93282d71067))
* **e2e:** T5.1 via API phase + daftar HP; E2E_DEMO_SIKLUS_ID di CI ([b2856b7](https://github.com/sapikkk/muhammadsyafiq213510100/commit/b2856b7dbaa3c9e4d84676633e7c8873278b5be0))
* **seed:** jalankan seed-akun.js langsung untuk set isSystem ([7e9dce3](https://github.com/sapikkk/muhammadsyafiq213510100/commit/7e9dce327949c49f765db05b31039b2b0d76b878))
* **sprint-5:** reset batch demo seed + perbaiki e2e T5.1/T5.3 ([6c239ff](https://github.com/sapikkk/muhammadsyafiq213510100/commit/6c239ff4dcc707e31db37bc57dc9b95f4ad98c86))
* **ui:** pulihkan tab lama saat chunk JS 404 setelah deploy ([83c3dbc](https://github.com/sapikkk/muhammadsyafiq213510100/commit/83c3dbc9ccb2bcb5fed469429221565a5d6cf3d4))
* **ux:** sejajarkan Panduan dengan header halaman dan spacing gap-6 ([98166ce](https://github.com/sapikkk/muhammadsyafiq213510100/commit/98166ced3ba2f6ccab7ec6312c75ce7daa5e0641))
* **v2-G.1:** wire KPI hidroponik on owner dashboard ([#110](https://github.com/sapikkk/muhammadsyafiq213510100/issues/110)) ([a8fcf77](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a8fcf7718a0b25bf0fa5c9307a60bee118b05fb4))


### Features

* add admin-approved password reset (US1.5) ([61f3edc](https://github.com/sapikkk/muhammadsyafiq213510100/commit/61f3edc9b6d6a8fed268b4cb8029c22700a02220))
* add chart of accounts with tree UI, soft delete, and /api/accounts (US2.1) ([d6f1d44](https://github.com/sapikkk/muhammadsyafiq213510100/commit/d6f1d443ff94e22c72285f667e70e52e2cdbd477))
* add double-entry journal with approval and balance updates (US2.2) ([1784345](https://github.com/sapikkk/muhammadsyafiq213510100/commit/17843459f1431d8c890f70231c0ba32c614f30c3))
* add global loading, error, 404, and 403 states (US1.8) ([87bdf1c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/87bdf1cc23e06319fb382a4474eeb884adf4935c))
* add settings page with profile, password, and role matrix (US1.7) ([04666ce](https://github.com/sapikkk/muhammadsyafiq213510100/commit/04666ce1a38e3a91a9a5bc6297429662f0e80229))
* add the ERD schema and role login ([18f9183](https://github.com/sapikkk/muhammadsyafiq213510100/commit/18f918332367c83ffe0cf89daf77f4f4a95529a9))
* **audit:** DataTable search, inventaris/varietas, API contract ([10712df](https://github.com/sapikkk/muhammadsyafiq213510100/commit/10712df342c7583952a43dfb84cd7083f015f8cd))
* **audit:** jurnal DataTable, transactions API, e2e, CI build ([8e47fb3](https://github.com/sapikkk/muhammadsyafiq213510100/commit/8e47fb37c6627c6861417be95cb16a7a14471215))
* **audit:** mobile shell, API contract, toasts, pelanggan table ([1d1dd4a](https://github.com/sapikkk/muhammadsyafiq213510100/commit/1d1dd4ac91dce6218ea28c76710da64df99292d9))
* **audit:** PHASE 1 dev-only RBAC bypass ([696983e](https://github.com/sapikkk/muhammadsyafiq213510100/commit/696983e8d8f905287050d71cbd5c067fb76c521f))
* **audit:** riwayat perubahan pelanggan, inventaris, petani, user, pack ([7194d37](https://github.com/sapikkk/muhammadsyafiq213510100/commit/7194d37eae77ef7f771e9b95dd2c9958a4afddbe))
* **audit:** runbook, fixes, toaster, pengaturan shell ([18d4ee8](https://github.com/sapikkk/muhammadsyafiq213510100/commit/18d4ee8c6de2d046d5a068d6ce058bead48ef2a2))
* **audit:** SessionShell, segment errors, DataTable pilot ([887e92f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/887e92fd8da2c9441c00a2d715f98ad591168741))
* **flow:** active pack Tingkat B — detail, Sheet buat/pakai (Fase 6) ([1cad42d](https://github.com/sapikkk/muhammadsyafiq213510100/commit/1cad42d4081bd21c9b1af65762cf00354bfc1044))
* **flow:** akun Tingkat B — Sheet Tambah/Ubah, Dialog nonaktifkan ([9768de9](https://github.com/sapikkk/muhammadsyafiq213510100/commit/9768de9b9ad055e44f6bc9ca24c472e0c43f4d16))
* **flow:** fondasi UI Sheet, FormSheet, ConfirmDialog, RowActions (Fase 1) ([dba8378](https://github.com/sapikkk/muhammadsyafiq213510100/commit/dba837839100ecd61818a7bf15dd5026ed324237))
* **flow:** infrastruktur Tingkat B — Sheet tambah, Dialog status kolam ([3408a2d](https://github.com/sapikkk/muhammadsyafiq213510100/commit/3408a2da97b9872e3f7f81bc245efebf38440747))
* **flow:** inventaris Tingkat B — detail, Sheet tambah/pergerakan (Fase 5) ([16cd13d](https://github.com/sapikkk/muhammadsyafiq213510100/commit/16cd13d542ee919a61952cb000f14b46601a1d9a))
* **flow:** penjualan Tingkat C — daftar, /baru, /[id] aksi per status ([f201bfa](https://github.com/sapikkk/muhammadsyafiq213510100/commit/f201bfae4cad9b0cf8e32fdc896a7f1337261f44))
* **flow:** pilot pelanggan Tingkat A — Sheet Tambah/Ubah (Fase 2) ([2985ad5](https://github.com/sapikkk/muhammadsyafiq213510100/commit/2985ad56ee6e918babf59967722b02d3c5e143df))
* **flow:** siklus Tingkat C, inventaris Ubah/Nonaktifkan, banned-ui fix ([4e24841](https://github.com/sapikkk/muhammadsyafiq213510100/commit/4e24841559908091af2d47be01f5409bce7a4b03))
* **flow:** Tingkat A — kolom aktif pelanggan, petani master, user ([db27f8f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/db27f8f921c93c3751c74a166aaabaa7c756ebd0))
* **flow:** Tingkat A petani master + owner pengguna (Fase 3) ([4d631e8](https://github.com/sapikkk/muhammadsyafiq213510100/commit/4d631e87b550a0d6b1b082869427b17e506184bd))
* **flow:** varietas Tingkat B — detail, Sheet, status Dialog (Fase 4) ([d24f64a](https://github.com/sapikkk/muhammadsyafiq213510100/commit/d24f64a6e1c3da8a45f876f918ede633a44240d8))
* **home:** dashboard progress GitHub Project + tooling deploy Vercel ([e36ad1b](https://github.com/sapikkk/muhammadsyafiq213510100/commit/e36ad1bc7944d053481872a187e2bfa10da895aa)), closes [#1](https://github.com/sapikkk/muhammadsyafiq213510100/issues/1)
* **hpp:** US2.3 override + plastik + jurnal 5300 ([#68](https://github.com/sapikkk/muhammadsyafiq213510100/issues/68)) ([998e5d6](https://github.com/sapikkk/muhammadsyafiq213510100/commit/998e5d62498c83d977c507203fe3ef5816116d55))
* **hpp:** US2.3 override, plastik, jurnal susut abnormal (US2.5) ([e4a4c9e](https://github.com/sapikkk/muhammadsyafiq213510100/commit/e4a4c9ebb2a961710d453fb8251598a2b651fa6b))
* **laporan:** US6.3 ekspor jurnal xlsx dan L/R + neraca PDF ([b8103c9](https://github.com/sapikkk/muhammadsyafiq213510100/commit/b8103c929df137c8fb66ecbf065bcdf6aaa16268))
* **laporan:** US6.5 arus kas Owner dengan filter periode dan PDF ([aa33cb1](https://github.com/sapikkk/muhammadsyafiq213510100/commit/aa33cb1623622a74181b1e7982f90e9e11b18efb))
* let admin register petani accounts (US1.6) ([a7ac1b2](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a7ac1b2d48b31ccf22dca312d9cffd136f9d1988))
* **notifikasi:** pusat notifikasi RBAC, deep link, dan README dokumentasi ([6addb17](https://github.com/sapikkk/muhammadsyafiq213510100/commit/6addb1740c33f8eae383eb2d7e13363d99b118c5))
* **owner:** US1.9 kelola user dan US2.6 COA/jurnal/prive ([fe75da3](https://github.com/sapikkk/muhammadsyafiq213510100/commit/fe75da31ee3ce25709c65d597a11d7f0844c6d5e))
* **owner:** US6.1 KPI dan grafik pendapatan vs beban ([fa5c2ff](https://github.com/sapikkk/muhammadsyafiq213510100/commit/fa5c2ffa8e31c182ba694fd9c747bcfbcbfac3eb))
* **owner:** US6.1 KPI dashboard ([#73](https://github.com/sapikkk/muhammadsyafiq213510100/issues/73)) ([a6e9c6d](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a6e9c6da9ea304f74dc885adf89e91e2ff7e78d5))
* **owner:** US6.2 pie biaya + drill-down ([#74](https://github.com/sapikkk/muhammadsyafiq213510100/issues/74)) ([8601ca3](https://github.com/sapikkk/muhammadsyafiq213510100/commit/8601ca385b75e634b688fcf14bea31e821de682d))
* **owner:** US6.2 pie breakdown biaya dan drill-down jurnal ([0248fd8](https://github.com/sapikkk/muhammadsyafiq213510100/commit/0248fd8fed55ffa283db8ea1c21c959dc5b01fba))
* **owner:** US6.4 evaluasi margin, BEP, dan kapasitas idle ([c31337e](https://github.com/sapikkk/muhammadsyafiq213510100/commit/c31337e6d7732a858c24192aa488b63c07603e10))
* **penjualan:** EPIC-5 US5.1–5.5 ([#72](https://github.com/sapikkk/muhammadsyafiq213510100/issues/72)) ([66d97d8](https://github.com/sapikkk/muhammadsyafiq213510100/commit/66d97d8f9e534eeb4a47fab60b058989d7fd322b))
* **penjualan:** US5.1 pelanggan + sales order ([#69](https://github.com/sapikkk/muhammadsyafiq213510100/issues/69)) ([81840b0](https://github.com/sapikkk/muhammadsyafiq213510100/commit/81840b097ab7db1d616d3798d27d09d62d0ef3cf))
* **penjualan:** US5.1 pelanggan + sales order DRAFT (US5.2 konfirmasi stok) ([3a1b87d](https://github.com/sapikkk/muhammadsyafiq213510100/commit/3a1b87d7ee906a22ac7f74f7a2adc6fedf0fafb8))
* **penjualan:** US5.3 pengiriman SO dan US5.4 jurnal PENDING saat DELIVERED ([6e4b05b](https://github.com/sapikkk/muhammadsyafiq213510100/commit/6e4b05b81b2a8677a914dad4d0f4dcb7a22cf5fc))
* **penjualan:** US5.5 invoice, batal SO, dan biaya packing ([9c69863](https://github.com/sapikkk/muhammadsyafiq213510100/commit/9c698632a4fe463e8861421ff573c5b66812e6c7))
* **petani:** bantuan rockwool/benih dan seed varietas pasar ([ff783ed](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ff783ed1d250131870ffa0bfbbe679f88eaad18b))
* **produksi:** US3.5 kegagalan + US2.5 susut ([#66](https://github.com/sapikkk/muhammadsyafiq213510100/issues/66)) ([aa7e958](https://github.com/sapikkk/muhammadsyafiq213510100/commit/aa7e958a159aa9baade94e33557c37939c033428))
* **produksi:** US3.5 log kegagalan dan US2.5 klasifikasi susut ([212d3e6](https://github.com/sapikkk/muhammadsyafiq213510100/commit/212d3e60860bcecad667cbfc3cd676bf38567735))
* **produksi:** US3.6 timeline + US3.7 dashboard petani ([#67](https://github.com/sapikkk/muhammadsyafiq213510100/issues/67)) ([3250636](https://github.com/sapikkk/muhammadsyafiq213510100/commit/3250636444e7fc2bb49b878f2e6f56291293a991))
* **produksi:** US3.6 timeline/tambal/monitor dan US3.7 dashboard petani ([15b9287](https://github.com/sapikkk/muhammadsyafiq213510100/commit/15b9287c8ae638fe6e89e9a981a26c45d720788a))
* record the Architecture spec and scaffold aplikasi Kokonus Farm ([5e50a76](https://github.com/sapikkk/muhammadsyafiq213510100/commit/5e50a76176191fd8e3d4c7542c11293c12435bc0))
* scaffold Kokonus Farm composer app ([5d88193](https://github.com/sapikkk/muhammadsyafiq213510100/commit/5d88193469d5e08bdc4b087119dc0cd2be80e48e))
* **sprint-5:** selesaikan T5.5–T5.9 — deploy doc, pelatihan, perbaiki e2e ([a12508c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a12508c8a0918fd44566bff7d26989ef1afc047d))
* **sprint-5:** T5.1–T5.4 usability, seed demo, audit jurnal, e2e ([6690d9f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/6690d9fc29f1e5d44b7f29b36e5728daf16eb2a7))
* **ui:** dashboard owner menampilkan data lewat tabel, bukan Card ([e2ecc4b](https://github.com/sapikkk/muhammadsyafiq213510100/commit/e2ecc4b8d5f6ce89faaa0f018bd73a14621dab16))
* **ui:** DataTable owner keuangan, DetailLayout jurnal, filter seragam ([4e0873c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/4e0873c12d21849fd77d47705c585645a13398b0))
* **ui:** redesign layout to sidebar dashboard with shadcn zinc theme ([a2f4964](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a2f49646453619df76f0535dbac34164a4599449))
* **ui:** selaraskan jurnal, harvest review, invoice ke DetailLayout/Crud ([08b9b62](https://github.com/sapikkk/muhammadsyafiq213510100/commit/08b9b621fcc63c7cc75a6250bbbf217e40715d2c))
* **ui:** sheet detail lebar, coachmark alur, sidebar collapse ([748f5f3](https://github.com/sapikkk/muhammadsyafiq213510100/commit/748f5f3d48204eacabd53353fe525409587497eb))
* **ui:** sidebar layout per peran dan US3.3 laporan panen ([533d1e6](https://github.com/sapikkk/muhammadsyafiq213510100/commit/533d1e645cfbc2828db07567c38e98efb4e07c9f))
* **US2.3:** implementasi approve/reject harvest report dan otomatisasi HPP serta jurnal persediaan ([d2d3289](https://github.com/sapikkk/muhammadsyafiq213510100/commit/d2d3289b4c7559e54c6d9cc7be46e3f7183a79c8))
* **us2.4:** form biaya langsung dan overhead periode ([a1140cd](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a1140cdfaf498cd8cadbe84110046b5a7509b213))
* **us3.1:** mulai siklus semai dengan kode batch dan active pack ([b1d8972](https://github.com/sapikkk/muhammadsyafiq213510100/commit/b1d89721415688158c229cd0526edc4bfa2c7e55))
* **us3.2:** pindah fase produksi dengan log dan konfirmasi ([479836f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/479836fe0258ead93de23fac8bdbe963f0aca1fc))
* **us3.3:** laporan panen Petani dan perbaikan form siklus ([e9c738e](https://github.com/sapikkk/muhammadsyafiq213510100/commit/e9c738e7d0889103071d82aa637b35790df85f57)), closes [#61](https://github.com/sapikkk/muhammadsyafiq213510100/issues/61)
* **us3.4:** master varietas dan parameter asumsi ([b44e0ff](https://github.com/sapikkk/muhammadsyafiq213510100/commit/b44e0ff16c4576f91494beb2f4c19fa534ee9cd9))
* **us4.1:** stok inventaris dan log pergerakan IN/OUT/ADJUST ([e73d0f5](https://github.com/sapikkk/muhammadsyafiq213510100/commit/e73d0f5f9a003d35a63e4cc5d82ad4b9229dbc93))
* **us4.2:** active pack biaya per unit dan status habis ([7b7fa8d](https://github.com/sapikkk/muhammadsyafiq213510100/commit/7b7fa8da0e1b1ace4e43672ea791b172ca377f30))
* **us4.3:** alert stok minimum via API dan halaman stok rendah ([fbed49c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/fbed49c97e9d97818ae278b16afd02821c4ae57b))
* **us4.3:** alias GET /api/inventory/alerts ke /alert ([d3b03e8](https://github.com/sapikkk/muhammadsyafiq213510100/commit/d3b03e8bbdf7e9a82b193c9f102938376af0c78b))
* **us4.4:** master lahan, greenhouse, dan kolam ([c1a2b9f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/c1a2b9f37b718f119a751af84760eb6bc4beec32))
* **us4.5:** master petani ERD dan navigasi sidebar ([6edfc7a](https://github.com/sapikkk/muhammadsyafiq213510100/commit/6edfc7a07cd5838d9c737ce98a3bba525f483d40))
* **ux:** flow nav, cache & tables v1.28.0 ([#122](https://github.com/sapikkk/muhammadsyafiq213510100/issues/122)) ([#123](https://github.com/sapikkk/muhammadsyafiq213510100/issues/123)) ([faf7090](https://github.com/sapikkk/muhammadsyafiq213510100/commit/faf709050c1db72389d923e4ed80c6acff831fb7))
* **ux:** Panduan seragam di semua halaman operasi dan utilitas ([7a5cf7f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/7a5cf7f19344a8b9e0366629a56e4d2653cda659))
* **ux:** sidebar epik Owner 1.0–7.0 dan coachmark UAT per halaman ([47bef4d](https://github.com/sapikkk/muhammadsyafiq213510100/commit/47bef4d8f662fa2fafbb80b610448ac755f71ca2))
* **v2-A.1:** Akun.is_system + guard COA standar ([#95](https://github.com/sapikkk/muhammadsyafiq213510100/issues/95)) ([b26c5a7](https://github.com/sapikkk/muhammadsyafiq213510100/commit/b26c5a742c706d0e40990414f0aafbffff98b96f))
* **v2-A.3:** jurnal panen Dr 1350 Cr WIP ([#114](https://github.com/sapikkk/muhammadsyafiq213510100/issues/114)) ([e282b00](https://github.com/sapikkk/muhammadsyafiq213510100/commit/e282b00695a82393b2ae04ea2f358b2fce3832f7))
* **v2-A.4:** kas split 1100/1110 ([#116](https://github.com/sapikkk/muhammadsyafiq213510100/issues/116)) ([83f4360](https://github.com/sapikkk/muhammadsyafiq213510100/commit/83f4360e7f4d3f48ce95d6e9f5c229b50f7507d3))
* **v2-B.1:** abort siklus gagal total ([#96](https://github.com/sapikkk/muhammadsyafiq213510100/issues/96)) ([a6e7167](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a6e71672618066902090583329f100b426d7ce4d))
* **v2-C.1:** kapasitas lubang pack + semai proporsional ([#97](https://github.com/sapikkk/muhammadsyafiq213510100/issues/97)) ([5fc6603](https://github.com/sapikkk/muhammadsyafiq213510100/commit/5fc660355972a357aa2d1a1853319e3098bf584f))
* **v2-D.1:** SO lubang terpakai + hpp_order ([#98](https://github.com/sapikkk/muhammadsyafiq213510100/issues/98)) ([dff9e51](https://github.com/sapikkk/muhammadsyafiq213510100/commit/dff9e5162de64478351eaae080bc7cfe9756baa5))
* **v2-E.1:** sales order DP schema and uang muka posting ([#108](https://github.com/sapikkk/muhammadsyafiq213510100/issues/108)) ([bf2a877](https://github.com/sapikkk/muhammadsyafiq213510100/commit/bf2a8773ab96c1ddf1efe48adc8b5a0183b452a4))
* **v2-F.2:** Smart Jurnal 9 tipe ([#117](https://github.com/sapikkk/muhammadsyafiq213510100/issues/117)) ([6d56b5b](https://github.com/sapikkk/muhammadsyafiq213510100/commit/6d56b5b3e0b5bb6cc5784b8424fc93332060059c))
* **v2-F.3:** Smart Jurnal +5 tipe v1.25.0 ([#119](https://github.com/sapikkk/muhammadsyafiq213510100/issues/119)) ([5c97ca7](https://github.com/sapikkk/muhammadsyafiq213510100/commit/5c97ca749cea128f2263068b19593c2199d13ad0)), closes [#92](https://github.com/sapikkk/muhammadsyafiq213510100/issues/92)
* **v2-F/G/H:** Smart Jurnal, KPI Owner, period lock ([#109](https://github.com/sapikkk/muhammadsyafiq213510100/issues/109)) ([f0e16ea](https://github.com/sapikkk/muhammadsyafiq213510100/commit/f0e16eac6bc83148f9e3f6b81f1cf1c9c2f104f7))
* **v2-H.2:** penyusutan otomatis + closeout docs v1.24.0 ([#118](https://github.com/sapikkk/muhammadsyafiq213510100/issues/118)) ([162ad29](https://github.com/sapikkk/muhammadsyafiq213510100/commit/162ad29e473a473b738b1062349280395b2f0a16))
* **v2:** closeout epic [#87](https://github.com/sapikkk/muhammadsyafiq213510100/issues/87)–[#94](https://github.com/sapikkk/muhammadsyafiq213510100/issues/94) v1.26.0 ([#120](https://github.com/sapikkk/muhammadsyafiq213510100/issues/120)) ([28ae1da](https://github.com/sapikkk/muhammadsyafiq213510100/commit/28ae1da41828a5ef2ea6298423274def5e25d164))

# 1.0.0 (2026-10-12)


### Bug Fixes

* **admin:** komponen Textarea dan copy halaman laporan panen ([fcf3810](https://github.com/sapikkk/muhammadsyafiq213510100/commit/fcf38108309820524f745c41880d11495dfc9ac3))
* **audit:** typecheck audit-nav spec (Array.from Set) ([e680ccd](https://github.com/sapikkk/muhammadsyafiq213510100/commit/e680ccd3f2e5b97c19019d5016ddef27611de9e1))
* **client:** cegah Prisma masuk bundle browser (v1.28.1) ([#125](https://github.com/sapikkk/muhammadsyafiq213510100/issues/125)) ([07333f5](https://github.com/sapikkk/muhammadsyafiq213510100/commit/07333f5cd65dc199bb5b82d7c51912326ec3736a))
* declare composer config in prisma.config.ts ([4cae52a](https://github.com/sapikkk/muhammadsyafiq213510100/commit/4cae52aaedd90872d125d9e5b9c8d93282d71067))
* **e2e:** T5.1 via API phase + daftar HP; E2E_DEMO_SIKLUS_ID di CI ([b2856b7](https://github.com/sapikkk/muhammadsyafiq213510100/commit/b2856b7dbaa3c9e4d84676633e7c8873278b5be0))
* **seed:** jalankan seed-akun.js langsung untuk set isSystem ([7e9dce3](https://github.com/sapikkk/muhammadsyafiq213510100/commit/7e9dce327949c49f765db05b31039b2b0d76b878))
* **sprint-5:** reset batch demo seed + perbaiki e2e T5.1/T5.3 ([6c239ff](https://github.com/sapikkk/muhammadsyafiq213510100/commit/6c239ff4dcc707e31db37bc57dc9b95f4ad98c86))
* **ui:** pulihkan tab lama saat chunk JS 404 setelah deploy ([83c3dbc](https://github.com/sapikkk/muhammadsyafiq213510100/commit/83c3dbc9ccb2bcb5fed469429221565a5d6cf3d4))
* **ux:** sejajarkan Panduan dengan header halaman dan spacing gap-6 ([98166ce](https://github.com/sapikkk/muhammadsyafiq213510100/commit/98166ced3ba2f6ccab7ec6312c75ce7daa5e0641))
* **v2-G.1:** wire KPI hidroponik on owner dashboard ([#110](https://github.com/sapikkk/muhammadsyafiq213510100/issues/110)) ([a8fcf77](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a8fcf7718a0b25bf0fa5c9307a60bee118b05fb4))


### Features

* add admin-approved password reset (US1.5) ([61f3edc](https://github.com/sapikkk/muhammadsyafiq213510100/commit/61f3edc9b6d6a8fed268b4cb8029c22700a02220))
* add chart of accounts with tree UI, soft delete, and /api/accounts (US2.1) ([d6f1d44](https://github.com/sapikkk/muhammadsyafiq213510100/commit/d6f1d443ff94e22c72285f667e70e52e2cdbd477))
* add double-entry journal with approval and balance updates (US2.2) ([1784345](https://github.com/sapikkk/muhammadsyafiq213510100/commit/17843459f1431d8c890f70231c0ba32c614f30c3))
* add global loading, error, 404, and 403 states (US1.8) ([87bdf1c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/87bdf1cc23e06319fb382a4474eeb884adf4935c))
* add settings page with profile, password, and role matrix (US1.7) ([04666ce](https://github.com/sapikkk/muhammadsyafiq213510100/commit/04666ce1a38e3a91a9a5bc6297429662f0e80229))
* add the ERD schema and role login ([18f9183](https://github.com/sapikkk/muhammadsyafiq213510100/commit/18f918332367c83ffe0cf89daf77f4f4a95529a9))
* **audit:** DataTable search, inventaris/varietas, API contract ([10712df](https://github.com/sapikkk/muhammadsyafiq213510100/commit/10712df342c7583952a43dfb84cd7083f015f8cd))
* **audit:** jurnal DataTable, transactions API, e2e, CI build ([8e47fb3](https://github.com/sapikkk/muhammadsyafiq213510100/commit/8e47fb37c6627c6861417be95cb16a7a14471215))
* **audit:** mobile shell, API contract, toasts, pelanggan table ([1d1dd4a](https://github.com/sapikkk/muhammadsyafiq213510100/commit/1d1dd4ac91dce6218ea28c76710da64df99292d9))
* **audit:** PHASE 1 dev-only RBAC bypass ([696983e](https://github.com/sapikkk/muhammadsyafiq213510100/commit/696983e8d8f905287050d71cbd5c067fb76c521f))
* **audit:** riwayat perubahan pelanggan, inventaris, petani, user, pack ([7194d37](https://github.com/sapikkk/muhammadsyafiq213510100/commit/7194d37eae77ef7f771e9b95dd2c9958a4afddbe))
* **audit:** runbook, fixes, toaster, pengaturan shell ([18d4ee8](https://github.com/sapikkk/muhammadsyafiq213510100/commit/18d4ee8c6de2d046d5a068d6ce058bead48ef2a2))
* **audit:** SessionShell, segment errors, DataTable pilot ([887e92f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/887e92fd8da2c9441c00a2d715f98ad591168741))
* **flow:** active pack Tingkat B — detail, Sheet buat/pakai (Fase 6) ([1cad42d](https://github.com/sapikkk/muhammadsyafiq213510100/commit/1cad42d4081bd21c9b1af65762cf00354bfc1044))
* **flow:** akun Tingkat B — Sheet Tambah/Ubah, Dialog nonaktifkan ([9768de9](https://github.com/sapikkk/muhammadsyafiq213510100/commit/9768de9b9ad055e44f6bc9ca24c472e0c43f4d16))
* **flow:** fondasi UI Sheet, FormSheet, ConfirmDialog, RowActions (Fase 1) ([dba8378](https://github.com/sapikkk/muhammadsyafiq213510100/commit/dba837839100ecd61818a7bf15dd5026ed324237))
* **flow:** infrastruktur Tingkat B — Sheet tambah, Dialog status kolam ([3408a2d](https://github.com/sapikkk/muhammadsyafiq213510100/commit/3408a2da97b9872e3f7f81bc245efebf38440747))
* **flow:** inventaris Tingkat B — detail, Sheet tambah/pergerakan (Fase 5) ([16cd13d](https://github.com/sapikkk/muhammadsyafiq213510100/commit/16cd13d542ee919a61952cb000f14b46601a1d9a))
* **flow:** penjualan Tingkat C — daftar, /baru, /[id] aksi per status ([f201bfa](https://github.com/sapikkk/muhammadsyafiq213510100/commit/f201bfae4cad9b0cf8e32fdc896a7f1337261f44))
* **flow:** pilot pelanggan Tingkat A — Sheet Tambah/Ubah (Fase 2) ([2985ad5](https://github.com/sapikkk/muhammadsyafiq213510100/commit/2985ad56ee6e918babf59967722b02d3c5e143df))
* **flow:** siklus Tingkat C, inventaris Ubah/Nonaktifkan, banned-ui fix ([4e24841](https://github.com/sapikkk/muhammadsyafiq213510100/commit/4e24841559908091af2d47be01f5409bce7a4b03))
* **flow:** Tingkat A — kolom aktif pelanggan, petani master, user ([db27f8f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/db27f8f921c93c3751c74a166aaabaa7c756ebd0))
* **flow:** Tingkat A petani master + owner pengguna (Fase 3) ([4d631e8](https://github.com/sapikkk/muhammadsyafiq213510100/commit/4d631e87b550a0d6b1b082869427b17e506184bd))
* **flow:** varietas Tingkat B — detail, Sheet, status Dialog (Fase 4) ([d24f64a](https://github.com/sapikkk/muhammadsyafiq213510100/commit/d24f64a6e1c3da8a45f876f918ede633a44240d8))
* **home:** dashboard progress GitHub Project + tooling deploy Vercel ([e36ad1b](https://github.com/sapikkk/muhammadsyafiq213510100/commit/e36ad1bc7944d053481872a187e2bfa10da895aa)), closes [#1](https://github.com/sapikkk/muhammadsyafiq213510100/issues/1)
* **hpp:** US2.3 override + plastik + jurnal 5300 ([#68](https://github.com/sapikkk/muhammadsyafiq213510100/issues/68)) ([998e5d6](https://github.com/sapikkk/muhammadsyafiq213510100/commit/998e5d62498c83d977c507203fe3ef5816116d55))
* **hpp:** US2.3 override, plastik, jurnal susut abnormal (US2.5) ([e4a4c9e](https://github.com/sapikkk/muhammadsyafiq213510100/commit/e4a4c9ebb2a961710d453fb8251598a2b651fa6b))
* **laporan:** US6.3 ekspor jurnal xlsx dan L/R + neraca PDF ([b8103c9](https://github.com/sapikkk/muhammadsyafiq213510100/commit/b8103c929df137c8fb66ecbf065bcdf6aaa16268))
* **laporan:** US6.5 arus kas Owner dengan filter periode dan PDF ([aa33cb1](https://github.com/sapikkk/muhammadsyafiq213510100/commit/aa33cb1623622a74181b1e7982f90e9e11b18efb))
* let admin register petani accounts (US1.6) ([a7ac1b2](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a7ac1b2d48b31ccf22dca312d9cffd136f9d1988))
* **notifikasi:** pusat notifikasi RBAC, deep link, dan README dokumentasi ([6addb17](https://github.com/sapikkk/muhammadsyafiq213510100/commit/6addb1740c33f8eae383eb2d7e13363d99b118c5))
* **owner:** US1.9 kelola user dan US2.6 COA/jurnal/prive ([fe75da3](https://github.com/sapikkk/muhammadsyafiq213510100/commit/fe75da31ee3ce25709c65d597a11d7f0844c6d5e))
* **owner:** US6.1 KPI dan grafik pendapatan vs beban ([fa5c2ff](https://github.com/sapikkk/muhammadsyafiq213510100/commit/fa5c2ffa8e31c182ba694fd9c747bcfbcbfac3eb))
* **owner:** US6.1 KPI dashboard ([#73](https://github.com/sapikkk/muhammadsyafiq213510100/issues/73)) ([a6e9c6d](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a6e9c6da9ea304f74dc885adf89e91e2ff7e78d5))
* **owner:** US6.2 pie biaya + drill-down ([#74](https://github.com/sapikkk/muhammadsyafiq213510100/issues/74)) ([8601ca3](https://github.com/sapikkk/muhammadsyafiq213510100/commit/8601ca385b75e634b688fcf14bea31e821de682d))
* **owner:** US6.2 pie breakdown biaya dan drill-down jurnal ([0248fd8](https://github.com/sapikkk/muhammadsyafiq213510100/commit/0248fd8fed55ffa283db8ea1c21c959dc5b01fba))
* **owner:** US6.4 evaluasi margin, BEP, dan kapasitas idle ([c31337e](https://github.com/sapikkk/muhammadsyafiq213510100/commit/c31337e6d7732a858c24192aa488b63c07603e10))
* **penjualan:** EPIC-5 US5.1–5.5 ([#72](https://github.com/sapikkk/muhammadsyafiq213510100/issues/72)) ([66d97d8](https://github.com/sapikkk/muhammadsyafiq213510100/commit/66d97d8f9e534eeb4a47fab60b058989d7fd322b))
* **penjualan:** US5.1 pelanggan + sales order ([#69](https://github.com/sapikkk/muhammadsyafiq213510100/issues/69)) ([81840b0](https://github.com/sapikkk/muhammadsyafiq213510100/commit/81840b097ab7db1d616d3798d27d09d62d0ef3cf))
* **penjualan:** US5.1 pelanggan + sales order DRAFT (US5.2 konfirmasi stok) ([3a1b87d](https://github.com/sapikkk/muhammadsyafiq213510100/commit/3a1b87d7ee906a22ac7f74f7a2adc6fedf0fafb8))
* **penjualan:** US5.3 pengiriman SO dan US5.4 jurnal PENDING saat DELIVERED ([6e4b05b](https://github.com/sapikkk/muhammadsyafiq213510100/commit/6e4b05b81b2a8677a914dad4d0f4dcb7a22cf5fc))
* **penjualan:** US5.5 invoice, batal SO, dan biaya packing ([9c69863](https://github.com/sapikkk/muhammadsyafiq213510100/commit/9c698632a4fe463e8861421ff573c5b66812e6c7))
* **petani:** bantuan rockwool/benih dan seed varietas pasar ([ff783ed](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ff783ed1d250131870ffa0bfbbe679f88eaad18b))
* **produksi:** US3.5 kegagalan + US2.5 susut ([#66](https://github.com/sapikkk/muhammadsyafiq213510100/issues/66)) ([aa7e958](https://github.com/sapikkk/muhammadsyafiq213510100/commit/aa7e958a159aa9baade94e33557c37939c033428))
* **produksi:** US3.5 log kegagalan dan US2.5 klasifikasi susut ([212d3e6](https://github.com/sapikkk/muhammadsyafiq213510100/commit/212d3e60860bcecad667cbfc3cd676bf38567735))
* **produksi:** US3.6 timeline + US3.7 dashboard petani ([#67](https://github.com/sapikkk/muhammadsyafiq213510100/issues/67)) ([3250636](https://github.com/sapikkk/muhammadsyafiq213510100/commit/3250636444e7fc2bb49b878f2e6f56291293a991))
* **produksi:** US3.6 timeline/tambal/monitor dan US3.7 dashboard petani ([15b9287](https://github.com/sapikkk/muhammadsyafiq213510100/commit/15b9287c8ae638fe6e89e9a981a26c45d720788a))
* record the Architecture spec and scaffold aplikasi Kokonus Farm ([5e50a76](https://github.com/sapikkk/muhammadsyafiq213510100/commit/5e50a76176191fd8e3d4c7542c11293c12435bc0))
* scaffold Kokonus Farm composer app ([5d88193](https://github.com/sapikkk/muhammadsyafiq213510100/commit/5d88193469d5e08bdc4b087119dc0cd2be80e48e))
* **sprint-5:** selesaikan T5.5–T5.9 — deploy doc, pelatihan, perbaiki e2e ([a12508c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a12508c8a0918fd44566bff7d26989ef1afc047d))
* **sprint-5:** T5.1–T5.4 usability, seed demo, audit jurnal, e2e ([6690d9f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/6690d9fc29f1e5d44b7f29b36e5728daf16eb2a7))
* **ui:** dashboard owner menampilkan data lewat tabel, bukan Card ([e2ecc4b](https://github.com/sapikkk/muhammadsyafiq213510100/commit/e2ecc4b8d5f6ce89faaa0f018bd73a14621dab16))
* **ui:** DataTable owner keuangan, DetailLayout jurnal, filter seragam ([4e0873c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/4e0873c12d21849fd77d47705c585645a13398b0))
* **ui:** redesign layout to sidebar dashboard with shadcn zinc theme ([a2f4964](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a2f49646453619df76f0535dbac34164a4599449))
* **ui:** selaraskan jurnal, harvest review, invoice ke DetailLayout/Crud ([08b9b62](https://github.com/sapikkk/muhammadsyafiq213510100/commit/08b9b621fcc63c7cc75a6250bbbf217e40715d2c))
* **ui:** sheet detail lebar, coachmark alur, sidebar collapse ([748f5f3](https://github.com/sapikkk/muhammadsyafiq213510100/commit/748f5f3d48204eacabd53353fe525409587497eb))
* **ui:** sidebar layout per peran dan US3.3 laporan panen ([533d1e6](https://github.com/sapikkk/muhammadsyafiq213510100/commit/533d1e645cfbc2828db07567c38e98efb4e07c9f))
* **US2.3:** implementasi approve/reject harvest report dan otomatisasi HPP serta jurnal persediaan ([d2d3289](https://github.com/sapikkk/muhammadsyafiq213510100/commit/d2d3289b4c7559e54c6d9cc7be46e3f7183a79c8))
* **us2.4:** form biaya langsung dan overhead periode ([a1140cd](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a1140cdfaf498cd8cadbe84110046b5a7509b213))
* **us3.1:** mulai siklus semai dengan kode batch dan active pack ([b1d8972](https://github.com/sapikkk/muhammadsyafiq213510100/commit/b1d89721415688158c229cd0526edc4bfa2c7e55))
* **us3.2:** pindah fase produksi dengan log dan konfirmasi ([479836f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/479836fe0258ead93de23fac8bdbe963f0aca1fc))
* **us3.3:** laporan panen Petani dan perbaikan form siklus ([e9c738e](https://github.com/sapikkk/muhammadsyafiq213510100/commit/e9c738e7d0889103071d82aa637b35790df85f57)), closes [#61](https://github.com/sapikkk/muhammadsyafiq213510100/issues/61)
* **us3.4:** master varietas dan parameter asumsi ([b44e0ff](https://github.com/sapikkk/muhammadsyafiq213510100/commit/b44e0ff16c4576f91494beb2f4c19fa534ee9cd9))
* **us4.1:** stok inventaris dan log pergerakan IN/OUT/ADJUST ([e73d0f5](https://github.com/sapikkk/muhammadsyafiq213510100/commit/e73d0f5f9a003d35a63e4cc5d82ad4b9229dbc93))
* **us4.2:** active pack biaya per unit dan status habis ([7b7fa8d](https://github.com/sapikkk/muhammadsyafiq213510100/commit/7b7fa8da0e1b1ace4e43672ea791b172ca377f30))
* **us4.3:** alert stok minimum via API dan halaman stok rendah ([fbed49c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/fbed49c97e9d97818ae278b16afd02821c4ae57b))
* **us4.3:** alias GET /api/inventory/alerts ke /alert ([d3b03e8](https://github.com/sapikkk/muhammadsyafiq213510100/commit/d3b03e8bbdf7e9a82b193c9f102938376af0c78b))
* **us4.4:** master lahan, greenhouse, dan kolam ([c1a2b9f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/c1a2b9f37b718f119a751af84760eb6bc4beec32))
* **us4.5:** master petani ERD dan navigasi sidebar ([6edfc7a](https://github.com/sapikkk/muhammadsyafiq213510100/commit/6edfc7a07cd5838d9c737ce98a3bba525f483d40))
* **ux:** flow nav, cache & tables v1.28.0 ([#122](https://github.com/sapikkk/muhammadsyafiq213510100/issues/122)) ([#123](https://github.com/sapikkk/muhammadsyafiq213510100/issues/123)) ([faf7090](https://github.com/sapikkk/muhammadsyafiq213510100/commit/faf709050c1db72389d923e4ed80c6acff831fb7))
* **ux:** Panduan seragam di semua halaman operasi dan utilitas ([7a5cf7f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/7a5cf7f19344a8b9e0366629a56e4d2653cda659))
* **ux:** sidebar epik Owner 1.0–7.0 dan coachmark UAT per halaman ([47bef4d](https://github.com/sapikkk/muhammadsyafiq213510100/commit/47bef4d8f662fa2fafbb80b610448ac755f71ca2))
* **v2-A.1:** Akun.is_system + guard COA standar ([#95](https://github.com/sapikkk/muhammadsyafiq213510100/issues/95)) ([b26c5a7](https://github.com/sapikkk/muhammadsyafiq213510100/commit/b26c5a742c706d0e40990414f0aafbffff98b96f))
* **v2-A.3:** jurnal panen Dr 1350 Cr WIP ([#114](https://github.com/sapikkk/muhammadsyafiq213510100/issues/114)) ([e282b00](https://github.com/sapikkk/muhammadsyafiq213510100/commit/e282b00695a82393b2ae04ea2f358b2fce3832f7))
* **v2-A.4:** kas split 1100/1110 ([#116](https://github.com/sapikkk/muhammadsyafiq213510100/issues/116)) ([83f4360](https://github.com/sapikkk/muhammadsyafiq213510100/commit/83f4360e7f4d3f48ce95d6e9f5c229b50f7507d3))
* **v2-B.1:** abort siklus gagal total ([#96](https://github.com/sapikkk/muhammadsyafiq213510100/issues/96)) ([a6e7167](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a6e71672618066902090583329f100b426d7ce4d))
* **v2-C.1:** kapasitas lubang pack + semai proporsional ([#97](https://github.com/sapikkk/muhammadsyafiq213510100/issues/97)) ([5fc6603](https://github.com/sapikkk/muhammadsyafiq213510100/commit/5fc660355972a357aa2d1a1853319e3098bf584f))
* **v2-D.1:** SO lubang terpakai + hpp_order ([#98](https://github.com/sapikkk/muhammadsyafiq213510100/issues/98)) ([dff9e51](https://github.com/sapikkk/muhammadsyafiq213510100/commit/dff9e5162de64478351eaae080bc7cfe9756baa5))
* **v2-E.1:** sales order DP schema and uang muka posting ([#108](https://github.com/sapikkk/muhammadsyafiq213510100/issues/108)) ([bf2a877](https://github.com/sapikkk/muhammadsyafiq213510100/commit/bf2a8773ab96c1ddf1efe48adc8b5a0183b452a4))
* **v2-F.2:** Smart Jurnal 9 tipe ([#117](https://github.com/sapikkk/muhammadsyafiq213510100/issues/117)) ([6d56b5b](https://github.com/sapikkk/muhammadsyafiq213510100/commit/6d56b5b3e0b5bb6cc5784b8424fc93332060059c))
* **v2-F.3:** Smart Jurnal +5 tipe v1.25.0 ([#119](https://github.com/sapikkk/muhammadsyafiq213510100/issues/119)) ([5c97ca7](https://github.com/sapikkk/muhammadsyafiq213510100/commit/5c97ca749cea128f2263068b19593c2199d13ad0)), closes [#92](https://github.com/sapikkk/muhammadsyafiq213510100/issues/92)
* **v2-F/G/H:** Smart Jurnal, KPI Owner, period lock ([#109](https://github.com/sapikkk/muhammadsyafiq213510100/issues/109)) ([f0e16ea](https://github.com/sapikkk/muhammadsyafiq213510100/commit/f0e16eac6bc83148f9e3f6b81f1cf1c9c2f104f7))
* **v2-H.2:** penyusutan otomatis + closeout docs v1.24.0 ([#118](https://github.com/sapikkk/muhammadsyafiq213510100/issues/118)) ([162ad29](https://github.com/sapikkk/muhammadsyafiq213510100/commit/162ad29e473a473b738b1062349280395b2f0a16))
* **v2:** closeout epic [#87](https://github.com/sapikkk/muhammadsyafiq213510100/issues/87)–[#94](https://github.com/sapikkk/muhammadsyafiq213510100/issues/94) v1.26.0 ([#120](https://github.com/sapikkk/muhammadsyafiq213510100/issues/120)) ([28ae1da](https://github.com/sapikkk/muhammadsyafiq213510100/commit/28ae1da41828a5ef2ea6298423274def5e25d164))

## [1.35.1](https://github.com/sapikkk/muhammadsyafiq213510100/compare/v1.35.0...v1.35.1) (2026-10-11)


### Bug Fixes

* **ux:** sejajarkan Panduan dengan header halaman dan spacing gap-6 ([6110055](https://github.com/sapikkk/muhammadsyafiq213510100/commit/6110055d88141300e2655ec7692c9447011c8f52))

# [1.35.0](https://github.com/sapikkk/muhammadsyafiq213510100/compare/v1.34.0...v1.35.0) (2026-10-11)


### Features

* **ux:** Panduan seragam di semua halaman operasi dan utilitas ([4e26e9a](https://github.com/sapikkk/muhammadsyafiq213510100/commit/4e26e9a53ad524167021613d6802325d87ecde01))

# [1.34.0](https://github.com/sapikkk/muhammadsyafiq213510100/compare/v1.33.0...v1.34.0) (2026-10-11)


### Features

* **ux:** sidebar epik Owner 1.0–7.0 dan coachmark UAT per halaman ([5112171](https://github.com/sapikkk/muhammadsyafiq213510100/commit/5112171dbd0838f201124a427c89ac84a1006a64))

# [1.33.0](https://github.com/sapikkk/muhammadsyafiq213510100/compare/v1.32.0...v1.33.0) (2026-10-11)


### Features

* **audit:** riwayat perubahan pelanggan, inventaris, petani, user, pack ([de3e966](https://github.com/sapikkk/muhammadsyafiq213510100/commit/de3e966799d3f10f60b5d39f84ed4835e395be74))

# [1.32.0](https://github.com/sapikkk/muhammadsyafiq213510100/compare/v1.31.1...v1.32.0) (2026-10-11)


### Features

* **ui:** sheet detail lebar, coachmark alur, sidebar collapse ([78ba21b](https://github.com/sapikkk/muhammadsyafiq213510100/commit/78ba21b79527a46e9fc909954a04c9c0ef2cb3ee))

## [1.31.1](https://github.com/sapikkk/muhammadsyafiq213510100/compare/v1.31.0...v1.31.1) (2026-10-11)


### Bug Fixes

* **ui:** pulihkan tab lama saat chunk JS 404 setelah deploy ([a3de85f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a3de85f8e1f05649ed05d7cf5e2188695d33c09d))

# [1.31.0](https://github.com/sapikkk/muhammadsyafiq213510100/compare/v1.30.0...v1.31.0) (2026-10-11)


### Features

* **ui:** dashboard owner menampilkan data lewat tabel, bukan Card ([a228ed1](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a228ed19f96c618c923056ed27ef9abc568fe2c3))

# [1.30.0](https://github.com/sapikkk/muhammadsyafiq213510100/compare/v1.29.0...v1.30.0) (2026-10-11)


### Features

* **flow:** akun Tingkat B — Sheet Tambah/Ubah, Dialog nonaktifkan ([11245b6](https://github.com/sapikkk/muhammadsyafiq213510100/commit/11245b6bd8a88b58e5a403987360abb0ae6dda87))
* **flow:** infrastruktur Tingkat B — Sheet tambah, Dialog status kolam ([7369bda](https://github.com/sapikkk/muhammadsyafiq213510100/commit/7369bda931cd2e32c0b3fd321167d3af7359eb3c))
* **flow:** penjualan Tingkat C — daftar, /baru, /[id] aksi per status ([bcbaa49](https://github.com/sapikkk/muhammadsyafiq213510100/commit/bcbaa490d10edd0d58a6a8d594b1b672cb4a4813))
* **flow:** siklus Tingkat C, inventaris Ubah/Nonaktifkan, banned-ui fix ([15ce8f4](https://github.com/sapikkk/muhammadsyafiq213510100/commit/15ce8f45edd2293d5979cd6b050d4815117aa03c))
* **flow:** Tingkat A — kolom aktif pelanggan, petani master, user ([2a8188b](https://github.com/sapikkk/muhammadsyafiq213510100/commit/2a8188b8e00d139fee20607f9e81a10e255d0837))
* **ui:** DataTable owner keuangan, DetailLayout jurnal, filter seragam ([7b1df67](https://github.com/sapikkk/muhammadsyafiq213510100/commit/7b1df67636619f0fff295a53fec44d809dfdb711))
* **ui:** selaraskan jurnal, harvest review, invoice ke DetailLayout/Crud ([32a0c69](https://github.com/sapikkk/muhammadsyafiq213510100/commit/32a0c691f74957af0a877b1ff187ca2c19c4baf8))

# [1.29.0](https://github.com/sapikkk/muhammadsyafiq213510100/compare/v1.28.1...v1.29.0) (2026-10-11)


### Features

* **flow:** active pack Tingkat B — detail, Sheet buat/pakai (Fase 6) ([630d64a](https://github.com/sapikkk/muhammadsyafiq213510100/commit/630d64a0089dd317de33ff31d5bc3b10ba4cd3db))
* **flow:** fondasi UI Sheet, FormSheet, ConfirmDialog, RowActions (Fase 1) ([5de332f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/5de332fb9206bb69f90614ebf9b3719eb592e33f))
* **flow:** inventaris Tingkat B — detail, Sheet tambah/pergerakan (Fase 5) ([a6e4060](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a6e4060880936695f48a976a63c437976e8a79fc))
* **flow:** pilot pelanggan Tingkat A — Sheet Tambah/Ubah (Fase 2) ([f3bba79](https://github.com/sapikkk/muhammadsyafiq213510100/commit/f3bba79ae58fa39ef1c3afba4571b7b184eae4b0))
* **flow:** Tingkat A petani master + owner pengguna (Fase 3) ([da4f0bd](https://github.com/sapikkk/muhammadsyafiq213510100/commit/da4f0bd3f3c88b3ac4a5fda999d93661fe41fe23))
* **flow:** varietas Tingkat B — detail, Sheet, status Dialog (Fase 4) ([b385c3d](https://github.com/sapikkk/muhammadsyafiq213510100/commit/b385c3df6c667f0a43c2d9de7fde77641939a9be))

## [1.28.1](https://github.com/sapikkk/muhammadsyafiq213510100/compare/v1.28.0...v1.28.1) (2026-10-10)


### Bug Fixes

* **client:** cegah Prisma masuk bundle browser (v1.28.1) ([#125](https://github.com/sapikkk/muhammadsyafiq213510100/issues/125)) ([94c843f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/94c843f6d5a1179e8ffd3e5639969dd2ca51f677))

# [1.28.0](https://github.com/sapikkk/muhammadsyafiq213510100/compare/v1.27.0...v1.28.0) (2026-10-10)


### Features

* **ux:** flow nav, cache & tables v1.28.0 ([#122](https://github.com/sapikkk/muhammadsyafiq213510100/issues/122)) ([#123](https://github.com/sapikkk/muhammadsyafiq213510100/issues/123)) ([e82a9b5](https://github.com/sapikkk/muhammadsyafiq213510100/commit/e82a9b58006c90db446ab633722ccc8362f8e835))

# [1.27.0](https://github.com/sapikkk/muhammadsyafiq213510100/compare/v1.26.0...v1.27.0) (2026-10-10)


### Features

* **ops:** demo seed flow (`npm run seed:demo`), DEMO-DATA docs, FINDING-01 runbook (#50 · #81)

### Bug Fixes

* **FINDING-01:** second P2024 retry on Prisma client extension

# [1.26.0](https://github.com/sapikkk/muhammadsyafiq213510100/compare/v1.25.0...v1.26.0) (2026-10-10)


### Features

* **v2 closeout:** Smart 17 tipe, jurnal penyesuaian active pack habis, HPP rata varietas (moving avg) + fallback SO

# [1.25.0](https://github.com/sapikkk/muhammadsyafiq213510100/compare/v1.24.0...v1.25.0) (2026-10-10)


### Features

* **v2-F.3:** Smart Jurnal +5 tipe v1.25.0 ([#119](https://github.com/sapikkk/muhammadsyafiq213510100/issues/119)) ([e9f5450](https://github.com/sapikkk/muhammadsyafiq213510100/commit/e9f54502918c29a486fdf281c7f9a395933d2d70)), closes [#92](https://github.com/sapikkk/muhammadsyafiq213510100/issues/92)

# [1.25.0](https://github.com/sapikkk/muhammadsyafiq213510100/compare/v1.24.0...v1.25.0) (2026-10-10)


### Features

* **v2-F.3:** Smart Jurnal +5 tipe (pembelian bahan tunai/kredit, pendapatan lain, gaji, terima piutang)

# [1.24.0](https://github.com/sapikkk/muhammadsyafiq213510100/compare/v1.23.0...v1.24.0) (2026-10-10)


### Features

* **v2-H.2:** penyusutan otomatis bulan + closeout docs

# [1.23.0](https://github.com/sapikkk/muhammadsyafiq213510100/compare/v1.22.0...v1.23.0) (2026-10-10)


### Features

* **v2-F.2:** Smart Jurnal 9 tipe ([#117](https://github.com/sapikkk/muhammadsyafiq213510100/issues/117)) ([faba7e3](https://github.com/sapikkk/muhammadsyafiq213510100/commit/faba7e3ef21683fa87c99e22f837ee1ceed96506))

# [1.22.0](https://github.com/sapikkk/muhammadsyafiq213510100/compare/v1.21.0...v1.22.0) (2026-10-10)


### Features

* **v2-A.4:** kas split 1100/1110 ([#116](https://github.com/sapikkk/muhammadsyafiq213510100/issues/116)) ([5bc06c4](https://github.com/sapikkk/muhammadsyafiq213510100/commit/5bc06c4208b4c31a71f4986ea4a3e2899b55d48e))

# [1.21.0](https://github.com/sapikkk/muhammadsyafiq213510100/compare/v1.20.0...v1.21.0) (2026-10-10)


### Features

* **v2-A.3:** jurnal panen Dr 1350 Cr WIP ([#114](https://github.com/sapikkk/muhammadsyafiq213510100/issues/114)) ([dd88b8d](https://github.com/sapikkk/muhammadsyafiq213510100/commit/dd88b8df14aee94c09ea42dc81daaacd24a4301c))

## [1.19.1](https://github.com/sapikkk/muhammadsyafiq213510100/compare/v1.19.0...v1.19.1) (2026-10-10)


### Bug Fixes

* **v2-G.1:** wire KPI hidroponik on owner dashboard ([#110](https://github.com/sapikkk/muhammadsyafiq213510100/issues/110)) ([159e141](https://github.com/sapikkk/muhammadsyafiq213510100/commit/159e14169bdf1a390f89938ebcd5b6dc58b3e44d))

# [1.19.0](https://github.com/sapikkk/muhammadsyafiq213510100/compare/v1.18.0...v1.19.0) (2026-10-10)


### Features

* **v2-F/G/H:** Smart Jurnal, KPI Owner, period lock ([#109](https://github.com/sapikkk/muhammadsyafiq213510100/issues/109)) ([5485d2d](https://github.com/sapikkk/muhammadsyafiq213510100/commit/5485d2d4ddd6a2438a48444fc4b17a51262d0361))

# [1.18.0](https://github.com/sapikkk/muhammadsyafiq213510100/compare/v1.17.0...v1.18.0) (2026-10-10)


### Features

* **v2-E.1:** sales order DP schema and uang muka posting ([#108](https://github.com/sapikkk/muhammadsyafiq213510100/issues/108)) ([77142b2](https://github.com/sapikkk/muhammadsyafiq213510100/commit/77142b24ce2f10abe0a20a01b69ba6009e4e3cd7))

# [1.17.0](https://github.com/sapikkk/muhammadsyafiq213510100/compare/v1.16.0...v1.17.0) (2026-10-10)


### Features

* **v2-D.1:** SO lubang terpakai + hpp_order ([#98](https://github.com/sapikkk/muhammadsyafiq213510100/issues/98)) ([ef15239](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ef15239f3e6872192cbd0edd8453168189fbb775))

# [1.16.0](https://github.com/sapikkk/muhammadsyafiq213510100/compare/v1.15.0...v1.16.0) (2026-10-10)


### Features

* **v2-C.1:** kapasitas lubang pack + semai proporsional ([#97](https://github.com/sapikkk/muhammadsyafiq213510100/issues/97)) ([8712a25](https://github.com/sapikkk/muhammadsyafiq213510100/commit/8712a2537f45b31e4cac685c049f98fee79c3959))

# [1.15.0](https://github.com/sapikkk/muhammadsyafiq213510100/compare/v1.14.1...v1.15.0) (2026-10-10)


### Features

* **v2-B.1:** abort siklus gagal total ([#96](https://github.com/sapikkk/muhammadsyafiq213510100/issues/96)) ([dbe8a2b](https://github.com/sapikkk/muhammadsyafiq213510100/commit/dbe8a2bcf576c40a8629ea785728de8be3645f84))

## [1.14.1](https://github.com/sapikkk/muhammadsyafiq213510100/compare/v1.14.0...v1.14.1) (2026-10-10)


### Bug Fixes

* **seed:** jalankan seed-akun.js langsung untuk set isSystem ([0200f51](https://github.com/sapikkk/muhammadsyafiq213510100/commit/0200f517320888aee00f7e522f1e5c013557331f))

# [1.14.0](https://github.com/sapikkk/muhammadsyafiq213510100/compare/v1.13.0...v1.14.0) (2026-10-10)


### Features

* **v2-A.1:** Akun.is_system + guard COA standar ([#95](https://github.com/sapikkk/muhammadsyafiq213510100/issues/95)) ([2338522](https://github.com/sapikkk/muhammadsyafiq213510100/commit/2338522e5fb104f8bfaaa2ba91dc70068ff7c060))

# [1.13.0](https://github.com/sapikkk/muhammadsyafiq213510100/compare/v1.12.0...v1.13.0) (2026-10-10)


### Bug Fixes

* **e2e:** T5.1 via API phase + daftar HP; E2E_DEMO_SIKLUS_ID di CI ([9152f75](https://github.com/sapikkk/muhammadsyafiq213510100/commit/9152f754a3f66e3fbf8bfc03c32827efd1cf2273))
* **sprint-5:** reset batch demo seed + perbaiki e2e T5.1/T5.3 ([1a168ef](https://github.com/sapikkk/muhammadsyafiq213510100/commit/1a168ef3372a3653a0678eb472784a9d30d43906))


### Features

* **home:** dashboard progress GitHub Project + tooling deploy Vercel ([b779904](https://github.com/sapikkk/muhammadsyafiq213510100/commit/b779904feb44914490d34128624b4d752c870475)), closes [#1](https://github.com/sapikkk/muhammadsyafiq213510100/issues/1)
* **sprint-5:** selesaikan T5.5–T5.9 — deploy doc, pelatihan, perbaiki e2e ([df65431](https://github.com/sapikkk/muhammadsyafiq213510100/commit/df654310603a873db8d914e1da762ca928719ca9))
* **sprint-5:** T5.1–T5.4 usability, seed demo, audit jurnal, e2e ([773757d](https://github.com/sapikkk/muhammadsyafiq213510100/commit/773757d85c83982e0c489c83d2d13dd39a05279b))

# [1.12.0](https://github.com/sapikkk/muhammadsyafiq213510100/compare/v1.11.0...v1.12.0) (2026-10-10)


### Bug Fixes

* **audit:** typecheck audit-nav spec (Array.from Set) ([c9eb810](https://github.com/sapikkk/muhammadsyafiq213510100/commit/c9eb810537c5246cc5af43c02b457f024adc1ae6))


### Features

* **audit:** DataTable search, inventaris/varietas, API contract ([25feace](https://github.com/sapikkk/muhammadsyafiq213510100/commit/25feaceef7bd0ccbfe2b5b4f450c97c14d3abab9))
* **audit:** jurnal DataTable, transactions API, e2e, CI build ([60c4d3a](https://github.com/sapikkk/muhammadsyafiq213510100/commit/60c4d3ac5af26596a83c5c13c2afc4a14b8a4028))
* **audit:** mobile shell, API contract, toasts, pelanggan table ([9e34ab9](https://github.com/sapikkk/muhammadsyafiq213510100/commit/9e34ab9c168b9de30bac6583fe142a580fcae4e7))
* **audit:** PHASE 1 dev-only RBAC bypass ([886f0cd](https://github.com/sapikkk/muhammadsyafiq213510100/commit/886f0cd136e911a3e18ed9715a7b7d70df50ab3e))
* **audit:** runbook, fixes, toaster, pengaturan shell ([3964628](https://github.com/sapikkk/muhammadsyafiq213510100/commit/3964628f5180eaac122c2da33f3ca12b5f635020))
* **audit:** SessionShell, segment errors, DataTable pilot ([a8bc5d0](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a8bc5d063c4275e68d61039cea59d6b534e03d21))

# [1.11.0](https://github.com/sapikkk/muhammadsyafiq213510100/compare/v1.10.0...v1.11.0) (2026-10-09)


### Features

* **owner:** US1.9 kelola user dan US2.6 COA/jurnal/prive ([26e11c6](https://github.com/sapikkk/muhammadsyafiq213510100/commit/26e11c6e4fc483d162d0d10fa0b38b7af1a62da2))

# [1.10.0](https://github.com/sapikkk/muhammadsyafiq213510100/compare/v1.9.0...v1.10.0) (2026-10-09)


### Features

* **laporan:** US6.5 arus kas Owner dengan filter periode dan PDF ([5299cec](https://github.com/sapikkk/muhammadsyafiq213510100/commit/5299cec119414f7a8c65462b8591caefcb437f9a))

# [1.9.0](https://github.com/sapikkk/muhammadsyafiq213510100/compare/v1.8.0...v1.9.0) (2026-10-09)


### Features

* **owner:** US6.4 evaluasi margin, BEP, dan kapasitas idle ([183831e](https://github.com/sapikkk/muhammadsyafiq213510100/commit/183831ed98886372a1d1842ed7968dd8c1c41f9a))

# [1.8.0](https://github.com/sapikkk/muhammadsyafiq213510100/compare/v1.7.0...v1.8.0) (2026-10-09)


### Features

* **laporan:** US6.3 ekspor jurnal xlsx dan L/R + neraca PDF ([d2d9aee](https://github.com/sapikkk/muhammadsyafiq213510100/commit/d2d9aeeccbfccbdc802941745c58c1ad68995382))

# [1.7.0](https://github.com/sapikkk/muhammadsyafiq213510100/compare/v1.6.0...v1.7.0) (2026-10-09)


### Features

* **owner:** US6.2 pie biaya + drill-down ([#74](https://github.com/sapikkk/muhammadsyafiq213510100/issues/74)) ([774c3f4](https://github.com/sapikkk/muhammadsyafiq213510100/commit/774c3f4e2feb2a4640380f3d13c3b8cb0e314007))
* **owner:** US6.2 pie breakdown biaya dan drill-down jurnal ([cbebe89](https://github.com/sapikkk/muhammadsyafiq213510100/commit/cbebe89bca99ff488245fb6f8df165ccd1aaeaec))

# [1.6.0](https://github.com/sapikkk/muhammadsyafiq213510100/compare/v1.5.0...v1.6.0) (2026-10-09)


### Features

* **owner:** US6.1 KPI dan grafik pendapatan vs beban ([84424d4](https://github.com/sapikkk/muhammadsyafiq213510100/commit/84424d4af0ce44face45d99be154ea265146e2ff))
* **owner:** US6.1 KPI dashboard ([#73](https://github.com/sapikkk/muhammadsyafiq213510100/issues/73)) ([f6d89c2](https://github.com/sapikkk/muhammadsyafiq213510100/commit/f6d89c24589aa0b7d09fa8b0888809d7be733625))

# [1.5.0](https://github.com/sapikkk/muhammadsyafiq213510100/compare/v1.4.0...v1.5.0) (2026-10-09)


### Features

* **penjualan:** EPIC-5 US5.1–5.5 ([#72](https://github.com/sapikkk/muhammadsyafiq213510100/issues/72)) ([e1026b0](https://github.com/sapikkk/muhammadsyafiq213510100/commit/e1026b04fac70a1a2f114535835ea1c7bb33defe))
* **penjualan:** US5.3 pengiriman SO dan US5.4 jurnal PENDING saat DELIVERED ([e243687](https://github.com/sapikkk/muhammadsyafiq213510100/commit/e2436870bcf4d1495ca2435c5b0a117b1a8aef85))
* **penjualan:** US5.5 invoice, batal SO, dan biaya packing ([de25531](https://github.com/sapikkk/muhammadsyafiq213510100/commit/de25531ad96282d541646495573f900c97432790))

# [1.4.0](https://github.com/sapikkk/muhammadsyafiq213510100/compare/v1.3.0...v1.4.0) (2026-10-09)


### Features

* **hpp:** US2.3 override + plastik + jurnal 5300 ([#68](https://github.com/sapikkk/muhammadsyafiq213510100/issues/68)) ([0669336](https://github.com/sapikkk/muhammadsyafiq213510100/commit/06693368d900aa3e07b7fb3b23da6243d175939f))
* **hpp:** US2.3 override, plastik, jurnal susut abnormal (US2.5) ([9f4f97c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/9f4f97ceea07c324430747794c1f13383fcce2fc))
* **penjualan:** US5.1 pelanggan + sales order ([#69](https://github.com/sapikkk/muhammadsyafiq213510100/issues/69)) ([f38af92](https://github.com/sapikkk/muhammadsyafiq213510100/commit/f38af92d9e3614a4f97f8650ecaad012c7bc4591))
* **penjualan:** US5.1 pelanggan + sales order DRAFT (US5.2 konfirmasi stok) ([e31effa](https://github.com/sapikkk/muhammadsyafiq213510100/commit/e31effae55ea0ed7b868780961922f1e3e023f9c))
* **produksi:** US3.5 kegagalan + US2.5 susut ([#66](https://github.com/sapikkk/muhammadsyafiq213510100/issues/66)) ([02db815](https://github.com/sapikkk/muhammadsyafiq213510100/commit/02db8158a242b1a2b11cbea9606dab03c0df168d))
* **produksi:** US3.5 log kegagalan dan US2.5 klasifikasi susut ([4f679be](https://github.com/sapikkk/muhammadsyafiq213510100/commit/4f679befabcc89193349185d85f5cdc01b018b83))
* **produksi:** US3.6 timeline + US3.7 dashboard petani ([#67](https://github.com/sapikkk/muhammadsyafiq213510100/issues/67)) ([612c6df](https://github.com/sapikkk/muhammadsyafiq213510100/commit/612c6df5438d7867b4e7461c3fc3129a0ce4430f))
* **produksi:** US3.6 timeline/tambal/monitor dan US3.7 dashboard petani ([765aa66](https://github.com/sapikkk/muhammadsyafiq213510100/commit/765aa66f5b9c2c457eae2690cb5307ddf0f97fab))

# [1.3.0](https://github.com/sapikkk/muhammadsyafiq213510100/compare/v1.2.0...v1.3.0) (2026-10-09)


### Bug Fixes

* **admin:** komponen Textarea dan copy halaman laporan panen ([3cd2af0](https://github.com/sapikkk/muhammadsyafiq213510100/commit/3cd2af040bf74476c49621731af008bfaaa8fa81))


### Features

* add admin-approved password reset (US1.5) ([aaa0b54](https://github.com/sapikkk/muhammadsyafiq213510100/commit/aaa0b5450c85eb2f7331732f7e33f7556fb8a7cc))
* add chart of accounts with tree UI, soft delete, and /api/accounts (US2.1) ([b26cf33](https://github.com/sapikkk/muhammadsyafiq213510100/commit/b26cf33f873629e67dd7a4d8c1fc31c286dce7d0))
* add double-entry journal with approval and balance updates (US2.2) ([29ddde1](https://github.com/sapikkk/muhammadsyafiq213510100/commit/29ddde15ed8e7d6299a7e2adf502b9b1ac140b52))
* add global loading, error, 404, and 403 states (US1.8) ([5d5fb01](https://github.com/sapikkk/muhammadsyafiq213510100/commit/5d5fb019e2ab6e50b81f5c04b54b5cc1c682ad68))
* add settings page with profile, password, and role matrix (US1.7) ([d4bfeab](https://github.com/sapikkk/muhammadsyafiq213510100/commit/d4bfeab178c1a76c00bf1c755783472c77c9d54e))
* let admin register petani accounts (US1.6) ([69b7939](https://github.com/sapikkk/muhammadsyafiq213510100/commit/69b793912f46977d0f7098f2dd1c90d2bc3c55e9))
* **petani:** bantuan rockwool/benih dan seed varietas pasar ([e73e84e](https://github.com/sapikkk/muhammadsyafiq213510100/commit/e73e84e1317bd8e9aa59f8e853e91b6231af69f9))
* **ui:** redesign layout to sidebar dashboard with shadcn zinc theme ([d639d34](https://github.com/sapikkk/muhammadsyafiq213510100/commit/d639d346a20475c8b0de4d86068c36c8757934ed))
* **ui:** sidebar layout per peran dan US3.3 laporan panen ([3b835aa](https://github.com/sapikkk/muhammadsyafiq213510100/commit/3b835aa5f2a516eb39c07ffae695f6534ab1ad0d))
* **US2.3:** implementasi approve/reject harvest report dan otomatisasi HPP serta jurnal persediaan ([9868c5a](https://github.com/sapikkk/muhammadsyafiq213510100/commit/9868c5affa278515cc1e846634b3595b13afa3a8))
* **us2.4:** form biaya langsung dan overhead periode ([c1074a4](https://github.com/sapikkk/muhammadsyafiq213510100/commit/c1074a42bc2eb57317e6de4556bc2385a82b4a2d))
* **us3.1:** mulai siklus semai dengan kode batch dan active pack ([7627673](https://github.com/sapikkk/muhammadsyafiq213510100/commit/7627673fbaef457504e8ae1198f5229aeb19821e))
* **us3.2:** pindah fase produksi dengan log dan konfirmasi ([e08b9ee](https://github.com/sapikkk/muhammadsyafiq213510100/commit/e08b9ee4f4b9059fd7d1e37221761d6866dd45bb))
* **us3.3:** laporan panen Petani dan perbaikan form siklus ([1dd425f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/1dd425f5a4691795852315b79d627e866f0fb82a)), closes [#61](https://github.com/sapikkk/muhammadsyafiq213510100/issues/61)
* **us3.4:** master varietas dan parameter asumsi ([ef90b41](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ef90b419ccb715229f3eac607428c420cf541695))
* **us4.1:** stok inventaris dan log pergerakan IN/OUT/ADJUST ([80c3fcd](https://github.com/sapikkk/muhammadsyafiq213510100/commit/80c3fcd2253f259441c3e0a2a98cb0540fc2ea71))
* **us4.2:** active pack biaya per unit dan status habis ([0fc8849](https://github.com/sapikkk/muhammadsyafiq213510100/commit/0fc8849bb41fb031882327da04bb2b5e84df3c64))
* **us4.3:** alert stok minimum via API dan halaman stok rendah ([aafa028](https://github.com/sapikkk/muhammadsyafiq213510100/commit/aafa02891853767337613914e62d041e459ca07c))
* **us4.3:** alias GET /api/inventory/alerts ke /alert ([701cf40](https://github.com/sapikkk/muhammadsyafiq213510100/commit/701cf40a120b394f161b67932b25658eddb7e54e))
* **us4.4:** master lahan, greenhouse, dan kolam ([ed1548c](https://github.com/sapikkk/muhammadsyafiq213510100/commit/ed1548c9e9e37f0ad04c049ce0ba7d6ab4b0c30a))
* **us4.5:** master petani ERD dan navigasi sidebar ([b6004a0](https://github.com/sapikkk/muhammadsyafiq213510100/commit/b6004a0e36a2a07d488b7aed954580f5dc773942))

# [1.2.0](https://github.com/sapikkk/muhammadsyafiq213510100/compare/v1.1.0...v1.2.0) (2026-10-07)


### Features

* add the ERD schema and role login ([a70516d](https://github.com/sapikkk/muhammadsyafiq213510100/commit/a70516da9c7b6c55df6622fecd9200cd7af8b990))

# [1.1.0](https://github.com/sapikkk/muhammadsyafiq213510100/compare/v1.0.0...v1.1.0) (2026-10-07)


### Features

* record the Architecture spec and start the thesis app ([6554d71](https://github.com/sapikkk/muhammadsyafiq213510100/commit/6554d71a00d0acf585db5443b326c120a8aec403))

# 1.0.0 (2026-10-07)


### Bug Fixes

* declare composer config in prisma.config.ts ([9480ac4](https://github.com/sapikkk/muhammadsyafiq213510100/commit/9480ac41d1fc64983df5bfdf7a1eca16c5b5e6cf))


### Features

* scaffold Kokonus Farm composer app ([3019a0f](https://github.com/sapikkk/muhammadsyafiq213510100/commit/3019a0f841f010f0074a44605d5e00f05ba196b3))
