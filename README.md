# AvariGate

> **Next-generation anti-censorship desktop & mobile client with polymorphic multi-protocol core.**

🌐 **Официальный сайт и загрузка:** [https://ostkost.github.io/avari-gate/](https://ostkost.github.io/avari-gate/)  
📦 **Все публичные релизы:** [GitHub Releases](https://github.com/OstKost/avari-gate/releases)

---

## О проекте

**AvariGate** — кроссплатформенный VPN/прокси клиент нового поколения с усиленной защитой от DPI и блокировок:

- **Desktop (macOS / Linux / Windows):** Tauri v2 + Rust, разделение привилегий через системный launchd helper / Polkit daemon.
- **Android:** Нативный Jetpack Compose + Kotlin, per-app split tunneling, сканер QR-кодов (CameraX + ZXing), адаптивные темы.
- **Ядро:** Высокопроизводительное сетевое ядро на базе `mbox` с полной поддержкой TUN-интерфейса и протоколов обхода цензуры.

---

## Поддерживаемые протоколы

1. **Mieru (v3.38.0):** Продвинутый транспорт поверх TCP/UDP с маскировкой под случайный трафик и стойкостью к активному зондированию.
2. **AmneziaWG (v3.1):** WireGuard с полноразмерной рандомизацией заголовков и защитой от эвристического анализа (`Jc`, `S1–S4`, `H1–H4`, `I1–I5`).
3. **Hysteria 2:** Скоростной транспорт на базе модифицированного протокола QUIC с собственным контролем перегрузок против потерь пакетов.

---

## Загрузка последнего релиза (v1.0.0)

| Платформа | Файл | Описание |
|---|---|---|
| **macOS (Apple Silicon)** | [AvariGate_1.0.0_aarch64.dmg](https://github.com/OstKost/avari-gate/releases/download/v1.0.0/AvariGate_1.0.0_aarch64.dmg) | Официальная сборка macOS (M1–M4) |
| **Windows 10 / 11** | [AvariGate_1.0.0_x64-setup.exe](https://github.com/OstKost/avari-gate/releases/download/v1.0.0/AvariGate_1.0.0_x64-setup.exe) | Установщик Windows (64-bit) |
| **Android 8.0+** | [AvariGate-1.0.0-android.apk](https://github.com/OstKost/avari-gate/releases/download/v1.0.0/AvariGate-1.0.0-android.apk) | APK-пакет для Android |
| **Хеши всех файлов** | [SHA256SUMS](https://github.com/OstKost/avari-gate/releases/download/v1.0.0/SHA256SUMS) | Проверка целостности сборок |

---

## Проверка контрольных сумм

Для проверки скачанных дистрибутивов выполните:

```bash
sha256sum -c SHA256SUMS
# или на macOS:
shasum -a 256 -c SHA256SUMS
```

---

## Обратная связь и багрепорты

Если у вас возникли вопросы, ошибки подключения или предложения по улучшению интерфейса, пожалуйста, создайте обращение в разделе [Issues](https://github.com/OstKost/avari-gate/issues).

---

## Лицензия

Проект распространяется под лицензией [GNU General Public License v3.0](LICENSE).
