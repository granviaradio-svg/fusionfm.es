document.addEventListener('DOMContentLoaded', () => {

    // --- 1. CONTROL DEL REPRODUCTOR DE AUDIO ---
    const playPauseBtn = document.getElementById('playPauseBtn');
    const audioPlayer = document.getElementById('radioAudio');
    const volumeSlider = document.getElementById('volumeSlider');
    const currentTrackDisplay = document.getElementById('currentTrack');
    const playIcon = playPauseBtn.querySelector('i');

    let isPlaying = false;

    window.togglePlay = function() {
        if (isPlaying) {
            // Pausamos y limpiamos el enlace para que deje de consumir datos en segundo plano
            audioPlayer.pause();
            audioPlayer.removeAttribute('src'); 
            audioPlayer.load();
            
            playIcon.classList.remove('fa-pause');
            playIcon.classList.add('fa-play');
        } else {
            // TRUCO: Añadimos la fecha/hora actual al final de la URL para engañar a la caché
            // Así el navegador siempre carga el directo limpio de Antares
            const urlAudioDirecto = "https://antares.dribbcast.com/proxy/fmbarcelona/live?" + new Date().getTime();
            audioPlayer.src = urlAudioDirecto;
            audioPlayer.load(); 
            
            const playPromise = audioPlayer.play();
            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    playIcon.classList.remove('fa-play');
                    playIcon.classList.add('fa-pause');
                }).catch(error => {
                    console.error("Error al reproducir:", error);
                    currentTrackDisplay.textContent = "Error de señal";
                });
            }
        }
        isPlaying = !isPlaying;
    };

    playPauseBtn.addEventListener('click', togglePlay);
    volumeSlider.addEventListener('input', (e) => {
        audioPlayer.volume = e.target.value;
    });

    // --- 2. PROGRAMACIÓN SEMANAL DINÁMICA ---
    const scheduleData = {
        lunes: [
            { start: "00:00", end: "09:00", title: "FUSIÓN NON-STOP", host: "Fusión FM" },
            { start: "09:00", end: "10:00", title: "WEEKLY STARS", host: "Albert Comes" },
            { start: "10:00", end: "13:00", title: "EL VIAJERO DEL TIEMPO", host: "David Castro" },
            { start: "13:00", end: "15:00", title: "MUSIC ROCK", host: "Román Armengol" },
            { start: "15:00", end: "16:00", title: "WEEKLY STARS", host: "Albert Comes" },
            { start: "16:00", end: "18:00", title: "CLASSICS [Repetición]", host: "Santiago Fontenla" },
            { start: "18:00", end: "23:00", title: "FUSIÓN NON-STOP", host: "Fusión FM" },
            { start: "23:00", end: "00:00", title: "HIST. DE LA MÚSICA ESPAÑOLA", host: "Jaime Álvarez" }
        ],
        martes: [
            { start: "00:00", end: "09:00", title: "FUSIÓN NON-STOP", host: "Fusión FM" },
            { start: "09:00", end: "10:00", title: "WEEKLY STARS", host: "Albert Comes" },
            { start: "10:00", end: "13:00", title: "EL VIAJERO DEL TIEMPO", host: "David Castro" },
            { start: "13:00", end: "15:00", title: "MUSIC ROCK", host: "Román Armengol" },
            { start: "15:00", end: "16:00", title: "WEEKLY STARS", host: "Albert Comes" },
            { start: "16:00", end: "18:00", title: "EL TRASTERO [Repetición]", host: "Luis López" },
            { start: "18:00", end: "20:00", title: "B.P.M [Repetición]", host: "Daniel Casanova" },
            { start: "20:00", end: "21:00", title: "FUSIÓN NON-STOP", host: "Fusión FM" },
            { start: "21:00", end: "23:00", title: "LA HORA DEL ROCK", host: "Paco Jiménez" },
            { start: "23:00", end: "00:00", title: "TOP 100", host: "Santiago Fontenla" }
        ],
        miercoles: [
            { start: "00:00", end: "09:00", title: "FUSIÓN NON-STOP", host: "Fusión FM" },
            { start: "09:00", end: "10:00", title: "WEEKLY STARS", host: "Albert Comes" },
            { start: "10:00", end: "13:00", title: "EL VIAJERO DEL TIEMPO", host: "David Castro" },
            { start: "13:00", end: "15:00", title: "MUSIC ROCK", host: "Román Armengol" },
            { start: "15:00", end: "16:00", title: "WEEKLY STARS", host: "Albert Comes" },
            { start: "16:00", end: "17:00", title: "DISCOVER [Repetición]", host: "Santiago Fontenla" },
            { start: "17:00", end: "19:00", title: "LA AZOTEA", host: "David Castro" },
            { start: "19:00", end: "21:00", title: "FUSIÓN NON-STOP", host: "Fusión FM" },
            { start: "21:00", end: "23:00", title: "BAD MUSIC RADIO", host: "José Luis Martín" },
            { start: "23:00", end: "00:00", title: "BUSCANDO CINE", host: "Daniel Casanova" }
        ],
        jueves: [
            { start: "00:00", end: "09:00", title: "FUSIÓN NON-STOP", host: "Fusión FM" },
            { start: "09:00", end: "10:00", title: "WEEKLY STARS", host: "Albert Comes" },
            { start: "10:00", end: "13:00", title: "EL VIAJERO DEL TIEMPO", host: "David Castro" },
            { start: "13:00", end: "15:00", title: "MUSIC ROCK", host: "Román Armengol" },
            { start: "15:00", end: "16:00", title: "WEEKLY STARS", host: "Albert Comes" },
            { start: "16:00", end: "18:00", title: "HIST. DE LA MÚSICA ESPAÑOLA [Rep]", host: "Jaime Álvarez" },
            { start: "18:00", end: "21:00", title: "FUSIÓN NON-STOP", host: "Fusión FM" },
            { start: "21:00", end: "23:00", title: "REBER HEART", host: "Paco Jiménez" },
            { start: "23:00", end: "00:00", title: "CLASSICS", host: "Santiago Fontenla" }
        ],
        viernes: [
            { start: "00:00", end: "09:00", title: "FUSIÓN NON-STOP", host: "Fusión FM" },
            { start: "09:00", end: "10:00", title: "WEEKLY STARS", host: "Albert Comes" },
            { start: "10:00", end: "11:00", title: "EL VIAJERO DEL TIEMPO", host: "David Castro" },
            { start: "11:00", end: "13:00", title: "SOY DE CINE", host: "Soy de cine" },
            { start: "13:00", end: "15:00", title: "MUSIC ROCK", host: "Román Armengol" },
            { start: "15:00", end: "16:00", title: "WEEKLY STARS", host: "Albert Comes" },
            { start: "16:00", end: "17:00", title: "TOP 100 [Repetición]", host: "Santiago Fontenla" },
            { start: "17:00", end: "19:00", title: "BAD MUSIC RADIO [Repetición]", host: "José Luis Martín" },
            { start: "19:00", end: "21:00", title: "FUSIÓN NON-STOP", host: "Fusión FM" },
            { start: "21:00", end: "23:00", title: "DSD", host: "Jose Antonio Castillo" },
            { start: "23:00", end: "00:00", title: "A.Y.M", host: "Daniel Casanova" }
        ],
        sabado: [
            { start: "00:00", end: "11:00", title: "FUSIÓN NON-STOP", host: "Fusión FM" },
            { start: "11:00", end: "14:00", title: "SÁBADO SABADETE", host: "Xavi Martin" },
            { start: "14:00", end: "15:00", title: "BUSCANDO CINE [Repetición]", host: "Daniel Casanova" },
            { start: "15:00", end: "17:00", title: "EL VIAJERO DEL TIEMPO [Fin de semana]", host: "David Castro" },
            { start: "17:00", end: "19:00", title: "SOY DE CINE [Repetición]", host: "Soy de cine" },
            { start: "19:00", end: "20:00", title: "FUSIÓN NON-STOP", host: "Fusión FM" },
            { start: "20:00", end: "22:00", title: "A.Y.M [Repetición]", host: "Daniel Casanova" },
            { start: "22:00", end: "23:00", title: "FUSIÓN NON-STOP", host: "Fusión FM" },
            { start: "23:00", end: "00:00", title: "DISCOVER", host: "Santiago Fontenla" }
        ],
        domingo: [
            { start: "00:00", end: "09:00", title: "FUSIÓN NON-STOP", host: "Fusión FM" },
            { start: "09:00", end: "11:00", title: "LA AZOTEA [Repetición]", host: "David Castro" },
            { start: "11:00", end: "13:00", title: "FUSIÓN NON-STOP", host: "Fusión FM" },
            { start: "13:00", end: "15:00", title: "LA HORA DEL ROCK [Repetición]", host: "Paco Jiménez" },
            { start: "15:00", end: "17:00", title: "EL VIAJERO DEL TIEMPO [Fin de semana]", host: "David Castro" },
            { start: "17:00", end: "19:00", title: "DSD [Repetición]", host: "Jose Antonio Castillo" },
            { start: "19:00", end: "21:00", title: "B.P.M", host: "Daniel Casanova" },
            { start: "21:00", end: "22:00", title: "EL TRASTERO", host: "Luis López" },
            { start: "22:00", end: "23:59", title: "RUTAS MISTERIOSA", host: "Juanca Romero" }
        ]
    };

    const daysOfWeek = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
    const tabsContainer = document.getElementById('tabsContainer');
    const scheduleList = document.getElementById('scheduleList');
    
    const now = new Date();
    const currentDayIndex = now.getDay(); 
    const currentDayName = daysOfWeek[currentDayIndex];

    const displayOrder = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
    
    displayOrder.forEach(day => {
        const btn = document.createElement('button');
        btn.classList.add('tab-btn');
        btn.textContent = day.charAt(0).toUpperCase() + day.slice(1);
        btn.dataset.day = day;
        
        if (day === currentDayName) {
            btn.classList.add('active');
        }

        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderSchedule(day);
        });

        tabsContainer.appendChild(btn);
    });

    function renderSchedule(dayName) {
        scheduleList.innerHTML = ''; 
        const programs = scheduleData[dayName];

        if (!programs) return;

        programs.forEach(prog => {
            const item = document.createElement('div');
            item.classList.add('program-item');
            
            let isActive = false;
            if (dayName === currentDayName) {
                isActive = checkTime(prog.start, prog.end);
            }

            if (isActive) item.classList.add('active-show');

            item.innerHTML = `
                <div class="program-left">
                    <div class="time">${prog.start} - ${prog.end}</div>
                    <div class="info">
                        <h3>${prog.title}</h3>
                        <div class="presenter"><i class="fas fa-microphone-alt"></i> ${prog.host}</div>
                    </div>
                </div>
                <div class="program-right">
                    <span class="live-badge">EN VIVO</span>
                </div>
            `;
            scheduleList.appendChild(item);
        });
    }

    function checkTime(start, end) {
        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();

        const [startH, startM] = start.split(':').map(Number);
        const [endH, endM] = end.split(':').map(Number);

        let startTotal = startH * 60 + startM;
        let endTotal = endH * 60 + endM;

        if (endTotal === 0) endTotal = 24 * 60; 

        return currentMinutes >= startTotal && currentMinutes < endTotal;
    }

    renderSchedule(currentDayName);

    setInterval(() => {
        const activeTab = document.querySelector('.tab-btn.active');
        if (activeTab && activeTab.dataset.day === currentDayName) {
            renderSchedule(currentDayName);
        }
    }, 60000);

    // --- 3. NAV RESALTADO AL SCROLL ---
    const sections = document.querySelectorAll("section[id]");
    window.addEventListener("scroll", navHighlighter);

    function navHighlighter() {
        let scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute("id");
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(".main-nav a[href*=" + sectionId + "]").classList.add("active");
            } else {
                document.querySelector(".main-nav a[href*=" + sectionId + "]").classList.remove("active");
            }
        });
    }

    // --- 4. FUNCIONALIDAD DEL MENÚ MÓVIL (HAMBURGUESA) ---
    const menuToggleBtn = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav a');

    menuToggleBtn.addEventListener('click', () => {
        mainNav.classList.toggle('show-mobile-menu');
        
        const icon = menuToggleBtn.querySelector('i');
        if (mainNav.classList.contains('show-mobile-menu')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('show-mobile-menu');
            const icon = menuToggleBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // --- 5. ACTUALIZAR NOMBRE DE LA CANCIÓN (Antares / Dribbcast) ---
    const urlMetadatos = 'https://antares.dribbcast.com/api/v2/node/fmbarcelona/nowplaying'; 

    function actualizarCancion() {
        fetch(urlMetadatos)
            .then(respuesta => respuesta.json()) 
            .then(datos => {
                let cancionActual = datos.now_playing.song.text; 
                
                if (cancionActual) {
                    currentTrackDisplay.textContent = cancionActual;
                } else {
                    currentTrackDisplay.textContent = "FUSIÓN Radio - En Vivo";
                }
            })
            .catch(error => {
                console.log("Esperando metadatos...");
                currentTrackDisplay.textContent = "FUSIÓN Radio - El ritmo de la costa";
            });
    }

    // Cargamos la canción al iniciar y cada 15 segundos
    actualizarCancion();
    setInterval(actualizarCancion, 15000);

});