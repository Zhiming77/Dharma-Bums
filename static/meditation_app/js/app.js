
const app = () => {
    const song = document.querySelector(".song");
    const bell = document.querySelector(".bell");
    const play = document.querySelector(".play");
    const video = document.querySelector('.vid-container video');

    //Volume Buttons
    const mute = document.querySelector('.mute-button');

    const max = document.querySelector('.max-button');





    //Sounds
    const sounds = document.querySelectorAll('.sound-picker button');

    //Time Display
    const timeDisplay = document.querySelector('.base-timer__label');
    const timeSelect = document.querySelectorAll(".time-select button");
    


    //Duration
    let Time_Limit = 600;
    const FULL_DASH_ARRAY = 283;


    let mute_icon = document.querySelector(".mute-image");
    let max_icon = document.querySelector(".max-image")

    mute.addEventListener("click", function(){
        song.volume = 0;
        mute_icon.src="static/svg/mute-red.svg";
        max_icon.src="static/svg/volume-max.svg"

    })

    max.addEventListener("click", function(){
        song.volume = 1;
        mute_icon.src="static/svg/mute.svg";
        max_icon.src="static/svg/volume-max-green.svg"

    })

    //Pick Different Sounds
    sounds.forEach(sound=>{
        sound.addEventListener("click", function(){
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');

            checkPlaying(song);
        });
    });



    window.SetVolume = function(val){
        console.log('Before: '+song.volume);
        song.volume = val / 100;
        if (val>0){
            mute_icon.src="static/svg/mute.svg";
        }

        if (val<100){
            max_icon.src="static/svg/volume-max.svg"

        }

        if (song.volume === 1){
            max_icon.src="static/svg/volume-max-green.svg"
        }

        if (song.volume===0){
            mute_icon.src="static/svg/mute-red.svg";
        }

        console.log('After: '+song.volume);

    }



    //Play sound
    play.addEventListener('click',()=>{
        checkPlaying(song);
    });

    //Select Sound
    timeSelect.forEach(option =>{
        option.addEventListener('click', function(){
            Time_Limit = this.getAttribute("data-time");
            timeDisplay.textContent =`${Math.floor(Time_Limit/60)}:0${Math.floor(Time_Limit%60)}`

        });
    })

    //Create stop & play functionality
    const checkPlaying = song =>{
        if(song.paused){
            song.play();
            video.play();
            play.src ="static/svg/pause-yellow.svg";

        }else{
            song.pause();
            video.pause();
            play.src ="static/svg/play.svg";

        }
    };

    //Animate circle and check time
    song.ontimeupdate = function() {
        let currentTime = song.currentTime;
        let elapsed = Time_Limit - currentTime;

        let seconds = Math.floor(elapsed % 60);
        if (seconds < 10){
            seconds = "0"+seconds;
        }

        let minutes = Math.floor(elapsed / 60);

        timeDisplay.textContent = `${minutes}:${seconds}`;

        let countdown = () => {
            let fractionalTime = elapsed / Time_Limit;
            fractionalTime = fractionalTime - (1.8/ Time_Limit) * (1- fractionalTime);
            /*console.log(fractionalTime);*/
            /*console.log(Time_Limit);*/
            const circleDashArray = `${(
                fractionalTime * FULL_DASH_ARRAY
            ).toFixed(0)} 283`;
            document
                .getElementById("base-timer-path-remaining")
                .setAttribute("stroke-dasharray", circleDashArray);



        }
        countdown();




        const fadeVolume = function(){

            if ((song.volume - .017) >=0){
                song.volume -=0.017;
            }


            console.log("Fading Volume @: "+ song.volume);





        }

        if (Time_Limit - currentTime <= 7){
            fadeVolume();
        }

        console.log(Time_Limit-currentTime);

        if (currentTime >= Time_Limit){
            song.pause();
            song.currentTime = 0;
            play.src ="static/svg/play.svg";
            bell.play();
            video.pause();
            setTimeout(()=>{window.alert("Superb session!")}, 3000);




        }



    };



};

app();
