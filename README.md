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
- **Сервер (mieru-admin):** Легковесный менеджер для Linux с удобным TUI-мастером первичной настройки, REST API и автоматическим экспортом клиентских конфигов с QR-кодами в консоли.

---

## Поддерживаемые протоколы

1. **Mieru (v3.38.0):** Продвинутый транспорт поверх TCP/UDP с маскировкой под случайный трафик и стойкостью к активному зондированию.
2. **AmneziaWG (v3.1):** WireGuard с полноразмерной рандомизацией заголовков и защитой от эвристического анализа (`Jc`, `S1–S4`, `H1–H4`, `I1–I5`).
3. **Hysteria 2:** Скоростной транспорт на базе модифицированного протокола QUIC с собственным контролем перегрузок против потерь пакетов.

---

## Загрузка последнего релиза (v0.6.0)

| Платформа | Файл | Описание |
|---|---|---|
| **macOS (Apple Silicon)** | [AvariGate_0.6.0_aarch64.dmg](https://github.com/OstKost/avari-gate/releases/download/v0.6.0/AvariGate_0.6.0_aarch64.dmg) | Фирменное оформление AvariGate |
| **macOS (Apple Silicon)** | [EyeVPN_0.6.0_aarch64.dmg](https://github.com/OstKost/avari-gate/releases/download/v0.6.0/EyeVPN_0.6.0_aarch64.dmg) | Альтернативное оформление EyeVPN |
| **Android 8.0+** | [AvariGate-0.6.0-android-debug.apk](https://github.com/OstKost/avari-gate/releases/download/v0.6.0/AvariGate-0.6.0-android-debug.apk) | Debug APK AvariGate |
| **Android 8.0+** | [EyeVPN-0.6.0-android-debug.apk](https://github.com/OstKost/avari-gate/releases/download/v0.6.0/EyeVPN-0.6.0-android-debug.apk) | Debug APK EyeVPN |
| **Linux-сервер (x86_64)** | [AvariGate-admin-linux-amd64.tar.gz](https://github.com/OstKost/avari-gate/releases/download/v0.6.0/AvariGate-admin-linux-amd64.tar.gz) | Утилита `mieru-admin` (TUI + сервис) |
| **Хеши всех файлов** | [SHA256SUMS](https://github.com/OstKost/avari-gate/releases/download/v0.6.0/SHA256SUMS) | Проверка целостности сборок |

### Быстрая установка сервера (Ubuntu / Debian):

```bash
curl -fsSL -O https://github.com/OstKost/avari-gate/releases/download/v0.6.0/AvariGate-admin-linux-amd64.tar.gz && \
tar -xzf AvariGate-admin-linux-amd64.tar.gz && \
sudo ./mieru-admin setup
```

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
