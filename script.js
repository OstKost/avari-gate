/**
 * AvariGate — Official Landing Page Script
 * - Full bilingual support (RU / EN) with persistent language preference
 * - Dynamic GitHub latest release integration with robust offline fallback
 * - Preserved dynamic versioning across language switches
 * - Safe asset handling when platform build is in general releases
 * - Client platform detection and personalized download highlights
 * - Interactive preview tabs with verified real application screenshots
 * - Server TUI suite walkthrough (mieru-admin)
 * - Accessible mobile navigation drawer and FAQ accordion
 * - Clipboard copy helpers
 */

// ==========================================================================
// 1. Dynamic Release & Version State
// ==========================================================================

let currentVersion = "v1.1.1";
let checksumVersion = "v1.1.1";
let hasAndroidDirectAsset = false;
let currentLang = "ru";

// ==========================================================================
// 2. Bilingual Localization Dictionary (RU / EN)
// ==========================================================================

const i18n = {
  ru: {
    // Meta & Common
    "meta.title": "AvariGate — Клиент и сервер для устойчивого к блокировкам интернета",
    "common.skipToContent": "Перейти к основному содержимому",
    "common.copy": "Копировать",
    "common.copied": "Скопировано!",
    "common.copyAll": "Копировать всё",
    "common.yourPlatform": "Ваша система",
    "aria.langToggle": "Переключить язык (RU / EN)",
    "aria.mobileMenu": "Открыть навигационное меню",
    "aria.copyCommand": "Копировать команду в буфер обмена",
    "aria.copyServerCommand": "Скопировать команду запуска",
    "aria.copySha": "Копировать все хэши SHA-256",
    "aria.sphereStatus": "Статус защищённого соединения",
    "aria.previewTabs": "Скриншоты приложения",
    "aria.tuiScreens": "Экраны консоли сервера",
    "aria.themeSelector": "Выбор темы оформления",
    "aria.themePalette": "Цветовая палитра темы",
    "aria.serverWizard": "5-шаговый мастер настройки с проверкой diff",
    "aria.serverUsers": "Экспорт профилей с QR-кодом в терминале",
    "aria.serverInstall": "Вендоринг и проверка SHA-256",
    "aria.serverDashboard": "Дашборд состояния служб",
    "meta.description": "Мультиплатформенный клиент и серверный стек с поддержкой Mieru, Hysteria 2 и AmneziaWG. Защита от блокировок по протоколам, умный failover, раздельное туннелирование и нулевые привилегии интерфейса.",

    // Nav
    "nav.protocols": "Протоколы",
    "nav.features": "Возможности",
    "nav.server": "Сервер",
    "nav.themes": "Темы",
    "nav.downloads": "Скачать",
    "nav.changelog": "Релизы",
    "nav.faq": "FAQ",

    // Hero
    "hero.title": "Приватный туннель для <span class=\"gradient-text\">свободного</span> интернета",
    "hero.description": "AvariGate объединяет протоколы Mieru, Hysteria 2 и AmneziaWG в едином приложении для обхода блокировок. Умный failover, раздельное туннелирование и нулевые привилегии интерфейса.",
    "hero.sphereConnected": "Защищённый туннель активен",
    "hero.sphereEngine": "enfein/mbox 1.14.3 • Mieru + Hysteria 2 + AmneziaWG",
    "hero.releasesBtn": "GitHub Releases",
    "hero.downloadForWindows": "Скачать для Windows",
    "hero.downloadForMac": "Скачать для macOS",
    "hero.downloadForAndroid": "Скачать для Android",
    "hero.downloadForLinux": "Скачать для Linux",
    "hero.downloadDefault": "Скачать",
    "hero.allPlatforms": "Все платформы",
    "hero.detectedFallback": "Доступно для Windows, macOS, Android и Linux",
    "hero.connected": "Туннель активен",
    "hero.tabConnected": "Подключение",
    "hero.tabProfiles": "Профили",
    "hero.tabSplit": "Сплит-туннель",
    "hero.tabDragons": "DragonGate",
    "hero.tabAndroid": "Android",
    "hero.tabServer": "Сервер TUI",
    "hero.captionConnected": "Главный экран: статус защищённого туннеля, таймер сессии и мгновенное управление соединением.",
    "hero.captionProfiles": "Список профилей: приоритет обхода нод, индикация протоколов Mieru, Hysteria 2 и AmneziaWG.",
    "hero.captionSplit": "Сплит-туннелирование: режимы Include/Exclude, маски доменов и переключатель Bypass LAN.",
    "hero.captionDragons": "Тема DragonGate: изумрудный нефрит и золотое драконье кольцо вокруг сферы состояния.",
    "hero.captionAndroid": "Android-клиент: статус VPN, подключение в один тап и список профилей с приоритетом серверов.",
    "hero.captionServer": "Консоль mieru-admin: дашборд состояния служб и портов прямо в терминале.",

    // Protocols
    "protocols.tag": "Анти-DPI Арсенал",
    "protocols.title": "Триада протоколов для обхода цензуры",
    "protocols.subtitle": "Обычные VPN-протоколы блокируются по сигнатурам и эвристикам. AvariGate объединяет три независимых решения, специально разработанных для работы в сетях с глубоким анализом пакетов (ТСПУ, GFW).",
    "protocols.mieruDesc": "Мультиплексированный туннель с маскировкой трафика под случайный шум и защитой от активного зондирования со стороны DPI-систем.",
    "protocols.mieruFeat1": "Анти-сканирование: не отвечает на проверочные запросы цензора",
    "protocols.mieruFeat2": "Мультиплексирование потоков внутри одного TCP-соединения",
    "protocols.mieruFeat3": "Двойная изоляция паролей mita sha256 + 0x00 salt",
    "protocols.mieruBestFor": "Идеально для: агрессивных блокировок протоколов и ТСПУ",
    "protocols.hysteriaDesc": "Быстрый протокол поверх модифицированного UDP/QUIC с обфускацией Salamander. Обеспечивает высокую скорость даже при ощутимых потерях пакетов.",
    "protocols.hysteriaFeat1": "Обфускация Salamander: трафик неотличим от произвольного UDP",
    "protocols.hysteriaFeat2": "Маскировка SNI и самоподписанные сертификаты ECDSA",
    "protocols.hysteriaFeat3": "Компенсация потерь: Brutal Congestion Control при нестабильной сети",
    "protocols.hysteriaBestFor": "Идеально для: мобильных сетей с потерями и потокового видео",
    "protocols.amneziaDesc": "Продвинутая обфускация WireGuard v3.1. Защищает заголовки пакетов при рукопожатии и передаче данных, исключая детектирование по стандартным сигнатурам.",
    "protocols.amneziaFeat1": "Рандомизация заголовков: параметры Jc, Jmin/Jmax, S1–S4",
    "protocols.amneziaFeat2": "Хеширование инициализации H1–H4 и I1–I5",
    "protocols.amneziaFeat3": "Поддержка стандартных WireGuard .conf файлов без правок",
    "protocols.amneziaBestFor": "Идеально для: минимального пинга, игр и прямого туннелирования",

    // Features
    "features.tag": "Инженерия & Безопасность",
    "features.title": "Создан для непрерывной связи и строгой изоляции",
    "features.subtitle": "Каждый уровень клиента и сервера спроектирован с упором на стабильность соединения и нулевое доверие к привилегиям графического интерфейса.",
    "features.failoverTitle": "Интеллектуальный Failover",
    "features.failoverDesc": "При сбое ноды клиент выполняет до 3 циклов проверки резервных профилей с паузами 15 секунд и подключается к первому доступному серверу.",
    "features.splitTitle": "Раздельное туннелирование",
    "features.splitDesc": "Режимы Include и Exclude. Маршрутизация по маскам доменов (*.ru, gosuslugi.ru) и CIDR-подсетям. Встроенный переключатель Bypass LAN для домашней сети.",
    "features.perAppTitle": "Per-App Split (Android)",
    "features.perAppDesc": "На мобильных устройствах выбирайте приложения вручную: локальные сервисы идут напрямую, а мессенджеры и браузер — через защищённый туннель.",
    "features.privilegeTitle": "Разделение привилегий",
    "features.privilegeDesc": "Интерфейс работает без прав администратора. Сетевые маршруты и адаптер TUN настраиваются демоном mieru-helper через локальный сокет с правами 0600.",
    "features.qrTitle": "Мгновенный QR-импорт",
    "features.qrDesc": "Серверный TUI генерирует ASCII QR-код прямо в вашем SSH-терминале. Сканируйте его встроенным сканером CameraX + ZXing в Android-клиенте за 1 секунду.",
    "features.cleanupTitle": "Чистое завершение сессий",
    "features.cleanupDesc": "Никаких потерь интернет-соединения после закрытия: при отключении клиент корректно останавливает ядро и восстанавливает системные DNS и таблицу маршрутов.",

    // Server
    "server.tag": "Серверный стек",
    "server.title": "Менеджер mieru-admin: всё в одном бинарнике",
    "server.subtitle": "Никаких сложных зависимостей и хрупких скриптов. Статический Go-бинарник устанавливает systemd службу, разворачивает стек протоколов и предоставляет интерактивный TUI прямо в SSH-терминале.",
    "server.serverTitle": "Быстрая установка сервера (Ubuntu / Debian):",
    "server.wizardTitle": "5-шаговый мастер с проверкой diff",
    "server.wizardDesc": "Мастер настройки валидирует конфиг до применения. На 5-м шаге вы видите точный unified diff. При ошибке службы система автоматически откатывается на предыдущую ревизию.",
    "server.qrExportTitle": "Экспорт профилей с QR в терминале",
    "server.qrExportDesc": "Создавайте пользователей Mieru, Hysteria 2 и AmneziaWG в TUI. Конфигурация выводится в формате hy2://, wireguard .conf и в виде чистого ASCII QR прямо в окно терминала.",
    "server.securityTitle": "Вендоринг и проверка SHA-256",
    "server.securityDesc": "Скрипты установки AmneziaWG встроены в бинарник через //go:embed и проверяются по криптографическому SHA-256 хэшу перед запуском, устраняя сетевые риски.",
    "server.apiTitle": "Дашборд состояния и REST API",
    "server.apiDesc": "Мониторинг портов и служб в реальном времени. Встроенный loopback REST API (доступен только локально через Bearer-токен) позволяет автоматизировать управление нодой.",
    "server.tuiWizard": "Мастер",
    "server.tuiDash": "Дашборд",
    "server.tuiUsers": "Пользователи",
    "server.tuiInstall": "Установка",
    "server.tuiHysteria": "Hysteria 2",
    "server.captionWizard": "Пошаговый мастер настройки: автоматический выбор портов, протоколов и валидация перед сохранением.",
    "server.captionDash": "Консоль дашборда: состояние демонов Mieru, Hysteria 2 и AmneziaWG, статистика соединений.",
    "server.captionUsers": "Управление пользователями: генерация паролей, экспорт профилей и моментальный вывод ASCII QR-кода в терминале.",
    "server.captionInstall": "Установка компонентов: вендоринг скриптов AWG с проверкой контрольной суммы SHA-256.",
    "server.captionHysteria": "Настройка Hysteria 2: управление параметрами QUIC Salamander, генерация TLS-сертификатов.",

    // Themes
    "themes.tag": "Кастомизация",
    "themes.title": "Авторские темы оформления интерфейса",
    "themes.subtitle": "Интерфейс приложения адаптируется под ваше настроение. Переключайте визуальные стили одним кликом: тема меняет эстетику, сохраняя настройки и профили в полной безопасности.",
    "themes.palette": "Палитра:",
    "themes.btnPirates": "CorsairGate (Pirate Helm)",
    "themes.btnKawaii": "KawaiiGate (Pastel Mascot)",
    "themes.realScreenshotPending": "Реальный скриншот темы готовится",
    "themes.noMockupPolicy": "По политике честности проекта макеты не подменяют реальные снимки приложения. Скриншот будет добавлен после релизной съёмки интерфейса.",
    "themes.themeAvailable": "Тема полностью реализована и доступна для выбора в настройках AvariGate.",

    // Downloads
    "downloads.tag": "Официальные сборки",
    "downloads.title": "Скачать AvariGate для ваших устройств",
    "downloads.subtitle": "Официальные публичные релизы из репозитория OstKost/avari-gate. Каждая сборка проверена контрольными суммами SHA-256.",
    "downloads.appleSilicon": "macOS Apple Silicon",
    "downloads.windowsBadge": "Windows 10 / 11",
    "downloads.windowsTarget": "Windows 10 / 11 (64-bit)",
    "downloads.androidBadge": "Android 8.0+",
    "downloads.serverBadge": "Linux Server",
    "downloads.linuxDesktopBadge": "Linux Desktop",
    "downloads.downloadDmgAvari": "Скачать .DMG (macOS)",
    "downloads.downloadExeWindows": "Скачать .EXE (Windows)",
    "downloads.downloadApkAvari": "Скачать .APK (Android)",
    "downloads.downloadServer": "Скачать бинарник сервера",
    "downloads.viewLinuxPackages": "Смотреть пакеты в Releases",
    "downloads.macosNote": "Релизный .DMG с ad-hoc подписью и launchd-демоном",
    "downloads.windowsNote": "NSIS-установщик со службой AvariGateHelper",
    "downloads.androidNote": "ARM64 и x86_64 сборка с системным VpnService",
    "downloads.androidFileNote": "Сборка в GitHub Releases",
    "downloads.serverNote": "Включает TUI, REST API daemon и systemd unit",
    "downloads.linuxPackagesNote": "Стабильные сборки desktop для Linux",
    "downloads.linuxPackagesTitle": "Пакеты Linux GUI",
    "downloads.statusMacos": "Релизные .DMG с ad-hoc подписью и launchd-демоном.",
    "downloads.statusAndroid": "Подтверждено туннелирование TCP Mieru и WireGuard/AWG.",
    "downloads.statusLinux": "Принят под systemd, безопасный вендоринг AWG.",
    "downloads.statusWindows": "Официальный 64-битный NSIS-установщик со службой AvariGateHelper, защитой от DNS-утечек и автообновлением.",
    "downloads.statusIos": "Архитектурный план NetworkExtension подготовлен, реализация запланирована после Windows.",
    "downloads.platformStatusTitle": "Честный статус платформ и архитектур:",
    "downloads.shaCheckCmd": "Проверка в терминале:",
    "downloads.clientTitle": "Клиентские приложения",
    "downloads.clientSubtitle": "Полнофункциональные графические клиенты для персональных устройств",
    "downloads.clientBadge": "Desktop & Mobile GUI",
    "downloads.serverGroupTitle": "Серверный стек",
    "downloads.serverGroupSubtitle": "Статический бинарник для развёртывания узлов Mieru, Hysteria 2 и AmneziaWG",
    "downloads.serverGroupBadge": "Linux Service & TUI CLI",
    "downloads.serverQuickTitle": "Быстрый запуск на сервере (SSH):",
    "downloads.serverQuickDesc": "Автоматически настроит systemd, валидирует порты и выведет QR-код для моментального импорта в клиент.",
    "downloads.learnMoreServer": "Подробнее о возможностях mieru-admin →",

    // Statuses
    "status.ready": "Готово",
    "status.inProgress": "В разработке",
    "status.planned": "В планах",

    // Changelog
    "changelog.tag": "История развития",
    "changelog.title": "Хронология реальных релизов проекта",
    "changelog.subtitle": "Каждая строчка подкреплена исходным кодом, unit-тестами и сетевыми проверками в репозитории.",
    "changelog.showOlder": "Показать предыдущие релизы (v0.5.0, v0.4.0, v0.3.x, v0.1.0)",
    "changelog.hideOlder": "Скрыть предыдущие релизы",

    // Architecture
    "arch.tag": "Архитектурная схема",
    "arch.title": "Принцип нулевого доверия к интерфейсу",
    "arch.subtitle": "Вредоносный код или компрометация UI не могут захватить систему: сетевые адаптеры изолированы в отдельном системном сервисе.",
    "arch.uiTitle": "Графический интерфейс",
    "arch.uiDesc": "Tauri v2 (Rust + Vite) или Jetpack Compose (Android)",
    "arch.uiBadge": "UID: обычный пользователь (без root)",
    "arch.helperTitle": "Системный демон (Helper)",
    "arch.helperDesc": "launchd (macOS) / Polkit (Linux) / VpnService (Android)",
    "arch.helperBadge": "Строгая валидация PID и UID",
    "arch.coreTitle": "Ядро enfein/mbox 1.14.3",
    "arch.coreDesc": "Mieru 3.38 + Hysteria 2 + AmneziaWG 3.1 + TUN",
    "arch.coreBadge": "Таблица маршрутов и DNS",
    "arch.socketLabel": "Unix-сокет / IPC (0600)",
    "arch.ipcCore": "Управление ядром",

    // FAQ
    "faq.tag": "Ответы на вопросы",
    "faq.title": "Часто задаваемые вопросы",
    "faq.subtitle": "Всё, что вам нужно знать перед установкой AvariGate.",
    "faq.q1": "Чем Mieru, Hysteria 2 и AmneziaWG лучше обычного OpenVPN или WireGuard?",
    "faq.a1": "Стандартные протоколы OpenVPN и базовый WireGuard имеют фиксированные сигнатуры рукопожатия, которые мгновенно распознаются DPI-системами (ТСПУ, GFW) и блокируются. Mieru маскирует трафик под случайный шум и не отвечает на активные зонды цензора, Hysteria 2 использует модифицированный QUIC Salamander с компенсацией потерь, а AmneziaWG рандомизирует заголовки (Jc, S1–S4, H1–H4), делая пакеты неотличимыми от произвольного шифрованного трафика.",
    "faq.q2": "Какие темы оформления доступны в AvariGate?",
    "faq.a2": "В клиенте AvariGate встроены темы оформления: AvariGate (фирменная кибер-космическая тема с неоновой бирюзовой сферой частиц), DragonGate (императорский изумрудный нефрит с золотым драконом), CorsairGate и KawaiiGate. Вы можете переключать их в любой момент в настройках приложения без перезапуска соединения.",
    "faq.q3": "Собирает ли клиент или сервер аналитику и логи?",
    "faq.a3": "Нет. Приложение и сервер не содержат телеметрии, трекеров и аналитики. Исходный код открыт на GitHub в публичном репозитории OstKost/avari-gate, где вы можете самостоятельно убедиться в чистоте кода.",
    "faq.q4": "Зачем при установке на macOS нужен пароль администратора?",
    "faq.a4": "Операционные системы не позволяют непривилегированным программам создавать виртуальные сетевые адаптеры (TUN) и менять системные маршруты. Для этого AvariGate один раз устанавливает легковесный системный демон mieru-helper в launchd через стандартный диалог macOS. Сам GUI-клиент работает от обычного пользователя и общается с демоном через локальный Unix-сокет.",
    "faq.q5": "Могу ли я развернуть сервер на собственном VPS?",
    "faq.a5": "Да, именно для этого создан mieru-admin! Достаточно арендовать любой виртуальный сервер на Ubuntu 24.04 LTS или Debian 13, скачать архив утилиты и выполнить «sudo ./mieru-admin setup». Пошаговый мастер проведёт вас через настройку за пару минут, проверит diff конфига и покажет QR-код для моментального подключения с телефона или ноутбука.",
    "faq.q6": "Поддерживается ли Windows и когда ожидать версию для iOS?",
    "faq.a6": "Для Windows доступен официальный 64-битный NSIS-установщик со службой AvariGateHelper, защитой от утечек DNS и автоматическим переключением профилей. Для iOS подготовлен архитектурный план на базе NetworkExtension API — релиз запланирован следующим этапом. Следите за обновлениями в GitHub Releases!",

    // CTA
    "cta.title": "Готовы вернуть себе свободный интернет?",
    "cta.subtitle": "Скачайте AvariGate прямо сейчас или разверните собственный сервер mieru-admin за пару минут.",

    // Footer
    "footer.desc": "Мультипротокольный клиент и серверный стек для устойчивой связи в условиях сетевых ограничений.",
    "footer.license": "Лицензия:",
    "footer.colNav": "Навигация",
    "footer.colResources": "Ресурсы",
    "footer.colTech": "Технологии",
    "footer.disclaimer": "Проект не аффилирован с коммерческими VPN-провайдерами. Скриншоты сняты с реального интерфейса приложения на демонстрационных данных.",
    "footer.repo": "Репозиторий GitHub",
    "footer.latestRelease": "Последний релиз",
    "footer.readme": "Документация README",
    "footer.architecture": "Архитектура проекта",
    "footer.copyright": "© 2026 OstKost. Разработано для открытого и свободного интернета.",
  },

  en: {
    // Meta & Common
    "meta.title": "AvariGate — Censorship-Resistant VPN Client & Server Stack",
    "common.skipToContent": "Skip to main content",
    "common.copy": "Copy",
    "common.copied": "Copied!",
    "common.copyAll": "Copy all",
    "common.yourPlatform": "Your Platform",
    "aria.langToggle": "Toggle language (RU / EN)",
    "aria.mobileMenu": "Open navigation menu",
    "aria.copyCommand": "Copy command to clipboard",
    "aria.copyServerCommand": "Copy startup command",
    "aria.copySha": "Copy all SHA-256 checksums",
    "aria.sphereStatus": "Secure connection status",
    "aria.previewTabs": "Application screenshots",
    "aria.tuiScreens": "Server console screens",
    "aria.themeSelector": "Theme selector",
    "aria.themePalette": "Theme color palette",
    "aria.serverWizard": "5-step setup wizard with diff review",
    "aria.serverUsers": "Profile export with terminal QR codes",
    "aria.serverInstall": "Vendoring and SHA-256 validation",
    "aria.serverDashboard": "Service dashboard",
    "meta.description": "Multi-platform client and server stack supporting Mieru, Hysteria 2 and AmneziaWG. Protocol-level censorship resistance, smart failover, split tunneling and zero-privilege UI.",

    // Nav
    "nav.protocols": "Protocols",
    "nav.features": "Features",
    "nav.server": "Server",
    "nav.themes": "Themes",
    "nav.downloads": "Downloads",
    "nav.changelog": "Releases",
    "nav.faq": "FAQ",

    // Hero
    "hero.title": "A Private Tunnel for an <span class=\"gradient-text\">Open Internet</span>",
    "hero.description": "AvariGate combines Mieru, Hysteria 2, and AmneziaWG protocols into a unified client with zero interface privileges. Robust protocol-level censorship resistance, automated failover on node outage, and split tunneling.",
    "hero.sphereConnected": "Secure tunnel active",
    "hero.sphereEngine": "enfein/mbox 1.14.3 • Mieru + Hysteria 2 + AmneziaWG",
    "hero.releasesBtn": "GitHub Releases",
    "hero.downloadForWindows": "Download for Windows",
    "hero.downloadForMac": "Download for macOS",
    "hero.downloadForAndroid": "Download for Android",
    "hero.downloadForLinux": "Download for Linux",
    "hero.downloadDefault": "Download",
    "hero.allPlatforms": "All Platforms",
    "hero.detectedFallback": "Available for Windows, macOS, Android, and Linux",
    "hero.connected": "Tunnel Active",
    "hero.tabConnected": "Connection",
    "hero.tabProfiles": "Profiles",
    "hero.tabSplit": "Split Tunnel",
    "hero.tabDragons": "DragonGate",
    "hero.tabAndroid": "Android",
    "hero.tabServer": "Server TUI",
    "hero.captionConnected": "Main screen: live tunnel status, session uptime counter, and instant connection toggle.",
    "hero.captionProfiles": "Profiles screen: priority order, protocol badges for Mieru, Hysteria 2, and AmneziaWG.",
    "hero.captionSplit": "Split tunneling: Include/Exclude modes, domain wildcards, and Bypass LAN switch.",
    "hero.captionDragons": "DragonGate theme: emerald jade with a golden dragon ring encircling the status sphere.",
    "hero.captionAndroid": "Android client: VPN status, one-tap connect, and the prioritized server profile list.",
    "hero.captionServer": "mieru-admin TUI: service and port dashboard directly inside your SSH terminal.",

    // Protocols
    "protocols.tag": "Anti-DPI Arsenal",
    "protocols.title": "Triad of Censorship-Bypassing Protocols",
    "protocols.subtitle": "Standard VPN protocols are filtered by handshake signatures and heuristics within seconds. AvariGate unifies three independent solutions engineered specifically for aggressive DPI networks.",
    "protocols.mieruDesc": "Multiplexed tunnel masking traffic as random noise with robust protection against active probing from DPI censors.",
    "protocols.mieruFeat1": "Anti-probing: silently drops hostile inspector probes without responding",
    "protocols.mieruFeat2": "Stream multiplexing over a single persistent TCP connection",
    "protocols.mieruFeat3": "Dual password salt isolation (mita SHA-256 + 0x00 salt)",
    "protocols.mieruBestFor": "Ideal for: strict state firewalls and active DPI probing",
    "protocols.hysteriaDesc": "High-velocity protocol over modified UDP/QUIC with Salamander obfuscation. Delivers peak throughput even under substantial packet loss.",
    "protocols.hysteriaFeat1": "Salamander obfuscation: traffic appears as arbitrary UDP datagrams",
    "protocols.hysteriaFeat2": "SNI spoofing and self-signed ECDSA certificates",
    "protocols.hysteriaFeat3": "Loss mitigation: Brutal Congestion Control for unstable mobile networks",
    "protocols.hysteriaBestFor": "Ideal for: lossy mobile links and high-bandwidth streaming",
    "protocols.amneziaDesc": "Advanced WireGuard v3.1 obfuscation. Randomizes packet headers during handshakes and transmission, eliminating standard signature detection.",
    "protocols.amneziaFeat1": "Header randomization: Jc, Jmin/Jmax, S1–S4 parameters",
    "protocols.amneziaFeat2": "Handshake initialization hashing: H1–H4 and I1–I5",
    "protocols.amneziaFeat3": "Seamless compatibility with standard WireGuard .conf files",
    "protocols.amneziaBestFor": "Ideal for: minimal latency, gaming, and direct wire-speed tunneling",

    // Features
    "features.tag": "Engineering & Security",
    "features.title": "Engineered for Unbroken Uptime and Strict Privilege Isolation",
    "features.subtitle": "Every layer of the client and server stack is designed with resilience and zero interface privilege exposure in mind.",
    "features.failoverTitle": "Intelligent Failover",
    "features.failoverDesc": "When a node fails, the client executes up to 3 passes across backup profiles with 15-second pauses, switching to the first responsive server automatically.",
    "features.splitTitle": "Split Tunneling",
    "features.splitDesc": "Include and Exclude modes. Domain wildcard routing (*.ru, gosuslugi.ru) and CIDR subnets. Integrated Bypass LAN toggle for home networks and printers.",
    "features.perAppTitle": "Per-App Split (Android)",
    "features.perAppDesc": "Select which apps route through the VPN: route local banking directly while securing messengers and browsers through the encrypted tunnel.",
    "features.privilegeTitle": "Privilege Separation",
    "features.privilegeDesc": "UI runs as a standard unprivileged user. Network routes and TUN devices are managed by mieru-helper via a local socket with 0600 file permissions.",
    "features.qrTitle": "Instant QR Import",
    "features.qrDesc": "The server TUI prints an ASCII QR code directly into your SSH terminal. Scan it with the CameraX + ZXing scanner in Android in under 1 second.",
    "features.cleanupTitle": "Clean Session Cleanup",
    "features.cleanupDesc": "No disconnected network traps after closing the app: upon disconnect, the client stops the core and cleanly restores system DNS and routing tables.",

    // Server
    "server.tag": "Server Suite",
    "server.title": "mieru-admin Manager: All-in-One Binary",
    "server.subtitle": "No fragile scripts or dependency hell. A static Go binary installs the systemd unit, provisions protocol engines, and provides an interactive TUI in your SSH session.",
    "server.serverTitle": "Quick server installation (Ubuntu / Debian):",
    "server.wizardTitle": "5-Step Wizard with Diff Review",
    "server.wizardDesc": "The setup wizard validates configuration before applying. Step 5 displays an exact unified diff. Automatic rollback occurs if the service check fails.",
    "server.qrExportTitle": "Profile Export with Terminal QR",
    "server.qrExportDesc": "Create Mieru, Hysteria 2, and AmneziaWG credentials in the TUI. Exports hy2:// URLs, WireGuard .conf files, and clean ASCII QR codes directly to the terminal.",
    "server.securityTitle": "Vendoring & SHA-256 Validation",
    "server.securityDesc": "AmneziaWG setup scripts are vendored via //go:embed and checked against cryptographic SHA-256 digests before root execution, eliminating remote download risks.",
    "server.apiTitle": "Dashboard & Loopback REST API",
    "server.apiDesc": "Real-time daemon and port monitoring. The built-in loopback REST API (accessible locally with a Bearer token) enables automated node operations.",
    "server.tuiWizard": "Wizard",
    "server.tuiDash": "Dashboard",
    "server.tuiUsers": "Users",
    "server.tuiInstall": "Install",
    "server.tuiHysteria": "Hysteria 2",
    "server.captionWizard": "Interactive setup wizard: automated port suggestions, protocol selection, and diff validation before commit.",
    "server.captionDash": "Service dashboard: live status of Mieru, Hysteria 2, and AmneziaWG daemons and port bindings.",
    "server.captionUsers": "User manager: create credentials, export configuration, and render terminal ASCII QR codes.",
    "server.captionInstall": "Component provisioning: vendored AWG installation scripts verified with cryptographic SHA-256 digests.",
    "server.captionHysteria": "Hysteria 2 configuration: customize QUIC Salamander ports, certificates, and bandwidth controls.",

    // Themes
    "themes.tag": "Customization",
    "themes.title": "Signature Interface Visual Themes",
    "themes.subtitle": "The client adapts to your visual style. Switch themes with one click: aesthetics shift instantly while keeping your profiles, keys, and settings intact.",
    "themes.palette": "Palette:",
    "themes.btnPirates": "CorsairGate (Pirate Helm)",
    "themes.btnKawaii": "KawaiiGate (Pastel Mascot)",
    "themes.realScreenshotPending": "Real theme screenshot coming soon",
    "themes.noMockupPolicy": "Under the project's honesty policy, mockups are never presented as real application screenshots. A real capture will be added after the next release snapshot.",
    "themes.themeAvailable": "The theme is fully implemented and selectable in AvariGate settings.",

    // Downloads
    "downloads.tag": "Official Releases",
    "downloads.title": "Download AvariGate for Your Devices",
    "downloads.subtitle": "Official public builds published in the OstKost/avari-gate repository. Every package is cryptographically verified by SHA-256 checksums.",
    "downloads.appleSilicon": "macOS Apple Silicon",
    "downloads.windowsBadge": "Windows 10 / 11",
    "downloads.windowsTarget": "Windows 10 / 11 (64-bit)",
    "downloads.androidBadge": "Android 8.0+",
    "downloads.serverBadge": "Linux Server",
    "downloads.linuxDesktopBadge": "Linux Desktop",
    "downloads.downloadDmgAvari": "Download .DMG (macOS)",
    "downloads.downloadExeWindows": "Download .EXE (Windows)",
    "downloads.downloadApkAvari": "Download .APK (Android)",
    "downloads.downloadServer": "Download Server Binary",
    "downloads.viewLinuxPackages": "View Packages in Releases",
    "downloads.macosNote": "Release .DMG with ad-hoc signing and launchd helper",
    "downloads.windowsNote": "NSIS installer with AvariGateHelper system service",
    "downloads.androidNote": "ARM64 & x86_64 build using native Android VpnService",
    "downloads.androidFileNote": "Release in GitHub Releases",
    "downloads.serverNote": "Includes TUI, local REST API daemon, and systemd unit",
    "downloads.linuxPackagesNote": "Stable desktop builds for Linux distributions",
    "downloads.linuxPackagesTitle": "Linux GUI Packages",
    "downloads.statusMacos": "Release .DMG with ad-hoc signature and launchd helper.",
    "downloads.statusAndroid": "TCP Mieru and WireGuard/AWG tunneling confirmed.",
    "downloads.statusLinux": "Accepted under systemd; AWG installer is vendored and SHA-256 verified.",
    "downloads.statusWindows": "Official 64-bit NSIS installer with AvariGateHelper service, DNS leak protection and auto-updates.",
    "downloads.statusIos": "NetworkExtension architecture plan is ready; implementation is scheduled after Windows.",
    "downloads.platformStatusTitle": "Honest Platform & Architecture Status:",
    "downloads.shaCheckCmd": "Verify in terminal:",
    "downloads.clientTitle": "Client Applications",
    "downloads.clientSubtitle": "Full-featured graphical clients for personal devices",
    "downloads.clientBadge": "Desktop & Mobile GUI",
    "downloads.serverGroupTitle": "Server Stack",
    "downloads.serverGroupSubtitle": "Static binary for deploying Mieru, Hysteria 2, and AmneziaWG nodes",
    "downloads.serverGroupBadge": "Linux Service & TUI CLI",
    "downloads.serverQuickTitle": "Quick start on the server (SSH):",
    "downloads.serverQuickDesc": "Configures systemd automatically, validates ports, and prints a QR code for instant client import.",
    "downloads.learnMoreServer": "Learn more about mieru-admin →",

    // Statuses
    "status.ready": "Ready",
    "status.inProgress": "In Progress",
    "status.planned": "Roadmapped",

    // Changelog
    "changelog.tag": "Release History",
    "changelog.title": "Verified Project Release Timeline",
    "changelog.subtitle": "Every bullet is backed by actual commit history, unit tests, and live network verifications in the repository.",
    "changelog.showOlder": "Show previous releases (v0.5.0, v0.4.0, v0.3.x, v0.1.0)",
    "changelog.hideOlder": "Hide previous releases",

    // Architecture
    "arch.tag": "Architecture Diagram",
    "arch.title": "Zero-Trust Architecture for UI",
    "arch.subtitle": "Compromised UI scripts cannot escalate privileges: network interfaces are isolated in a separate background system service.",
    "arch.uiTitle": "Graphical Interface",
    "arch.uiDesc": "Tauri v2 (Rust + Vite) or Jetpack Compose (Android)",
    "arch.uiBadge": "UID: standard user (no root)",
    "arch.helperTitle": "System Daemon (Helper)",
    "arch.helperDesc": "launchd (macOS) / Polkit (Linux) / VpnService (Android)",
    "arch.helperBadge": "Strict PID and UID validation",
    "arch.coreTitle": "enfein/mbox 1.14.3 Core",
    "arch.coreDesc": "Mieru 3.38 + Hysteria 2 + AmneziaWG 3.1 + TUN",
    "arch.coreBadge": "Routing table & DNS",
    "arch.socketLabel": "Unix socket / IPC (0600)",
    "arch.ipcCore": "Core management",

    // FAQ
    "faq.tag": "FAQ",
    "faq.title": "Frequently Asked Questions",
    "faq.subtitle": "Everything you need to know before installing AvariGate.",
    "faq.q1": "Why are Mieru, Hysteria 2, and AmneziaWG better than standard WireGuard or OpenVPN?",
    "faq.a1": "Standard OpenVPN and plain WireGuard have identifiable handshake signatures that are detected and throttled by modern DPI systems (such as TSPU and GFW). Mieru masks data as random noise and ignores hostile probes, Hysteria 2 utilizes loss-resistant QUIC Salamander, and AmneziaWG randomizes header magic bytes (Jc, S1–S4, H1–H4), rendering packets indistinguishable from arbitrary encrypted traffic.",
    "faq.q2": "What visual themes are included in AvariGate?",
    "faq.a2": "AvariGate includes several built-in themes: AvariGate (signature cosmic cyber aesthetic with electric cyan particle sphere), DragonGate (imperial emerald jade and ancient golden dragon), CorsairGate, and KawaiiGate. You can switch between them anytime in settings without restarting the connection.",
    "faq.q3": "Does the client or server collect telemetry or analytics?",
    "faq.a3": "No. The application and server do not contain any telemetry, trackers, or analytical logging. The source code is publicly accessible on GitHub in the OstKost/avari-gate repository for independent verification.",
    "faq.q4": "Why does macOS require an administrator password upon first launch?",
    "faq.a4": "Operating systems restrict standard unprivileged applications from creating virtual network adapters (TUN) and altering routing tables. AvariGate installs a minimal launchd daemon (mieru-helper) once via the standard macOS authorization dialog. The UI continues to run under your standard user account, communicating with the helper via a local Unix socket.",
    "faq.q5": "Can I deploy the server on my own VPS?",
    "faq.a5": "Yes, that is the exact purpose of mieru-admin. Rent any virtual private server running Ubuntu 24.04 LTS or Debian 13, download the archive, and run «sudo ./mieru-admin setup». The step-by-step wizard configures the stack in minutes and prints an ASCII QR code for instant client onboarding.",
    "faq.q6": "Is Windows supported and when can we expect the iOS version?",
    "faq.a6": "An official 64-bit NSIS installer is available for Windows with the AvariGateHelper service, DNS leak prevention, and automatic failover. For iOS, a NetworkExtension architectural roadmap is finalized — stay tuned for updates on GitHub!",

    // CTA
    "cta.title": "Ready to reclaim an open internet?",
    "cta.subtitle": "Download AvariGate today or set up your own mieru-admin server in just a few minutes.",

    // Footer
    "footer.desc": "Multi-protocol censorship-resistant VPN client and server stack.",
    "footer.license": "License:",
    "footer.colNav": "Navigation",
    "footer.colResources": "Resources",
    "footer.colTech": "Technologies",
    "footer.disclaimer": "This project is not affiliated with commercial VPN providers. All screenshots are captured from the live application with demo data.",
    "footer.repo": "GitHub Repository",
    "footer.latestRelease": "Latest Release",
    "footer.readme": "README Documentation",
    "footer.architecture": "Project Architecture",
    "footer.copyright": "© 2026 OstKost. Built for an open and free internet.",
  }
};

// ==========================================================================
// 3. Language & Dynamic Version Formatting
// ==========================================================================

try {
  const savedLang = localStorage.getItem("avarigate_lang");
  if (savedLang === "ru" || savedLang === "en") {
    currentLang = savedLang;
  } else {
    const navLang = navigator.language || navigator.userLanguage || "ru";
    if (navLang.startsWith("en")) {
      currentLang = "en";
    }
  }
} catch (e) {}

function updateVersionElements() {
  const navCtaBtn = document.getElementById("nav-cta-btn");
  if (navCtaBtn) {
    navCtaBtn.textContent = currentLang === "en" ? `Download ${currentVersion}` : `Скачать ${currentVersion}`;
  }

  const mobileDrawerCta = document.getElementById("mobile-drawer-cta");
  if (mobileDrawerCta) {
    mobileDrawerCta.textContent = currentLang === "en" ? `Download ${currentVersion}` : `Скачать ${currentVersion}`;
  }

  const bottomCtaDownload = document.getElementById("bottom-cta-download");
  if (bottomCtaDownload) {
    bottomCtaDownload.textContent = currentLang === "en" ? `Download ${currentVersion}` : `Скачать ${currentVersion}`;
  }

  const shaTitle = document.getElementById("sha256-title");
  if (shaTitle) {
    shaTitle.textContent = currentLang === "en"
      ? `SHA-256 Checksums (Release ${checksumVersion}):`
      : `Контрольные суммы SHA-256 (Релиз ${checksumVersion}):`;
  }

  const shaScope = document.getElementById("sha256-scope");
  if (shaScope) {
    shaScope.textContent = currentLang === "en"
      ? `These checksums apply to ${checksumVersion}; they are updated manually with the next release.`
      : `Хэши относятся к релизу ${checksumVersion}; обновляются вручную вместе со следующим релизом.`;
  }

  // Update Android button label based on asset availability
  const btnAndroidLabel = document.getElementById("btn-download-android-label");
  if (btnAndroidLabel) {
    if (hasAndroidDirectAsset) {
      btnAndroidLabel.textContent = currentLang === "en" ? "Download .APK (AvariGate)" : "Скачать .APK (AvariGate)";
    } else {
      btnAndroidLabel.textContent = currentLang === "en" ? "View Android Release" : "Смотреть релиз Android";
    }
  }

  // Update Hero CTA according to detected user platform
  applyPlatformToUI();
}

function setLanguage(lang) {
  if (!i18n[lang]) return;
  currentLang = lang;

  try {
    localStorage.setItem("avarigate_lang", lang);
  } catch (e) {}

  document.documentElement.setAttribute("lang", lang);

  // Update all elements with data-i18n
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (i18n[lang] && i18n[lang][key]) {
      el.innerHTML = i18n[lang][key];
    }
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
    const key = el.getAttribute("data-i18n-aria-label");
    if (i18n[lang] && i18n[lang][key]) el.setAttribute("aria-label", i18n[lang][key]);
  });

  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    const key = el.getAttribute("data-i18n-title");
    if (i18n[lang] && i18n[lang][key]) el.setAttribute("title", i18n[lang][key]);
  });

  document.querySelectorAll("[data-i18n-content]").forEach((el) => {
    const key = el.getAttribute("data-i18n-content");
    if (i18n[lang] && i18n[lang][key]) el.setAttribute("content", i18n[lang][key]);
  });

  // Update language indicator toggle buttons
  const langCurrent = document.getElementById("lang-current");
  const langOther = document.getElementById("lang-other");
  if (langCurrent && langOther) {
    if (lang === "ru") {
      langCurrent.textContent = "RU";
      langCurrent.classList.add("active-lang");
      langOther.textContent = "EN";
      langOther.classList.remove("active-lang");
    } else {
      langCurrent.textContent = "RU";
      langCurrent.classList.remove("active-lang");
      langOther.textContent = "EN";
      langOther.classList.add("active-lang");
    }
  }

  // Apply dynamic version labels (preserves fetched version across switches)
  updateVersionElements();

  window.refreshScreenshotGalleries?.();

  // Update theme showcase screenshot
  const activeThemeBtn = document.querySelector(".theme-btn.active");
  if (activeThemeBtn) {
    const themeId = activeThemeBtn.getAttribute("data-theme-id");
    updateThemeDisplay(themeId);
  }

  // Keep the changelog toggle label consistent with its expanded state
  const olderToggle = document.getElementById("toggle-older-releases");
  const olderToggleText = document.getElementById("toggle-older-text");
  if (olderToggle && olderToggleText) {
    const expanded = olderToggle.getAttribute("aria-expanded") === "true";
    const key = expanded ? "changelog.hideOlder" : "changelog.showOlder";
    if (i18n[lang] && i18n[lang][key]) olderToggleText.textContent = i18n[lang][key];
  }
}

// ==========================================================================
// 4. Hero Preview Screens (Real Application Screenshots Only)
// ==========================================================================

// Smooth two-layer crossfade shared by hero preview and server TUI viewers.
// Avoids layout jumps: both layers are absolutely positioned in a fixed
// aspect-ratio container, only opacity changes.
function createCrossfader(frontEl, backEl, fallbackAlt) {
  // frontEl stays the base/visible layer; backEl is the overlay used only
  // during a transition. Keeping roles fixed avoids state drift on rapid
  // switching (previously layers were swapped, which could desync).
  const base = frontEl;
  let overlay = backEl;
  let token = 0;

  if (!base) return { set: function () {} };
  if (overlay) {
    overlay.style.opacity = "0";
    overlay.setAttribute("aria-hidden", "true");
  }

  function set(src, alt, animate) {
    if (!src) return;
    const cleanAlt = alt || fallbackAlt || "";
    if (base.getAttribute("src") === src) {
      base.alt = cleanAlt;
      return;
    }

    const reduceMotion = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!overlay || animate === false || reduceMotion) {
      base.src = src;
      base.alt = cleanAlt;
      base.style.opacity = "1";
      if (overlay) {
        overlay.style.opacity = "0";
        overlay.setAttribute("aria-hidden", "true");
      }
      return;
    }

    const myToken = ++token;
    overlay.src = src;
    overlay.alt = "";
    overlay.removeAttribute("aria-hidden");

    const startFade = () => {
      if (myToken !== token) return;
      overlay.style.opacity = "1";
      base.style.opacity = "0";
      // After the fade, make the base the source of truth again.
      window.setTimeout(() => {
        if (myToken !== token) return;
        base.src = src;
        base.alt = cleanAlt;
        base.style.opacity = "1";
        overlay.style.opacity = "0";
        overlay.setAttribute("aria-hidden", "true");
      }, 320);
    };

    if (overlay.complete && overlay.naturalWidth > 0) {
      startFade();
    } else {
      overlay.addEventListener("load", startFade, { once: true });
      overlay.addEventListener("error", () => {
        if (myToken === token) {
          base.src = src;
          base.alt = cleanAlt;
          base.style.opacity = "1";
          overlay.style.opacity = "0";
        }
      }, { once: true });
    }
  }

  return { set };
}

let previewCrossfader = null;

const previewScreens = {
  connected: {
    ru: "./assets/screenshots/desktop-connected.png",
    en: "./assets/screenshots/desktop-connected-en.png",
    titleRu: "AvariGate — Подключение (Mieru mita)",
    titleEn: "AvariGate — Connected (Mieru mita)",
    captionKey: "hero.captionConnected"
  },
  profiles: {
    ru: "./assets/screenshots/desktop-profiles.png",
    en: "./assets/screenshots/desktop-profiles-en.png",
    titleRu: "AvariGate — Список профилей",
    titleEn: "AvariGate — Profiles & Protocols",
    captionKey: "hero.captionProfiles"
  },
  splittunnel: {
    ru: "./assets/screenshots/desktop-split-tunneling.png",
    en: "./assets/screenshots/desktop-split-tunneling-en.png",
    titleRu: "AvariGate — Сплит-туннелирование",
    titleEn: "AvariGate — Split Tunneling",
    captionKey: "hero.captionSplit"
  },
  dragons: {
    ru: "./assets/screenshots/desktop-dragons.png",
    en: "./assets/screenshots/desktop-dragons-en.png",
    titleRu: "AvariGate — Тема DragonGate",
    titleEn: "AvariGate — DragonGate Theme",
    captionKey: "hero.captionDragons"
  },
  android: {
    ru: "./assets/screenshots/android-overview.png",
    en: "./assets/screenshots/android-overview-en.png",
    titleRu: "AvariGate Android",
    titleEn: "AvariGate Android Client",
    captionKey: "hero.captionAndroid"
  },
  server: {
    ru: "./assets/screenshots/server-tui-dashboard.png",
    en: "./assets/screenshots/server-tui-dashboard.png",
    titleRu: "mieru-admin TUI (Linux Server)",
    titleEn: "mieru-admin TUI (Linux Server)",
    captionKey: "hero.captionServer"
  }
};

function updatePreviewScreen(targetKey) {
  const data = previewScreens[targetKey];
  if (!data) return;

  const previewCaption = document.getElementById("preview-caption");
  const previewTitle = document.getElementById("preview-window-title");

  const imgSrc = (currentLang === "en" && data.en) ? data.en : data.ru;
  const altText = currentLang === "en" ? data.titleEn : data.titleRu;

  if (previewCrossfader) {
    previewCrossfader.set(imgSrc, altText);
  } else {
    const previewImg = document.getElementById("preview-img");
    if (previewImg) previewImg.src = imgSrc;
  }

  if (previewCaption && i18n[currentLang] && i18n[currentLang][data.captionKey]) {
    previewCaption.innerHTML = i18n[currentLang][data.captionKey];
  }

  if (previewTitle) {
    previewTitle.textContent = currentLang === "en" ? data.titleEn : data.titleRu;
  }
}

// ==========================================================================
// 4b. Hero Connection Sphere
//
// Состояние connected записано из настоящего desktop-рендерера
// (desktop/ui/src/sphere.ts) в зацикленное видео с кроссфейдом на стыке.
// Исходный код рендерера в публичный лендинг не попадает. Reduced motion
// оставляет статичный постер, а вне экрана видео ставится на паузу.
// ==========================================================================

const HERO_SPHERE_STATE = "connected";

function initHeroSphere() {
  const video = document.getElementById("hero-sphere-video");
  if (!video) return;

  const ripples = document.getElementById("hero-sphere-ripples");

  // Кольца-волны, как в desktop UI, расходятся только у подключённого
  // профиля; при reduced motion CSS отключает их анимацию.
  if (ripples && HERO_SPHERE_STATE === "connected") {
    ripples.classList.add("is-active");
  }

  const motionQuery = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : null;

  const play = () => {
    const started = video.play();
    if (started && typeof started.catch === "function") {
      // Автовоспроизведение может быть запрещено — остаётся постер.
      started.catch(() => {});
    }
  };

  const applyMotionPreference = () => {
    if (motionQuery && motionQuery.matches) {
      video.pause();
    } else {
      play();
    }
  };

  applyMotionPreference();

  if (motionQuery) {
    if (typeof motionQuery.addEventListener === "function") {
      motionQuery.addEventListener("change", applyMotionPreference);
    } else if (typeof motionQuery.addListener === "function") {
      motionQuery.addListener(applyMotionPreference);
    }
  }

  // Не жжём кадры, когда герой-блок ушёл за пределы экрана.
  const wrap = video.parentElement;
  if (wrap && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !(motionQuery && motionQuery.matches)) {
            play();
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0 }
    );
    observer.observe(wrap);
  }

  // Освобождаем декодер, если страница выгружается.
  window.addEventListener(
    "pagehide",
    () => {
      video.pause();
    },
    { once: true }
  );
}

// ==========================================================================
// 5. Themes Showcase (AvariGate & DragonGate)
// ==========================================================================

const themeDetails = {
  avari: {
    name: "AvariGate",
    subRu: "Кибер-сфера частиц & глубокий космос",
    subEn: "Cosmic Particle Sphere & Deep Space",
    descRu: "Классическое оформление AvariGate: тёмная космическая палитра, неоновые бирюзовые акценты и анимированная центральная сфера состояния с визуализацией активности трафика.",
    descEn: "Signature AvariGate aesthetic: deep cosmic slate backdrop, luminous cyan-teal particle accents, and an animated central status orb reacting to active bandwidth.",
    logo: "./assets/icons/icon.png",
    screenshotRu: "./assets/screenshots/desktop-connected.png",
    screenshotEn: "./assets/screenshots/desktop-connected-en.png",
    swatches: ["#021a1a", "#06b6d4", "#14b8a6", "#0f172a"]
  },
  dragons: {
    name: "DragonGate",
    subRu: "Императорский нефрит & золотой дракон",
    subEn: "Imperial Jade & Ancient Golden Dragon",
    descRu: "Восточная кибер-эстетика: глубокий изумрудный нефрит, акценты имперского золота и китайский золотой дракон, кольцом охватывающий центральную сферу подключения.",
    descEn: "Oriental cyber-fantasy theme: deep emerald jade tones, imperial gold borders, and an ornate golden dragon coiled around the central status sphere.",
    logo: "./assets/logos/dragons-logo.svg",
    screenshotRu: "./assets/screenshots/desktop-dragons.png",
    screenshotEn: "./assets/screenshots/desktop-dragons-en.png",
    swatches: ["#061c14", "#10b981", "#f59e0b", "#064e3b"]
  },
  eyevpn: {
    name: "EyeVPN",
    subRu: "Интерактивный аниме-глаз & тёплый янтарь",
    subEn: "Interactive Anime Eye & Warm Amber",
    descRu: "Стиль с анимированным живым компаньоном: тёплая янтарно-багряная палитра и интерактивный аниме-глаз, реагирующий на состояние туннеля и движение курсора.",
    descEn: "Character theme with an interactive living companion: warm crimson-amber palette and an anime eye that reacts to tunnel status and mouse movements.",
    logo: "./assets/logos/otfront-logo.png",
    screenshotRu: "./assets/screenshots/desktop-eyevpn.png",
    screenshotEn: "./assets/screenshots/desktop-eyevpn-en.png",
    swatches: ["#1f1406", "#f59e0b", "#ef4444", "#78350f"]
  },
  pirates: {
    name: "CorsairGate",
    subRu: "Пиратский штурвал & латунь",
    subEn: "Pirate Helm & Weathered Brass",
    descRu: "Морская тема: латунный штурвал, глубокий океанский фон и тёплые золотые акценты. Тема реализована в клиенте; честный скриншот будет добавлен после релизной съёмки.",
    descEn: "Nautical theme: a brass ship's helm, deep ocean backdrop, and warm golden accents. The theme ships in the client; an honest capture will be added after the release snapshot.",
    logo: "./assets/logos/pirates-logo.svg",
    screenshotRu: null,
    screenshotEn: null,
    swatches: ["#1c1306", "#f59e0b", "#d97706", "#0b1a24"]
  },
  kawaii: {
    name: "KawaiiGate",
    subRu: "Пастельный маскот & мягкий неон",
    subEn: "Pastel Mascot & Soft Neon",
    descRu: "Пастельная тема: розово-лавандовая палитра и милый маскот-компаньон. Тема реализована в клиенте; честный скриншот будет добавлен после релизной съёмки.",
    descEn: "Pastel theme: a pink-lavender palette with a cute companion mascot. The theme ships in the client; an honest capture will be added after the release snapshot.",
    logo: "./assets/logos/kawaii-logo.svg",
    screenshotRu: null,
    screenshotEn: null,
    swatches: ["#1a0f1d", "#f472b6", "#c084fc", "#fbcfe8"]
  }
};

function updateThemeDisplay(themeId) {
  const t = themeDetails[themeId];
  if (!t) return;

  document.documentElement.setAttribute("data-theme", themeId);

  const themeName = document.getElementById("theme-name");
  const themeSub = document.getElementById("theme-sub");
  const themeDesc = document.getElementById("theme-desc");
  const themeLogo = document.getElementById("theme-logo");
  const themeScreenshot = document.getElementById("theme-screenshot");
  const themeSwatches = document.getElementById("theme-swatches");
  const placeholderView = document.getElementById("theme-placeholder-view");
  const placeholderLogo = document.getElementById("placeholder-logo");

  if (themeName) themeName.textContent = t.name;
  if (themeSub) themeSub.textContent = currentLang === "en" ? t.subEn : t.subRu;
  if (themeDesc) themeDesc.textContent = currentLang === "en" ? t.descEn : t.descRu;
  if (themeLogo) themeLogo.src = t.logo;

  const shot = (currentLang === "en" && t.screenshotEn) ? t.screenshotEn : t.screenshotRu;

  // Honesty policy: never substitute a mockup for a real screenshot.
  if (shot) {
    if (themeScreenshot) {
      themeScreenshot.src = shot;
      themeScreenshot.style.display = "block";
      themeScreenshot.alt = t.name + (currentLang === "en" ? " theme screenshot" : " — скриншот темы");
    }
    if (placeholderView) placeholderView.style.display = "none";
  } else {
    if (themeScreenshot) {
      themeScreenshot.style.display = "none";
      themeScreenshot.alt = "";
    }
    if (placeholderView) placeholderView.style.display = "flex";
    if (placeholderLogo) {
      placeholderLogo.src = t.logo;
      placeholderLogo.alt = t.name + " logo";
    }
    // Re-apply localized placeholder text (data-i18n already handled on language switch).
    if (i18n[currentLang]) {
      const dict = i18n[currentLang];
      document.querySelectorAll("#theme-placeholder-view [data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (dict[key]) el.innerHTML = dict[key];
      });
    }
  }

  if (themeSwatches) {
    themeSwatches.innerHTML = "";
    t.swatches.forEach((color) => {
      const span = document.createElement("span");
      span.className = "swatch";
      span.style.backgroundColor = color;
      span.title = color;
      themeSwatches.appendChild(span);
    });
  }
}

// ==========================================================================
// 6. Server TUI Screens & Tabs (mieru-admin)
// ==========================================================================

const serverTuiData = {
  wizard: {
    src: "./assets/screenshots/server-tui-wizard.png",
    captionKey: "server.captionWizard"
  },
  dashboard: {
    src: "./assets/screenshots/server-tui-dashboard.png",
    captionKey: "server.captionDash"
  },
  users: {
    src: "./assets/screenshots/server-tui-users.png",
    captionKey: "server.captionUsers"
  },
  install: {
    src: "./assets/screenshots/server-tui-install.png",
    captionKey: "server.captionInstall"
  },
  hysteria: {
    src: "./assets/screenshots/server-tui-hysteria.png",
    captionKey: "server.captionHysteria"
  }
};

let tuiCrossfader = null;
let activeTuiKey = "wizard";

function switchServerTui(tuiKey) {
  const data = serverTuiData[tuiKey];
  if (!data) return;
  activeTuiKey = tuiKey;

  const tabs = document.querySelectorAll(".tui-tab");
  tabs.forEach((t) => {
    const isTarget = t.getAttribute("data-tui") === tuiKey;
    t.classList.toggle("active", isTarget);
    t.setAttribute("aria-selected", isTarget ? "true" : "false");
    t.setAttribute("tabindex", isTarget ? "0" : "-1");
  });

  const points = document.querySelectorAll(".server-point[data-point-target]");
  points.forEach((p) => {
    const isTarget = p.getAttribute("data-point-target") === tuiKey;
    p.classList.toggle("active", isTarget);
    p.setAttribute("aria-current", isTarget ? "true" : "false");
  });

  const tuiCaption = document.getElementById("tui-caption");
  const altText = currentLang === "en" ? "mieru-admin TUI screen" : "Экран консоли mieru-admin";

  if (tuiCrossfader) {
    tuiCrossfader.set(data.src, altText);
  } else {
    const tuiImg = document.getElementById("tui-screen-img");
    if (tuiImg) tuiImg.src = data.src;
  }

  if (tuiCaption && i18n[currentLang] && i18n[currentLang][data.captionKey]) {
    tuiCaption.innerHTML = i18n[currentLang][data.captionKey];
  }
}

function initServerTuiTabs() {
  const tabs = Array.from(document.querySelectorAll(".tui-tab"));
  tabs.forEach((tab, index) => {
    tab.setAttribute("tabindex", tab.classList.contains("active") ? "0" : "-1");
    tab.addEventListener("click", () => {
      const tuiKey = tab.getAttribute("data-tui");
      switchServerTui(tuiKey);
    });
    tab.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft" && e.key !== "Home" && e.key !== "End") return;
      e.preventDefault();
      let next = index;
      if (e.key === "ArrowRight") next = (index + 1) % tabs.length;
      if (e.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
      if (e.key === "Home") next = 0;
      if (e.key === "End") next = tabs.length - 1;
      tabs[next].focus();
      switchServerTui(tabs[next].getAttribute("data-tui"));
    });
  });

  const points = document.querySelectorAll(".server-point[data-point-target]");
  points.forEach((pt) => {
    pt.addEventListener("click", () => {
      const target = pt.getAttribute("data-point-target");
      switchServerTui(target);
    });
    pt.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const target = pt.getAttribute("data-point-target");
        switchServerTui(target);
      }
    });
  });
}

// ==========================================================================
// 7. Dynamic GitHub Latest Releases with Fallback
// ==========================================================================

const GITHUB_API_LATEST = "https://api.github.com/repos/OstKost/avari-gate/releases/latest";

function formatBytes(bytes) {
  if (bytes === 0) return "0 Б";
  const k = 1024;
  const sizes = ["Б", "КБ", "МБ", "ГБ"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

async function fetchLatestRelease() {
  try {
    const response = await fetch(GITHUB_API_LATEST, {
      headers: { Accept: "application/vnd.github.v3+json" }
    });
    if (!response.ok) return;

    const data = await response.json();
    if (data.tag_name) {
      currentVersion = data.tag_name;
      updateVersionElements();
    }

    const assets = data.assets || [];

    // macOS DMG (AvariGate only)
    const macAsset = assets.find((a) => a.name.includes("AvariGate") && a.name.endsWith(".dmg"));
    if (macAsset) {
      const btnMac = document.getElementById("btn-download-macos");
      const nameMac = document.getElementById("file-macos-name");
      const sizeMac = document.getElementById("file-macos-size");
      if (btnMac) btnMac.href = macAsset.browser_download_url;
      if (nameMac) nameMac.textContent = macAsset.name;
      if (sizeMac) sizeMac.textContent = formatBytes(macAsset.size);
    }

    // Android APK (Check if dedicated AvariGate APK exists)
    const androidAsset = assets.find((a) => a.name.includes("AvariGate") && a.name.endsWith(".apk"));
    const btnAndroid = document.getElementById("btn-download-android");
    const nameAndroid = document.getElementById("file-android-name");
    const sizeAndroid = document.getElementById("file-android-size");

    if (androidAsset) {
      hasAndroidDirectAsset = true;
      if (btnAndroid) btnAndroid.href = androidAsset.browser_download_url;
      if (nameAndroid) nameAndroid.textContent = androidAsset.name;
      if (sizeAndroid) sizeAndroid.textContent = formatBytes(androidAsset.size);
    } else {
      hasAndroidDirectAsset = false;
      if (btnAndroid) btnAndroid.href = data.html_url || "https://github.com/OstKost/avari-gate/releases/latest";
      if (nameAndroid) {
        nameAndroid.textContent = currentLang === "en" ? "Release in GitHub Releases" : "Сборка в GitHub Releases";
      }
    }
    updateVersionElements();

    // Linux Server tar.gz (AvariGate-admin)
    const serverAsset = assets.find((a) => a.name.includes("admin-linux") && a.name.endsWith(".tar.gz"));
    if (serverAsset) {
      const btnServer = document.getElementById("btn-download-server");
      const nameServer = document.getElementById("file-server-name");
      const sizeServer = document.getElementById("file-server-size");
      if (btnServer) btnServer.href = serverAsset.browser_download_url;
      if (nameServer) nameServer.textContent = serverAsset.name;
      if (sizeServer) sizeServer.textContent = formatBytes(serverAsset.size);

      const quickCode = document.getElementById("quick-cmd-code");
      if (quickCode) {
        quickCode.textContent = `curl -fsSL -O ${serverAsset.browser_download_url} && tar -xzf ${serverAsset.name} && sudo ./mieru-admin setup`;
      }
    }

    // Windows Setup EXE (AvariGate x64)
    const winAsset = assets.find((a) => a.name.includes("AvariGate") && a.name.endsWith(".exe"));
    if (winAsset) {
      const btnWin = document.getElementById("btn-download-windows");
      const nameWin = document.getElementById("file-windows-name");
      const sizeWin = document.getElementById("file-windows-size");
      if (btnWin) btnWin.href = winAsset.browser_download_url;
      if (nameWin) nameWin.textContent = winAsset.name;
      if (sizeWin) sizeWin.textContent = formatBytes(winAsset.size);
    }

    applyPlatformToUI();
  } catch (err) {
    console.warn("GitHub Release API unavailable, using verified fallback release assets.", err);
  }
}

// ==========================================================================
// 8. Client Platform Detection & Download Highlight
// ==========================================================================

let userDetectedPlatform = null; // "windows" | "macos" | "android" | "linux" | null

const PLATFORM_ICONS = {
  windows: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.551H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.949-1.949"/></svg>',
  macos: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.63 1.35-.57.65-1.07 1.72-.94 2.74 1.01.08 2.03-.49 2.65-1.24z"/></svg>',
  android: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9993.4482.9993.9993.0001.5511-.4483.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5896 8.3585 13.8566 8 12 8s-3.5896.3585-5.1368.9507L4.8409 5.4477a.416.416 0 00-.5676-.1521.416.416 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-9.4396"/></svg>',
  linux: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>',
  default: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" class="download-icon"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>'
};

function detectUserPlatform() {
  const userAgent = navigator.userAgent || "";
  const platform = navigator.platform || "";
  const uaData = navigator.userAgentData;

  let detected = null;

  // 1. Client Hints API (Chromium-based: Chrome, Edge, Brave, etc.)
  if (uaData && uaData.platform) {
    const p = uaData.platform.toLowerCase();
    if (p.includes("win")) detected = "windows";
    else if (p.includes("mac")) detected = "macos";
    else if (p.includes("android")) detected = "android";
    else if (p.includes("linux")) detected = "linux";
  }

  // 2. UserAgent / Platform fallback
  if (!detected) {
    if (/Android/i.test(userAgent)) {
      detected = "android";
    } else if (/iPhone|iPad|iPod/i.test(userAgent) || (platform === "MacIntel" && navigator.maxTouchPoints > 1)) {
      detected = null; // iOS currently planned, falls back to generic "Скачать"
    } else if (/Win|Windows/i.test(platform) || /Windows/i.test(userAgent)) {
      detected = "windows";
    } else if (/Mac|Macintosh/i.test(platform) || /Macintosh/i.test(userAgent)) {
      detected = "macos";
    } else if (/Linux/i.test(platform) || /Linux/i.test(userAgent)) {
      detected = "linux";
    }
  }

  userDetectedPlatform = detected;
  applyPlatformToUI();
}

function applyPlatformToUI() {
  const isEn = currentLang === "en";

  // Reset any previous platform badges from cards
  document.querySelectorAll(".download-card").forEach((card) => {
    card.classList.remove("user-platform");
    const badge = card.querySelector(".platform-detected-pill");
    if (badge) badge.remove();
  });

  const heroBtn = document.getElementById("hero-download-btn");
  const heroLabel = document.getElementById("hero-download-label");
  const heroIcon = document.getElementById("hero-download-icon");
  const heroSecondaryBtn = document.getElementById("hero-secondary-btn");
  const heroSecondaryLabel = document.getElementById("hero-secondary-label");
  const heroSubnoteText = document.getElementById("hero-subnote-text");

  if (userDetectedPlatform === "windows") {
    const cardWin = document.getElementById("card-windows");
    if (cardWin) {
      cardWin.classList.add("user-platform");
      addPlatformBadge(cardWin);
    }
    const btnWin = document.getElementById("btn-download-windows");
    if (heroBtn) {
      heroBtn.href = (btnWin && btnWin.href) || `https://github.com/OstKost/avari-gate/releases/download/${currentVersion}/AvariGate_${currentVersion.replace(/^v/, "")}_x64-setup.exe`;
    }
    if (heroLabel) {
      heroLabel.textContent = isEn ? "Download for Windows" : "Скачать для Windows";
    }
    if (heroIcon) {
      heroIcon.innerHTML = PLATFORM_ICONS.windows;
    }
    if (heroSecondaryBtn) {
      heroSecondaryBtn.href = "#downloads";
    }
    if (heroSecondaryLabel) {
      heroSecondaryLabel.textContent = isEn ? "All Platforms" : "Все платформы";
    }
    if (heroSubnoteText) {
      heroSubnoteText.innerHTML = isEn
        ? 'Windows 10 / 11 (64-bit) • <a href="#card-windows">Checksums & details ↓</a>'
        : 'Windows 10 / 11 (64-bit) • <a href="#card-windows">Параметры и SHA-256 ↓</a>';
    }
  } else if (userDetectedPlatform === "macos") {
    const cardMac = document.getElementById("card-macos");
    if (cardMac) {
      cardMac.classList.add("user-platform");
      addPlatformBadge(cardMac);
    }
    const btnMac = document.getElementById("btn-download-macos");
    if (heroBtn) {
      heroBtn.href = (btnMac && btnMac.href) || `https://github.com/OstKost/avari-gate/releases/download/${currentVersion}/AvariGate_${currentVersion.replace(/^v/, "")}_aarch64.dmg`;
    }
    if (heroLabel) {
      heroLabel.textContent = isEn ? "Download for macOS" : "Скачать для macOS";
    }
    if (heroIcon) {
      heroIcon.innerHTML = PLATFORM_ICONS.macos;
    }
    if (heroSecondaryBtn) {
      heroSecondaryBtn.href = "#downloads";
    }
    if (heroSecondaryLabel) {
      heroSecondaryLabel.textContent = isEn ? "All Platforms" : "Все платформы";
    }
    if (heroSubnoteText) {
      heroSubnoteText.innerHTML = isEn
        ? 'macOS 12+ (Apple Silicon) • <a href="#card-macos">Checksums & details ↓</a>'
        : 'macOS 12+ (Apple Silicon) • <a href="#card-macos">Параметры и SHA-256 ↓</a>';
    }
  } else if (userDetectedPlatform === "android") {
    const cardAndroid = document.getElementById("card-android");
    if (cardAndroid) {
      cardAndroid.classList.add("user-platform");
      addPlatformBadge(cardAndroid);
    }
    const btnAndroid = document.getElementById("btn-download-android");
    if (heroBtn) {
      heroBtn.href = (btnAndroid && btnAndroid.href) || `https://github.com/OstKost/avari-gate/releases/download/${currentVersion}/AvariGate-${currentVersion.replace(/^v/, "")}-android.apk`;
    }
    if (heroLabel) {
      heroLabel.textContent = isEn ? "Download for Android" : "Скачать для Android";
    }
    if (heroIcon) {
      heroIcon.innerHTML = PLATFORM_ICONS.android;
    }
    if (heroSecondaryBtn) {
      heroSecondaryBtn.href = "#downloads";
    }
    if (heroSecondaryLabel) {
      heroSecondaryLabel.textContent = isEn ? "All Platforms" : "Все платформы";
    }
    if (heroSubnoteText) {
      heroSubnoteText.innerHTML = isEn
        ? 'Android 8.0+ (ARM64 / x86_64) • <a href="#card-android">Checksums & details ↓</a>'
        : 'Android 8.0+ (ARM64 / x86_64) • <a href="#card-android">Параметры и SHA-256 ↓</a>';
    }
  } else if (userDetectedPlatform === "linux") {
    const cardLinux = document.getElementById("card-linux");
    if (cardLinux) {
      cardLinux.classList.add("user-platform");
      addPlatformBadge(cardLinux);
    }
    if (heroBtn) {
      heroBtn.href = "#card-linux";
    }
    if (heroLabel) {
      heroLabel.textContent = isEn ? "Download for Linux" : "Скачать для Linux";
    }
    if (heroIcon) {
      heroIcon.innerHTML = PLATFORM_ICONS.linux;
    }
    if (heroSecondaryBtn) {
      heroSecondaryBtn.href = "#downloads";
    }
    if (heroSecondaryLabel) {
      heroSecondaryLabel.textContent = isEn ? "All Platforms" : "Все платформы";
    }
    if (heroSubnoteText) {
      heroSubnoteText.innerHTML = isEn
        ? 'Ubuntu, Debian & Arch • <a href="#card-linux">Packages & repositories ↓</a>'
        : 'Ubuntu, Debian и Arch • <a href="#card-linux">Пакеты и репозитории ↓</a>';
    }
  } else {
    // If detection failed / unknown / iOS: user requested "если не получилось - просто Скачать"
    if (heroBtn) {
      heroBtn.href = "#downloads";
    }
    if (heroLabel) {
      heroLabel.textContent = isEn ? "Download" : "Скачать";
    }
    if (heroIcon) {
      heroIcon.innerHTML = PLATFORM_ICONS.default;
    }
    if (heroSecondaryBtn) {
      heroSecondaryBtn.href = "https://github.com/OstKost/avari-gate/releases/latest";
    }
    if (heroSecondaryLabel) {
      heroSecondaryLabel.textContent = "GitHub Releases";
    }
    if (heroSubnoteText) {
      heroSubnoteText.innerHTML = isEn
        ? 'Available for Windows, macOS, Android, and Linux • <a href="#downloads">Choose platform ↓</a>'
        : 'Доступно для Windows, macOS, Android и Linux • <a href="#downloads">Выбрать платформу ↓</a>';
    }
  }
}

function addPlatformBadge(cardElement) {
  const existingBadge = cardElement.querySelector(".platform-detected-pill");
  if (existingBadge) return;

  const pill = document.createElement("span");
  pill.className = "platform-detected-pill";
  pill.style.cssText = "position:absolute; top:-10px; right:16px; background:var(--accent); color:#030712; font-size:11px; font-weight:800; padding:3px 10px; border-radius:9999px; box-shadow:0 0 10px var(--accent-glow);";
  pill.dataset.i18n = "common.yourPlatform";
  pill.textContent = (i18n[currentLang] && i18n[currentLang]["common.yourPlatform"]) || "★ Ваша система";
  cardElement.appendChild(pill);
}

// ==========================================================================
// 9. Clipboard Copy Helpers
// ==========================================================================

function copyToClipboard(text, buttonEl, successText) {
  if (!navigator.clipboard) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      showSuccess();
    } catch (e) {
      console.error("ExecCommand copy failed", e);
    }
    document.body.removeChild(textArea);
    return;
  }

  navigator.clipboard.writeText(text).then(showSuccess).catch((err) => {
    console.error("Clipboard copy failed: ", err);
  });

  function showSuccess() {
    const originalHtml = buttonEl.innerHTML;
    buttonEl.innerHTML = `✓ ${successText}`;
    setTimeout(() => {
      buttonEl.innerHTML = originalHtml;
    }, 2200);
  }
}

// ==========================================================================
// 10. Initialization & Event Listeners
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  // Initialize smooth crossfaders before the first language pass so the
  // initial image/language application does not snap.
  const previewFront = document.getElementById("preview-img");
  const previewBack = document.getElementById("preview-img-next");
  if (previewFront && previewBack) {
    previewCrossfader = createCrossfader(previewFront, previewBack, "AvariGate Desktop");
  }
  const tuiFront = document.getElementById("tui-preview-img");
  const tuiBack = document.getElementById("tui-preview-img-next");
  if (tuiFront && tuiBack) {
    tuiCrossfader = createCrossfader(tuiFront, tuiBack, "mieru-admin TUI");
  }

  // Apply initial language & version labels
  setLanguage(currentLang);

  // Animated connection sphere above the hero headline
  initHeroSphere();

  // Platform detection
  detectUserPlatform();

  // Async release fetch
  fetchLatestRelease();

  // Language switcher button
  const langToggle = document.getElementById("lang-toggle");
  if (langToggle) {
    langToggle.addEventListener("click", () => {
      const nextLang = currentLang === "ru" ? "en" : "ru";
      setLanguage(nextLang);
    });
  }

  // Mobile drawer toggle & accessibility
  const mobileBtn = document.getElementById("mobile-menu-btn");
  const mobileDrawer = document.getElementById("mobile-drawer");
  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener("click", () => {
      const isOpen = mobileDrawer.classList.toggle("open");
      mobileBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      mobileDrawer.setAttribute("aria-hidden", isOpen ? "false" : "true");
    });

    mobileDrawer.querySelectorAll(".mobile-link, a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileDrawer.classList.remove("open");
        mobileBtn.setAttribute("aria-expanded", "false");
        mobileDrawer.setAttribute("aria-hidden", "true");
      });
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileDrawer.classList.contains("open")) {
        mobileDrawer.classList.remove("open");
        mobileBtn.setAttribute("aria-expanded", "false");
        mobileDrawer.setAttribute("aria-hidden", "true");
        mobileBtn.focus();
      }
    });
  }

  // Sticky Navbar scroll state
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }, { passive: true });

  // Theme selector buttons
  const themeBtns = Array.from(document.querySelectorAll(".theme-btn"));
  themeBtns.forEach((btn, index) => {
    btn.setAttribute("tabindex", btn.classList.contains("active") ? "0" : "-1");
    btn.addEventListener("click", () => {
      themeBtns.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
        b.setAttribute("tabindex", "-1");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      btn.setAttribute("tabindex", "0");
      const themeId = btn.getAttribute("data-theme-id");
      updateThemeDisplay(themeId);
    });
    btn.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft" && e.key !== "Home" && e.key !== "End") return;
      e.preventDefault();
      let next = index;
      if (e.key === "ArrowRight") next = (index + 1) % themeBtns.length;
      if (e.key === "ArrowLeft") next = (index - 1 + themeBtns.length) % themeBtns.length;
      if (e.key === "Home") next = 0;
      if (e.key === "End") next = themeBtns.length - 1;
      themeBtns[next].focus();
      themeBtns[next].click();
    });
  });

  // Initialize Server TUI tabs
  initScreenshotGalleries();

  // FAQ Accordion
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const questionBtn = item.querySelector(".faq-question");
    if (questionBtn) {
      questionBtn.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");
        faqItems.forEach((i) => {
          i.classList.remove("open");
          const btn = i.querySelector(".faq-question");
          if (btn) btn.setAttribute("aria-expanded", "false");
        });

        if (!isOpen) {
          item.classList.add("open");
          questionBtn.setAttribute("aria-expanded", "true");
        }
      });
    }
  });

  // Changelog: latest release open, older releases collapsed behind a button
  const olderToggle = document.getElementById("toggle-older-releases");
  const olderList = document.getElementById("older-releases-list");
  const olderToggleText = document.getElementById("toggle-older-text");

  function applyChangelogState(expanded) {
    if (!olderToggle || !olderList) return;
    olderList.classList.toggle("collapsed", !expanded);
    olderList.setAttribute("aria-hidden", expanded ? "false" : "true");
    olderToggle.setAttribute("aria-expanded", expanded ? "true" : "false");
    if (olderToggleText && i18n[currentLang]) {
      const key = expanded ? "changelog.hideOlder" : "changelog.showOlder";
      if (i18n[currentLang][key]) olderToggleText.textContent = i18n[currentLang][key];
    }
  }

  if (olderToggle && olderList) {
    // Respect the current state (collapsed by default in markup).
    applyChangelogState(olderToggle.getAttribute("aria-expanded") === "true");
    olderToggle.addEventListener("click", () => {
      const expanded = olderToggle.getAttribute("aria-expanded") !== "true";
      applyChangelogState(expanded);
    });
  }

  // Quick Command Copy Button
  const copyQuickCmd = document.getElementById("copy-quick-cmd");
  if (copyQuickCmd) {
    copyQuickCmd.addEventListener("click", () => {
      const codeEl = document.getElementById("quick-cmd-code");
      const cmd = codeEl ? codeEl.textContent : "curl -fsSL -O https://github.com/OstKost/avari-gate/releases/download/v1.1.1/AvariGate-admin-linux-amd64.tar.gz && tar -xzf AvariGate-admin-linux-amd64.tar.gz && sudo ./mieru-admin setup";
      const successMsg = currentLang === "en" ? "Copied!" : "Скопировано!";
      copyToClipboard(cmd, copyQuickCmd, successMsg);
    });
  }

  // Generic data-copy-target buttons (server quick start)
  document.querySelectorAll("[data-copy-target]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = document.getElementById(btn.getAttribute("data-copy-target"));
      if (!target) return;
      const successMsg = currentLang === "en" ? "Copied!" : "Скопировано!";
      copyToClipboard(target.textContent, btn, successMsg);
    });
  });

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

function initScreenshotGalleries() {
  const desktop = ['connected','profiles','splittunnel'].map(key => ({key, ...previewScreens[key], label: `hero.tab${{connected:'Connected',profiles:'Profiles',splittunnel:'Split'}[key]}`}));
  const server = Object.entries(serverTuiData).map(([key,data]) => ({key,ru:data.src,en:data.src,captionKey:data.captionKey,label:`server.tui${{wizard:'Wizard',dashboard:'Dash',users:'Users',install:'Install',hysteria:'Hysteria'}[key]}`}));
  const dialog = document.createElement('dialog');
  dialog.className='screenshot-dialog';
  dialog.innerHTML='<button class="gallery-close" aria-label="Close / Закрыть">×</button><img alt=""><p></p>';
  document.body.append(dialog);
  dialog.querySelector('button').onclick=()=>dialog.close();
  dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
  const refresh=[];
  function mount(root, groups, syncPoints=false) {
    root.innerHTML='<div class="gallery-categories"></div><button class="gallery-stage" type="button"><img class="gallery-main" alt=""><span class="gallery-zoom">↗</span></button><div class="gallery-description"><div><strong></strong><p></p></div><div class="gallery-controls"><button data-step="-1" aria-label="Previous / Назад">←</button><span></span><button data-step="1" aria-label="Next / Вперёд">→</button></div></div><div class="gallery-thumbnails" role="tablist"></div>';
    root.classList.add('screenshot-gallery');
    const stage=root.querySelector('.gallery-stage'),image=root.querySelector('.gallery-main'),thumbs=root.querySelector('.gallery-thumbnails');
    let group=0,index=0,token=0,startX=0;
    const label=item=>i18n[currentLang][item.label]||item.key;
    const items=()=>groups[group].items;
    function select(next){index=(next+items().length)%items().length;render()}
    function render(){
      const item=items()[index],src=currentLang==='en'?item.en:item.ru,myToken=++token;
      const title=label(item),caption=i18n[currentLang][item.captionKey]||'';
      const loader=new Image();loader.onload=()=>{if(myToken!==token)return;image.src=src;image.alt=title;image.classList.remove('gallery-loading')};loader.onerror=()=>{if(myToken===token)image.classList.remove('gallery-loading')};image.classList.add('gallery-loading');loader.src=src;
      root.querySelector('.gallery-description strong').textContent=title;
      root.querySelector('.gallery-description p').textContent=caption;
      root.querySelector('.gallery-controls span').textContent=`${String(index+1).padStart(2,'0')} / ${String(items().length).padStart(2,'0')}`;
      root.querySelector('.gallery-categories').innerHTML=groups.length>1?groups.map((g,i)=>`<button type="button" aria-pressed="${i===group}" data-group="${i}">${g.name}</button>`).join(''):'';
      root.querySelectorAll('[data-group]').forEach(b=>b.onclick=()=>{group=Number(b.dataset.group);index=0;render()});
      thumbs.replaceChildren();items().forEach((entry,i)=>{const b=document.createElement('button');b.type='button';b.className='gallery-thumb';b.setAttribute('role','tab');b.setAttribute('aria-selected',String(i===index));b.tabIndex=i===index?0:-1;const img=document.createElement('img');img.src=currentLang==='en'?entry.en:entry.ru;img.alt='';img.loading='lazy';const text=document.createElement('span');text.textContent=label(entry);b.append(img,text);b.onclick=()=>select(i);b.onkeydown=e=>{let n=i;if(e.key==='ArrowRight')n=i+1;else if(e.key==='ArrowLeft')n=i-1;else if(e.key==='Home')n=0;else if(e.key==='End')n=items().length-1;else return;e.preventDefault();select(n);thumbs.children[index].focus()};thumbs.append(b)});
      if(syncPoints)document.querySelectorAll('.server-point[data-point-target]').forEach(p=>{const active=p.dataset.pointTarget===item.key;p.classList.toggle('active',active);p.setAttribute('aria-current',String(active))});
    }
    root.querySelectorAll('[data-step]').forEach(b=>b.onclick=()=>select(index+Number(b.dataset.step)));
    stage.onclick=()=>{const item=items()[index];dialog.querySelector('img').src=currentLang==='en'?item.en:item.ru;dialog.querySelector('img').alt=label(item);dialog.querySelector('p').textContent=i18n[currentLang][item.captionKey]||'';dialog.showModal()};
    stage.addEventListener('touchstart',e=>{startX=e.changedTouches[0].clientX},{passive:true});stage.addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-startX;if(Math.abs(d)>50)select(index+(d<0?1:-1))},{passive:true});
    if(syncPoints)document.querySelectorAll('.server-point[data-point-target]').forEach(p=>{const choose=()=>{const n=items().findIndex(x=>x.key===p.dataset.pointTarget);if(n>=0)select(n)};p.onclick=choose;p.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();choose()}}});
    refresh.push(render);render();
  }
  mount(document.querySelector('.hero-visual .device-frame'),[{name:'Desktop',items:desktop},{name:'Server TUI',items:server}]);
  mount(document.querySelector('.server-terminal-window'),[{name:'Server TUI',items:server}],true);
  window.refreshScreenshotGalleries=()=>refresh.forEach(fn=>fn());
}
