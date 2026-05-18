const { createApp, ref, watch, reactive } = Vue;

//OOP
class CorrectionChecker 
{
    constructor() {}

    answer;

    loadMultiply(a,b)
    {
        this.answer = a * b;
    }

    answerIsCorrect(answer)
    {
        return this.answer == answer;
    }
}

class Localizer 
{
    constructor() {}

    translations = {
        en: {
            hello_world: "Hello, World!",
            game_name: "MULTIPLY",
            game: "Game",
            options: "Options",
            records: "Records",
            records_not: "No records yet",
            home: "Home",
            size: "Size",
            theme: "Theme",
            language: "Language",
            start_game: "Start Game",
            stop_game: "Stop Game",
            next_task: "Next Task",
            your_score: "Your Score",
            correct_answers: "Correct Answers",
            save_results: "Save Results",
            enter_name: "Enter Your Name Here",
            enter_correct_name: "Please enter a valid name",
            loading_records: "Loading leaderboard from server...",
            all_records: "All Records",
            your_records: "Your Records",
        },
        est: {
            hello_world: "Tere, Maailm!",
            game_name: "MULTIPLY",
            game: "Mäng",
            options: "Valikud",
            records: "Rekordid",
            records_not: "Pole veel mingeid rekordeid",
            home: "Avaleht",
            size: "Suurus",
            theme: "Teema",
            language: "Keel",
            start_game: "Alusta mängu",
            stop_game: "Lõpeta mäng",
            next_task: "Järgmine ülesanne",
            your_score: "Teie skoor",
            correct_answers: "Õiged vastused",
            save_results: "Salvesta tulemused",
            enter_name: "Sisestage oma nimi siia",
            enter_correct_name: "Palun sisestage kehtiv nimi",
            loading_records: "Laadin edetabelit serverist...",
            all_records: "Kõik rekordid",
            your_records: "Teie rekordid",
        },
        rus: {
            hello_world: "Привет, мир!",
            game_name: "MULTIPLY",
            game: "Игра",
            options: "Опции",
            records: "Рекорды",
            records_not: "Пока нет рекордов",
            home: "Главная",
            size: "Размер",
            theme: "Тема",
            language: "Язык",
            start_game: "Начать игру",
            stop_game: "Остановить игру",
            next_task: "Следующее задание",
            your_score: "Ваш счет",
            correct_answers: "Правильные ответы",
            save_results: "Сохранить результаты",
            enter_name: "Введите ваше имя здесь",
            enter_correct_name: "Пожалуйста, введите действительное имя",
            loading_records: "Загрузка таблицы лидеров с сервера...",
            all_records: "Все рекорды",
            your_records: "Ваши рекорды",
        }
    };


    switchLanguage(lang) {
        document.documentElement.lang = lang;

        const elements = document.querySelectorAll('[loc]');
        elements.forEach(element => {
            const key = element.getAttribute('loc');
            if (this.translations[lang] && this.translations[lang][key]) 
            {
                element.textContent = this.translations[lang][key];
            }
        });
        // specifically for placeholder
        document.getElementById('username-input').placeholder = this.translations[lang].enter_name;
    }

    getLanguageList()
    {
        return Object.keys(this.translations);
    }
}

class PointSetter 
{
    constructor() {}

    #multiplyer = 1;
    
    setMultiplyer(value)
    {
        this.#multiplyer = value;
        if (value < 1) {
            this.#multiplyer = 1;
        }

    }

    getMultiplyer()
    {
        return this.#multiplyer;
    }

    getPoints(points)
    {
        return Math.round(points * this.#multiplyer);
    }
}

class EquasionCreation
{
    constructor() {}

    createEquasionDict(minValue, maxValue, amount)
    {
        const equations = {};
        for (let i = 0; i < amount; i++) {
            equations[i] = this.createEquasion(minValue, maxValue);
        }
        return equations;
    }

    createEquasion(minValue, maxValue)
    {
        return [this.randomInt(minValue, maxValue), this.randomInt(minValue, maxValue)];
    }

    generateCloseNumbers(number, count, span)
    {
        const closeNumbers = [];
        let n = 0;
        let maxAttempts = 20;
        let attempts = 0;
        while (n < count && attempts < maxAttempts) {

            const nNumber = Math.round(number + (Math.random() - 0.5) * span * 2);

            if (nNumber < 0 || nNumber === number || closeNumbers.includes(nNumber)) 
            {
                attempts++;
                continue;
            }

            closeNumbers.push(nNumber);
            n++;
            attempts = 0;
        }

        if (attempts >= maxAttempts) {
            throw new Error('Unable to generate the required number of close numbers within the maximum attempts.');
        }
        return closeNumbers;
    }

    generateCloseNumbersWithBase(number, count, span)
    {
        let container = this.generateCloseNumbers(number, count, span);
        let pos = this.randomInt(0, container.length);
        let nContainer = [];
        let n = 0;
        for (let i = 0; i < container.length+1; i++)
        {
            if (i == pos)            
            {
                nContainer.push(number);
            }
            else
            {
                nContainer.push(container[n]);
                n++;
            }
        }
        return nContainer;
    }

    randomInt(min, max)
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

class Theme
{   
    constructor(name, bg1, bg2, fg1, fg2, ac, tc, cau, cor)
    {
        this.name = name;
        this.bg1 = bg1;
        this.bg2 = bg2;
        this.fg1 = fg1;
        this.fg2 = fg2;
        this.ac = ac;
        this.tc = tc;
        this.cau = cau;
        this.cor = cor;
    }
}

class ThemeContainer
{
    constructor() {}

    #gThemes = 
    [
        new Theme("Dark", "#1e1e2e", "#252538", "#cdd6f4", "#a6adc8", "#b4befe", "#f38ba8", "#fab387", "#a6e3a1"),
        new Theme("Light", "#f4f4f5", "#ffffff", "#18181b", "#71717a", "#4f46e5", "#2563eb", "#d97706", "#16a34a"),
        new Theme("Emerald", "#064e3b", "#0f766e", "#f0fdf4", "#bbf7d0", "#34d399", "#10B981", "#f59e0b", "#34d399"),
        new Theme("Cyberpunk", "#0f051d", "#140b24", "#00ffff", "#9d4edd", "#b5179e", "#ff007f", "#ffb703", "#39ff14"),
        new Theme("Cozy Warm", "#f4ecd8", "#fdf6e3", "#5c4033", "#8b5a2b", "#c85a17", "#d2691e", "#b22222", "#2e8b57")
    ];

    #currentTheme = this.#gThemes[0];

    get currentTheme()
    {
        return this.#currentTheme;
    }

    get themes()
    {
        return this.#gThemes;
    }

    addTheme(theme)
    {
        this.#gThemes.push(theme);
    }

    removeTheme(theme)
    {
        this.#gThemes = this.#gThemes.filter(t => t !== theme);
    }

    removeThemeById(id)
    {
        if (id < 0 || id >= this.#gThemes.length) {
            throw new Error('Invalid theme ID');
        }
        this.#gThemes.splice(id, 1);
    }

    setCurrentTheme(id)
    {
        if (id < 0 || id >= this.#gThemes.length) 
        {
            this.setCurrentTheme(0);
            //throw new Error('Invalid theme ID');
            return;
        }
        this.#currentTheme = this.#gThemes[id];
        this.redactHtml();
    }

    setCurrentThemeByName(name)
    {
        const theme = this.#gThemes.find(t => t.name === name);
        if (!theme) {
            this.setCurrentTheme(0);
            //throw new Error('Theme not found');
            return;
        }
        this.#currentTheme = theme;
        this.redactHtml();
    }

    redactHtml()
    {
        const style = document.documentElement.style;
        
        style.setProperty('--bg1', this.currentTheme.bg1);
        style.setProperty('--bg2', this.currentTheme.bg2);
        style.setProperty('--fg1', this.currentTheme.fg1);
        style.setProperty('--fg2', this.currentTheme.fg2);
        style.setProperty('--ac', this.currentTheme.ac);
        style.setProperty('--tc', this.currentTheme.tc);
        style.setProperty('--cau', this.currentTheme.cau);
        style.setProperty('--cor', this.currentTheme.cor);
    }
}

class LocalStorageSpeaker
{
    constructor() {}

    set name(value)
    {
        localStorage.setItem('name', value);
    }
    get name()
    {
        return localStorage.getItem('name') || null;
    }
    
    set language(value)
    {
        localStorage.setItem('language', value);
    }
    get language()
    {
        return localStorage.getItem('language') || null;
    }

    set theme(value)
    { 
        localStorage.setItem('theme', value);
    }
    get theme()
    {
        return localStorage.getItem('theme') || null;
    }

    set difficulty(value)
    {
        localStorage.setItem('difficulty', value);
    }
    get difficulty()
    {
        return localStorage.getItem('difficulty') || null;
    }
}

class DatabaseSpeaker
{
    constructor() {}

    SERVER = "https://server-for-game-project.onrender.com";
    //SERVER = "http://localhost:8000/";

    async sendScore(name, difficulty, correct, incorrect, score) {
        let bd = JSON.stringify({ name, difficulty, correct, incorrect, score });
        let js = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: bd
        }
        console.log(js);
        const response = await fetch(`${this.SERVER}/scores/add`, js);
        console.log("OK");
    }

    async getScores(gName = null) {
        //maybe klient-servers are not for me, at least i dont like them

    //     try 
    //     {
    //         let response;
    //         if (name == null)
    //         {
    //             response = await fetch(`${this.SERVER}/scores`);
    //         }
    //         else
    //         {
    //             response = await fetch(`${this.SERVER}/scores/additional/${name}`)
    //         }

    //         return response.json()
    //     }
    //     catch (error)
    //     {
    //         console.log(error);
    //         return [];
    //     }
    // }
        try {
            let response;
            if (gName == null) {
                response = await fetch(`${this.SERVER}/scores/9`);
            } else {
                response = await fetch(`${this.SERVER}/scores`);
            }

            if (!response.ok) {
                console.error(`Server Error (${response.status})`);
                return [];
            }

            const rawText = await response.text();
            if (!rawText || rawText.trim() === "") {
                console.warn("Server returned an empty response body.");
                return [];
            }

            if (gName == null) {
                return JSON.parse(rawText);
            } else {
                //not the best solution, but will work
                const allPlayers = JSON.parse(rawText);
                const player = allPlayers.find(player => player.name === gName);
                if (!player) { return []; }
                return [player];
            }
            

        } catch (error) {
            console.error("Network or parsing error occurred:", error);
            return [];
        }
    }
}

class Timer
{
    activeTimerId = 0; 
    
    constructor() {
        this.timerTimeValue = 100;
    }

    async startTimer(duration) {
        this.activeTimerId++;
        const myTimerId = this.activeTimerId; 

        this.timerTimeValue = 100;
        const decr = this.timerTimeValue / duration;
        let i = 0;
        
        while (i < duration) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Ai is helped me with this, its mostly looks, if new timer is started, kill the old one, check by id
            if (myTimerId !== this.activeTimerId) {
                return;
            }

            this.timerTimeValue -= decr;
            i++;
        }
    }

    stopTimer() {
        this.activeTimerId++;
    }
}

class Manager 
{
    constructor() {
        this.localization = new Localizer();
        this.localSaver = new LocalStorageSpeaker();
        this.databaseSpeaker = new DatabaseSpeaker();

        this.correctionChecker = new CorrectionChecker();
        this.pointSetter = new PointSetter();
        this.equasionCreation = new EquasionCreation();

        this.themeContainer = new ThemeContainer();
    }
}

//Related functions
const manager = new Manager();
const rTimer = reactive(new Timer());

function switchLanguage(lang) 
{
    if (!manager.localization.translations[lang]) { return; }
    manager.localization.switchLanguage(lang);
    manager.localSaver.language = lang;
}

function switchTheme(theme)
{
    manager.themeContainer.setCurrentThemeByName(theme);
    manager.localSaver.theme = theme;
}

function preloadSaveData() {
    switchLanguage(manager.localSaver.language || "en");
    switchTheme(manager.localSaver.theme || manager.themeContainer.themes[0].name);
}

function addPlayerScore(name, difficulty, correct, incorrect, score) 
{
    // const allScores = manager.databaseSpeaker.getScores().value;
    // console.log(allScores);
    // if (allScores)
    // {
    //     const playerCopy = allScores.find(player => player.name === name);
    //     if(playerCopy && playerCopy.score > score)
    //     {
    //         return;
    //     }
    // }
    manager.databaseSpeaker.sendScore(name, difficulty, correct, incorrect, score);
}

async function getPlayerScores(name = null) 
{
    return await manager.databaseSpeaker.getScores(name);
}

function changeDifficulty(difficulty) 
{ 
    manager.localSaver.difficulty = difficulty;
}

function setName(name)
{
    manager.localSaver.name = name;
}

function setNameAlarm(name)
{
    if (!name || name.trim() === "") {
        showAlarm(true);
        document.getElementById("username-input").className = "input-caution";
        return false;
    }
    setName(name);
    smallStatsChange(false);
    return true;
}

function showAlarm(show = true)
{
    document.getElementById("please-enter-name").style.display = show ? "block" : "none";
}

function smallStatsChange(showBasic = true)
{
    let basic = document.getElementById("saveDataScene");
    let extra = document.getElementById("showRecordsScene");
    if (showBasic)    {
        basic.style.display = "block";
        extra.style.display = "none";
    } else {
        basic.style.display = "none";
        extra.style.display = "block";
    }
}

function resetTimer()
{
    rTimer.stopTimer();
    rTimer.startTimer(60);
}

let curAns = [];
function repopulateTask(tasks, correct)
{
    const taskField = document.getElementById("taskField");
    taskField.replaceChildren();
    curAns = [];
    for (let i = 0; i < tasks.length; i++)
    {
        const task = document.createElement("button");
        task.textContent = tasks[i];
        task.value = tasks[i];

        task.addEventListener('click', function() {
            checkAnswer(this); 
        });
        taskField.appendChild(task);
        if (tasks[i] == correct)
        {
            task.id = "correct-ans";
        }
        curAns.push(task);
    }
}

const curQuestionsCorrect = ref(0);
const curQuestionsCompleted = ref(0);
const curScore = ref(0);
async function checkAnswer(element) 
{
    blockAnswers();
    if (element.hasAttribute("id") && element.getAttribute("id") === "correct-ans")
    {
        console.log("Correct answer!");
        curQuestionsCorrect.value++;  
        curQuestionsCompleted.value++;   
        curScore.value += parseInt(manager.localSaver.difficulty);
        element.className = "btn-cor";
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    else
    {
        console.log("Incorrect answer!");
        curQuestionsCompleted.value++;
        element.className = "btn-cao";
        document.getElementById("correct-ans").className = "btn-cor";
        await new Promise(resolve => setTimeout(resolve, 3000));
    }
    setNewTask();
}

function blockAnswers(block = true)
{
    console.log(block);
    curAns.forEach(ans => { ans.disabled = block});
}

function setNewTask()
{
    const task = document.getElementById("task");
    const difficulty = manager.localSaver.difficulty || 2;
    const a = manager.equasionCreation.randomInt(2, difficulty);
    const b = manager.equasionCreation.randomInt(2, difficulty);
    const questions = manager.equasionCreation.generateCloseNumbersWithBase(a * b, 3, difficulty);
    const answer = a * b;
    task.textContent = `${a} x ${b}`;
    repopulateTask(questions, answer);
    blockAnswers(false);
}

function startGame()
{
    curQuestionsCompleted.value = 0;
    curQuestionsCorrect.value = 0;
    curScore.value = 0;
    resetTimer();
    setNewTask();
}

//VUE mount and other stuff
createApp({
  setup() {

    let curLanguage = ref(manager.localSaver.language || switchLanguage("en"));
    watch(curLanguage, (newValue, oldValue) => {
            console.log(`Changed to: ${newValue}`);
            switchLanguage(newValue);   
        });
    
    //Watch is really cool, especially for that
    let curScene = ref("Main")
    watch(curScene, (newValue, oldValue) => {
        if (newValue === "GameStats") 
        {
            showAlarm(false);
            smallStatsChange(true);
            document.getElementById("username-input").className = "";
        }

        if (newValue === "Records")
        {
            loadScores();
        }

        if (newValue === "GameMain")
        {
            startGame();
        }
        else
        {
            rTimer.stopTimer();
        }
    });

    //it has some problems with detection, even with reactive, so i decideed to just manually update it
    let timerValue = ref(100);
    watch(() => rTimer.timerTimeValue, (newValue) => {
        timerValue.value = newValue;
        console.log(`Timer value changed to: ${timerValue.value}`);
        if (timerValue.value <= 0) {
            curScene.value = "GameStats";
        }
    });

    let curName = ref(manager.localSaver.name || "");
    watch(() => curName.value, (newValue, oldValue) => {
        const maxim = 9;
        console.log(curName);
        if (newValue.length > maxim)
        {
            curName.value = oldValue;
        }
    });


    // Ai is helped with this part too, all this is needed in case the server is slow (im using free hosting)
    const resolvedScores = ref([]);
    const personalScores = ref([]);
    const isLoading = ref(true);
    async function loadScores() {
        isLoading.value = true; 
        try {
            const data = await getPlayerScores(); 
            const playerData = manager.localSaver.name ? await getPlayerScores(manager.localSaver.name) : null;
            resolvedScores.value = data || [];
            personalScores.value = playerData || [];
        } catch (error) {
            console.error("Failed to load scores:", error);
        } finally {
            isLoading.value = false;
        }
    }
    loadScores();
    //
    document.getElementById("main-body").style.display = "block";
    //I decided to reference all vue-used variables and functions here, so it will be easier to track
    return {
        timerValue,
        themes: ref(manager.themeContainer.themes),
        curDifficulty: ref(manager.localSaver.difficulty || changeDifficulty(2)),
        curLanguage,
        curName,

        curTheme: ref(manager.localSaver.theme || switchTheme(manager.themeContainer.themes[0].name)),

        resolvedScores,
        personalScores,
        isLoading,
        refreshScores: loadScores,

        curScore,
        curQuestionsCorrect,
        curQuestionsCompleted,

        curScene,
        switchLanguage() {switchLanguage(this.curLanguage)},
        changeDifficulty() {changeDifficulty(this.curDifficulty)},
        switchTheme(name) {switchTheme(name)},
        checkAndSave() {if (setNameAlarm(this.curName)) {addPlayerScore(this.curName, this.curDifficulty, this.curQuestionsCorrect, this.curQuestionsCompleted - this.curQuestionsCorrect, this.curScore)}},
        startTimerAsy() {startTimerAsy(60)},
        stopTimerAsy() {stopTimerAsy()},
        playerScores(name = null) {return getPlayerScores(name)},
    }
    
  }
}).mount('#app');

preloadSaveData();