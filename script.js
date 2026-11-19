/**
 * AvariGate — Landing Page Interactive Script
 * - Full bilingual support (RU / EN) with instant dynamic switching
 * - Theme selector with live palette shift and preview sync (Avari, Dragons, OtFront)
 * - Hero preview tab switcher (desktop, profiles, split tunnel, otfront, dragons, android, server)
 * - Server TUI screen viewer with tab synchronization, titles, and captions
 * - FAQ accordion & copy-to-clipboard helpers
 */

// ==========================================================================
// 1. Bilingual Localization Dictionary (RU / EN)
// ==========================================================================

const i18n = {
  ru: {
    // Nav
    "nav.protocols": "Протоколы",
    "nav.features": "Возможности",
    "nav.themes": "Темы",
    "nav.server": "Сервер",
    "nav.downloads": "Скачать",
    "nav.changelog": "Релизы",
    "nav.faq": "FAQ",
    "nav.cta": "Скачать v0.6.0",

    // Hero
    "hero.badgeVersion": "Релиз v0.6.0",
    "hero.badgeText": "Модульный UI & Строгая типизация моделей",
    "hero.title": "Приватный туннель для <span class=\"gradient-text\">свободного</span> интернета",
    "hero.description": "AvariGate — высокоскоростной мультиплатформенный VPN-клиент на Tauri v2 + Rust и Android Compose с защитой от глубокого анализа пакетов (DPI). Объединяет Mieru, Hysteria 2 и AmneziaWG в едином приложении со сверхбыстрым failover и нулевыми привилегиями интерфейса.",
    "hero.downloadBtn": "Скачать v0.6.0",
    "hero.releasesBtn": "GitHub Releases",
    "hero.serverTitle": "Быстрая установка сервера (Ubuntu / Debian):",
    "hero.metric1": "Протокола анти-DPI",
    "hero.metric2": "Задержка сервера",
    "hero.metric3": "Автопереключение failover",
    "hero.metric4": "Изоляция секретов",
    "hero.connected": "Подключено (24 мс)",
    "hero.tabConnected": "Подключение",
    "hero.tabProfiles": "Профили",
    "hero.tabSplit": "Сплит-туннель",
    "hero.tabOtFront": "Тема OtFront",
    "hero.tabDragons": "Тема Dragons",
    "hero.tabAndroid": "Android",
    "hero.tabServer": "Сервер TUI",
    "hero.captionConnected": "Главный экран: статус туннеля, измерение задержки в 24 мс и таймер аптайма.",
    "hero.captionProfiles": "Список профилей: приоритет обхода, индикация протоколов Mieru, Hysteria 2 и AmneziaWG.",
    "hero.captionSplit": "Сплит-туннелирование: режимы Include/Exclude, маски доменов и переключатель Bypass LAN.",
    "hero.captionOtFront": "Тема OtFront: неоново-пурпурная киберпанк-эстетика со стилизованным визуальным индикатором соединения.",
    "hero.captionDragons": "Тема DragonGate: нефритовая сфера, обрамлённая восточным золотым драконом.",
    "hero.captionAndroid": "Android-клиент: капсула навигации, per-app маршрутизация и CameraX QR-сканер.",
    "hero.captionServer": "Консоль mieru-admin: дашборд состояния служб и портов прямо в терминале.",

    // Protocols
    "protocols.tag": "Анти-DPI Арсенал",
    "protocols.title": "Триада передовых протоколов обхода блокировок",
    "protocols.subtitle": "Обычные VPN протоколы блокируются эвристиками и DPI за секунды. AvariGate объединяет три независимых решения, специально спроектированных для работы в агрессивных цензурируемых сетях.",
    "protocols.mieruDesc": "Мультиплексированный туннель с маскировкой трафика под случайный шум и надёжной защитой от активного зондирования со стороны DPI-систем (GFW, ТСПУ).",
    "protocols.mieruFeat1": "Анти-сканирование: не отвечает на проверочные запросы цензора",
    "protocols.mieruFeat2": "Мультиплексирование потоков внутри одного TCP-соединения",
    "protocols.mieruFeat3": "Двойная изоляция паролей mita sha256 + 0x00 salt",
    "protocols.mieruBestFor": "Идеально для: самых строгих DPI и блокировок протоколов",
    "protocols.hysteriaDesc": "Молниеносный протокол поверх кастомного UDP/QUIC с обфускацией Salamander. Выжимает максимум скорости даже при высоких потерях пакетов и троттлинге провайдером.",
    "protocols.hysteriaFeat1": "Обфускация Salamander: трафик выглядит как произвольный UDP",
    "protocols.hysteriaFeat2": "Маскировка SNI и самоподписанные ECDSA сертификаты",
    "protocols.hysteriaFeat3": "Борьба с потерями: Brutal Congestion Control до 20–30% потерь",
    "protocols.hysteriaBestFor": "Идеально для: нестабильных мобильных сетей и высоких скоростей",
    "protocols.amneziaDesc": "Продвинутая обфускация WireGuard v3.1. Защищает сигнатуры пакетов при рукопожатии и передаче данных, исключая блокировку по WireGuard-паттернам.",
    "protocols.amneziaFeat1": "Рандомизация заголовков: параметры Jc, Jmin/Jmax, S1–S4",
    "protocols.amneziaFeat2": "Хеширование инициализации H1–H4 и I1–I5",
    "protocols.amneziaFeat3": "Поддержка стандартных WireGuard .conf файлов без правок",
    "protocols.amneziaBestFor": "Идеально для: минимального пинга, игр и стриминга",

    // Features
    "features.tag": "Инженерия & Надёжность",
    "features.title": "Создан для непрерывной связи и защиты соединения",
    "features.subtitle": "Мы не просто завернули стороннее ядро в веб-обёртку: каждый уровень клиента и сервера спроектирован с упором на стабильность соединения и нулевое доверие к привилегиям.",
    "features.failoverTitle": "Интеллектуальный Failover",
    "features.failoverDesc": "При сбое ноды клиент выполняет до 3 полных обходов резервных профилей с паузами 15 секунд и подключается к первому доступному серверу. Никаких обрывов связи без предупреждения.",
    "features.splitTitle": "Раздельное туннелирование",
    "features.splitDesc": "Режимы Include и Exclude. Маршрутизация по маскам доменов (*.ru, gosuslugi.ru) и CIDR-подсетям. Встроенный переключатель Bypass LAN для локальных принтеров и NAS.",
    "features.perAppTitle": "Per-App Split (Android)",
    "features.perAppDesc": "На мобильных устройствах выбирайте приложения вручную: банкинг напрямую, а мессенджеры и браузер — через защищённый туннель с нулевой утечкой DNS.",
    "features.privilegeTitle": "Разделение привилегий",
    "features.privilegeDesc": "UI работает без прав администратора. Сетевые маршруты и TUN настраиваются демоном mieru-helper через Unix сокет с проверкой UID/PID. Пароли хранятся с правами 0600.",
    "features.qrTitle": "Мгновенный QR-импорт",
    "features.qrDesc": "Серверный TUI генерирует ASCII QR-код прямо в вашем SSH-терминале. Сканируйте его встроенным сканером CameraX + ZXing в Android-клиенте за 1 секунду.",
    "features.cleanupTitle": "Чистое завершение сессий",
    "features.cleanupDesc": "Никакого \"отвалившегося интернета\" после закрытия клиента: при отключении приложение корректно останавливает ядро и восстанавливает системный DNS и таблицу маршрутов.",

    // Themes
    "themes.tag": "Кастомизация",
    "themes.title": "Авторские темы оформления — выберите свой стиль",
    "themes.subtitle": "Интерфейс не обязан быть скучным серым окном. Переключайте стили одним кликом: тема меняет эстетику и акценты, сохраняя все ваши профили и настройки в полной неприкосновенности.",
    "themes.palette": "Палитра:",

    // Server
    "server.tag": "Серверная часть",
    "server.title": "Менеджер mieru-admin: всё в одном бинарнике",
    "server.subtitle": "Никаких сотен зависимостей или разрозненных bash-скриптов. Статический Go-бинарник устанавливает systemd службу, разворачивает протоколы и даёт удобный интерактивный TUI прямо в SSH.",
    "server.wizardTitle": "5-шаговый мастер с проверкой diff",
    "server.wizardDesc": "Мастер настройки валидирует конфиг до применения. На 5-м шаге вы видите точный unified diff. При ошибке службы система автоматически откатывается на предыдущую ревизию.",
    "server.qrExportTitle": "Экспорт профилей с QR в терминале",
    "server.qrExportDesc": "Создавайте пользователей Mieru, Hysteria 2 и AmneziaWG в TUI. Конфигурация выводится в формате hy2://, wireguard .conf и в виде чистого ASCII QR прямо в окно терминала.",
    "server.securityTitle": "Вендоринг и проверка SHA-256",
    "server.securityDesc": "В v0.6.0 устранены сетевые curl|bash уязвимости: скрипты установки AmneziaWG встроены через //go:embed и проверяются по криптографическому SHA-256 хэшу перед запуском.",
    "server.apiTitle": "Локальный REST API + systemd",
    "server.apiDesc": "Служба слушает исключительно 127.0.0.1:9081 с авторизацией по Bearer-токену с правами 0600. Полная готовность для автоматизации и интеграции с Ansible или CI/CD.",
    "server.tuiDash": "Главный экран",
    "server.tuiWizard": "Мастер настройки",
    "server.tuiUsers": "Пользователи",
    "server.tuiInstall": "Установка",
    "server.tuiHysteria": "Hysteria 2",
    "server.captionDash": "Главный дашборд: мониторинг статуса служб Mieru, Hysteria 2 и AmneziaWG, открытых портов и системных ресурсов.",
    "server.captionWizard": "Пошаговый мастер настройки: 5 простых шагов конфигурации портов, ключей и сертификатов с валидацией diff.",
    "server.captionUsers": "Управление пользователями: генерация учетных записей, лимитов и экспорт конфигураций hy2:// и .conf.",
    "server.captionInstall": "Скрипт развертывания: автоматическая установка зависимостей и systemd-сервисов с SHA-256 проверкой.",
    "server.captionHysteria": "Конфигурация Hysteria 2: управление портами Salamander, самоподписанными сертификатами и Brutal CC.",

    // Downloads
    "downloads.tag": "Официальные сборки",
    "downloads.title": "Скачать AvariGate v0.6.0",
    "downloads.subtitle": "Все пакеты собраны напрямую из открытого исходного кода. Без встроенной рекламы, без трекеров и без ограничений по скорости.",
    "downloads.appleSilicon": "macOS Apple Silicon",
    "downloads.androidBadge": "Android 8.0+",
    "downloads.serverBadge": "Linux Server",
    "downloads.linuxDesktopBadge": "Linux Desktop",
    "downloads.downloadDmgAvari": "Скачать .DMG (AvariGate)",
    "downloads.downloadApkAvari": "Скачать .APK (AvariGate)",
    "downloads.downloadServer": "Скачать бинарник сервера",
    "downloads.serverNote": "Включает TUI, REST API daemon и systemd unit",
    "downloads.viewLinuxPackages": "Смотреть пакеты в Releases",
    "downloads.linuxPackagesNote": "Стабильные сборки desktop для Linux",
    "downloads.platformStatusTitle": "Честный статус платформ и архитектур:",
    "downloads.sha256Title": "Контрольные суммы SHA-256 (Релиз v0.6.0):",
    "downloads.shaCheckCmd": "Проверка в терминале:",

    // Changelog
    "changelog.tag": "История развития",
    "changelog.title": "Хронология реальных релизов проекта",
    "changelog.subtitle": "Каждая строчка подкреплена исходным кодом, unit-тестами и сетевыми проверками в репозитории.",

    // Architecture
    "arch.tag": "Архитектурная схема",
    "arch.title": "Принцип нулевого доверия к интерфейсу",
    "arch.subtitle": "Вредоносный скрипт или взлом UI не смогут захватить систему: сетевые интерфейсы изолированы в отдельном демоне.",

    // FAQ
    "faq.tag": "Ответы на вопросы",
    "faq.title": "Часто задаваемые вопросы",
    "faq.subtitle": "Всё, что вам нужно знать перед установкой AvariGate.",
    "faq.q1": "Чем Mieru, Hysteria 2 и AmneziaWG лучше обычного OpenVPN или WireGuard?",
    "faq.a1": "Стандартные протоколы OpenVPN и базовый WireGuard имеют легко детектируемые сигнатуры рукопожатия и заголовков, которые мгновенно распознаются современными системами DPI (ТСПУ, GFW) и глушатся. Mieru маскирует трафик под HTTPS и блокирует активные зонды, Hysteria 2 использует обфусцированный QUIC Salamander с компенсацией потерь, а AmneziaWG добавляет рандомизацию заголовков и мусорные байты (Jc, S1–S4, H1–H4), делая пакеты неотличимыми от случайного шифрованного трафика.",
    "faq.q2": "Какие темы оформления доступны в AvariGate?",
    "faq.a2": "В клиенте AvariGate встроены темы оформления: AvariGate (фирменная кибер-космическая тема с неоновой бирюзовой сферой частиц), DragonGate (императорский изумрудный нефрит с золотым китайским драконом). Вы можете переключать их в любой момент в настройках приложения без перезапуска соединения.",
    "faq.q3": "Собирает ли клиент или сервер аналитику и логи?",
    "faq.a3": "Исходный код открыт на GitHub. Вы можете самостоятельно изучить работу приложения и его обработку данных.",
    "faq.q4": "Зачем при установке на macOS нужен пароль администратора?",
    "faq.a4": "Операционные системы не позволяют обычным непривилегированным программам создавать виртуальные сетевые адаптеры (TUN) и менять системные маршруты. Для этого AvariGate один раз устанавливает легковесный системный демон mieru-helper в launchd через стандартный диалог macOS. Сам GUI-клиент работает от обычного пользователя и общается с демоном через локальный Unix-сокет.",
    "faq.q5": "Могу ли я развернуть сервер на собственном VPS?",
    "faq.a5": "Да, именно для этого создан mieru-admin! Достаточно арендовать любой виртуальный сервер на Ubuntu 24.04 LTS или Debian 13, скачать архив утилиты и выполнить «sudo ./mieru-admin setup». Пошаговый мастер проведёт вас через настройку за 2 минуты, проверит diff конфига и покажет QR-код для моментального подключения с телефона или ноутбука.",
    "faq.q6": "Когда ожидать версии для Windows и iOS?",
    "faq.a6": "Для Windows уже написана служба AvariGateHelper, модуль очистки DNS/маршрутов и алгоритм автопереключения; сейчас завершается сборка и стендовые сетевые испытания. Для iOS подготовлен архитектурный план на базе NetworkExtension API. Мы не обещаем релизов до того, как они пройдут строгую сетевую приёмку. Следите за обновлениями в GitHub Releases!",

    // CTA & Footer
    "cta.title": "Готовы вернуть себе свободный и быстрый интернет?",
    "cta.subtitle": "Скачайте AvariGate прямо сейчас или разверните собственный сервер mieru-admin за 2 минуты.",
    "footer.desc": "Свободный, быстрый и мультипротокольный VPN-стек.",
    "footer.license": "Лицензия:",
    "footer.colNav": "Навигация",
    "footer.colResources": "Ресурсы",
    "footer.colTech": "Технологии",
    "footer.disclaimer": "Проект не аффилирован с коммерческими VPN-провайдерами. Скриншоты сняты с реального интерфейса на демо-данных.",

    // Common
    "common.copy": "Копировать",
    "common.copied": "Скопировано!",
    "common.copyAll": "Копировать всё"
  },

  en: {
    // Nav
    "nav.protocols": "Protocols",
    "nav.features": "Features",
    "nav.themes": "Themes",
    "nav.server": "Server",
    "nav.downloads": "Downloads",
    "nav.changelog": "Releases",
    "nav.faq": "FAQ",
    "nav.cta": "Download v0.6.0",

    // Hero
    "hero.badgeVersion": "Release v0.6.0",
    "hero.badgeText": "Modular UI Architecture & Typed Models",
    "hero.title": "A Private Tunnel for an <span class=\"gradient-text\">Open Internet</span>",
    "hero.description": "AvariGate is a high-performance cross-platform VPN client built with Tauri v2 + Rust and Android Compose, engineered to bypass Deep Packet Inspection (DPI). Combines Mieru, Hysteria 2, and AmneziaWG into a single unified client with rapid failover and zero UI privilege exposure.",
    "hero.downloadBtn": "Download v0.6.0",
    "hero.releasesBtn": "GitHub Releases",
    "hero.serverTitle": "Quick server installation (Ubuntu / Debian):",
    "hero.metric1": "Anti-DPI Protocols",
    "hero.metric2": "Server Latency",
    "hero.metric3": "Failover Retry Passes",
    "hero.metric4": "Secret Permission Isolation",
    "hero.connected": "Connected (24 ms)",
    "hero.tabConnected": "Connection",
    "hero.tabProfiles": "Profiles",
    "hero.tabSplit": "Split Tunnel",
    "hero.tabOtFront": "OtFront Theme",
    "hero.tabDragons": "Dragons Theme",
    "hero.tabAndroid": "Android",
    "hero.tabServer": "Server TUI",
    "hero.captionConnected": "Main screen: live tunnel status, latency measurement (24 ms), and uptime counter.",
    "hero.captionProfiles": "Profiles screen: priority order, protocol badges for Mieru, Hysteria 2, and AmneziaWG.",
    "hero.captionSplit": "Split tunneling: Include/Exclude modes, domain wildcards, and Bypass LAN switch.",
    "hero.captionOtFront": "OtFront Theme: neon purple cyberpunk aesthetic with stylized visual connection indicator.",
    "hero.captionDragons": "DragonGate Theme: emerald jade orb encircled by an imperial golden dragon.",
    "hero.captionAndroid": "Android client: floating capsule navbar, per-app routing, and CameraX QR scanner.",
    "hero.captionServer": "mieru-admin TUI: service and port dashboard directly inside your SSH terminal.",

    // Protocols
    "protocols.tag": "Anti-DPI Arsenal",
    "protocols.title": "Triad of Next-Gen Censorship-Bypassing Protocols",
    "protocols.subtitle": "Standard VPN protocols get blocked by DPI heuristics in seconds. AvariGate integrates three independent solutions designed specifically to thrive inside hostile censored networks.",
    "protocols.mieruDesc": "Multiplexed tunnel cloaking traffic as random noise with strict defense against active scanning from DPI firewalls (GFW, TSPU).",
    "protocols.mieruFeat1": "Active probing defense: completely silent to censor inspection queries",
    "protocols.mieruFeat2": "Connection multiplexing inside a single continuous TCP stream",
    "protocols.mieruFeat3": "Double password isolation with mita sha256 + 0x00 salt hashing",
    "protocols.mieruBestFor": "Best for: extreme DPI firewalls and strict protocol blocks",
    "protocols.hysteriaDesc": "Blazing-fast protocol powered by custom QUIC over UDP with Salamander obfuscation. Squeezes maximum throughput across lossy, throttled cellular networks.",
    "protocols.hysteriaFeat1": "Salamander obfuscation: traffic appears as arbitrary UDP packets",
    "protocols.hysteriaFeat2": "SNI spoofing and self-signed ECDSA certificates",
    "protocols.hysteriaFeat3": "Brutal Congestion Control: conquers 20–30% packet loss environments",
    "protocols.hysteriaBestFor": "Best for: congested mobile connections and 4K streaming",
    "protocols.amneziaDesc": "Enhanced WireGuard v3.1 obfuscation. Randomizes packet headers during handshakes and payload transfers, rendering WireGuard DPI signatures unrecognizable.",
    "protocols.amneziaFeat1": "Header randomization: Jc, Jmin/Jmax, S1–S4 junk byte padding",
    "protocols.amneziaFeat2": "Session initialization hashing with H1–H4 and I1–I5 keys",
    "protocols.amneziaFeat3": "100% compatible with standard WireGuard .conf files without edits",
    "protocols.amneziaBestFor": "Best for: low-latency online gaming and voice calls",

    // Features
    "features.tag": "Engineering & Reliability",
    "features.title": "Engineered for Continuous Uptime & Zero-Trust Security",
    "features.subtitle": "We didn't just wrap a third-party core in web views: every layer of the client and server is designed around connection stability and privilege minimization.",
    "features.failoverTitle": "Intelligent Failover",
    "features.failoverDesc": "If an active node degrades, the client automatically executes up to 3 full passes across backup profiles with 15-second pauses, seamlessly connecting to the first responsive node.",
    "features.splitTitle": "Flexible Split Tunneling",
    "features.splitDesc": "Include and Exclude routing modes. Rule configuration by domain wildcards (*.ru, gosuslugi.ru) and CIDR subnets. Built-in Bypass LAN switch for local printers and NAS.",
    "features.perAppTitle": "Per-App Split Routing (Android)",
    "features.perAppDesc": "Select specific Android applications: banking apps run directly through your local ISP, while messengers and browsers stay securely tunneled with zero DNS leaks.",
    "features.privilegeTitle": "Strict Privilege Separation",
    "features.privilegeDesc": "The graphical UI runs completely without root privileges. Network routing and TUN creation are managed by mieru-helper over a Unix domain socket verifying UID/PID. 0600 secret permissions.",
    "features.qrTitle": "Instant QR Pairing",
    "features.qrDesc": "The server TUI renders high-contrast ASCII QR codes straight into your SSH terminal. Scan with CameraX + ZXing on your phone to configure the client in 1 second.",
    "features.cleanupTitle": "Atomic Network Cleanup",
    "features.cleanupDesc": "No broken DNS or severed internet when closing the app: disconnecting shuts down the child core cleanly, restoring your system DNS and routing tables.",

    // Themes
    "themes.tag": "Customization",
    "themes.title": "Custom Visual Themes — Match Your Style",
    "themes.subtitle": "Your VPN interface doesn't need to look like a drab 90s utility. Switch aesthetics with one click: themes transform graphics and accents while leaving your profiles untouched.",
    "themes.palette": "Palette:",

    // Server
    "server.tag": "Server Suite",
    "server.title": "mieru-admin Manager: All-in-One Static Binary",
    "server.subtitle": "No Python dependencies or messy shell scripts. A standalone Go binary installs the systemd unit, manages protocol daemons, and provides an interactive TUI directly in your terminal.",
    "server.wizardTitle": "5-Step Wizard with Diff Preview",
    "server.wizardDesc": "The setup wizard validates configurations before committing. Step 5 shows a unified diff. If service restart fails, the manager automatically rolls back to the previous backup.",
    "server.qrExportTitle": "Terminal Profile Export with QR",
    "server.qrExportDesc": "Create Mieru, Hysteria 2, and AmneziaWG users via TUI. Configurations are rendered as hy2:// links, wireguard .conf, and crisp ASCII QR codes in your terminal.",
    "server.securityTitle": "Vendored Scripts with SHA-256",
    "server.securityDesc": "Eliminated curl|bash supply-chain vectors in v0.6.0: AmneziaWG installers are vendored via //go:embed and cryptographically verified against SHA-256 before root execution.",
    "server.apiTitle": "Loopback REST API + systemd",
    "server.apiDesc": "Listens strictly on 127.0.0.1:9081 authenticated with 0600 Bearer tokens. Ready for automation scripts, Ansible playbooks, and continuous deployment workflows.",
    "server.tuiDash": "Dashboard",
    "server.tuiWizard": "Setup Wizard",
    "server.tuiUsers": "User Manager",
    "server.tuiInstall": "Installer",
    "server.tuiHysteria": "Hysteria 2",
    "server.captionDash": "Main dashboard: real-time monitoring of Mieru, Hysteria 2, AmneziaWG service statuses, open ports, and system resources.",
    "server.captionWizard": "Setup wizard: 5 easy steps for ports, keys, and certificates with unified diff validation.",
    "server.captionUsers": "User manager: create profiles, credentials, and export hy2:// links and WireGuard configs.",
    "server.captionInstall": "Automated deployment: install dependencies and systemd service with strict SHA-256 validation.",
    "server.captionHysteria": "Hysteria 2 configuration: manage Salamander ports, ECDSA certificates, and Brutal CC settings.",

    // Downloads
    "downloads.tag": "Official Builds",
    "downloads.title": "Download AvariGate v0.6.0",
    "downloads.subtitle": "Every package is built directly from open-source code. Zero ads, zero trackers, and unrestricted throughput.",
    "downloads.appleSilicon": "macOS Apple Silicon",
    "downloads.androidBadge": "Android 8.0+",
    "downloads.serverBadge": "Linux Server",
    "downloads.linuxDesktopBadge": "Linux Desktop",
    "downloads.downloadDmgAvari": "Download .DMG (AvariGate)",
    "downloads.downloadApkAvari": "Download .APK (AvariGate)",
    "downloads.downloadServer": "Download Server Binary",
    "downloads.serverNote": "Includes TUI, REST API daemon, and systemd unit",
    "downloads.viewLinuxPackages": "Browse Linux Packages in Releases",
    "downloads.linuxPackagesNote": "Stable desktop packages for Linux",
    "downloads.platformStatusTitle": "Honest Platform & Architecture Status:",
    "downloads.sha256Title": "SHA-256 Checksums (Release v0.6.0):",
    "downloads.shaCheckCmd": "Verify in terminal:",

    // Changelog
    "changelog.tag": "Release History",
    "changelog.title": "Verified Project Release Timeline",
    "changelog.subtitle": "Every listed change is backed by real source code, passing unit tests, and live network verifications in the repository.",

    // Architecture
    "arch.tag": "Architecture Diagram",
    "arch.title": "Principle of Zero Privilege in User Interface",
    "arch.subtitle": "Even a compromised UI cannot breach your system: network interfaces and TUN devices are strictly isolated in a hardened helper daemon.",

    // FAQ
    "faq.tag": "FAQ",
    "faq.title": "Frequently Asked Questions",
    "faq.subtitle": "Everything you need to know before running AvariGate.",
    "faq.q1": "Why are Mieru, Hysteria 2, and AmneziaWG superior to OpenVPN or standard WireGuard?",
    "faq.a1": "Standard OpenVPN and stock WireGuard have static handshake signatures and packet sizes that modern DPI filters (TSPU, GFW) recognize instantly and throttle. Mieru cloaks traffic as regular HTTPS and rejects active probing, Hysteria 2 relies on Salamander-obfuscated QUIC with aggressive loss recovery, and AmneziaWG injects random junk padding (Jc, S1–S4, H1–H4), making streams indistinguishable from random encrypted data.",
    "faq.q2": "What visual themes are available in AvariGate?",
    "faq.a2": "AvariGate includes themes including: AvariGate (signature deep-space cyan aesthetic with an active particle sphere), DragonGate (imperial emerald jade with an intricate golden dragon). You can switch between them at any time in settings without interrupting active tunnels.",
    "faq.q3": "Does the client or server collect telemetry or analytics?",
    "faq.a3": "The source code is available on GitHub for you to inspect how the application handles data.",
    "faq.q4": "Why does macOS prompt for admin password during initial setup?",
    "faq.a4": "Modern operating systems require elevated privileges to create virtual network adapters (utun) and adjust system routing tables. AvariGate installs a minimal launchd daemon (mieru-helper) once via the standard macOS authorization dialog. The main application window runs with normal user permissions and communicates over a Unix domain socket.",
    "faq.q5": "Can I install mieru-admin on my own VPS?",
    "faq.a5": "Yes, that is the primary purpose of mieru-admin! Spin up any virtual machine running Ubuntu 24.04 LTS or Debian 13, download the archive, and run 'sudo ./mieru-admin setup'. The interactive 5-step wizard will configure ports, check diffs, and generate QR codes for immediate smartphone connection in under 2 minutes.",
    "faq.q6": "When will Windows and iOS versions be available?",
    "faq.a6": "For Windows, the AvariGateHelper service, named pipe IPC, and routing cleanup are written and undergoing live test verification. For iOS, an architecture plan utilizing NetworkExtension API is prepared. We do not release unverified builds; watch GitHub Releases for updates!",

    // CTA & Footer
    "cta.title": "Ready to reclaim an unrestricted, censorship-free internet?",
    "cta.subtitle": "Download AvariGate right now or deploy your own mieru-admin server in 2 minutes.",
    "footer.desc": "Fast, resilient, censorship-resistant multi-protocol VPN stack.",
    "footer.license": "License:",
    "footer.colNav": "Navigation",
    "footer.colResources": "Resources",
    "footer.colTech": "Technologies",
    "footer.disclaimer": "Not affiliated with commercial VPN providers. Screenshots captured on real app with demo data.",

    // Common
    "common.copy": "Copy",
    "common.copied": "Copied!",
    "common.copyAll": "Copy All"
  }
};

// ==========================================================================
// 2. Language State Management
// ==========================================================================

let currentLang = localStorage.getItem("preferred_lang") || "ru";

function setLanguage(lang) {
  if (!i18n[lang]) return;
  currentLang = lang;
  localStorage.setItem("preferred_lang", lang);

  // Update HTML lang attribute
  document.documentElement.lang = lang;

  // Update switcher labels
  const langCurrent = document.getElementById("lang-current");
  const langOther = document.getElementById("lang-other");
  if (langCurrent && langOther) {
    if (lang === "ru") {
      langCurrent.textContent = "RU";
      langOther.textContent = "EN";
    } else {
      langCurrent.textContent = "EN";
      langOther.textContent = "RU";
    }
  }

  // Update all [data-i18n] nodes
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (i18n[lang] && i18n[lang][key]) {
      el.innerHTML = i18n[lang][key];
    }
  });

  // Update screenshot images that have localized versions
  updateLocalizedImages();
}

function updateLocalizedImages() {
  // Check preview active tab
  const activeTab = document.querySelector(".preview-tab.active");
  if (activeTab) {
    const target = activeTab.getAttribute("data-target");
    updatePreviewScreen(target);
  }

  // Check theme preview
  const activeThemeBtn = document.querySelector(".theme-btn.active");
  if (activeThemeBtn) {
    const themeId = activeThemeBtn.getAttribute("data-theme-id");
    updateThemeDisplay(themeId);
  }

  // Check server TUI caption
  const activeTuiTab = document.querySelector(".tui-tab.active");
  if (activeTuiTab) {
    const tuiKey = activeTuiTab.getAttribute("data-tui");
    const data = serverTuiData[tuiKey];
    const tuiCaption = document.getElementById("tui-caption");
    if (data && tuiCaption && i18n[currentLang] && i18n[currentLang][data.captionKey]) {
      tuiCaption.textContent = i18n[currentLang][data.captionKey];
    }
  }
}

// ==========================================================================
// 3. Hero Preview Screen Tabs
// ==========================================================================

const previewScreens = {
  connected: {
    ru: "./assets/screenshots/desktop-connected.png",
    en: "./assets/screenshots/desktop-connected-en.png",
    title: "AvariGate — Frankfurt 01 (Mieru)",
    captionRu: "Главный экран: статус туннеля, измерение задержки в 24 мс и таймер аптайма.",
    captionEn: "Main screen: live tunnel status, latency measurement (24 ms), and uptime counter."
  },
  profiles: {
    ru: "./assets/screenshots/desktop-profiles-031.png",
    en: "./assets/screenshots/desktop-profiles-031-en.png",
    title: "AvariGate — Список профилей",
    captionRu: "Список профилей: приоритет обхода, индикация протоколов Mieru, Hysteria 2 и AmneziaWG.",
    captionEn: "Profiles screen: priority order, protocol badges for Mieru, Hysteria 2, and AmneziaWG."
  },
  splittunnel: {
    ru: "./assets/screenshots/desktop-split-tunneling.png",
    en: "./assets/screenshots/desktop-split-tunneling-en.png",
    title: "AvariGate — Сплит-туннелирование",
    captionRu: "Сплит-туннелирование: режимы Include/Exclude, маски доменов и переключатель Bypass LAN.",
    captionEn: "Split tunneling: Include/Exclude modes, domain wildcards, and Bypass LAN switch."
  },
  otfront: {
    ru: "./assets/screenshots/desktop-eyevpn.png",
    en: "./assets/screenshots/desktop-eyevpn-en.png",
    title: "AvariGate — Тема OtFront",
    captionRu: "Тема OtFront: неоново-пурпурная киберпанк-эстетика со стилизованным визуальным индикатором соединения.",
    captionEn: "OtFront Theme: neon purple cyberpunk aesthetic with stylized visual connection indicator."
  },
  dragons: {
    ru: "./assets/screenshots/desktop-dragons.png",
    en: "./assets/screenshots/desktop-dragons-en.png",
    title: "DragonGate — Императорский нефрит",
    captionRu: "Тема DragonGate: нефритовая сфера, обрамлённая восточным золотым драконом.",
    captionEn: "DragonGate Theme: emerald jade orb encircled by an imperial golden dragon."
  },
  android: {
    ru: "./assets/screenshots/android-overview.png",
    en: "./assets/screenshots/android-overview-en.png",
    title: "AvariGate Android",
    captionRu: "Android-клиент: капсула навигации, per-app маршрутизация и CameraX QR-сканер.",
    captionEn: "Android client: floating capsule navbar, per-app routing, and CameraX QR scanner."
  },
  server: {
    ru: "./assets/screenshots/server-tui-dashboard.png",
    en: "./assets/screenshots/server-tui-dashboard.png",
    title: "mieru-admin TUI (Linux Server)",
    captionRu: "Консоль mieru-admin: дашборд состояния служб и портов прямо в терминале.",
    captionEn: "mieru-admin TUI: service and port dashboard directly inside your SSH terminal."
  }
};

function updatePreviewScreen(targetKey) {
  const data = previewScreens[targetKey];
  if (!data) return;

  const previewImg = document.getElementById("preview-img");
  const previewCaption = document.getElementById("preview-caption");
  const previewTitle = document.getElementById("preview-window-title");

  const imgSrc = (currentLang === "en" && data.en) ? data.en : data.ru;
  if (previewImg) previewImg.src = imgSrc;

  if (previewCaption) {
    previewCaption.textContent = currentLang === "en" ? data.captionEn : data.captionRu;
  }

  if (previewTitle) {
    previewTitle.textContent = data.title;
  }
}

// ==========================================================================
// 4. Themes Showcase Data & Interactivity (Real Verified Screenshots)
// ==========================================================================

const themeDetails = {
  avari: {
    name: "AvariGate",
    subRu: "Кибер-сфера частиц & глубокий космос",
    subEn: "Cosmic Particle Sphere & Deep Space",
    descRu: "Классическое оформление AvariGate: тёмная космическая палитра, неоновые бирюзовые акценты и анимированная центральная сфера состояния с волнами активности при передаче трафика.",
    descEn: "Signature AvariGate aesthetic: deep cosmic slate backdrop, luminous cyan-teal particle accents, and an animated central status orb with ripple waves reacting to active bandwidth.",
    logo: "./assets/icons/icon.png",
    screenshotRu: "./assets/screenshots/desktop-connected.png",
    screenshotEn: "./assets/screenshots/desktop-connected-en.png",
    swatches: ["#021a1a", "#06b6d4", "#14b8a6", "#0f172a"]
  },
  dragons: {
    name: "DragonGate",
    subRu: "Императорский нефрит & золотой дракон",
    subEn: "Imperial Jade & Ancient Golden Dragon",
    descRu: "Восточная кибер-эстетика: глубокий изумрудный нефрит, акценты имперского золота и анимированный китайский дракон, кольцом охватывающий центральную сферу подключения.",
    descEn: "Oriental cyber-fantasy theme: deep emerald jade tones, imperial gold borders, and an ornate dragon coiled majestically around the central status sphere.",
    logo: "./assets/logos/dragons-logo.svg",
    screenshotRu: "./assets/screenshots/desktop-dragons.png",
    screenshotEn: "./assets/screenshots/desktop-dragons-en.png",
    swatches: ["#061c14", "#10b981", "#f59e0b", "#064e3b"]
  },
  otfront: {
    name: "OtFront",
    subRu: "Неоновый киберпанк & фиолетовые акценты",
    subEn: "Neon Cyberpunk & Purple Glow",
    descRu: "Стильное киберпанк-оформление: глубокие фиолетово-малиновые тона, контрастные неоновые линии и выразительная визуальная индикация активного соединения.",
    descEn: "Vibrant cyberpunk aesthetic: deep purple and magenta hues, glowing neon contours, and expressive visual feedback for active tunnel states.",
    logo: "./assets/logos/otfront-logo.png",
    screenshotRu: "./assets/screenshots/desktop-eyevpn.png",
    screenshotEn: "./assets/screenshots/desktop-eyevpn-en.png",
    swatches: ["#170d24", "#ec4899", "#a855f7", "#3b0764"]
  }
};

function updateThemeDisplay(themeId) {
  const t = themeDetails[themeId];
  if (!t) return;

  // Apply data-theme on root HTML for live color shift!
  document.documentElement.setAttribute("data-theme", themeId);

  // Update theme card elements
  const themeName = document.getElementById("theme-name");
  const themeSub = document.getElementById("theme-sub");
  const themeDesc = document.getElementById("theme-desc");
  const themeLogo = document.getElementById("theme-logo");
  const themeScreenshot = document.getElementById("theme-screenshot");
  const themeSwatches = document.getElementById("theme-swatches");

  if (themeName) themeName.textContent = t.name;
  if (themeSub) themeSub.textContent = currentLang === "en" ? t.subEn : t.subRu;
  if (themeDesc) themeDesc.textContent = currentLang === "en" ? t.descEn : t.descRu;
  if (themeLogo) themeLogo.src = t.logo;

  const shot = (currentLang === "en" && t.screenshotEn) ? t.screenshotEn : t.screenshotRu;
  if (themeScreenshot) themeScreenshot.src = shot;

  // Swatches
  if (themeSwatches) {
    themeSwatches.innerHTML = "";
    t.swatches.forEach((color) => {
      const span = document.createElement("span");
      span.className = "swatch";
      span.style.backgroundColor = color;
      themeSwatches.appendChild(span);
    });
  }
}

// ==========================================================================
// 5. Server TUI Screens & Tabs
// ==========================================================================

const serverTuiData = {
  dashboard: {
    src: "./assets/screenshots/server-tui-dashboard.png",
    title: "mieru-admin TUI — Dashboard",
    captionKey: "server.captionDash"
  },
  wizard: {
    src: "./assets/screenshots/server-tui-wizard.png",
    title: "mieru-admin TUI — Setup Wizard",
    captionKey: "server.captionWizard"
  },
  users: {
    src: "./assets/screenshots/server-tui-users.png",
    title: "mieru-admin TUI — User Manager",
    captionKey: "server.captionUsers"
  },
  install: {
    src: "./assets/screenshots/server-tui-install.png",
    title: "mieru-admin TUI — Installation",
    captionKey: "server.captionInstall"
  },
  hysteria: {
    src: "./assets/screenshots/server-tui-hysteria.png",
    title: "mieru-admin TUI — Hysteria 2",
    captionKey: "server.captionHysteria"
  }
};

function switchServerTui(tuiKey) {
  const data = serverTuiData[tuiKey];
  if (!data) return;

  const tabs = document.querySelectorAll(".tui-tab");
  tabs.forEach((t) => {
    const isTarget = t.getAttribute("data-tui") === tuiKey;
    t.classList.toggle("active", isTarget);
    t.setAttribute("aria-selected", isTarget ? "true" : "false");
  });

  const points = document.querySelectorAll(".server-point[data-point-target]");
  points.forEach((p) => {
    const isTarget = p.getAttribute("data-point-target") === tuiKey;
    p.classList.toggle("active", isTarget);
  });

  const tuiImg = document.getElementById("tui-screen-img");
  const tuiTitle = document.getElementById("tui-terminal-title");
  const tuiCaption = document.getElementById("tui-caption");

  if (tuiImg) tuiImg.src = data.src;
  if (tuiTitle) tuiTitle.textContent = data.title;
  if (tuiCaption && i18n[currentLang] && i18n[currentLang][data.captionKey]) {
    tuiCaption.textContent = i18n[currentLang][data.captionKey];
  }
}

function initServerTuiTabs() {
  const tabs = document.querySelectorAll(".tui-tab");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const tuiKey = tab.getAttribute("data-tui");
      switchServerTui(tuiKey);
    });
  });

  const points = document.querySelectorAll(".server-point[data-point-target]");
  points.forEach((pt) => {
    pt.addEventListener("click", () => {
      const target = pt.getAttribute("data-point-target");
      switchServerTui(target);
    });
  });
}

// ==========================================================================
// 6. Clipboard Helpers
// ==========================================================================

function copyToClipboard(text, buttonEl, successText) {
  navigator.clipboard.writeText(text).then(() => {
    const originalHtml = buttonEl.innerHTML;
    buttonEl.innerHTML = `✓ ${successText}`;
    setTimeout(() => {
      buttonEl.innerHTML = originalHtml;
    }, 2000);
  }).catch((err) => {
    console.error("Clipboard copy failed: ", err);
  });
}

// ==========================================================================
// 7. Initialization & Event Listeners
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  // Set initial language
  setLanguage(currentLang);

  // Language switcher toggle
  const langToggle = document.getElementById("lang-toggle");
  if (langToggle) {
    langToggle.addEventListener("click", () => {
      const nextLang = currentLang === "ru" ? "en" : "ru";
      setLanguage(nextLang);
    });
  }

  // Mobile drawer toggle
  const mobileBtn = document.getElementById("mobile-menu-btn");
  const mobileDrawer = document.getElementById("mobile-drawer");
  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener("click", () => {
      mobileDrawer.classList.toggle("open");
    });

    // Close on link click
    mobileDrawer.querySelectorAll(".mobile-link, a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileDrawer.classList.remove("open");
      });
    });
  }

  // Navbar scroll detection
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Hero Preview tabs
  const previewTabs = document.querySelectorAll(".preview-tab");
  previewTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      previewTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      const target = tab.getAttribute("data-target");
      updatePreviewScreen(target);
    });
  });

  // Theme selector buttons
  const themeBtns = document.querySelectorAll(".theme-btn");
  themeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      themeBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const themeId = btn.getAttribute("data-theme-id");
      updateThemeDisplay(themeId);
    });
  });

  // Initialize Server TUI tabs
  initServerTuiTabs();

  // FAQ Accordion
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const questionBtn = item.querySelector(".faq-question");
    if (questionBtn) {
      questionBtn.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");
        // Close all
        faqItems.forEach((i) => i.classList.remove("open"));
        if (!isOpen) {
          item.classList.add("open");
        }
      });
    }
  });

  // Quick Command Copy Button
  const copyQuickCmd = document.getElementById("copy-quick-cmd");
  if (copyQuickCmd) {
    copyQuickCmd.addEventListener("click", () => {
      const cmd = "curl -fsSL -O https://github.com/OstKost/avari-gate/releases/download/v0.6.0/AvariGate-admin-linux-amd64.tar.gz && tar -xzf AvariGate-admin-linux-amd64.tar.gz && sudo ./mieru-admin setup";
      const successMsg = currentLang === "en" ? "Copied!" : "Скопировано!";
      copyToClipboard(cmd, copyQuickCmd, successMsg);
    });
  }

  // SHA-256 Copy Button
  const copyShaBtn = document.getElementById("copy-sha-btn");
  const shaContent = document.getElementById("sha256-content");
  if (copyShaBtn && shaContent) {
    copyShaBtn.addEventListener("click", () => {
      const hashes = shaContent.textContent;
      const successMsg = currentLang === "en" ? "Copied!" : "Скопировано!";
      copyToClipboard(hashes, copyShaBtn, successMsg);
    });
  }
});
